const jwt = require("jsonwebtoken");
const userService = require("../Services/user.services");
const {
  errorResponseBody,
  successResponseBody,
} = require("../utils/responseBody");
const {STATUS, USER_ROLE, USER_STATUS} = require("../utils/constants");
const SendMail = require("../Services/email.service");
const User = require("../models/user.model");

const signUp = async (req, res) => {
  try {
    const response = await userService.createUser(req.body);
    successResponseBody.data = response;
    successResponseBody.message = "Successfully registered user";
    return res.status(STATUS.OK).json(successResponseBody);
  } catch (error) {
    if (error.err) {
      errorResponseBody.err = error.err;
      return res.status(error.code).json(errorResponseBody);
    }
    errorResponseBody.err = error;
    return res.status(STATUS.INTERNAL_SERVER_ERROR).json(errorResponseBody);
  }
};

const signin = async (req, res) => {
  try {
    const user = await userService.getUserByEmail(req.body.email);
    const isValidPassword = await user.isValidPassword(req.body.password);
    if (!isValidPassword) {
      throw { err: "Invalid password for the given email", code: STATUS.UNAUTHORISED };
    }
    const token = jwt.sign(
      { id: user.id, email: user.email },
      process.env.AUTH_KEY,
      { expiresIn: "1hr" },
    );

    successResponseBody.message = "Successfully logged in";
    successResponseBody.data = {
      email: user.email,
      role: user.userRole,
      status: user.userStatus,
      token: token,
    };
    return res.status(STATUS.OK).json(successResponseBody);
  } catch (error) {
    if (error.err) {
      errorResponseBody.err = error.err;
      return res.status(error.code).json(errorResponseBody);
    }
    errorResponseBody.err = error;
    return res.status(STATUS.INTERNAL_SERVER_ERROR).json(errorResponseBody);
  }
};

const resetPassword = async (req, res) => {
  try {
    const user = await userService.getUserById(req.user);
    const isOldPasswordCorrect = await user.isValidPassword(
      req.body.oldPassword,
    );
    if (!isOldPasswordCorrect) {
      throw {
        err: "Invalid old password, please write the correct old password",
        code: STATUS.FORBIDDEN,
      };
    }
    user.password = req.body.newPassword;
    await user.save();
    successResponseBody.data = user;
    successResponseBody.message = "Successfully updated teh password for the given user";
    return res.status(STATUS.OK).json(successResponseBody);
  } catch (error) {
    if (error.err) {
      errorResponseBody.err = error.err;
      return res.status(error.code).json(errorResponseBody);
    }
    errorResponseBody.err = error;
    return res.status(STATUS.INTERNAL_SERVER_ERROR).json(errorResponseBody);
  }
};

const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) {
      errorResponseBody.err = "No email provided";
      return res.status(STATUS.BAD_REQUEST).json(errorResponseBody);
    }

    const user = await User.findOne({ email });
    if (!user) {
      errorResponseBody.err = "No user registered with this email address";
      return res.status(STATUS.NOT_FOUND).json(errorResponseBody);
    }

    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    user.resetOtp = otp;
    user.resetOtpExpires = Date.now() + 10 * 60 * 1000; // 10 minutes
    await user.save();

    console.log(`[PASS_RESET] OTP generated for ${email}: ${otp}`);

    try {
      await SendMail(
        "CineVerse Password Reset Code",
        user._id,
        `Your password reset code is ${otp}. This code will expire in 10 minutes.`
      );
    } catch (mailErr) {
      console.warn("Failed to deliver mail, relying on console logs", mailErr.message);
    }

    successResponseBody.data = { email };
    successResponseBody.message = "Password reset OTP sent successfully";
    return res.status(STATUS.OK).json(successResponseBody);
  } catch (error) {
    if (error.err) {
      errorResponseBody.err = error.err;
      return res.status(error.code).json(errorResponseBody);
    }
    errorResponseBody.err = error.message || error;
    return res.status(STATUS.INTERNAL_SERVER_ERROR).json(errorResponseBody);
  }
};

const resetForgotPassword = async (req, res) => {
  try {
    const { email, otp, newPassword } = req.body;
    if (!email || !otp || !newPassword) {
      errorResponseBody.err = "Email, OTP and new password are required";
      return res.status(STATUS.BAD_REQUEST).json(errorResponseBody);
    }

    const user = await User.findOne({ email });
    if (!user) {
      errorResponseBody.err = "No user registered with this email address";
      return res.status(STATUS.NOT_FOUND).json(errorResponseBody);
    }

    if (user.resetOtp !== otp || !user.resetOtpExpires || user.resetOtpExpires < Date.now()) {
      errorResponseBody.err = "Invalid or expired OTP code";
      return res.status(STATUS.BAD_REQUEST).json(errorResponseBody);
    }

    user.password = newPassword;
    user.resetOtp = undefined;
    user.resetOtpExpires = undefined;
    await user.save();

    successResponseBody.data = { email };
    successResponseBody.message = "Password has been reset successfully";
    return res.status(STATUS.OK).json(successResponseBody);
  } catch (error) {
    if (error.err) {
      errorResponseBody.err = error.err;
      return res.status(error.code).json(errorResponseBody);
    }
    errorResponseBody.err = error.message || error;
    return res.status(STATUS.INTERNAL_SERVER_ERROR).json(errorResponseBody);
  }
};

const socialSignIn = async (req, res) => {
  try {
    const { email, name, provider } = req.body;
    if (!email || !name) {
      errorResponseBody.err = "Email and name are required";
      return res.status(STATUS.BAD_REQUEST).json(errorResponseBody);
    }

    let user;
    try {
      user = await userService.getUserByEmail(email);
    } catch (err) {
      if (err.code === STATUS.NOT_FOUND) {
        let uniqueName = name;
        const isNameTaken = await User.findOne({ name: uniqueName });
        if (isNameTaken) {
          uniqueName = `${name}${Math.floor(100 + Math.random() * 900)}`;
        }

        user = await userService.createUser({
          name: uniqueName,
          email: email,
          password: Math.random().toString(36).substring(2, 12),
          userRole: USER_ROLE.customer,
          userStatus: USER_STATUS.approved
        });
      } else {
        throw err;
      }
    }

    const token = jwt.sign(
      { id: user.id, email: user.email },
      process.env.AUTH_KEY,
      { expiresIn: "1hr" }
    );

    successResponseBody.message = `Successfully logged in with ${provider || 'social provider'}`;
    successResponseBody.data = {
      email: user.email,
      role: user.userRole,
      status: user.userStatus,
      token: token,
    };
    return res.status(STATUS.OK).json(successResponseBody);
  } catch (error) {
    if (error.err) {
      errorResponseBody.err = error.err;
      return res.status(error.code).json(errorResponseBody);
    }
    errorResponseBody.err = error.message || error;
    return res.status(STATUS.INTERNAL_SERVER_ERROR).json(errorResponseBody);
  }
};

module.exports = {
  signUp,
  signin,
  resetPassword,
  forgotPassword,
  resetForgotPassword,
  socialSignIn,
};

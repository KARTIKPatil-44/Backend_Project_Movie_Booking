const jwt = require("jsonwebtoken");
const userServices = require("../Services/user.services");
const { errorResponseBody } = require("../utils/responseBody");
const { USER_ROLE, STATUS } = require("../utils/constants");

/**
 *  validate for user signUp
 * @param  req -> http request object
 * @param  res -> http response object
 * @param  next -> next middleware
 * @returns
 */
const validateSignUpRequest = async (req, res, next) => {
  // validate the name for the user
  if (!req.body.name) {
    errorResponseBody.err = "Name of the user not present in the request";
    return res.status(STATUS.BAD_REQUEST).json(errorResponseBody);
  }

  // validate the email for the user
  if (!req.body.email) {
    errorResponseBody.err = "Email of the user not present in the request";
    return res.status(STATUS.BAD_REQUEST).json(errorResponseBody);
  }

  // validate the password for the user
  if (!req.body.password) {
    errorResponseBody.err = "Password of the user not present in the request";
    return res.status(STATUS.BAD_REQUEST).json(errorResponseBody);
  }

  // request is valid
  next();
};

/**
 *  validate for user signin
 * @param  req -> http request object
 * @param  res -> http response object
 * @param  next -> next middleware
 * @returns
 */
const validateSignInRequest = async (req, res, next) => {
  // validate user email presence
  if (!req.body.email) {
    errorResponseBody.err = "No email provided for sign in";
    return res.status(STATUS.BAD_REQUEST).json(errorResponseBody);
  }

  // validate user password presence
  if (!req.body.password) {
    errorResponseBody.err = "No password provided for sign in";
    return res.status(STATUS.BAD_REQUEST).json(errorResponseBody);
  }

  // request is valid
  next();
};

// const isAuthenticated = async (req, res, next) => {
//   try {
//     const token = req.headers["x-access-token"];
//     if (!token) {
//       errorResponseBody.err = "No token provided";
//       return res.status(STATUS.FORBIDDEN).json(errorResponseBody);
//     }
//     const response = jwt.verify(token, process.env.AUTH_KEY);
//     if (!response) {
//       errorResponseBody.err = "Token not verified";
//       return res.status(STATUS.UNAUTHORISED).json(errorResponseBody);
//     }
//     const user = await userServices.getUserById(response.id);
//     req.user = user.id;
//     next();
//   } catch (error) {
//     if (error.name == "JsonWebTokenError") {
//       errorResponseBody.err = error.message;
//       return res.status(STATUS.UNAUTHORISED).json(errorResponseBody);
//     }
//     if (error.code == STATUS.NOT_FOUND) {
//       errorResponseBody.err = "User dosen't exist";
//       return res.status(error.code).json(errorResponseBody);
//     }
//     errorResponseBody.err = error;
//     return res.status(STATUS.INTERNAL_SERVER_ERROR).json(errorResponseBody);
//   }
// };

const isAuthenticated = async (req, res, next) => {
  try {
    const token = req.headers["x-access-token"];
    if (!token) {
      errorResponseBody.err = "No token provided";
      return res.status(STATUS.FORBIDDEN).json(errorResponseBody);
    }
    const response = jwt.verify(token, process.env.AUTH_KEY);
    if (!response) {
      errorResponseBody.err = "Token not verified";
      return res.status(STATUS.UNAUTHORISED).json(errorResponseBody);
    }
    const user = await userServices.getUserById(response.id);
    req.user = user.id;
     next();
  } catch (error) {
    if (error.name === "JsonWebTokenError" || error.name === "TokenExpiredError") {
      errorResponseBody.err = error.message;
      return res.status(STATUS.UNAUTHORISED).json(errorResponseBody);
    }
    if (error.code == STATUS.NOT_FOUND) {
      errorResponseBody.err = "User dosen't exist";
      return res.status(error.code).json(errorResponseBody);
    }
    errorResponseBody.err = error.message || error;
    return res.status(STATUS.INTERNAL_SERVER_ERROR).json(errorResponseBody);
  }
};
const validateResetPasswordRequest = (req, res, next) => {
  // validate old password presence
  if (!req.body.oldPassword) {
    errorResponseBody.err = "Missing the old password in the request";
    return res.status(STATUS.BAD_REQUEST).json(errorResponseBody);
  }

  // validate new password presence
  if (!req.body.newPassword) {
    errorResponseBody.err = "Missing the new password in the request";
    return res.status(STATUS.BAD_REQUEST).json(errorResponseBody);
  }

  // we can procced
  next();
};

// validate the user is admin
const isAdmin = async (req, res, next) => {
  const user = await userServices.getUserById(req.user);
  if (user.userRole != USER_ROLE.admin) {
    errorResponseBody.err =
      "User is not an admin, cannot be proceed with the request";
    return res.status(STATUS.UNAUTHORISED).json(errorResponseBody);
  }
  // we can procced
  next();
};

// validate the user is client
const isClient = async (req, res, next) => {
  const user = await userServices.getUserById(req.user);
  if (user.userRole != USER_ROLE.client) {
    errorResponseBody.err =
      "User is not a client, cannot be procced with the request";
    return res.status(STATUS.UNAUTHORISED).json(errorResponseBody);
  }
  // we can procced
  next();
};

// const isAdminOrisClient = async (req, res, next) => {
//   if (!req.user) {
//     return res.status(STATUS.UNAUTHORISED).json({
//       err: "User not authenticated"
//     });
//   }

//   const user = await userServices.getUserById(req.user);

//   if (!user) {
//     return res.status(STATUS.NOT_FOUND).json({
//       err: "User not found"
//     });
//   }

//   if (user.userRole != USER_ROLE.admin && user.userRole != USER_ROLE.client) {
//     return res.status(STATUS.UNAUTHORISED).json({
//       err: "Not authorized"
//     });
//   }

//   next();
// };

const isAdminOrClient = async (req, res, next) => {
  const user = await userServices.getUserById(req.user);
  if (user.userRole != USER_ROLE.admin && user.userRole != USER_ROLE.client) {
    errorResponseBody.err =
      "User is neither a client not an admin, cannot proceed with the request";
    return res.status(STATUS.UNAUTHORISED).json(errorResponseBody);
  }
  next();
};

module.exports = {
  validateSignUpRequest,
  validateSignInRequest,
  isAuthenticated,
  validateResetPasswordRequest,
  isAdmin,
  isClient,
  isAdminOrClient,
};

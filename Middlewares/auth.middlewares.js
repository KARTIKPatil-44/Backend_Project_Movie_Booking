const { errorResponseBody } = require("../utils/responseBody");

const validateSignUpRequest = async (req, res, next) => {
  // validate the name for the user
  if (!req.body.name) {
    errorResponseBody.err = "Name of the user not present in the request";
    return res.status(400).json(errorResponseBody);
  }
  // validate the email for the user
  if (!req.body.email) {
    errorResponseBody.err = "Email of the user not present in the request";
    return res.status(400).json(errorResponseBody);
  }
  // validate the password for the user
  if (!req.body.password) {
    errorResponseBody.err = "Password of the user not present in the request";
    return res.status(400).json(errorResponseBody);
  }
  // request is valid
  next();
};

module.exports = {
  validateSignUpRequest,
};

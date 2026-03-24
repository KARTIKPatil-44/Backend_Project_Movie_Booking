const { errorResponseBody } = require("../utils/responseBody");

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

/**
 *  validate for user signin
 * @param  req -> http request object
 * @param  res -> http response object
 * @param  next -> next middleware
 * @returns 
 */
const validateSignInRequest = async (req,res, next) =>{
  // validate user email presence
  if(!req.body.email){
    errorResponseBody.err = "No email provided for sign in";
    return res.status(400).json(errorResponseBody);
  }

  // validate user password presence
  if(!req.body.password){
    errorResponseBody.err = "No password provided for sign in";
    return res.status(400).json(errorResponseBody);
  } 

  // request is valid
  next();

};

module.exports = {
  validateSignUpRequest,
  validateSignInRequest
};

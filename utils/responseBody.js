/**
 *  This object will be used as a template for building error response
 */
const errorResponseBody = {
  err: {},
  data: {},
  message: "Somthing went wrong cannot proccess the request",
  success: false,
};

/**
 * This object will be used as a template for building success response
 */
const successResponseBody = {
  err: {},
  data: {},
  message: "Successfully proccessed the request",
  success: true,
};

module.exports = {
  successResponseBody,
  errorResponseBody,
};

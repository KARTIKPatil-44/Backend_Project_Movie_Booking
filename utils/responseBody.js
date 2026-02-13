const errorResponseBody = {
  err: {},
  data: {},
  message: "Somthing went wrong cannot proccess the request",
  success: false,
};

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

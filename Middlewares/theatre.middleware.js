const badRequestResponse = {
  success: "false",
  err: "",
  data: {},
  message: "Malformed Request | Bad Request",
};
const {STATUS} = require("../utils/constants");

/**
 * 
 * @param  req -> HTTP request object
 * @param  res -> HTTP response object
 * @param  next -> next middleware function
 * @returns -> wheathre the request is valid or not 
 */
const validateTheatreCreateRequest = async (req, res, next) => {
  // validate the theatre name
  if (!req.body.name) {
    badRequestResponse.err =
      "The name of the theatre is not present in the request";
    return res.status(STATUS.BAD_REQUEST).json(badRequestResponse);
  }
  // validate the theatre picode
  if (!req.body.pincode) {
    badRequestResponse.err =
      "The pincode of the theatre is not present in the request";
    return res.status(STATUS.BAD_REQUEST).json(badRequestResponse);
  }
  // validate the theatre city
  if (!req.body.city) {
    badRequestResponse.err =
      "The city of the theatre is not present in the request";
    return res.status(STATUS.BAD_REQUEST).json(badRequestResponse);
  }

  next();
};

module.exports = {
  validateTheatreCreateRequest,
};

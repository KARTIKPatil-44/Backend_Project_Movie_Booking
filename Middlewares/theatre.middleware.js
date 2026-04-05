const { errorResponseBody } = require("../utils/responseBody");

const badRequestResponse = {
  success: "false",
  err: "",
  data: {},
  message: "Malformed Request | Bad Request",
};

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
    return res.status(400).json(badRequestResponse);
  }
  // validate the theatre picode
  if (!req.body.pincode) {
    badRequestResponse.err =
      "The pincode of the theatre is not present in the request";
    return res.status(400).json(badRequestResponse);
  }
  // validate the theatre city
  if (!req.body.city) {
    badRequestResponse.err =
      "The city of the theatre is not present in the request";
    return res.status(400).json(badRequestResponse);
  }

  next();
};

  const validateUpateMoviesRequest = async (req, res, next) =>{
    // validation of insert parameter
    if(req.body.insert === undefined){
      errorResponseBody.message = "The insert parameter is missing in the request";
      return res.status(400).json(errorResponseBody);
    }
    // validate movieIds presence
    if(!req.body.movieIds){
      errorResponseBody.message = "No movies present in the requst to be updated in theatre";
      return res.status(400).json(errorResponseBody);
    }
    // validate if movieIds is an array or not 
    if(!(req.body.movieIds instanceof Array)){
      errorResponseBody.message = "Expected array of movies but found somthing else";
      return res.status(400).json(errorResponseBody);
    }
    // validate if movieIds is empty or not 
    if(req.body.movieIds.length == 0){
      errorResponseBody.message = "No movies present in the array provided";
      return res.status(400).json(errorResponseBody);
    }
    // everything is fine
    next();
  }

module.exports = {
  validateTheatreCreateRequest,
  validateUpateMoviesRequest,
};

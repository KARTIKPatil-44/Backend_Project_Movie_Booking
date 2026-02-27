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
const validateMovieCreateRequest = async (req, res, next) => {
  // validate the movie name
  if (!req.body.name) {
    badRequestResponse.err =
      "The name of the movie is not present in the request";
    return res.status(400).json(badRequestResponse);
  }
  // validate the movie description
  if (!req.body.description) {
    badRequestResponse.err =
      "The name of the description is not present in the request";
    return res.status(400).json(badRequestResponse);
  }
  // validate the casts
  if (
    !req.body.casts ||
    !(req.body.casts instanceof Array) ||
    req.body.casts.length <= 0
  ) {
    badRequestResponse.err =
      "The name of the casts is not present in the request";
    return res.status(400).json(badRequestResponse);
  }
  // validate the trailerUrl
  if (!req.body.trailerUrl) {
    badRequestResponse.err = "The trailerUrl  is not present in the request";
    return res.status(400).json(badRequestResponse);
  }
  // validate the language
  if (!req.body.language) {
    badRequestResponse.err = "The  language is not present in the request";
    return res.status(400).json(badRequestResponse);
  }
  // validate the releaseDate
  if (!req.body.releaseDate) {
    badRequestResponse.err = "The  releaseDate is not present in the request";
    return res.status(400).json(badRequestResponse);
  }
  // validate the director
  if (!req.body.director) {
    badRequestResponse.err =
      "The name of the director is not present in the request";
    return res.status(400).json(badRequestResponse);
  }

  next();
};

module.exports = {
  validateMovieCreateRequest,
};

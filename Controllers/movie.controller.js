const Movie = require("../models/movie.model");
const moiveServices = require("../Services/movie.services");
const {successResponseBody,errorResponseBody} = require("../utils/responseBody")

const createMovie = async (req, res) => {
  try {
    const movie = await moiveServices.createMovie(req.body);

    successResponseBody.data = movie;
    successResponseBody.message = "Successfully created the movie";

    return res.status(201).json(successResponseBody);
  } catch (err) {
    console.log(err);
    return res.status(500).json(errorResponseBody);
  }
};

const deleteMovie = async (req, res) => {
  try {
    const response = await moiveServices.deleteMovie(req.params.id);

    successResponseBody.data = response;
    successResponseBody.message = "Successfully deleted the movie";

    return res.status(201).json(successResponseBody);
  } catch (err) {
    return res.status(500).json(errorResponseBody);
  }
};

const getMovie = async (req, res) => {
  try {
    const response = await moiveServices.getMoiveById(req.params.id);

    if (response.err) {
      errorResponseBody.err = response.err;
      return res.status(response.code).json(errorResponseBody);
    }

    successResponseBody.data = response;
    return res.status(200).json(successResponseBody);
  } catch (err) {
    return res.status(500).json({
      success: false,
      error: err,
      message: "Somthing went wrong cannot proccess the request",
    });
  }
};

module.exports = {
  createMovie,
  deleteMovie,
  getMovie,
};

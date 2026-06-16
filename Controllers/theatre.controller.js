const theatreServices = require("../Services/theatre.services");
const {
  successResponseBody,
  errorResponseBody,
} = require("../utils/responseBody");
const { STATUS } = require("../utils/constants");
const SendMail = require ("../Services/email.service");
const Theatre = require("../models/theatre.model");
const User = require("../models/user.model");

/**
 *
 * Controller function to create a new theatre
 * @returns  created theatre details
 */
const createTheatre = async (req, res) => {
  try {
    const responce = await theatreServices.createTheatre({...req.body, owner: req.user});
    successResponseBody.data = responce;
    successResponseBody.message = "Successfullfy created the Theatre";
    SendMail(
      "successfully created Theater",
      req.user,
      "You have successfully created a new Theater"
    );
    return res.status(STATUS.OK).json(successResponseBody);
  } catch (err) {
    errorResponseBody.err = err;
    return res.status(STATUS.INTERNAL_SERVER_ERROR).json(errorResponseBody);
  }
};

/**
 *
 * Controller function to delete a theatre by ID
 * @returns  deleted theatre details
 */
const destroy = async (req, res) => {
  try {
    const user = await User.findById(req.user);
    if (!user) {
      errorResponseBody.err = "User not found";
      return res.status(STATUS.NOT_FOUND).json(errorResponseBody);
    }
    if (user.userRole === "CLIENT") {
      const theatre = await Theatre.findById(req.params.id);
      if (theatre && theatre.owner.toString() !== req.user) {
        errorResponseBody.err = "You are not authorized to delete this theatre";
        return res.status(STATUS.FORBIDDEN).json(errorResponseBody);
      }
    }
    const responce = await theatreServices.deleteTheatre(req.params.id);
    successResponseBody.data = responce;
    successResponseBody.message = "Successfully deleted the  given theatre";
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

/**
 *
 * Controller function to fetch a theatre by its ID
 * @returns  theatre details
 */
const getTheatre = async (req, res) => {
  try {
    const responce = await theatreServices.getTheatre(req.params.id);

    successResponseBody.data = responce;
    successResponseBody.message =
      "Successfullfy featched the data  of the theatre";
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

/**
 *
 * Controller function to fetch all theatres
 * @returns  list of theatres
 */
const getTheatres = async (req, res) => {
  try {
    const responce = await theatreServices.getAllTheatres(req.query);
    successResponseBody.data = responce;
    successResponseBody.message = "Successfully featched all theatres";
    return res.status(STATUS.OK).json(successResponseBody);
  } catch (error) {
    errorResponseBody.err = error;
    return res.status(STATUS.INTERNAL_SERVER_ERROR).json(errorResponseBody);
  }
};

/**
 *
 * Controller function to update a theatre by ID
 * @returns updated theatre details
 */
const update = async (req, res) => {
  try {
    const user = await User.findById(req.user);
    if (!user) {
      errorResponseBody.err = "User not found";
      return res.status(STATUS.NOT_FOUND).json(errorResponseBody);
    }
    if (user.userRole === "CLIENT") {
      const theatre = await Theatre.findById(req.params.id);
      if (theatre && theatre.owner.toString() !== req.user) {
        errorResponseBody.err = "You are not authorized to update this theatre";
        return res.status(STATUS.FORBIDDEN).json(errorResponseBody);
      }
    }
    const responce = await theatreServices.updateTheatre(
      req.params.id,
      req.body,
    );
    successResponseBody.data = responce;
    successResponseBody.message = "Successfully updated the theatre";
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

const updateMovies = async (req, res) => {
  try {
    const user = await User.findById(req.user);
    if (!user) {
      errorResponseBody.err = "User not found";
      return res.status(STATUS.NOT_FOUND).json(errorResponseBody);
    }
    if (user.userRole === "CLIENT") {
      const theatre = await Theatre.findById(req.params.id);
      if (theatre && theatre.owner.toString() !== req.user) {
        errorResponseBody.err = "You are not authorized to update movies in this theatre";
        return res.status(STATUS.FORBIDDEN).json(errorResponseBody);
      }
    }
    const responce = await theatreServices.updateMoiviesInTheatres(
      req.params.id,
      req.body.movieIds,
      req.body.insert,
    );

    successResponseBody.data = responce;
    successResponseBody.message = "Successfully updated movies in the theatre";
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

const getMovies = async (req, res) => {
  try {
    const responce = await theatreServices.getMoviesInTheatre(req.params.id);
    successResponseBody.data = responce;
    successResponseBody.message =
      "Successfully featched the movies for th theatre";
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

const checkMovie = async (req, res) => {
  try {
    const responce = await theatreServices.checkMovieInTheatre(
      req.params.theatreId,
      req.params.movieId,
    );
    successResponseBody.data = responce;
    successResponseBody.message =
      "Successfully checked if movie present in the theatre";
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
module.exports = {
  createTheatre,
  getTheatre,
  getTheatres,
  destroy,
  update,
  updateMovies,
  getMovies,
  checkMovie,
};

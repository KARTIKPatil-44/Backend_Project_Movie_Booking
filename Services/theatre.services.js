const Theatre = require("../models/theatre.model");
const { STATUS } = require("../utils/constants");
const Movie = require("../models/movie.model");

/**
 * Create Theatre
 */
const createTheatre = async (data) => {
  try {
    const response = await Theatre.create(data);
    return response;
  } catch (error) {
    if (error.name === "ValidationError") {
      let err = {};
      Object.keys(error.errors).forEach((key) => {
        err[key] = error.errors[key].message;
      });
      return { err: err, code: STATUS.UNPROCESSABLE };
    } else {
      console.log(error); // FIXED (err -> error)
      throw error;
    }
  }
};

/**
 * Delete Theatre
 */
const deleteTheatre = async (id) => {
  try {
    const response = await Theatre.findByIdAndDelete(id);
    if (!response) {
      throw {
        err: "No record of a theatre found for the given id",
        code: STATUS.NOT_FOUND,
      };
    }
    return response;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

/**
 * Get Theatre
 */
const getTheatre = async (id) => {
  try {
    const response = await Theatre.findById(id);
    if (!response) {
      throw {
        err: "No theatre found for the given id",
        code: STATUS.NOT_FOUND,
      };
    }
    return response;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

/**
 * Get All Theatres
 */
const getAllTheatres = async (data) => {
  try {
    let query = {};
    let pagination = {};

    if (data && data.city) query.city = data.city;
    if (data && data.pincode) query.pincode = data.pincode;
    if (data && data.name) query.name = data.name;

    if (data && data.movieId) {
      query.movies = { $all: data.movieId };
    }

    if (data && data.limit) {
      pagination.limit = parseInt(data.limit);
    }

    if (data && data.skip) {
      let perPage = data.limit ? parseInt(data.limit) : 3;
      pagination.skip = parseInt(data.skip) * perPage;
    }

    const response = await Theatre.find(query, {}, pagination);
    return response;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

/**
 * Update Theatre (FIXED structure only)
 */
const updateTheatre = async (id, data) => {
  try {
    const response = await Theatre.findByIdAndUpdate(id, data, {
      new: true,
      runValidators: true,
    });

    if (!response) {
      throw {
        err: "No theatre found for the given id",
        code: STATUS.NOT_FOUND, // keeping your logic
      };
    }

    return response;
  } catch (error) {
    if (error.name === "ValidationError") {
      let err = {};
      Object.keys(error.errors).forEach((key) => {
        err[key] = error.errors[key].message;
      });
      throw { err: err, code: STATUS.UNPROCESSABLE };
    }

    throw error;
  }
};

/**
 * Update Movies in Theatre
 */
const updateMoiviesInTheatres = async (theatreId, movieIds, insert) => {
  try {
    let theater;

    if (insert) {
      theater = await Theatre.findByIdAndUpdate(
        { _id: theatreId },
        { $addToSet: { movies: { $each: movieIds } } },
        { new: true }
      );
    } else {
      theater = await Theatre.findByIdAndUpdate(
        { _id: theatreId },
        { $pull: { movies: { $in: movieIds } } },
        { new: true }
      );
    }

    return theater.populate("movies");
  } catch (error) {
    if (error.name === "TypeError") {
      return {
        code: 404,
        err: "No theatre found for the given id",
      };
    }
    console.log(error);
    throw error;
  }
};

/**
 * Get Movies in Theatre
 */
const getMoviesInTheatre = async (id) => {
  try {
    const theatre = await Theatre.findById(
      id,
      { name: 1, movies: 1, address: 1 }
    ).populate("movies");

    if (!theatre) {
      return {
        err: "No theatre with the give id found",
        code: 404,
      };
    }

    return theatre;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

/**
 * Check Movie in Theatre
 */
const checkMovieInTheatre = async (theatreId, movieId) => {
  try {
    const responce = await Theatre.findById(theatreId);

    if (!responce) {
      return {
        err: "No such theatre found for the given id",
        code: 404,
      };
    }

    return responce.movies.indexOf(movieId) != -1; // logic unchanged
  } catch (error) {
    console.log(error);
    throw error;
  }
};

module.exports = {
  createTheatre,
  getTheatre,
  deleteTheatre,
  getAllTheatres,
  updateTheatre,
  updateMoiviesInTheatres,
  getMoviesInTheatre,
  checkMovieInTheatre,
};
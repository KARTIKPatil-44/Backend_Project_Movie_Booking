const Movie = require("../models/movie.model");

/**
 *
 * @param  data -> object containing details of the new moivie to be created
 * @returns -> the new movie object created
 */
const createMovie = async (data) => {
  try {
    const movie = await Movie.create(data);
    return movie;
  } catch (error) {
    if (error.name === "ValidationError") {
      let err = {};
      Object.keys(error.errors).forEach((key) => {
        err[key] = error.errors[key].message;
      });
      console.log(err);
      return { err: err, code: 422 };
    } else {
      throw error;
    }
  }
};

/**
 *
 * @param  id -> id which will be used to identify the movie to be deleted
 * @returns -> object containing  details of the moive deleted
 */
const deleteMovie = async (id) => {
  try {
    const response = await Movie.findByIdAndDelete(id);
    if (!response) {
      return {
        err: "No moive record found for the id provided",
        code: 404,
      };
    }
    return response;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

/**
 *
 * @param  id -> id which will be used to identify the movie to be fetched
 * @returns -> object containing movie fetched
 */
const getMoiveById = async (id) => {
  const movie = await Movie.findById(id);
  console.log("moive found", movie);
  if (!movie) {
    return {
      err: "No moive found for the corresponding id provided",
      code: 404,
    };
  }
  return movie;
};

/**
 *
 * @param  id -> id which will be used to identify the movie to be updated
 * @param  data -> object that contains actual data which is to be updated in the db
 * @returns -> returs the new updated movie details
 */
const updateMoive = async (id, data) => {
  try {
    const moive = await Movie.findByIdAndUpdate(id, data, {
      new: true,
      runValidators: true,
    });
    return moive;
  } catch (error) {
    if (error.name === "ValidationError") {
      let err = {};
      Object.keys(error.errors).forEach((key) => {
        err[key] = error.errors[key].message;
      });
      console.log(err);
      return { err: err, code: 422 };
    } else {
      throw error;
    }
  }
};

/**
 *
 * @param  filter -> filter will help us in filtering out data based on the conditions
 * @returns -> returns an object containing all the movies fetched based on the filter
 */
const fetchMovies = async (filter) => {
  let query = {};
  if (filter.name) {
    query.name = filter.name;
  }
  let movies = await Movie.find(query);
  if (!movies || movies.length === 0) {
    return {
      err: "Not able to find the queries movies",
      code: 404,
    };
  }
  return movies;
};

module.exports = {
  getMoiveById,
  createMovie,
  deleteMovie,
  updateMoive,
  fetchMovies,
};

const Movie = require("../models/movie.model");

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
const deleteMovie = async (id) => {
  const response = await Movie.findByIdAndDelete(id);
  return response;
};

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

const fetchMovies = async (filter) => {
  let query = {};
   if(filter.name) {
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

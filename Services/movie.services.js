const Movie = require("../models/movie.model");

const createMovie = async (data) => {
  const movie = await Movie.create(data);
  return movie;
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

module.exports = {
  getMoiveById,
  createMovie,
  deleteMovie,
};

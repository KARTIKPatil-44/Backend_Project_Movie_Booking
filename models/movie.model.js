const mongoose = require("mongoose");

/**
 * Defines the Schema of the movie resource to be stored in db
 */

const movieSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      minLength: 2,
    },
    description: {
      type: String,
      required: true,
      minLength: 5,
    },
    casts: {
      type: [String],
      required: true,
    },
    trailerUrl: {
      type: String,
      required: true,
    },
    language: {
      type: String,
      required: true,
    },
    releaseDate: {
      type: String,
      required: true,
    },
    director: {
      type: String,
      required: true,
    },
    releaseStatus: {
      type: String,
      required: true,
      default: "RELEASED",
    },
  },
  { timestamps: true },
);
const Movie = mongoose.model("Movie", movieSchema);

module.exports = Movie;

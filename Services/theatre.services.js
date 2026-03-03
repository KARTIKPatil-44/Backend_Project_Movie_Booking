const Theatre = require("../models/theatre.model");
const Movie = require("../models/movie.model");

/**
 *
 * @param  data -> object containing details of the theatre to be created
 * @returns ->  object with the new theatre
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
      return { err: err, code: 422 };
    } else {
      console.log(err);
      throw error;
    }
  }
};

/**
 *
 * @param  id -> the unique id using which we can identify the theatre to be deleted
 * @returns -> rturns the deleted theatre
 */
const deleteTheatre = async (id) => {
  try {
    const response = await Theatre.findByIdAndDelete(id);
    if (!response) {
      return {
        err: "No record of a theatre found for the given id",
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
 * @param id  -> it is the unique _id based on which we will fetch a theater
 *
 */
const getTheatre = async (id) => {
  try {
    const response = await Theatre.findById(id);
    if (!response) {
      return {
        err: "No theatre found for the given id",
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
 * @param data -> the data to be used to filter out theatres based on city / pincode
 * @returns -> returns an object with the filtered content of theatres
 */
const getAllTheatres = async (data) => {
  try {
    let query = {};
    let pagination = {};

    if (data && data.city) {
      // this checks wheater city is present in query params or no
      query.city = data.city;
    }

    if (data && data.pincode) {
      // this checks wheater pincode is present in query params or no
      query.pincode = data.pincode;
    }

    if (data && data.name) {
      // this checks wheather name is present in query params or no
      query.name = data.name;
    }

    if (data && data.movieId) {
      // This checks whether movieId is present in query params.
      // If provided, it filters theatres that contain ALL the given movieIds
      // inside their 'movies' array field.
      query.movies = { $all: data.movieId };
    }

    if (data && data.limit) {
      pagination.limit = parseInt(data.limit);
    }

    if (data && data.skip) {
      // for first page we send skip as 0
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
 * @param id -> the unique id to identify the theatre to be updated
 * @param data -> data object to be used to update the theatre
 * @returns -> it returns the new updated theatre object
 */
const updateTheatre = async (id, data) => {
  try {
    const response = await Theatre.findByIdAndUpdate(id, data, {
      new: true,
      runValidators: true,
    });
    if (!response) {
      return {
        err: "No theatre found for the given id",
        code: 404,
      };
    }
    return response;
  } catch (error) {
    if (error.name === "ValidationError") {
      let err = {};
      Object.keys(error.errors).forEach((key) => {
        err[key] = error.errors[key].message;
      });
      return { err: err, code: 422 };
    }
    throw error;
  }
};

/**
 *
 * @param  theatreId -> unique id of the theatre for which we want to update movies
 * @param  movieIds -> array of movie ids that are expected to be updated in theatre
 * @param  insert -> boolean that tells wheather we want insert movies or remove them
 * @returns -> updated theatre object
 */
// const updateMoiviesInTheatres = async (theatreId, movieIds, insert) => {
//   const theatre = await Theatre.findById(theatreId);
//   if (!theatre) {
//     return {
//       err: "No such theatre found for the id provided",
//       code: 404,
//     };
//   }
//   if (insert) {
//     // we need to add movies
//     movieIds.forEach((movieId) => {
//       theatre.movies.push(movieId);
//     });
//   } else {
//     // we need to remove movies
//     let savedMovieIds = theatre.movies;
//     movieIds.forEach((movieId) => {
//       savedMovieIds = savedMovieIds.filter((smi) => (smi = movieId));
//     });
//     theatre.movies = savedMovieIds;
//   }
//   await theatre.save();
//   return theatre.populate("movies");
// };

const updateMoiviesInTheatres = async (theatreId, movieIds, insert) => {
  try {
    let theater;
    if (insert) {
      theater = await Theatre.findByIdAndUpdate(
        { _id: theatreId },
        { $addToSet: { movies: { $each: movieIds } } },
        { new: true },
      );
    } else {
      theater = await Theatre.findByIdAndUpdate(
        { _id: theatreId },
        { $pull: { movies: { $in: movieIds } } },
        { new: true },
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
    console.log("Error", error);
    throw error;
  }
};
  const  getMoviesInTheatre = async(id) =>{
    try{
      const theatre = await Theatre.findById(id, {name: 1, movies: 1, address: 1}).populate("movies");
      if(!theatre){
        return{
          err: "No theatre with the give id found",
          code: 404
        }
      }
      return theatre;
    }catch( error){
      console.log(error);
      throw error;
    }
  }

module.exports = {
  createTheatre,
  getTheatre,
  deleteTheatre,
  getAllTheatres,
  updateTheatre,
  updateMoiviesInTheatres,
  getMoviesInTheatre,
};

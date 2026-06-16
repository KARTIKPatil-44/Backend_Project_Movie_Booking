const movieServices = require("../Services/movie.services");
const {successResponseBody,errorResponseBody} = require("../utils/responseBody")
const {STATUS} = require("../utils/constants");

/**
 * 
 * Controller function to create a new movie
 * @returns  movie created
 */
const createMovie = async (req, res) => {
  try {
    const response = await movieServices.createMovie(req.body);
    successResponseBody.data = response;
    successResponseBody.message = "Successfully created the movie";
    
    return res.status(STATUS.OK).json(successResponseBody);
  } catch (error) {
     if(error.err){
      errorResponseBody.err = error.err;
      return res.status(error.code).json(errorResponseBody);
    }
    errorResponseBody.err = error;
    return res.status(STATUS.INTERNAL_SERVER_ERROR).json(errorResponseBody);
  }
};

/**
 * 
 * Controller function to delete an existing movie
 * @returns  deleted movie details
 */
const deleteMovie = async (req, res) => {
  try {
    const response = await movieServices.deleteMovie(req.params.id);
    successResponseBody.data = response;
    successResponseBody.message = "Successfully deleted the movie";
    return res.status(STATUS.OK).json(successResponseBody);

  } catch (error) {
     if(error.err){
      errorResponseBody.err = error.err;
      return res.status(error.code).json(errorResponseBody);
    }
    errorResponseBody.err = error;
    return res.status(STATUS.INTERNAL_SERVER_ERROR).json(errorResponseBody);
  }
};

/**
 * 
 * Controller function to fetch a movie by its ID
 * @returns  movie details
 */
const getMovie = async (req, res) => {
  try {
    const response = await movieServices.getMoiveById(req.params.id);
    successResponseBody.data = response;
    return res.status(STATUS.OK).json(successResponseBody);
  } catch (error) {
    if(error.err){
      errorResponseBody.err = error.err;
      return res.status(error.code).json(errorResponseBody);
    }
    errorResponseBody.err = error;
    return res.status(STATUS.INTERNAL_SERVER_ERROR).json(errorResponseBody);
  }
};

/**
 * 
 * Controller function to update an existing movie
 * @returns  updated movie details
 */
const updateMoive = async(req,res)=>{
  try{
    const  response = await movieServices.updateMoive(req.params.id, req.body);
    successResponseBody.data = response;
    return res.status(STATUS.OK).json(successResponseBody);
  }catch(error){
    if(error.err){
      errorResponseBody.err = error.err;
      return res.status(error.code).json(errorResponseBody);
    }
    errorResponseBody.err = error;
    return res.status(STATUS.INTERNAL_SERVER_ERROR).json(errorResponseBody);
  }
}

/**
 * 
 * Controller function to fetch all movies based on query parameters
 * @returns  list of movies
 */
const getMovies = async (req, res) => {
  try {
    const response = await movieServices.fetchMovies(req.query);

    successResponseBody.data = response;
    return res.status(STATUS.OK).json(successResponseBody);

  } catch (error) {
    if(error.err){
      errorResponseBody.err = error.err;
      return res.status(error.code).json(errorResponseBody);
    }
    errorResponseBody.data = err;
    return res.status(STATUS.INTERNAL_SERVER_ERROR).json(errorResponseBody);
  }
};


const Review = require("../models/review.model");
const User = require("../models/user.model");

const addReview = async (req, res) => {
  try {
    const user = await User.findById(req.user);
    if (!user) {
      errorResponseBody.err = "User not found";
      return res.status(STATUS.NOT_FOUND).json(errorResponseBody);
    }
    
    const { rating, text } = req.body;
    const movieId = req.params.id;
    
    const review = await Review.create({
      movieId,
      userId: req.user,
      userName: user.name || user.email.split('@')[0],
      rating: Number(rating),
      text,
    });
    
    successResponseBody.data = review;
    successResponseBody.message = "Successfully created the review";
    return res.status(STATUS.OK).json(successResponseBody);
  } catch (error) {
    errorResponseBody.err = error.message || error;
    return res.status(STATUS.INTERNAL_SERVER_ERROR).json(errorResponseBody);
  }
};

const getReviews = async (req, res) => {
  try {
    const movieId = req.params.id;
    const reviews = await Review.find({ movieId }).sort({ createdAt: -1 });
    
    successResponseBody.data = reviews;
    successResponseBody.message = "Successfully fetched the movie reviews";
    return res.status(STATUS.OK).json(successResponseBody);
  } catch (error) {
    errorResponseBody.err = error.message || error;
    return res.status(STATUS.INTERNAL_SERVER_ERROR).json(errorResponseBody);
  }
};

module.exports = {
  createMovie,
  deleteMovie,
  getMovie,
  updateMoive,
  getMovies,
  addReview,
  getReviews,
};

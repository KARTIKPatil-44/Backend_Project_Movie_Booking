const movieServices = require("../Services/movie.services");
const {successResponseBody,errorResponseBody} = require("../utils/responseBody")

/**
 * 
 * Controller function to create a new movie
 * @returns  movie created
 */
const createMovie = async (req, res) => {
  try {
    const response = await movieServices.createMovie(req.body);
    if(response.err){
      errorResponseBody.err = response.err;
      errorResponseBody.message = "Validation failed on few parameter of the request body"
      return res.status(response.code).json(errorResponseBody);
    }
    successResponseBody.data = response;
    successResponseBody.message = "Successfully created the movie";

    return res.status(201).json(successResponseBody);
  } catch (err) {
    console.log(err);
    return res.status(500).json(errorResponseBody);
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
    if(response.err){
      errorResponseBody.err = response.err;
      return res.status(response.code).json(errorResponseBody);
    }
    successResponseBody.data = response;
    successResponseBody.message = "Successfully deleted the movie";
    return res.status(201).json(successResponseBody);

  } catch (err) {
    console.log(err);
    return res.status(500).json(errorResponseBody);
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

/**
 * 
 * Controller function to update an existing movie
 * @returns  updated movie details
 */
const updateMoive = async(req,res)=>{
  try{
    const  response = await movieServices.updateMoive(req.params.id, req.body);

    if(response.err){
      errorResponseBody.err = response.err;
      errorResponseBody.message = "The update we are trying to apply dosen't validate the schema"
      return res.status(response.code).json(errorResponseBody)
    }
    successResponseBody.data = response;
    return res.status(200).json(successResponseBody);
  }catch(err){
    console.log(err);
    errorResponseBody.data = err;
    return res.status(500).json(errorResponseBody);
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

    if (response.err) {
      errorResponseBody.err = response.err;
      errorResponseBody.message = "The movie does not exist";
      return res.status(response.code).json(errorResponseBody);
    }

    successResponseBody.data = response;
    return res.status(200).json(successResponseBody);

  } catch (err) {
    console.log(err);
    errorResponseBody.data = err;
    return res.status(500).json(errorResponseBody);
  }
};


module.exports = {
  createMovie,
  deleteMovie,
  getMovie,
  updateMoive,
  getMovies,
};

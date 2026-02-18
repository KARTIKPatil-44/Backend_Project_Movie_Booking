const moiveServices = require("../Services/movie.services");
const {successResponseBody,errorResponseBody} = require("../utils/responseBody")

const createMovie = async (req, res) => {
  try {
    const response = await moiveServices.createMovie(req.body);
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

const updateMoive = async(req,res)=>{
  try{
    const  response = await moiveServices.updateMoive(req.params.id, req.body);

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

module.exports = {
  createMovie,
  deleteMovie,
  getMovie,
  updateMoive,
};

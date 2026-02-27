const theatreServices = require("../Services/theatre.services");
const {successResponseBody,errorResponseBody,} = require("../utils/responseBody");


/**
 *
 * Controller function to create a new theatre
 * @returns  created theatre details
 */
const createTheatre = async (req, res) => {
  try {
    const responce = await theatreServices.createTheatre(req.body);
    if (responce.err) {
      errorResponseBody.err = responce.err;
      errorResponseBody.message =
        "Validation failed on few parameters of the request body";
      return res.status(responce.code).json(errorResponseBody);
    }
    successResponseBody.data = responce;
    successResponseBody.message = "Successfully created the theatre";
    return res.status(201).json(successResponseBody);
  } catch (err) {
    errorResponseBody.err = err;
    return res.status(500).json(errorResponseBody);
  }
};

/**
 *
 * Controller function to delete a theatre by ID
 * @returns  deleted theatre details
 */
const destroy = async (req, res) => {
  try {
    const responce = await theatreServices.deleteTheatre(req.params.id);
    if (responce.err) {
      errorResponseBody.data = responce.err;
      return res.status(responce.code).json(errorResponseBody);
    }
    successResponseBody.data = responce;
    successResponseBody.message = "Successfully deleted the  given theatre";
    return res.status(201).json(successResponseBody);
  } catch (error) {
    errorResponseBody.err = error;
    return res.status(500).json(errorResponseBody);
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
    if (responce.err) {
      errorResponseBody.err = responce.err;
      return res.status(responce.code).json(errorResponseBody);
    }
    successResponseBody.data = responce;
    successResponseBody.message =
      "Successfullfy featched the data  of the theatre";
    return res.status(201).json(successResponseBody);
  } catch (error) {
    errorResponseBody.err = error;
    return res.status(500).json(errorResponseBody);
  }
};

/**
 *
 * Controller function to fetch all theatres
 * @returns  list of theatres
 */
const getTheatres = async (req, res) => {
  try {
    const responce = await theatreServices.getAllTheatres();
    successResponseBody.data = responce;
    successResponseBody.message = "Successfully featched all theatres";
    return res.status(201).json(successResponseBody);
  } catch (error) {
    errorResponseBody.err = error;
    return res.status(500).json(errorResponseBody);
  }
};

/**
 *
 * Controller function to update a theatre by ID
 * @returns updated theatre details
 */
const update = async (req, res) => {
  try {
    const responce = await theatreServices.updateTheatre(
      req.params.id,
      req.body,
    );

    if (responce.err) {
      errorResponseBody.err = responce.err;
      return res.status(responce.code).json(errorResponseBody);
    }

    successResponseBody.data = responce;
    successResponseBody.message = "Successfully updated the theatre";
    return res.status(200).json(successResponseBody);
  } catch (error) {
    errorResponseBody.err = error;
    return res.status(500).json(errorResponseBody);
  }
};

module.exports = {
  createTheatre,
  getTheatre,
  getTheatres,
  destroy,
  update,
};

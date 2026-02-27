const Theatre = require("../models/theatre.model");

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
const getAllTheatres = async () => {
  try {
    const response = await Theatre.find({});
    return response;
  } catch (error) {
    console.log(err);
    throw error;
  }
};

/**
 * @param id -> the unique id to identify the theatre to be updated
 * @param data -> data object to be used to update the theatre
 * @returns -> it returns the new updated theatre object
 */

module.exports = {
  createTheatre,
  getTheatre,
  deleteTheatre,
  getAllTheatres,
};

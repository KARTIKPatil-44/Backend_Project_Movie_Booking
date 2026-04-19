const Booking = require("../models/booking.model");
const { STATUS } = require("../utils/constants");

const createBooking = async (data) => {
  try {
    const responce = await Booking.create(data);
    return responce;
  } catch (error) {
    console.log(error);
    if (error.name == "ValidationError") {
      let err = {};
      Object.keys(error.errors).forEach((key) => {
        err[key] = error.errors[key].message;
      });
      throw { err: err, code: STATUS.UNPROCESSABLE };
    }
    throw error;
  }
};

const updateBooking = async (data, bookingId) => {
  try {
    const responce = await Booking.findByIdAndUpdate(bookingId, data, {
      new: true,
      runValidators: true,
    });
    if (!responce) {
      throw {
        err: "No booking found for the given id",
        code: STATUS.NOT_FOUND,
      };
    }
    return responce;
  } catch (error) {
    console.log(error);
    if (error.name == "ValidationError") {
      let err = {};
      Object.keys(error.errors).forEach((key) => {
        err[key] = error.errors[key].message;
      });
      throw { err: err, code: STATUS.UNPROCESSABLE };
    }
    throw error;
  }
};

module.exports = {
  createBooking,
  updateBooking,
};

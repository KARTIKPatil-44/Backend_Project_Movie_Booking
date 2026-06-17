const Booking = require("../models/booking.model");
const Show = require("../models/show.model");
const { STATUS } = require("../utils/constants");

const createBooking = async (data) => {
  try {
    const show = await Show.findOne({
      movieId: data.movieId,
      theatreId: data.theatreId,
      timing: data.timing,
    });
    data.totalCost = data.noOfSeats * show.price;
    const responce = await Booking.create(data);
    await show.save();
    return responce;
  } catch (error) {
    console.log(error);
    if (error.name == "ValidationError") {
      let errMessages = Object.keys(error.errors)
        .map((key) => error.errors[key].message)
        .join(" | ");
      throw { err: errMessages, code: STATUS.UNPROCESSABLE };
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
      let errMessages = Object.keys(error.errors)
        .map((key) => error.errors[key].message)
        .join(" | ");
      throw { err: errMessages, code: STATUS.UNPROCESSABLE };
    }
    throw error;
  }
};

const getBookings = async (data) => {
  try {
    const responce = await Booking.find({
      userId: data.userId,
    }).populate("movieId").populate("theatreId");
    return responce;
  } catch (error) {
    throw error;
  }
};

const getAllBookings = async () => {
  try {
    const responce = await Booking.find().populate("movieId").populate("theatreId");
    return responce;
  } catch (error) {
    throw error;
  }
};

const getBookingById = async (id, userId) => {
  try {
    const responce = await Booking.findById(id).populate("movieId").populate("theatreId");
    if (!responce) {
      throw {
        err: "No booking records found for the id",
        code: STATUS.NOT_FOUND,
      };
    }
    if (responce.userId != userId) {
      throw {
        err: "Not able to access the booking",
        code: STATUS.UNAUTHORISED,
      };
    }
    return responce;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

module.exports = {
  createBooking,
  updateBooking,
  getBookings,
  getAllBookings,
  getBookingById,
};

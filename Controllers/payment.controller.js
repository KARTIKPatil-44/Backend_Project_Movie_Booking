const paymentService = require("../Services/payment.service");
const { STATUS, BOOKING_STATUS } = require("../utils/constants");
const {
  errorResponseBody,
  successResponseBody,
} = require("../utils/responseBody");
const axios = require("axios");
const User = require("../models/user.model");
const Movie = require ("../models/movie.model");
const Theater = require ("../models/theatre.model");

const create = async (req, res) => {
  try {
    const responce = await paymentService.createPayment(req.body);
    if (responce.status == BOOKING_STATUS.EXPIRED) {
      errorResponseBody.err =
        "The payment took more than 5 minutes to get processed, hence you booking got expired, please try again";
      errorResponseBody.data = responce;
      return res.status(STATUS.GONE).json(errorResponseBody);
    }
    if (responce.status == BOOKING_STATUS.CANCELLED) {
      errorResponseBody.err =
        "The payment failed due to some reason, booking was not successfull, please try again";
      errorResponseBody.data = responce;
      return res.status(STATUS.PAYMENT_REQUIRED).json(errorResponseBody);
    }
    const user = await User.findById(responce.userId);
    const movie = await Movie.findById(responce.movieId);
    const theatre = await Theater.findById(responce.theatreId)
    successResponseBody.data = responce;
    successResponseBody.message = "Booking completed successfully";
    console.log(responce, process.env.NOTI_SERVICE);
    axios.post(process.env.NOTI_SERVICE + "/notiservice/api/v1/notifications", {
      subject: "Your booking is successfully",
      recepientEmails: [user.email],
      content: `Your booking for ${movie.name} in ${theatre.name} for ${responce.noOfSeats} seats on ${responce.timing} is successfull. Your booking id is ${responce.id}`,
    });
    return res.status(STATUS.OK).json(successResponseBody);
  } catch (error) {
    if (error.err) {
      errorResponseBody.err = error.err;
      return res.status(error.code).json(errorResponseBody);
    }
    errorResponseBody.err = error.err;
    return res.status(STATUS.INTERNAL_SERVER_ERROR).json(errorResponseBody);
  }
};

const getPaymentDetailsById = async (req, res) => {
  try {
    const responce = await paymentService.getPaymentById(req.params.id);
    successResponseBody.data = responce;
    successResponseBody.message =
      "Successfully fetched the booking and payment details";
    return res.status(STATUS.OK).json(successResponseBody);
  } catch (error) {
    if (error.err) {
      errorResponseBody.err = error.err;
      return res.status(error.code).json(errorResponseBody);
    }
    errorResponseBody.err = error.err;
    return res.status(STATUS.INTERNAL_SERVER_ERROR).json(errorResponseBody);
  }
};

const getAllPayments = async (req, res) => {
  try {
    const response = await paymentService.getAllPayments(req.user);
    // console.log(response);
    successResponseBody.data = response;
    successResponseBody.message = "Successfully fetched all the payments";
    return res.status(STATUS.OK).json(successResponseBody);
  } catch (error) {
    errorResponseBody.err = error;
    return res.status(STATUS.INTERNAL_SERVER_ERROR).json(errorResponseBody);
  }
};
module.exports = {
  create,
  getPaymentDetailsById,
  getAllPayments,
};

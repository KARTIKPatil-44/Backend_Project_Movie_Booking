const paymentService = require("../Services/payment.service");
const { STATUS, BOOKING_STATUS } = require("../utils/constants");
const {
  errorResponseBody,
  successResponseBody,
} = require("../utils/responseBody");

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
        "he payment failed due to some reason, booking was not successfull, please try again";
      errorResponseBody.data = responce;
      return res.status(STATUS.PAYMENT_REQUIRED).json(errorResponseBody);
    }
    successResponseBody.data = responce;
    successResponseBody.message = "Booking completed successfully";
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
    successResponseBody.message = "Successfully fetched the booking and payment details";
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

module.exports = {
  create,
  getPaymentDetailsById
};

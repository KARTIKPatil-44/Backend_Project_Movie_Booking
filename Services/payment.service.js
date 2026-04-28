const Payment = require("../models/payment.model");
const Booking = require("../models/booking.model");
const {
  STATUS,
  PAYMENT_STATUS,
  BOOKING_STATUS,
} = require("../utils/constants");

const createPayment = async (data) => {
  try {
    const booking = await Booking.findById(data.bookingId);
    if (!booking) {
      throw {
        err: "No booking found",
        code: STATUS.NOT_FOUND,
      };
    }
    let bookingTime = booking.createdAt;
    let currentTime = Date.now();

    // calculate how many minutes are remaning
    let minutes = Math.floor((currentTime - bookingTime) / 1000 / 60);
    if (minutes > 5) {
      booking.status = BOOKING_STATUS.EXPIRED;
      await booking.save();
      return booking;
    }

    const payment = await Payment.create({
      bookingId: data.bookingId,
      amount: data.amount,
    });
    if (payment.amount != booking.totalCost) {
      payment.status = PAYMENT_STATUS.failed;
    }

    if (!payment ||  payment.status == PAYMENT_STATUS.failed) {
      booking.status = BOOKING_STATUS.CANCELLED;
      await booking.save();
      await payment.save();
      return booking;
    }
    payment.status = PAYMENT_STATUS.success;
    booking.status = BOOKING_STATUS.SUCCESSFUL;
    await booking.save();
    await payment.save();
    return booking;
  } catch (error) {
    throw error;
  }
};

module.exports = {
  createPayment,
};

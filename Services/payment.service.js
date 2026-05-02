const Payment = require("../models/payment.model");
const Booking = require("../models/booking.model");
const Show = require ("../models/show.model");
const User = require("../models/user.model");
const {
  STATUS,
  PAYMENT_STATUS,
  BOOKING_STATUS,
  USER_ROLE,
} = require("../utils/constants");

const createPayment = async (data) => {
  try {
    const booking = await Booking.findById(data.bookingId);
    const show = await Show.findOne({
      movieId: booking.movieId,
      theatreId: booking.theatreId,
      timing: booking.timing
    });
    if (booking.status == BOOKING_STATUS.SUCCESSFUL) {
      throw {
        err: "Booking already done, cannot make a new payment against it",
        code: STATUS.FORBIDDEN,
      };
    }
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
      booking: data.bookingId,
      amount: data.amount,
    });
    if (payment.amount != booking.totalCost) {
      payment.status = PAYMENT_STATUS.failed;
    }

    if (!payment || payment.status == PAYMENT_STATUS.failed) {
      booking.status = BOOKING_STATUS.CANCELLED;
      await booking.save();
      await payment.save();
      return booking;
    }
    payment.status = PAYMENT_STATUS.success;
    booking.status = BOOKING_STATUS.SUCCESSFUL;
    show.noOfSeats -= booking.noOfSeats;
    await show.save();
    await booking.save();
    await payment.save();
    return booking;
  } catch (error) {
    throw error;
  }
};

const getPaymentById = async (id) => {
  try {
    const responce = await Payment.findById(id).populate("booking");
    if (!responce) {
      throw {
        err: "No payment record found",
        code: STATUS.NOT_FOUND,
      };
    }
    return responce;
  } catch (error) {
    throw error;
  }
};

const getAllPayments = async (userId) => {
    try {
        const user = await User.findById(userId);
        let filter = {};
        if(user.userRole != USER_ROLE.admin) {
            filter.userId = user.id;
        }
    
        const bookings = await Booking.find(filter, 'id');

        const payments = await Payment.find({booking: {$in: bookings}});
        console.log(payments);
        return payments;
    } catch (error) {
        throw error;
    }
}
module.exports = {
  createPayment,
  getPaymentById,
  getAllPayments,
};

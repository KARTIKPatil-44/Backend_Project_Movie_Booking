const mongoose = require("mongoose");
const {BOOKING_STATUS} = require("../utils/constants")

const bookingSchema = new mongoose.Schema({
    theatreId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "Theatre"
    },
    movieId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "Movie"
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "User"
    },
    timing: {
        type: String,
        required: true
    },
    noOfSeats: {
        type: Number,
        required: true
    },
    seats: {
        type: [String],
        default: []
    },
    totalCost: {
        type: Number,
        required: true
        
    },
    status:{
        type: String,
        required: true,
        enum:{
            values: [BOOKING_STATUS.PROCESSING, BOOKING_STATUS.CANCELLED, BOOKING_STATUS.SUCCESSFUL, BOOKING_STATUS.EXPIRED],
            message: "Invalid booking status"
        },
        default: BOOKING_STATUS.PROCESSING
    }
}, {timestamps: true});

const Booking =  mongoose.model("Booking", bookingSchema);

module.exports = Booking;
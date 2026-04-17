const bookingController = require("../Controllers/booking.controller");
const authMiddleware = require('../Middlewares/auth.middlewares');
const bookingMiddlware = require("../Middlewares/booking.middleware");

const routes = (app)=>{

    app.post(
        "/mba/api/v1/bookings",
        authMiddleware.isAuthenticated,
        bookingMiddlware.validateBookingCreateRequest,
        bookingController.create

    )
}

module.exports = routes;
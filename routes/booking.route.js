const bookingController = require("../Controllers/booking.controller");
const authMiddleware = require('../Middlewares/auth.middlewares');
const bookingMiddlware = require("../Middlewares/booking.middleware");

const routes = (app)=>{

    app.post(
        "/mba/api/v1/bookings",
        authMiddleware.isAuthenticated,
        bookingMiddlware.validateBookingCreateRequest,
        bookingController.create

    );

    app.patch(
        "/mba/api/v1/bookings/:id",
        authMiddleware.isAuthenticated,
        bookingMiddlware.canChangeStatus,
        bookingController.update
    );

    app.get(
        "/mba/api/v1/bookings",
        authMiddleware.isAuthenticated,
        bookingController.getBookings
    );

    app.get(
        "/mba/api/v1/bookings/all",
        authMiddleware.isAuthenticated,
        authMiddleware.isAdmin,
        bookingController.getAllBookings
    );

    app.get(
        "/mba/api/v1/bookings/:id",
        authMiddleware.isAuthenticated,
        bookingController.getBookingById
    );
}

module.exports = routes;
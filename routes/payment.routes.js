const paymentController = require("../Controllers/payment.controller");
const authMiddleware = require("../Middlewares/auth.middlewares");
const paymentMiddleware = require("../Middlewares/payment.middleware");


const routes = (app) => {

    app.post(
        "/mba/api/v1/payments",
        authMiddleware.isAuthenticated,
        paymentMiddleware.verifyPaymentCreateRequest,
        paymentController.create
    )

    app.get(
        "/mba/api/v1/payments/:id",
        authMiddleware.isAuthenticated,
        paymentController.getPaymentDetailsById

    )

    app.get(
        "/mba/api/v1/payments",
        authMiddleware.isAuthenticated,
        paymentController.getAllPayments
    )
};

module.exports = routes;

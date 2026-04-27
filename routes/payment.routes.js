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
};

module.exports = routes;

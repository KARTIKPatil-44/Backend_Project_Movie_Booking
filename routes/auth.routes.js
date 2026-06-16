const authController = require('../Controllers/auth.controller');
const authMiddleware = require("../Middlewares/auth.middlewares");

const routes = (app) =>{

    app.post(
        "/mba/api/v1/auth/signup", 
        authMiddleware.validateSignUpRequest,
        authController.signUp
    );

    app.post("/mba/api/v1/auth/signin",
        authMiddleware.validateSignInRequest,
        authController.signin
    );

    app.patch(
        "/mba/api/v1/auth/reset",
        authMiddleware.isAuthenticated,
        authMiddleware.validateResetPasswordRequest,
        authController.resetPassword
    );

    app.post(
        "/mba/api/v1/auth/forgot",
        authController.forgotPassword
    );

    app.post(
        "/mba/api/v1/auth/reset-password",
        authController.resetForgotPassword
    );

    app.post(
        "/mba/api/v1/auth/social",
        authController.socialSignIn
    );
}

module.exports = routes;
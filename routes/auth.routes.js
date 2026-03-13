const authController = require('../Controllers/auth.controller');
const authMiddleware = require("../Middlewares/auth.middlewares");

const routes = (app) =>{

    app.post(
        "/mba/api/v1/auth/signup", 
        authMiddleware.validateSignUpRequest,
        authController.signUp
    );
}

module.exports = routes;
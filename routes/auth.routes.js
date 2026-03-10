const authController = require('../Controllers/auth.controller');

const routes = (app) =>{

    app.post(
        "/mba/api/v1/auth/signup",authController.signUp
    );
}

module.exports = routes;
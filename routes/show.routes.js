const showController = require("../Controllers/show.controller");
const authMiddleware = require("../Middlewares/auth.middlewares");
const showMiddleware = require("../Middlewares/show.middleware");

const routes = (app) =>{
    app.post(
        "/mba/api/v1/shows",
        authMiddleware.isAuthenticated,
        authMiddleware.isAdminOrClient,
        showController.create
    );
}

module.exports = routes;
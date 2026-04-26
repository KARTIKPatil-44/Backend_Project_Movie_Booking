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

    app.get(
        "/mba/api/v1/shows",
        showController.getShows
    );

    app.delete(
        "/mba/api/v1/shows/:id",
        authMiddleware.isAuthenticated,
        authMiddleware.isAdminOrClient,
        showController.destroy
    );

    app.patch(
        "/mba/api/v1/shows/:id",
        authMiddleware.isAuthenticated,
        authMiddleware.isAdminOrClient,
        showMiddleware.validateShowUpdateRequest,
        showController.update
    )
}

module.exports = routes;
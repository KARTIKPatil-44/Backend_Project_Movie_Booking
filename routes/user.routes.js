const userController = require("../Controllers/user.controller");
const userMiddlewares = require("../Middlewares/user.middlewares");
const authMiddlewares = require("../Middlewares/auth.middlewares");
const route = (app) =>{
    app.patch(
        '/mba/api/v1/user/:id',
        authMiddlewares.isAuthenticated,
        userMiddlewares.validateUpdateUserRequest,
        authMiddlewares.isAdmin,
        userController.update
    )
}

module.exports = route;
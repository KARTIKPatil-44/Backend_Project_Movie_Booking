const userController = require("../Controllers/user.controller");
const userMiddlewares = require("../Middlewares/user.middlewares");
const route = (app) =>{
    app.patch(
        '/mba/api/v1/user/:id',
        userMiddlewares.validateUpdateUserRequest,
        userController.update
    )
}

module.exports = route;
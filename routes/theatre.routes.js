const theatreController = require("../Controllers/theatre.controller");
const theatreMiddlewares = require("../Middlewares/theatre.middleware");

// POST REQUEST
const routes = (app) => {
  app.post(
    "/mba/api/v1/theatres",
    theatreMiddlewares.validateTheatreCreateRequest,
    theatreController.createTheatre,
  );
};

module.exports = routes;

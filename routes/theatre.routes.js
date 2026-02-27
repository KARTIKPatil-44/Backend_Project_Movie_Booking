const theatreController = require("../Controllers/theatre.controller");
const theatreMiddlewares = require("../Middlewares/theatre.middleware");

const routes = (app) => {
  // routes fucntion takes express app object as parameter

  // CREATE
  app.post(
    "/mba/api/v1/theatres",theatreMiddlewares.validateTheatreCreateRequest,theatreController.createTheatre,
  );

  // DELETE
  app.delete("/mba/api/v1/theatres/:id", theatreController.destroy);

  // READ
  app.get("/mba/api/v1/theatres/:id", theatreController.getTheatre);

  // READ
  app.get("/mba/api/v1/theatres", theatreController.getTheatres);

  // UPDATE

  // UPDATE
};

module.exports = routes;

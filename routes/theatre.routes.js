const theatreController = require("../Controllers/theatre.controller");
const theatreMiddlewares = require("../Middlewares/theatre.middleware");

const routes = (app) => {
  // POST REQUEST
  app.post(
    "/mba/api/v1/theatres",
    theatreMiddlewares.validateTheatreCreateRequest,
    theatreController.createTheatre,
  );

  // DELETE REQUEST
  app.delete("/mba/api/v1/theatres/:id", theatreController.destroy);

  // GET FETCH REQUEST
  app.get("/mba/api/v1/theatres/:id", theatreController.getTheatre);

  //GET  FETCH REQUEST ALL THEATRES
  app.get("/mba/api/v1/theatres", theatreController.getTheatres);
};

module.exports = routes;

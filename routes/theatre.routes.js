const theatreController = require("../Controllers/theatre.controller");
const theatreMiddlewares = require("../Middlewares/theatre.middleware");


const routes = (app) => {
  // POST REQUEST
  app.post(
    "/mba/api/v1/theatres",
    theatreMiddlewares.validateTheatreCreateRequest,
    theatreController.createTheatre,
  );

  // GET FETCH REQUEST
  app.get(
    "/mba/api/v1/theatres/:id",
    theatreController.getTheatre
  );

};



module.exports = routes;

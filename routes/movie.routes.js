const movieController = require("../Controllers/movie.controller");

const routes = (app) => {
  // POST REQUEST
  app.post("/mba/api/v1/movies", movieController.createMovie);

  // DELETE REQUEST
  app.delete("/mba/api/v1/movies/:id", movieController.deleteMovie);

  // GET REQUEST
  app.get("/mba/api/v1/movies/:id", movieController.getMovie);
};
module.exports = routes;

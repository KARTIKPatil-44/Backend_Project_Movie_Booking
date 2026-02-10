const MovieController = require("../Controllers/movie.controller");
const routes = (app) => {
  // POST REQUEST
  app.post("/mba/api/v1/movies", MovieController.createMovie);

  // DELETE REQUEST
  app.delete("/mba/api/v1/movies/:movieId", MovieController.deleteMovie);
};
module.exports = routes;

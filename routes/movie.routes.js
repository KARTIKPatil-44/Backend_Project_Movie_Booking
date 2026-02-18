const movieController = require("../Controllers/movie.controller");
const movieMiddlewares = require("../Middlewares/movie.middlewares");
const routes = (app) => {
  // POST REQUEST
  app.post(
    "/mba/api/v1/movies",
    movieMiddlewares.validateMovieCreateRequest,
    movieController.createMovie,
  );

  // DELETE REQUEST
  app.delete("/mba/api/v1/movies/:id", movieController.deleteMovie);

  // GET REQUEST
  app.get("/mba/api/v1/movies/:id", movieController.getMovie);

  // PUT REQUEST
  app.put("/mba/api/v1/movies/:id", movieController.updateMoive);

  // PATCH REQUEST
  app.patch("/mba/api/v1/movies/:id", movieController.updateMoive);
};
module.exports = routes;

const movieController = require("../Controllers/movie.controller");
const movieMiddlewares = require("../Middlewares/movie.middlewares");

const routes = (app) => {
  // routes fucntion takes express app object as parameter

  // CREATE
  app.post(
    "/mba/api/v1/movies",movieMiddlewares.validateMovieCreateRequest, movieController.createMovie,
  );

  // DELETE
  app.delete("/mba/api/v1/movies/:id", movieController.deleteMovie);

  // READ
  app.get("/mba/api/v1/movies/:id", movieController.getMovie);

  // READ
  app.put("/mba/api/v1/movies/:id", movieController.updateMoive);

  // UPDATE
  app.patch("/mba/api/v1/movies/:id", movieController.updateMoive);

  // UPDATE
  app.get("/mba/api/v1/movies", movieController.getMovies);
};
module.exports = routes;

const movieController = require("../Controllers/movie.controller");
const movieMiddlewares = require("../Middlewares/movie.middlewares");
const authMiddlewares = require("../Middlewares/auth.middlewares");

const routes = (app) => {
  // routes fucntion takes express app object as parameter

  // CREATE
  app.post(
    "/mba/api/v1/movies",
    authMiddlewares.isAuthenticated,
    authMiddlewares.isAdmin,
    movieMiddlewares.validateMovieCreateRequest,
    movieController.createMovie,
  );

  // DELETE
  app.delete(
    "/mba/api/v1/movies/:id",
    authMiddlewares.isAuthenticated,
    authMiddlewares.isAdmin,
     movieController.deleteMovie);

  // READ
  app.get(
    "/mba/api/v1/movies/:id",
    movieController.getMovie
  );

  // READ
  app.put(
    "/mba/api/v1/movies/:id",
    authMiddlewares.isAuthenticated,
    authMiddlewares.isAdmin,
    movieController.updateMoive
    );

  // UPDATE
  app.patch(
    "/mba/api/v1/movies/:id",
    authMiddlewares.isAuthenticated,
    authMiddlewares.isAdmin,
    movieController.updateMoive
    );

  // UPDATE
  app.get(
    "/mba/api/v1/movies",
    movieController.getMovies
    );

  // REVIEWS
  app.post(
    "/mba/api/v1/movies/:id/reviews",
    authMiddlewares.isAuthenticated,
    movieController.addReview
  );

  app.get(
    "/mba/api/v1/movies/:id/reviews",
    movieController.getReviews
  );
};
module.exports = routes;

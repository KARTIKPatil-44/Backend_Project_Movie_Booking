const MovieController = require("../Controllers/movie.controller");
const routes = (app) => {
  app.post("/mba/api/v1/movies", MovieController.createMovie);
};
module.exports = routes;

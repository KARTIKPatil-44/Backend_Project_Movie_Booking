const theatreController = require('../Controllers/theatre.controller');

  // POST REQUEST
const routes = (app) =>{
    app.post('/mba/api/v1/theatres', theatreController.createTheatre)
}

module.exports = routes;
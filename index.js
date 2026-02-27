const express = require("express");
require("dotenv").config({ quiet: true });
const mongoose = require("mongoose");

const MovieRoutes = require("./routes/movie.routes");
const TheatreRoutes = require("./routes/theatre.routes");

const app = express();

// body parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

MovieRoutes(app);
TheatreRoutes(app);

const startServer = async () => {
  try {
    await mongoose.connect(process.env.DB_URL);
    console.log("Successfully connected to mongodb");

    app.listen(process.env.PORT, () => {
      console.log(`Server started on Port ${process.env.PORT}`);
    });
  } catch (err) {
    console.log("Not able to connect to mongodb", err);
  }
};

startServer();

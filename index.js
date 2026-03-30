const express = require("express");
require("dotenv").config({ quiet: true });
const mongoose = require("mongoose");

const MovieRoutes = require("./routes/movie.routes");
const TheatreRoutes = require("./routes/theatre.routes");
const AuthRoutes = require("./routes/auth.routes");
const userRoutes = require("./routes/user.routes");

const app = express();

// configuring  body parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

MovieRoutes(app); // invoking movie routes
TheatreRoutes(app); // invoking theatre routes
AuthRoutes(app); // invoking auth routes
userRoutes(app); // invoking user routes

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

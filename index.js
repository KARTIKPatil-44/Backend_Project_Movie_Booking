const express = require("express");
const bodyParser = require("body-parser");
const env = require("dotenv");
const mongoose = require("mongoose");

const MovieRoutes = require("./routes/movie.routes");

env.config();
const app = express(); // express app object

// configuring body parser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

MovieRoutes(app); // invoking

app.get("/home", (req, res) => {
  console.log("hitting the home");
  return res.json({ success: true });
});

app.listen(process.env.PORT, async () => {
  // this callback gets executed, once we successfully start the server on the given
  console.log(`Server started on Port ${process.env.PORT}`);

  try {
    await mongoose.connect(process.env.DB_URL); // connected to the mongo server
    console.log("Successfully connected to mongodb");
    // await Movie.create({
    //   name: "Interstaller",
    //   description: "Science Friction",
    //   casts: [
    //     "Matthew McConaughey",
    //     "Jessica Chastain",
    //     "Anne Hathaway",
    //     "Timothée Chalamet",
    //   ],
    //   director: "Cristopher Nolen",
    //   trailerUrl: "https://youtu.be/zSWdZVtXT7E?si=r5P2fHwHJJ2tjYvF",
    //   language: "English",
    //   releaseDate: "18-03-2014",
    //   releaseStatus: "RELEASED",
    // });
  } catch (err) {
    console.log("Not able to connect to mongodb", err);
  }
});

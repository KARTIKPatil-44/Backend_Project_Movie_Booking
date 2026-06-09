const express = require("express");
require("dotenv").config({ quiet: true });
const mongoose = require("mongoose");

const MovieRoutes = require("./routes/movie.routes");
const TheatreRoutes = require("./routes/theatre.routes");
const AuthRoutes = require("./routes/auth.routes");
const userRoutes = require("./routes/user.routes");
const BookingRouts = require("./routes/booking.route");
const ShowRoutes = require("./routes/show.routes");
const PaymentRoutes = require("./routes/payment.routes");

const app = express();

// configuring  body parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

mongoose.set('debug', true);

MovieRoutes(app);
TheatreRoutes(app);
AuthRoutes(app);
userRoutes(app);
BookingRouts(app);
ShowRoutes(app);
PaymentRoutes(app);


const startServer = async () => {
  try {
    if (process.env.NODE_ENV === "production") {
      await mongoose.connect(process.env.PROD_DB_URL);
    } else {
      await mongoose.connect(process.env.DB_URL);
    }

    console.log("Successfully connected to MongoDB");

    app.listen(process.env.PORT, () => {
      console.log(`Server started on Port ${process.env.PORT}!!`);
    });

  } catch (err) {
    console.error("Not able to connect MongoDB:", err);
  }
};

startServer();
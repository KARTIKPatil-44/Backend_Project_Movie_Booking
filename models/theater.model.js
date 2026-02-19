const mongoose = require("mongoose");

/**
 * Defines the Schema of the Theater resource to be stored in db
 */

const theaterSchema = mongoose.Schema(
  {
    name: {
      type: String,
      require: true,
    },
    description: String,

    city: {
      type: String,
      require: true,
    },

    pincode: {
      type: String,
      require: true,
    },

    address: String,
  },
  { timestamps: true },
);

const Theater = mongoose.model("Theater", theaterSchema);

module.exports = Theater;

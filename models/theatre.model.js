const mongoose = require("mongoose");

/**
 * Defines the Schema of the Theatre resource to be stored in db.
 */

const theatreSchema = mongoose.Schema(
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

const Theatre = mongoose.model("Theater", theatreSchema);

module.exports = Theatre;

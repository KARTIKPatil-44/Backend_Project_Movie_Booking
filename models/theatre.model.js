const mongoose = require("mongoose");

/**
 * Defines the Schema of the Theatre resource to be stored in db.
 */

const theatreSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      minLength: 5,
    },
    description: String,

    city: {
      type: String,
      required: true,
    },

    pincode: {
      type: String,
      required: true,
    },

    address: String,
    movies: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: "Movie"
    }
  },
  { timestamps: true },
);

const Theatre = mongoose.model("Theater", theatreSchema);

module.exports = Theatre;

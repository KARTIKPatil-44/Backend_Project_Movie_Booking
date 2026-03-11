const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      match: [
        /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
        "Please fill a valid email address",
      ],
      lowercase: true,
      trim: true,
    },

    password: {
      type: String,
      required: true,
      minlength: 6,
    },

    userRole: {
      type: String,
      default: "CUSTOMER",
    },

    userStatus: {
      type: String,
      default: "APPROVED",
    },
  },
  { timestamps: true },
);
userSchema.pre("save", async function (/**next */) {
  // a trigger to encrypt the plain password befor saving the user
  console.log(this);
  const hash = await bcrypt.hash(this.password, 10);
  console.log(hash);
  this.password = hash;
  console.log(this);
  //next()
});

const User = mongoose.model("User", userSchema);
module.exports = User;

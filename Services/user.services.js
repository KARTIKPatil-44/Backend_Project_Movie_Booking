const User = require("../models/user.model");

const createUser = async (data) => {
  try {
    const responce = await User.create(data);
    return responce;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

module.exports = {
    createUser,
};

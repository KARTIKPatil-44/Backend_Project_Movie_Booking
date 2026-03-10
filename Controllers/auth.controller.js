const userService = require("../Services/user.services");
const {errorResponseBody,successResponseBody,} = require("../utils/responseBody");

const signUp = async (req, res) => {
  try {
    const responce = await userService.createUser(req.body);
    successResponseBody.data = responce;
    successResponseBody.message = "Successfully registered user";
    return res.status(201).json(successResponseBody);
  } catch (error) {
    errorResponseBody.err = error;
    return res.status(500).json(errorResponseBody);
  }
};
module.exports = {
  signUp,
};

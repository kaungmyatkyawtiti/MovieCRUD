const userService = require('../services/userService.js');
const { config } = require('../config/secrets.js');
const jwt = require('jsonwebtoken');
const bcrypt = require("bcrypt");
const { handleAsync } = require("./movieController.js");

function signJwtToken(user) {
  const payload = { id: user._id };
  const token = jwt.sign(payload, config.TOKEN_SECRET);
  // const token = jwt.sign(payload, config.TOKEN_SECRET, { expiresIn: '1h' });
  return token;
}

const registerUser = handleAsync(async (req, res, next) => {
  const username = req.body['username'];
  const password = req.body['password'];

  const existingUser = await userService.findUserByUsername(username);
  if (existingUser) {
    return res.status(409).send({ error: "User already existed" });
  }

  const user = await userService.createUser(username, password);

  const token = signJwtToken(user);
  res.status(200).send({ token });
})

const loginUser = handleAsync(async (req, res, next) => {
  const username = req.body['username'];
  const password = req.body['password'];

  const user = await userService.findUserByUsername(username);

  // If user exists, compare the provided password with the hashed password in the DB
  const isValid =
    user && await bcrypt.compare(password, user.password);

  // If no user is found or password doesn't match, throw an error
  if (!isValid) {
    return res.status(401).send({ error: "Invalid username or password" });
  }

  const token = signJwtToken(user);
  res.status(200).send({ token });
})

const getUserById = handleAsync(async (req, res, next) => {
  const { id: userId } = req.params;
  const user = await userService.getUserById(userId);

  if (!user) {
    return res.status(404).send({ error: "user not found" });
  }
  res.status(200).json({ message: "success", data: user });
})

module.exports = {
  registerUser,
  loginUser,
  getUserById,
}

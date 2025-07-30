const bcrypt = require("bcrypt");
const Users = require("../models/User.js");

const createUser = async (username, password) => {
  // Hash password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  // Create new user
  const user = new Users({
    username,
    password: hashedPassword,
  });

  return user.save();
};

const findUserByUsername = async (username) => {
  // Find the user by username in the database
  const user = await Users.findOne({ username });

  return user;
};

const getUserById = async (userId) => {
  const user = await Users.findById(userId).select('-password'); // exclude password
  return user;
};

module.exports = {
  createUser,
  findUserByUsername,
  getUserById,
}

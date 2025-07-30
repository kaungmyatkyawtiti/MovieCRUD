const {
  MONGODB_URL,
  DB_USERNAME,
  DB_PASSWORD,
} = require("./env.js");

const { log, logError } = require("../utils/logger.js");

const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect(MONGODB_URL, {
      auth: {
        username: DB_USERNAME,
        password: DB_PASSWORD,
      },
      authSource: "admin",
    });
    log("connected to MnogoDB");
  } catch (error) {
    logError("Error connecting to MnogoDB:", error);
  }
}

module.exports = connectDB;

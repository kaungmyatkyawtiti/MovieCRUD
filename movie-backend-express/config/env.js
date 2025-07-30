require("dotenv").config();

module.exports = {
  MONGODB_URL: process.env.MONGODB_URL,
  DB_USERNAME: process.env.DB_USERNAME,
  DB_PASSWORD: process.env.DB_PASSWORD,
  TOKEN_SECRET: process.env.TOKEN_SECRET,
  PORT: process.env.PORT || 3000,
  LOG_ENABLED: process.env.LOG_ENABLED,
};

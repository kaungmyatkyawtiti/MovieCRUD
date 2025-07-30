const {
  LOG_ENABLED,
} = require('../config/env.js');

const isLog = LOG_ENABLED === "true";

function log(...args) {
  if (isLog) {
    console.log(...args);
  }
}

function logError(...args) {
  if (isLog) {
    console.error(...args);
  }
}

module.exports = {
  log,
  logError,
};

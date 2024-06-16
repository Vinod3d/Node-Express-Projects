const mongoose = require("mongoose");
const debug = require("debug")("development:mongoose");



const connectDB = (url) => {
  return mongoose
    .connect(url)
    .then(() => debug("CONNECTED TO THE DB..."))
    .catch((err) => debug(err));
};

module.exports = connectDB;

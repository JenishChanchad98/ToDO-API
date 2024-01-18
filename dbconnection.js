const mongoose = require("mongoose");
require("dotenv").config();

exports.connect = () => {
  return mongoose
    .connect(process.env.MONGO_URI)
    .then(() => {
      console.log("Successfully connected to database.");
    })
    .catch((error) => {
      console.log("Database connection failed. exiting now...");
      console.error(error);
      process.exit(1);
    });
};

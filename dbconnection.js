const mongoose = require("mongoose");
require("dotenv").config();
const { MONGO_URI } = process.env;
// mongoose.set("debug", true);

exports.connect = () => {
  // Connecting to the database
  return mongoose
    .connect(MONGO_URI, {
      //   useNewUrlParser: true,
      //   useUnifiedTopology: true,
    })
    .then(() => {
      console.log("Successfully connected to database.");
    })
    .catch((error) => {
      console.log("Database connection failed. exiting now...");
      console.error(error);
      process.exit(1);
    });
};

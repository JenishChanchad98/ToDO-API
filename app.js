const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const path = require("path");

require("dotenv").config();
const port = process.env.API_PORT || 3031;

// Database file include.
require("./dbconnection")
  .connect()
  .then(async (data) => {
    app.use(express.json());
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));

    app.use(require("./routes/"));
    app.use("/uploads", express.static(path.join(__dirname, "uploads")));

    app.use(function (err, req, res, next) {
      return res
        .status(err.status || 500)
        .send({ message: err.message, stack: err.stack });
    });
  })
  .catch((err) => {
    console.log(err, "Error");
  });

// Create server and port number defined.
app.listen(port, () => console.log(`Server app listening on port: ${port}`));

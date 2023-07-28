const express = require("express");
const app = express();
const bodyParser = require("body-parser");

require("dotenv").config();
const port = process.env.API_PORT || 3031;

// Database file include.
require("./dbconnection")
  .connect()
  .then(async (data) => {
    app.use(express.json());
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));

    // Route file include.
    app.use(require("./routes/"));
  })
  .catch((err) => {
    console.log(err, "Error");
  });

// Create server and port number defined.
app.listen(port, () => console.log(`Server app listening on port: ${port}`));

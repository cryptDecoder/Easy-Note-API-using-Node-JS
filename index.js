/**
 * ###########################################################################################################
 * Title: Easy Notes
 * Author: Pruthviraj
 * Description: This is a simple REST API build for manage notes using node js express js and mongodb
 * Requirements:
 *  * installed required following packages
 *  1. Express
 *  2. MongoDB
 *  3. Nodemon
 *  4. body-parser
 * ###########################################################################################################
 */
//
//  Setting the server
// Import required packages here

const express = require("express");
const bodyParser = require("body-parser");
const PORT = process.env.PORT || 8080;

// create express app
const app = express();

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// parse application/json
app.use(bodyParser.json());

// Configuring the database
const dbConfig = require("./config/database.config.js");
const mongoose = require("mongoose");
const { prependListener } = require("./model/note.model.js");

mongoose.Promise = global.Promise;

// Connecting to the database
mongoose
  .connect(dbConfig.url, {
    useNewUrlParser: true,
  })
  .then(() => {
    console.log("---------------------------------------");
    console.log("Successfully connected to the database");
  })
  .catch((err) => {
    console.log("---------------------------------------");
    console.log("Could not connect to the database. Exiting now...", err);
    process.exit();
  });

// define a simple route
app.get("/", (req, res) => {
  res.json({
    message:
      "Welcome to EasyNotes application. Take notes quickly. Organize and keep track of all your notes.",
  });
});

require("./app/note.route")(app);

// listen for requests
app.listen(PORT, () => {
  console.log("---------------------------------------");
  console.log("Server is listening on port " + PORT);
});

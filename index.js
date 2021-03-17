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

// config database
const dbConfig = require("./config/database.config");
const mongoose = require("mongodb");

mongoose.Promise = global.Promise;

const PORT = process.env.PORT || 8080;

// create and express app
const app = express();

// parse request of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// parse request of content-type - application/json

app.use(bodyParser.json());

// create express router
const router = express.Router();

// for testing define the simple router here

router.get("/", (request, response) => {
  response.status(200).json({
    message: "Welcome to Easy Notes Application",
  });
});

// Connecting to the Database

mongoose
  .connect(dbConfig.url, {
    useNewUrlParser: true,
  })
  .then(() => {
    console.log("***********************************************");
    console.log("Successfully connected to the Database");
    console.log("***********************************************");
  })
  .catch((err) => {
    console.error("Not able to connect due to following error");
    console.error(err);
    process.exit();
  });

// Register our router
app.use("/api", router);

// Start the Server
app.listen(PORT, () => {
  console.log("***********************************************");
  console.log("Yesss!!! Server is started on port " + PORT);
  console.log("***********************************************");
});

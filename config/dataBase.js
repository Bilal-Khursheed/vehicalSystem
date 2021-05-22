  
const mongoose = require("mongoose");

const URI =
  "mongodb://localhost:27017/?readPreference=primary&appname=MongoDB%20Compass&ssl=false";

const connectDB = async () => {
  mongoose
    .connect(URI, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
      useFindAndModify: false,
    })
    .then(() => {
      console.log("Successfully connected to the database");
    })
    .catch((err) => {
      console.log("Could not connect to the database. Exiting now...", err);
      process.exit();
    });
};

module.exports = connectDB;
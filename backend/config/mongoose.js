// Importing the mongoose library for MongoDB object modeling.
const { url } = require("inspector");
const mongoose = require("mongoose");

// Retrieving the MongoDB connection URL from the environment variables.
let URL = process.env.MONGO_URL;

// Defining an asynchronous function named connectDb.
const ConnectingDB = async () => {
  try {
    // Attempting to connect to the MongoDB database using the provided URL.
    const connection = await mongoose.connect(URL);

    // If the connection is successful, log a success message.
    console.log(URL)
    console.log(" 😇CONNECT WITH THE  DATABASE 😇");
  } catch (error) {
    // If there is an error connecting to the database, log an error message and exit the process.
    
    console.log("OPPS! ERROR WITH CONNECTION IN DATABASE ", error);
    process.exit();
  }
};

// Exporting the connectDb function to make it available for use in other parts of the code.
module.exports = ConnectingDB;

// Importing the mongoose library for MongoDB object modeling.
const mongoose = require("mongoose");

// Destructuring the 'Schema' object from the mongoose library for easier usage.
const { Schema } = mongoose;

// Defining reusable schema options for required string fields and required number fields.
const reqNumber = { type: Number, default: 0 };
const reqString = { type: String, required: true, unique: true };
// Defining a new mongoose schema for the User model.
const UserSchema = new Schema({
  // Defining a field named 'username' with the 'reqString' options.
  // This field is required, must be of type String, and must be unique.
  username: reqString,

  // Defining a field named 'matchesWon' with the 'reqNumber' options.
  // This field is optional and defaults to 0 if not provided.
  matchesWon: reqNumber,
});
// Exporting a mongoose model named "User" based on the UserSchema.
// The third parameter "users" specifies the collection name in the MongoDB database.
module.exports = mongoose.model("User", UserSchema, "users");

const mongoose = require("mongoose");

const PeopleSchema = new mongoose.Schema({
  name: String,
  job: String,
  age: Number,
  hobby: String,
});

module.exports = mongoose.model("People", PeopleSchema);

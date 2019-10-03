const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// this will be our data base's data structure 
const DataSchema = new Schema({
  is_internal: Number,
  type: String,
  status: String,
  balance: Number,
  category: String
});

module.exports = mongoose.model("data", DataSchema, "data");
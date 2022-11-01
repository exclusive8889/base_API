const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const course = new Schema({
  name: String,
},{ versionKey: false });

module.exports = mongoose.model("course", course);

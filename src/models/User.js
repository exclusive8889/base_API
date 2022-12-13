const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const customer = new Schema({
  username:String,
  password:String,
  email:String,
  phoneNumber:String,
  gender:String,
  dateOfBirth:Date,
},{ versionKey: false });

module.exports = mongoose.model("course", customer);

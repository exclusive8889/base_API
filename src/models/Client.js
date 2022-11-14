const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const customer = new Schema({
  name:String,
  age:String,
  address:String,
  gender:String,
  numberOfPhoto:Number,
  id_doc:String
},{ versionKey: false });

module.exports = mongoose.model("customer", customer);
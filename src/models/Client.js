const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const customer = new Schema({
  name:String,
  age:Number,
  address:String,
  gender:String,
  dataImage:Array,
  description:String,
  id_doc:String
},{ versionKey: false });

module.exports = mongoose.model("customer", customer);
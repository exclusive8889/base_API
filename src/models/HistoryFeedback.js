const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const historyFb = new Schema(
  {
    id_client: String,
    name: String,
    address: String,
    gender: String,
    description: String,
    id_doc: String,
  },
  { versionKey: false, timestamps: true }
);

module.exports = mongoose.model("historyFb", historyFb);

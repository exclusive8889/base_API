const mongoose = require("mongoose");

async function connect() {
  try {
    await mongoose.connect("mongodb://localhost/test_db_nodejs");
    console.log("Connect success");
  } catch (err) {
    console.log("Can not connect database");
  }
}
module.exports = { connect };

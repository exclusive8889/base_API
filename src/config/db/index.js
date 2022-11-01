const mongoose = require("mongoose");

async function connect() {
  try {
    await mongoose.connect("mongodb://localhost/test_db_nodejs");
    console.log("connect success");
  } catch (err) {
    console.log("connect faile");
  }
}
module.exports = { connect };

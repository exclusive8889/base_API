const express = require("express");
const app = express();

const db = require("./config/db");
const route = require("./routes");
const port = 3000;

const bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({
  extended: true
}))
app.use(bodyParser.json())

// app.use(morgan('combined'));
db.connect();
route(app);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
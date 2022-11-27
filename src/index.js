const express = require("express");
const app = express();
const cors = require('cors')

const db = require("./config/db");
const route = require("./routes");
const bodyParser = require("body-parser");
const port = 3334;


app.use(cors())
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use(bodyParser.json());

// app.use(morgan('combined'));
db.connect();
route(app);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

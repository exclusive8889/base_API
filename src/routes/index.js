const users = require("./user");
const client = require("./client");
const image = require("./image")

function route(app) {
  app.use("/user", users);
  app.use("/client", client);
  app.use("/image",image)
}

module.exports = route;

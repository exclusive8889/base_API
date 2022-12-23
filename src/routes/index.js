const users = require("./user");
const client = require("./client");
const image = require("./image")
const hisFb = require("./historyFb");

function route(app) {
  app.use("/user", users);
  app.use("/client", client);
  app.use("/image",image)
  app.use("/historyFb",hisFb)
}

module.exports = route;

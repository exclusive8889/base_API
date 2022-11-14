const users = require("./user");
const client = require("./client");

function route(app) {
  app.use("/user", users);
  app.use("/client", client);
}

module.exports = route;

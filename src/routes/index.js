const users = require("./user");

function route(app) {
  app.use("/user", users);
}

module.exports = route;

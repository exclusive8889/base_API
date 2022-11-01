const express = require("express");
const Course = require("../models/User");

const user = express.Router();


user.get("/", (req, res) => {
  Course.find({})
    .then((course) => res.json(course))
    .catch(next);
});

module.exports = user;

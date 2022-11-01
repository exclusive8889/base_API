const express = require("express");
const Course = require("../models/User");
const user = express.Router();

user.get("/", (req, res, next) => {
  Course.find({})
    .then((course) => res.json(course))
    .catch(next);
});

user.post("/add", (req, res, next) => {
  const course = new Course(req.body);
  course.save(function (err) {
    if (!err) console.log("Success!");
  });
});

user.get("/:id/edit", (req, res, next) => {
  Course.findById(req.params.id)
    .then((course) => res.json(course))
    .catch(next);
});

user.put("/:id", (req, res, next) => {
  Course.updateOne({_id:req.params.id},req.body)
  .then((course) => res.json("sc"))
  .catch(next);
});

user.delete("/:id", (req, res, next) => {
  Course.deleteOne({_id:req.params.id})
  .then((course) => res.json("sc"))
  .catch(next);
});

module.exports = user;

const express = require("express");
const Course = require("../models/User");
const user = express.Router();
const jwt = require("jsonwebtoken");

user.get("/", authUser, (req, res, next) => {
  Course.find({})
    .then((course) => res.json(course))
    .catch(next);
});

user.post("/auth/login", (req, res, next) => {
  Course.findOne({
    username: req.body.username,
    password: req.body.password,
  })
    .then((data) => {
      if (data) {
        const accessToken = jwt.sign({ atk: data._id }, "tdtung", {
          expiresIn: 60 * 60 * 24,
        });
        return res.json({
          data: {
            user: data,
            accessToken: accessToken,
            status: 200,
          },
        });
      } else {
        return res.json("Username or passwword invalid");
      }
    })
    .catch(() => res.json(req.body));
});

user.post("/add", (req, res, next) => {
  const course = new Course(req.body);
  course.save(function (err) {
    if (!err) {
      return res.json({ status: 200 });
    }
  });
});

user.get("/:id/edit", authUser, (req, res, next) => {
  Course.findById(req.params.id)
    .then((course) => res.json(course))
    .catch(next);
});

user.put("/:id", authUser, (req, res, next) => {
  Course.updateOne({ _id: req.params.id }, req.body)
    .then((course) => res.json("sc"))
    .catch(next);
});

user.delete("/:id", authUser, (req, res, next) => {
  Course.deleteOne({ _id: req.params.id })
    .then((course) => res.json("sc"))
    .catch(next);
});

function authUser(req, res, next) {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const idUser = jwt.verify(token, "tdtung");
    Course.findOne({
      _id: idUser.atk,
    })
      .then((data) => {
        if (data) {
          next();
        } else {
          res.json({ status: 401 });
        }
      })
      .catch({ status: 403, mes: "khong co data" });
  } catch {
    res.json({ status: 500, mes: "token not validity" });
  }
}

module.exports = user;

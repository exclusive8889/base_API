const express = require("express");
const historyFbTable = require("../models/HistoryFeedBack");
const Customer = require("../models/Client");

const historyFb = express.Router();
const Course = require("../models/User");
const jwt = require("jsonwebtoken");

historyFb.post("/add", authUser, (req, res, next) => {
  const hisFb = new historyFbTable(req.body);
  hisFb.save(function (err, response) {
    if (!err) {
      return res.json(response);
    }
  });
});

historyFb.get("/limit", authUser, (req, res, next) => {
    historyFbTable.find({})
    .sort({ createdAt: -1 })
    .limit(5)
    .then((Customer) => res.json(Customer))
    .catch(next);
});

function getIddoc(req, res, next) {
  const token = req.headers.authorization.split(" ")[1];
  const idUser = jwt.verify(token, "tdtung");
  return idUser.atk;
}

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
      .catch({ status: 403, mes: "Bad request" });
  } catch {
    res.status(401).json({ status: 401, mes: "Token invalid" });
  }
}
module.exports = historyFb;

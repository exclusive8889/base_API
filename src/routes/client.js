const express = require("express");

const Course = require("../models/User");
const Customer = require("../models/Client");

const client = express.Router();
const jwt = require("jsonwebtoken");

const moment = require("moment");

client.get("/", authUser, (req, res, next) => {
  Customer.find({ id_doc: getIddoc(req, res, next) })
    .then((Customer) => res.json(Customer))
    .catch(next);
});

// sort createAt
client.get("/limit", authUser, (req, res, next) => {
  Customer.find({ id_doc: getIddoc(req, res, next) })
    .sort({ createdAt: -1 })
    .limit(5)
    .then((Customer) => res.json(Customer))
    .catch(next);
});

// thong ke user
client.get("/total", authUser, (req, res, next) => {
  Customer.find({ id_doc: getIddoc(req, res, next) })
    .count()
    .then((Customer) => res.json(Customer))
    .catch(next);
});

client.post("/countclient/day", (req, res, next) => {
  Customer.find({
    createdAt: {
      $gte: moment(req.body.date).startOf("day"),
      $lte: moment(req.body.date).endOf("day"),
    },
  })
    .then((count) =>
      res.json({
        type: moment(req.body.date).format("DD"),
        number: count.length,
      })
    )
    .catch();
});
// get one Client
client.get("/:id", authUser, (req, res, next) => {
  Customer.findById({ id_doc: getIddoc(req, res, next), _id: req.params.id })
    .then((Customer) => res.json(Customer))
    .catch(next);
});

client.post("/add", authUser, (req, res, next) => {
  const client = new Customer(
    req.body,
    (req.body.id_doc = getIddoc(req, res, next))
  );
  client.save(function (err, response) {
    if (!err) {
      return res.json(response);
    }
  });
});

client.delete("/delete/:id", authUser, (req, res, next) => {
  Customer.deleteOne({ id_doc: getIddoc(req, res, next), _id: req.params.id })
    .then((course) => {
      res.json("sc");
    })
    .catch(next);
});

client.patch("/:id/edit", authUser, (req, res, next) => {
  // console.log(req.body)
  Customer.updateOne(
    { _id: getIddoc(req, res, next), _id: req.params.id },
    req.body
  )
    .then((course) => res.json("status:200"))
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
module.exports = client;

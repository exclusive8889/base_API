const express = require("express");

const Course = require("../models/User");
const Customer = require("../models/Client");

const client = express.Router();
const jwt = require("jsonwebtoken");

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

// thong ke
client.get("/count", authUser, (req, res, next) => {
  Customer.find({ id_doc: getIddoc(req, res, next) })
    .count()
    .then((Customer) => res.json(Customer))
    .catch(next);
});

client.get("/sum", authUser, (req, res, next) => {
  Customer.aggregate({ id_doc: getIddoc(req, res, next) })
    .then((Customer) => res.json(Customer))
    .catch(next);
});
// get one Client
client.get("/:id", authUser, (req, res, next) => {
  Customer.findById({ id_doc: getIddoc(req, res, next), _id: req.params.id })
    .then((Customer) => res.json(Customer))
    .catch(next);
});

// query
// client.get("/query/:id", authUser, (req, res, next) => {
//   Customer.findById({ id_doc: getIddoc(req, res, next), _id: req.params.id })
//     .then((Customer) => res.json(Customer))
//     .catch(next);
// });

client.post("/add", authUser, (req, res, next) => {
  const client = new Customer(
    req.body,
    (req.body.id_doc = getIddoc(req, res, next))
  );
  client.save(function (err) {
    if (!err) {
      return res.json({ status: 200 });
    }
  });
});

client.delete("/delete/:id", authUser, (req, res, next) => {
  Customer.deleteOne({ id_doc: getIddoc(req, res, next), _id: req.params.id })
    .then((course) => res.json("sc"))
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

const express = require("express");
const Customer = require("../models/Client");
const client = express.Router();

client.get("/", (req, res, next) => {
    Customer.find({}) 
    .then((Customer) => res.json(Customer))
    .catch(next);
//   return res.json({status:200})
});

module.exports = client;
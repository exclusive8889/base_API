const express = require("express");
const image = express.Router();

const ImageTable = require("../models/Image");
const Customer = require("../models/Client");

const jwt = require("jsonwebtoken");

image.get("/", authUser, (req, res, next) => {
  ImageTable.find({})
    .then((course) => res.json(course))
    .catch(next);
});

image.post("/", (req, res, next) => {
  ImageTable.insertMany(req.body)
    .then(function (response) {
      const listIdImg=response.map(item=>item._id)
      // console.log(listIdImg)
      return res.json(listIdImg);
      // return res.json(response); // Success
    })
    .catch(function (error) {
      return res.json(error); // Failure
    });
});

// image.post("/", (req, res, next) => {
//   const img = new ImageTable(
//     req.body
//     // (req.body.id_doc = getIddoc(req, res, next))
//   );
//   const image = img.save(function (err,result) {
//     if (err) {
//       return res.json({ status: 400 });
//     }
//     else{
//       return res.json(result);
//   }
//   });
// });

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
module.exports = image;

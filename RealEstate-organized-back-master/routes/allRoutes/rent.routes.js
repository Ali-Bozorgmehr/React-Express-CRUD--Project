const db = require("../../models/index");
const House = db.rents;
const express = require("express");
const router = express.Router();

// Retrieve all Houses
router.get("/", (req, res) => {
  const owner = req.query.owner;
  var condition = owner
    ? { owner: { $regex: new RegExp(owner), $options: "i" } }
    : {};

  House.find(condition)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving houses.",
      });
    });
});

// Retrieve a single House with id
router.get("/:id", (req, res) => {
  const id = req.params.id;

  House.findById(id)
    .then((data) => {
      if (!data)
        res.status(404).send({ message: "Not found House with id " + id });
      else res.send(data);
    })
    .catch((err) => {
      res.status(500).send({ message: "Error retrieving House with id=" + id });
    });
});

module.exports = router;

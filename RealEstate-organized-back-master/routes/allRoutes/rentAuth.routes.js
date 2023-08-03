const db = require("../../models/index");
const House = db.rents;
const express = require("express");
const router = express.Router();
const multer = require("multer");
const fs = require("fs");
const auth = require("../../middlewares/auth");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/uploads");
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});
const upload = multer({ storage: storage });

router.post("/", auth, upload.array("imgCollection"), async (req, res) => {
  const reqFiles = [];
  for (let i = 0; i < req.files.length; i++) {
    let imgObj = {};
    (imgObj["data"] = fs.readFileSync(
      "public/uploads/" + req.files[i].filename
    )),
      (imgObj["contentType"] = req.files[i].mimetype);
    reqFiles.push(imgObj);
  }

  const house = new House({
    owner: req.body.owner,
    address: req.body.address,
    rented: req.body.rented,
    type: req.body.type,
    noBedrooms: req.body.noBedrooms,
    area: req.body.area,
    availFrom: req.body.availFrom,
    suitableFor: req.body.suitableFor,
    parking: req.body.parking,
    petFriendly: req.body.petFriendly,
    price: req.body.price,
    costs: req.body.costs,
    description: req.body.description,
    imgCollection: reqFiles,
  });
  house
    .save()
    .then((data) => {
      res.send(data);
      console.log("saved successfully");
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while creating the House.",
      });
      console.log(err, "saving failed");
    });
});

// Retrieve all Houses
router.get("/", auth, (req, res) => {
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

// Retrieve all rented houses
router.get("/rented", auth, (req, res) => {
  House.find({ rented: true })
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
router.get("/:id", auth, (req, res) => {
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

// Update a House with id
router.put("/:id", auth, (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: "Data to update can not be empty!",
    });
  }

  const id = req.params.id;

  House.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `Cannot update House with id=${id}. Maybe House was not found!`,
        });
      } else res.send({ message: "House was updated successfully." });
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error updating House with id=" + id,
      });
    });
});

// Delete a House with id
router.delete("/:id", auth, (req, res) => {
  const id = req.params.id;

  House.findByIdAndRemove(id)
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `Cannot delete House with id=${id}. Maybe House was not found!`,
        });
      } else {
        res.send({
          message: "House was deleted successfully!",
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Could not delete House with id=" + id,
      });
    });
});

// Delete all Houses
router.delete("/", auth, (req, res) => {
  House.deleteMany({})
    .then((data) => {
      res.send({
        message: `${data.deletedCount} Houses were deleted successfully!`,
      });
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all houses.",
      });
    });
});

module.exports = router;

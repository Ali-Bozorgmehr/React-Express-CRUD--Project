const db = require("../../models/index");
const Request = db.requests;
const express = require("express");
const router = express.Router();

router.post("/request", async (req, res, next) => {
  const request = new Request({
    name: req.body.name,
    email: req.body.email,
    phone: req.body.phone,
    subject: req.body.subject,
    type: req.body.type,
    noPeople: req.body.noPeople,
    area: req.body.area,
    noRooms: req.body.noRooms,
    contract: req.body.contract,
    income: req.body.income,
    availDate: req.body.availDate,
    message: req.body.message,
    description: req.body.description,
  });
  request
    .save()
    .then((data) => {
      res.send(data);
      console.log("request sent successfully");
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while sending the Request.",
      });
      console.log(err, "sending failed");
    });
});

module.exports = router;

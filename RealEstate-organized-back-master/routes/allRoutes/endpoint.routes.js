const express = require("express");
const router = express.Router();
const auth = require("../../middlewares/auth");

// authentication endpoint
router.get("/auth/dashboard", auth, (req, res) => {
  res.json({ message: "Welcome to the Admin dashboard!" });
});

module.exports = router;

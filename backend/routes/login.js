const express = require("express");
const router = express.Router();
const User = require("../models/userModel");
const bcrypt = require("bcrypt");
const passport = require("passport");
const jwt = require("jsonwebtoken");

router.post("/", (req, res, next) => {
  passport.authenticate("local", (err, user, info) => {
    if (err) {
      return res
        .status(500)
        .json({ error: "An error occurred during authentication." });
    }

    if (!user) {
      return res.status(400).json({ error: info.message });
    }

    req.login(user, (err) => {
      if (err) {
        return res.status(500).json({ error: "Failed to log in user." });
      }

      const token = jwt.sign({ userId: user.id }, "Mehir123", {
        expiresIn: "24h",
      });
      return res.json({ token, user });
    });
  })(req, res, next);
});
module.exports = router;

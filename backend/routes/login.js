const express = require("express");
const router = express.Router();
const User = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

router.post("/", async (req, res) => {
  const { email, password } = req.body;
  try {
    if(!email || !password) {
      return res.status(400).json({ error: "All fields required" });
    }
    const user = await User.findOne({ email: email });
    if (!user) {
      return res.status(400).json({ error: "User not found" });
    }
    //compare password
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      return res.status(400).json({ error: "Incorrect password" });
    }
    const token = jwt.sign({ userId: user.id }, "Mehir123", {
      expiresIn: "24h",
    });
    return res.json({ token: token, user: user });
  } catch (err) {
    res.status(500).json({ error: "Something went wrong", err: err });
  }
});

module.exports = router;



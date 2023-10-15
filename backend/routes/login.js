const express = require("express");
const router = express.Router();
const User = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

router.post("/", async (req, res) => {
  const { email, password } = req.body;
  try {
    if (!email || !password) {
      return res.status(400).json({ error: "All fields required" });
    }

    const user = await User.findOne({ email: email });
    if (!user) {
      return res.status(400).json({ error: "Incorrect credentials" });
    }

    //compare password
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      return res.status(400).json({ error: "Incorrect credentials" });
    }

    const token = jwt.sign({ userId: user.id, email: user.email }, "Mehir123", {
      expiresIn: "24h",
    });

    const userObj = {
      username: user.username,
      email: user.email,
      points: user.points,
      completedHacks: user.completedHacks,
      token: token,
    };

    return res.json({ user: userObj });
  } catch (err) {
    res.status(500).json({ error: "Something went wrong", err: err });
  }
});

module.exports = router;

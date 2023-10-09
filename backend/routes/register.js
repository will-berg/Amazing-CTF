const express = require("express");
const router = express.Router();
const User = require("../models/userModel");
const bcrypt = require("bcrypt");

router.post("/", async (req, res) => {
  const { email, name, password } = req.body;
  console.log(email, name, password);

  if (!email || !password) {
    return res
      .status(400)
      .send({ message: "Username and password are required" });
  }
  try {
    const accountEmailExists = await User.findOne({ email: email });
    const accountNameExists = await User.findOne({ name: name });
    if (accountEmailExists || accountNameExists) {
      return res.status(400).send({ message: "Account already exists" });
    }

    const passHash = bcrypt.hashSync(password, bcrypt.genSaltSync(10));
    const newUser = new User({
      email: email,
      name: name,
      password: passHash,
      completedHacks: [],
      points: 0,
    });

    const user = await newUser.save();
    res.status(200).send(user);
  } catch (err) {
    console.log("error in catch")
    res.status(500).send({ message: "Server error", details: err.message });
    console.log(err);
  }
});

/* router.get("/", async (req, res) => {
  try {
    const users = await User.find();
    if (!users) throw Error("No users exist");
    res.json(users);
  } catch (err) {
    console.log(err);
  }
}); */

module.exports = router;

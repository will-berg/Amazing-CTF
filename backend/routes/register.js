const express = require("express");
const router = express.Router();
const User = require("../models/userModel");
const bcrypt = require("bcrypt");

router.post("/", async (req, res) => {
  const { email, name, password, repeatPassword } = req.body;
  console.log(email, name, password, repeatPassword);

  if (!email || !password || !name || !repeatPassword) {
    console.log("All fields required")
    return res
      .status(400)
      .send({ message: "All fields are required" });
  }

  if(password !== repeatPassword) {
    console.log("passwords do not match")
    return res
      .status(400)
      .send({ message: "Passwords do not match" });
  }

  if(password.length < 6) {
    console.log("password must be at least 6 characters")
    return res
      .status(400)
      .send({ message: "Password must be at least 6 characters" });
  }

  try {
    const accountEmailExists = await User.findOne({ email: email });
    const accountNameExists = await User.findOne({ name: name });
    console.log("email and name exists value: " + accountEmailExists, accountNameExists)
    if (accountEmailExists || accountNameExists) {
        console.log("account already exists")
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

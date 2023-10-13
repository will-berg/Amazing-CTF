const express = require("express");
const router = express.Router();
const User = require("../models/userModel");
const bcrypt = require("bcrypt");

router.post("/", async (req, res) => {
  const { email, username, password, repeatPassword } = req.body;
  console.log(email, username, password, repeatPassword);

  if (!email || !password || !username || !repeatPassword) {
    console.log("All fields required")
    return res
      .status(400)
      .send({ message: "All fields are required" });
  }

  //check if email is correct format
  const emailRegex = /\S+@\S+\.\S+/;
  if(!emailRegex.test(email)) {
    console.log("email is not valid")
    return res
      .status(400)
      .send({ message: "Please enter email in a valid format" });
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
    const accountNameExists = await User.findOne({ username: username });
    console.log("email and name exists value: " + accountEmailExists, accountNameExists)
    if (accountEmailExists || accountNameExists) {
        console.log("account already exists")
      return res.status(400).send({ message: "Account already exists" });
    }

    const passHash = bcrypt.hashSync(password, bcrypt.genSaltSync(10));
    const newUser = new User({
      email: email,
      username: username,
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

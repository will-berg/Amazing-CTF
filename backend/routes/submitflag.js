const express = require("express");
const router = express.Router();
const userModel = require("../models/userModel");
const validateUser = require("../middlewares/validateUser");

const points = [
  {
    hackName: "xss-easy",
    points: 5,
    flag: "4a!7Yz",
  },
  {
    hackName: "xss-medium",
    points: 10,
    flag: "R@3t^p",
  },
  {
    hackName: "xss-hard",
    points: 20,
    flag: "o7*Hj4",
  },
];

router.post("/", validateUser, async (req, res) => {
  console.log("in submit flag");
  console.log(req.user);
  console.log("submitted hack:", req.body.hackName);
  const hackExists = points.some((hack) => hack.hackName === req.body.hackName);
  console.log("hack exists: " + hackExists)
  if (!hackExists) {
    return res.status(400).json({ message: "No such flag exists!" });
  }
  try {
    const user = await userModel.findOne({ email: req.user.email });
    console.log("full user:" + user);
    console.log("current points: ", user.points)
    const pointsEarned = points.filter(
      (point) => point.hackName === req.body.hackName
    )[0];
    console.log("points earned: " + pointsEarned);
    console.log("Hack: " + pointsEarned.hackName);
    console.log("Earned Points: " + pointsEarned.points);

    if (user.completedHacks.includes(pointsEarned.hackName)) {
      console.log("already solved");
      return res
        .status(400)
        .json({ message: "You have already solved this hack!" });
    }
    
    user.points += pointsEarned.points;
    user.completedHacks.push(pointsEarned.hackName);
    const updated = await userModel.updateOne({email: req.user.email}, {$set:{points: user.points, completedHacks: user.completedHacks}})
    console.log(updated);
    //await user.save();
    //const updatedUser = await userModel.findOne({ email: req.user.email });
    //console.log(updatedUser);
    res
      .status(200)
      .json({ message: "flag has been submitted", newPoints: pointsEarned.points });
  } catch (err) {
    console.log("error in catch");
    res.status(500).send({ message: "Server error", details: err.message });
    console.log(err);
  }
});

module.exports = router;

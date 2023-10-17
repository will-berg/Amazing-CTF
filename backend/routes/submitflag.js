const express = require("express");
const router = express.Router();
const userModel = require("../models/userModel");
const validateUser = require("../middlewares/validateUser");

const points = [
  {
    hackName: "xss-easy",
    points: 3,
  },
  {
    hackName: "xss-medium",
    points: 10,
  },
  {
    hackName: "password",
    points: 8,
  },
  {
    hackName: "redos",
    points: 20,
  },
  {
    hackName: "hidden",
    points: 5,
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
      return res.json({ message: "You have already solved this hack, so no points for you!" });
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
      .json({ message: `Good job! You have completed the ${pointsEarned.hackName} and earned ${pointsEarned.points} points!`, newPoints: pointsEarned.points });
  } catch (err) {
    console.log("error in catch");
    res.status(500).send({ message: "Server error", details: err.message });
    console.log(err);
  }
});

module.exports = router;

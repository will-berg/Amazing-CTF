const express = require("express");
const router = express.Router();
const userModel = require("../models/userModel");
const validateUser = require("../middlewares/validateUser");
const Challenge = require("../models/challengeModel");

router.post("/", validateUser, async (req, res) => {
  try {
    const hack = await Challenge.findOne({ title: req.body.hackName });
    if (!hack) {
      return res.status(400).json({ message: "No such flag exists!" });
    }

    const user = await userModel.findOne({ email: req.user.email });

    if (user.completedHacks.includes(hack.title)) {
      return res.status(400).json({
        message: "You have already solved this hack, so no points for you!",
      });
    }

    user.points += hack.points;
    user.completedHacks.push(hack.title);
    const updated = await userModel.updateOne(
      { email: req.user.email },
      { $set: { points: user.points, completedHacks: user.completedHacks } }
    );
    res.status(200).json({
      message: `Good job! You have completed the ${hack.title} and earned ${hack.points} points!`,
      newPoints: hack.points,
    });
  } catch (err) {
    res.status(500).send({ message: "Server error", details: err.message });
    console.log(err);
  }
});

module.exports = router;

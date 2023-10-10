const express = require("express");
const path = require("path");
const Challenge = require("../models/challengeModel");

const router = express.Router();
const filePathImages = path.join(__dirname, "../files/challenges/images");

// GET all challenges
router.get("/", async (_req, res) => {
  const challenges = await Challenge.find({}).exec();
  res.send(challenges);
});

// GET a single challenge
router.get("/:id", async (req, res) => {
  let challenge = await Challenge.findById(req.params.id).exec();

  if (!challenge)
    return res
      .status(404)
      .send("The challenge with the given ID was not found");

  res.send(challenge);
});

// GET the image of a challenge with the given ID
router.get("/:id/image", async (req, res) => {
  let challenge = null;
  try {
    challenge = await Challenge.findById(req.params.id).exec();
  } catch (err) {
    if (err.name !== "CastError") {
      console.error(err);
      return res.status(500).send("Failed to interact with the database");
    }
  }

  if (!challenge)
    return res
      .status(404)
      .send("The challenge with the given ID was not found");

  res.sendFile(path.join(filePathImages, challenge.image));
});

module.exports = router;

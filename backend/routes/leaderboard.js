const express = require("express");
const User = require("../models/userModel");

const router = express.Router();

// Leaderboard endpoint (sort by points) and accept pagination parameters
// Page: Current page to return
// Limit: Maximum number of users to return
router.get("/", async (req, res) => {
  const page = req.query.page || 1;
  const limit = req.query.limit || 10;

  const current_user = (page - 1) * limit;
  try {
    const leaderboard = await User.find({})
      .select("username points")
      .sort({ points: "descending" })
      .skip(current_user)
      .limit(limit)
      .exec();
    const total = await User.countDocuments();
    res.status(200).send({ leaderboard: leaderboard, total: total });
  } catch (err) {
    console.error(err);
    res.status(500).send("Failed to interact with the database");
  }
});

module.exports = router;

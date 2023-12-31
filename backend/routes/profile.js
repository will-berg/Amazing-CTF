const express = require("express");
const router = express.Router();
const {
  profileImageUpload,
  replaceProfileImage,
} = require("../middlewares/profile.js");
const path = require("path");
const fs = require("fs");

const profileImagesDirectory = path.join(
  __dirname,
  "../../data/profile/images"
);

// Create the folder if it does not exist
if (!fs.existsSync(profileImagesDirectory)) {
  fs.mkdirSync(profileImagesDirectory, { recursive: true });
}

// route for getting profile image
router.get("/", async (req, res) => {
  try {
    const username = req.query.username;

    const imagePath = path.join(
      profileImagesDirectory,
      `${username}_profile_image.png`
    );

    if (fs.existsSync(imagePath)) {
      res.setHeader("Content-Type", "image/png");
      res.sendFile(imagePath);
    } else {
      // no profile image, send the default profile image
      const defaultImagePath = path.join(
        profileImagesDirectory,
        "default_profile_image.png"
      );
      if (fs.existsSync(defaultImagePath)) {
        res.setHeader("Content-Type", "image/png");
        res.sendFile(defaultImagePath);
      } else {
        res.status(404).send("Profile image not found");
      }
    }
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});

// route for posting a new profile image
router.post(
  "/image",
  replaceProfileImage,
  profileImageUpload.single("image"),
  (req, res) => {
    if (!req.file) {
      console.log("No file selected");
      return res.status(400).json({ error: "No image selected" });
    }

    return res.status(200).json({ message: "Profile image was updated" });
  }
);

module.exports = router;

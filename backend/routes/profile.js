const express = require('express');
const router = express.Router();
const { uploadProfileImage } = require('../middlewares/profile');
const path = require('path');
const fs = require('fs');

const profileImagesDirectory = path.join(__dirname, '../files');

router.get('/', async (req, res) => {
  try {
    // Extract the username from the query parameters
    const username = req.query.username;

    const imagePath = path.join(profileImagesDirectory, `${username}_profile_image.png`);

    // Check if the image file exists
    if (fs.existsSync(imagePath)) {
      res.setHeader('Content-Type', 'image/png');
      res.sendFile(imagePath);
    } else {
      // send the default profile image
      const defaultImagePath = path.join(profileImagesDirectory, 'default_profile_image.png');
      if (fs.existsSync(defaultImagePath)) {
        res.setHeader('Content-Type', 'image/png');
        res.sendFile(defaultImagePath);
      } else {
        res.status(404).send('Profile image not found');
      }
    }
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});
  

router.post('/image', uploadProfileImage, async (req, res) => {
  if (!req.file) {
    console.log("No file selected");
    return res.status(400).json({ error: 'No image selected' });
  }

  const username = req.body.username;
  removeProfileImage(username);

  console.log("Image file: ", req.file);

  // Return a success message
  return res.status(200).json({ message: 'Profile image was updated' });
});



module.exports = router;

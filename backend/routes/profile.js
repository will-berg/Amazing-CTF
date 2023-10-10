const express = require('express');
const router = express.Router();
const { uploadProfileImage } = require('../middlewares/profile');
const path = require('path');
const fs = require('fs');

// Upload Profile Image
router.post('/image', uploadProfileImage, async (req, res) => {
    if (!req.file) {
        console.log("No file selected")
        return res.status(400).json({ error: 'No image selected' });
      }
      console.log("Image file: ", req.file)
      // Assuming the image upload was successful, you can return a success message.
      return res.status(200).json({ message: 'Profile image was updated' });
});

router.get('/', async (req, res) => {
    console.log("HAHAHAHA: ", req.query.username)
    try {
      // Construct the path to the user's profile image based on their username
      const username = req.query.username; // Get the username from the request query parameters
      if (!username) {
        return res.status(400).json({ error: 'Username is required' });
      }
  
      const imageFileName = `${username}_profile_image.png`;
      const imagePath = path.join(__dirname, '../files', imageFileName);

      if (fs.existsSync(imagePath)) {
        res.contentType('image/png'); 
        res.sendFile(imagePath);
      } else {
        return res.status(404).json({ message: 'Profile image not found' });
      }
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Internal server error' });
    }
});
  


module.exports = router;

const fs = require('fs');
const path = require('path');
const multer = require('multer');
const profileImagesDirectory = path.join(__dirname, '../../data/profile/images');

// Define the storage configuration for profile images
const profileImageStorage = multer.diskStorage({
  destination: profileImagesDirectory,
  filename: (req, file, cb) => {
    const username = req.body.username;
    const newFilename = `${username}_profile_image.png`;
    cb(null, newFilename);
  },
});

// Create a multer instance for handling profile image uploads
const profileImageUpload = multer({ storage: profileImageStorage });

// Create a custom middleware for replacing the old profile image
const replaceProfileImage = (req, res, next) => {
  const username = req.body.username;
  const oldImageFilePath = path.join('files', `${username}_profile_image.png`);

  // Check if there is an old image, and if so, remove it
  if (fs.existsSync(oldImageFilePath)) {
    fs.unlinkSync(oldImageFilePath);
  }

  // Continue with the next middleware or route handler
  next();
};

module.exports = { profileImageUpload, replaceProfileImage };

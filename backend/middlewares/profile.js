const fs = require('fs');
const path = require('path');
const multer = require('multer');
const profileImagesDirectory = path.join(__dirname, '../../data/profile/images');

// Middle for storage of profile images
const profileImageStorage = multer.diskStorage({
  destination: profileImagesDirectory,
  filename: (req, file, cb) => {
    const username = req.body.username;
    const newFilename = `${username}_profile_image.png`;
    cb(null, newFilename);
  },
});

const profileImageUpload = multer({ storage: profileImageStorage });

// Middleware for replacing the old profile image
const replaceProfileImage = (req, res, next) => {
  const username = req.body.username;
  const oldImageFilePath = path.join('files', `${username}_profile_image.png`);

  if (fs.existsSync(oldImageFilePath)) {
    fs.unlinkSync(oldImageFilePath);
  }

  next();
};

module.exports = { profileImageUpload, replaceProfileImage };

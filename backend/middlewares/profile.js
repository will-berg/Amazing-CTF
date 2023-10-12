const multer = require('multer');
const fs = require('fs'); // Node.js filesystem module

const storage = multer.diskStorage({
  destination: 'files/',
  filename: (req, file, cb) => {
    const username = req.body.username;
    const newFilename = `${username}_profile_image.png`;
    cb(null, newFilename);
  },
});

const upload = multer({ storage });

const uploadProfileImage = upload.single('image');

const removeProfileImage = (username) => {
  const filePath = `files/${username}_profile_image.png`;
  if (fs.existsSync(filePath)) {
    fs.unlinkSync(filePath);
  }
};

module.exports = { uploadProfileImage, removeProfileImage };

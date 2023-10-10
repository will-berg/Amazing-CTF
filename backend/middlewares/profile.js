const multer = require('multer');

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

module.exports = { uploadProfileImage };



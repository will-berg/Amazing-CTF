const express = require("express");
const path = require("path");
const fs = require("fs");
const multer = require("multer");
const Challenge = require("../models/challengeModel");

const router = express.Router();
const filePathImages = path.join(__dirname, "../../data/challenges/images");

// Temporary data
// const challenges = [
//     {
//         id: 1,
//         title: 'Challenge 1',
//         description: 'This is the first challenge',
//         image: 'challenge1.png',
//         points: 100
//     },
//     {
//         id: 2,
//         title: 'Challenge 2',
//         description: 'This is the second challenge',
//         image: 'challenge1.png',
//         points: 200
//     },
//     {
//         id: 3,
//         title: 'Challenge 3',
//         description: 'This is the third challenge',
//         image: 'challenge1.png',
//         points: 300
//     }
// ];

const challenges = [
    {
        id: 1,
        title: 'ReDos',
        name: 'redos',
        description: 'In this hack you get to practice Regular Expression Denial of Service (ReDos)',
        informationPage: 'The Regular expression Denial of Service (ReDoS) is a Denial of Service attack, that exploits the fact that most Regular Expression implementations may reach extreme situations that cause them to work very slowly (exponentially related to input size).<br><br>An attacker can then cause a program using a Regular Expression (Regex) to enter these extreme situations and then hang for a very long time. The attacker might use the above knowledge to look for applications that use Regular Expressions, containing an Evil Regex, and send a well-crafted input, that will hang the system.<br><br>Alternatively, if a Regex itself is affected by a user input, the attacker can inject an Evil Regex, and make the system vulnerable.',
        imageUrl: '/images/regex.png',
        points: 100,
    },
    {
        id: 2,
        title: 'XSS-Easy',
        name: 'xsseasy',
        description: 'In this hack you get to practice injecting a simple script into a web page.',
        informationPage: 'Cross-Site Scripting (XSS) attacks are a type of injection, in which malicious scripts are injected into otherwise benign and trusted websites. XSS attacks occur when an attacker uses a web application to send malicious code, generally in the form of a browser side script, to a different end user. Flaws that allow these attacks to succeed are quite widespread and occur anywhere a web application uses input from a user within the output it generates without validating or encoding it.<br><br>An attacker can use XSS to send a malicious script to an unsuspecting user. The end user’s browser has no way to know that the script should not be trusted, and will execute the script. Because it thinks the script came from a trusted source, the malicious script can access any cookies, session tokens, or other sensitive information retained by the browser and used with that site. These scripts can even rewrite the content of the HTML page. ',
        imageUrl: '/images/xss.png',
        point: 200,
    },
    {
        id: 3,
        title: 'XSS-Medium',
        name: 'xssmedium',
        description: 'Regular Expression Denial of Service (ReDos)...Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printert to make a type specimen book.',
        informationPage: 'Cross-Site Scripting (XSS) attacks are a type of injection, in which malicious scripts are injected into otherwise benign and trusted websites. XSS attacks occur when an attacker uses a web application to send malicious code, generally in the form of a browser side script, to a different end user. Flaws that allow these attacks to succeed are quite widespread and occur anywhere a web application uses input from a user within the output it generates without validating or encoding it.<br><br>An attacker can use XSS to send a malicious script to an unsuspecting user. The end user’s browser has no way to know that the script should not be trusted, and will execute the script. Because it thinks the script came from a trusted source, the malicious script can access any cookies, session tokens, or other sensitive information retained by the browser and used with that site. These scripts can even rewrite the content of the HTML page. ',
        imageUrl: '/images/xss.png',
        points: 150,
    },
    {
        id: 4,
        title: 'Password',
        name: 'password',
        description: 'Regular Expression Denial of Service (ReDos)...',
        informationPage: '',
        imageUrl: '/images/xss.png',
        points: 100,
    },
    {
        id: 5,
        title: 'Hidden',
        name: 'source',
        description: 'This hack checks if you know where to look for hidden information!',
        informationPage: 'Sometimes developers leave traces of old code and comments that contain sensitive information. Penetration testers often look for these comments or any lingering endpoints that is part of old code. They have many tools at their disposal that they can use to perform actions known as directory busting. Directory busting entails that hackers or penetration testers enumerates a large number of possible endpoints.',
        imageUrl: '/images/hidden.png',
        points: 100,
    },
  ]
//  Based on: https://image.nuxt.com/usage/nuxt-picture
const suportedImageTypes = [
  "image/webp",
  "image/avif",
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/gif",
];
const storage = multer.diskStorage({
  destination: (_req, _file, cb) => {
    cb(null, filePathImages);
  },
  filename: (req, file, cb) => {
    // Validate that there is a file and that it is an image
    if (!suportedImageTypes.includes(file.mimetype)) {
      return cb(
        new Error(
          `Unsupported file type (${
            file.mimetype
          }). Supported types are: ${suportedImageTypes.join(", ")}`
        )
      );
    }

    const extension = path.extname(file.originalname).toLowerCase();
    req.file = file;
    cb(null, `${Date.now()}${extension}`);
  },
});
const upload = multer({ storage: storage }).single("image");

// Create the folder if it does not exist
if (!fs.existsSync(filePathImages)) {
  fs.mkdirSync(filePathImages, { recursive: true });
}

async function _get_challenge(id) {
  return await Challenge.findById(id).exec();
}
async function _delete_challenge(id) {
  return await Challenge.findByIdAndDelete(id).exec();
}
async function get_challenge(req, res, searchFunc = _get_challenge) {
  let challenge = null;
  try {
    challenge = await searchFunc(req.params.id);
  } catch (err) {
    if (err.name !== "CastError") {
      console.error(err);
      res.status(500).send("Failed to interact with the database");
      return;
    }
  }

  if (!challenge) {
    res.status(404).send("The challenge with the given ID was not found");
    return;
  }

  return challenge;
}

//GET all challenges
// router.get('/', (_req, res) => {
//     // Load images
//     const challengesWithImages = challenges.map(c => {
//         const imagePath = path.join(filePath, c.image);
//         const image = fs.readFileSync(imagePath, 'base64');
//         return {
//             id: c.id,
//             title: c.title,
//             description: c.description,
//             image: image,
//             points: c.points
//         };
//     });

//     res.send(challengesWithImages);
// });

//GET all challenges
router.get('/', (_req, res) => {
    // Load images
    const challengesWithImages = challenges.map(c => {
        return {
            id: c.id,
            title: c.title,
            description: c.description,
            informationPage: c.informationPage,
            imageUrl: c.imageUrl,
            points: c.points
        };
    });

    res.send(challengesWithImages);
  }
)
// GET all challenges
// router.get("/", async (_req, res) => {
//   const challenges = await Challenge.find({}).exec();
//   res.send(challenges);
// });

// GET a single challenge
// router.get("/:id", async (req, res) => {
//   console.log("GETTING SINGLE ", req.params.id)
//   let challenge = await get_challenge(req, res);
//   if (!challenge) return;

//   res.send(challenge);
// });

router.get("/:id", async (req, res) => {
  console.log("GETTING SINGLE ", req.params.id)
  const challenge = challenges.find(c => c.id === parseInt(req.params.id, 10))
  console.log("Challenge: " , challenge)

  if(challenge){
    res.send(challenge);
  } else {
    res.status(404).json({message:`No hack with id: ${req.params.id}`})
  }
});


function handle_post_error(errCode, errMsg, req, res) {
  // Delete the image
  if (req.file?.filename !== undefined) {
    filePath = path.join(filePathImages, req.file.filename);
    if (fs.existsSync(filePath)) {
      fs.unlink(filePath, (err) => {
        if (err) {
          console.error(err);
          errMsg += "\nFailed to delete the image";
        }
      });
    }
  }
  res.status(errCode).send(errMsg);
}

// POST a new challenge
router.post("/", async (req, res) => {
  upload(req, res, async (err) => {
    if (err) {
      console.error(err);
      return handle_post_error(400, err.message, req, res);
    }

    // Validate the request
    if (
      req.body.title === undefined ||
      req.body.description === undefined ||
      req.body.informationPage === undefined ||
      req.body.points === undefined ||
      req.body.url === undefined ||
      req.file?.filename === undefined
    )
      return handle_post_error(
        400,
        "Missing required fields, it should contain: title, description, informationPage, points, url and image",
        req,
        res
      );

    const challenge = new Challenge({
      title: req.body.title,
      description: req.body.description,
      informationPage: req.body.informationPage,
      points: req.body.points,
      url: req.body.url,
      image: req.file.filename,
    });

    // Save the challenge
    try {
      await challenge.save();
    } catch (err) {
      console.error(err);
      return handle_post_error(500, "Failed to save the challenge", req, res);
    }

    res.status(201).send(challenge);
  });
});

// PUT a challenge
router.put("/:id", async (req, res) => {
  upload(req, res, async (err) => {
    if (err) {
      console.error(err);
      return handle_post_error(400, err.message, req, res);
    }

    // Find the challenge
    let challenge = await get_challenge(req, res);
    if (!challenge) return;

    // Validate that at least one field is being updated
    if (
      req.body.title === undefined &&
      req.body.description === undefined &&
      req.body.informationPage === undefined &&
      req.body.points === undefined &&
      req.body.url === undefined &&
      req.file?.filename === undefined
    )
      return handle_post_error(
        400,
        "Missing required fields, it should contain at least one of: title, description, informationPage, points, url and image",
        req,
        res
      );

    // Check if the image is being updated and remove the old one
    if (req.image?.filename !== undefined) {
      filePath = path.join(filePathImages, challenge.image);
      if (fs.existsSync(filePath)) {
        fs.unlink(filePath, (err) => {
          if (err) {
            console.error(err);
            return handle_post_error(
              500,
              "Failed to delete the old image",
              req,
              res
            );
          }
        });
      }
    }

    // Update the challenge fields
    challenge.title = req.body.title || challenge.title;
    challenge.description = req.body.description || challenge.description;
    challenge.informationPage =
      req.body.informationPage || challenge.informationPage;
    challenge.points = req.body.points || challenge.points;
    challenge.url = req.body.url || challenge.url;
    challenge.image = req.file?.filename || challenge.image;

    // Save the challenge the updated challenge
    try {
      // await Challenge.findByIdAndUpdate(req.params.id, challenge).exec();
      await challenge.save();
    } catch (err) {
      console.error(err);
      return handle_post_error(500, "Failed to save the challenge", req, res);
    }

    res.status(200).send(challenge);
  });
});

// DELETE a challenge
router.delete("/:id", async (req, res) => {
  let challenge = await get_challenge(req, res, _delete_challenge);
  if (!challenge) return;

  // Delete the image
  filePath = path.join(filePathImages, challenge.image);
  if (fs.existsSync(filePath)) {
    fs.unlink(filePath, (err) => {
      if (err) {
        console.error(err);
        return res.status(500).send("Failed to delete the image");
      }
    });
  }

  res.send(challenge);
});

// GET the image of a challenge with the given ID
router.get("/:id/image", async (req, res) => {
  let challenge = await get_challenge(req, res);
  if (!challenge) return;

  res.sendFile(path.join(filePathImages, challenge.image));
});

// Get the image of a challenge with the image name
router.get("/image/:name", async (req, res) => {
  // Validate that the image exists
  const filePath = path.join(filePathImages, req.params.name);
  if (!fs.existsSync(filePath))
    return res.status(404).send("The image was not found");

  res.sendFile(filePath);
});

module.exports = router;
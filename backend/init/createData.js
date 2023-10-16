const User = require("../models/userModel");
const Challenge = require("../models/challengeModel");

const path = require("path");
const fs = require("fs");
const bcrypt = require("bcrypt");

async function createData() {
  // Check if data exists and if not create it
  const userCount = await User.countDocuments();
  const challengeCount = await Challenge.countDocuments();
  if (userCount !== 0 || challengeCount !== 0) {
    return;
  }

  // Create challenges
  const challenges = [
    {
      title: "ReDos",
      description:
        "In this hack you get to practice Regular Expression Denial of Service (ReDos)",
      informationPage:
        "The Regular expression Denial of Service (ReDoS) is a Denial of Service attack, that exploits the fact that most Regular Expression implementations may reach extreme situations that cause them to work very slowly (exponentially related to input size).<br><br>An attacker can then cause a program using a Regular Expression (Regex) to enter these extreme situations and then hang for a very long time. The attacker might use the above knowledge to look for applications that use Regular Expressions, containing an Evil Regex, and send a well-crafted input, that will hang the system.<br><br>Alternatively, if a Regex itself is affected by a user input, the attacker can inject an Evil Regex, and make the system vulnerable.",
      image: "regex.png",
      points: 100,
      url: "http://localhost:4000/redos",
    },
    {
      title: "XSS-Easy",
      description:
        "In this hack you get to practice injecting a simple script into a web page.",
      informationPage:
        "Cross-Site Scripting (XSS) attacks are a type of injection, in which malicious scripts are injected into otherwise benign and trusted websites. XSS attacks occur when an attacker uses a web application to send malicious code, generally in the form of a browser side script, to a different end user. Flaws that allow these attacks to succeed are quite widespread and occur anywhere a web application uses input from a user within the output it generates without validating or encoding it.<br><br>An attacker can use XSS to send a malicious script to an unsuspecting user. The end user’s browser has no way to know that the script should not be trusted, and will execute the script. Because it thinks the script came from a trusted source, the malicious script can access any cookies, session tokens, or other sensitive information retained by the browser and used with that site. These scripts can even rewrite the content of the HTML page. ",
      image: "xss_1.png",
      points: 200,
      url: "http://localhost:4000/xsseasy",
    },
    {
      title: "XSS-Medium",
      description:
        "Regular Expression Denial of Service (ReDos)...Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printert to make a type specimen book.",
      informationPage:
        "Cross-Site Scripting (XSS) attacks are a type of injection, in which malicious scripts are injected into otherwise benign and trusted websites. XSS attacks occur when an attacker uses a web application to send malicious code, generally in the form of a browser side script, to a different end user. Flaws that allow these attacks to succeed are quite widespread and occur anywhere a web application uses input from a user within the output it generates without validating or encoding it.<br><br>An attacker can use XSS to send a malicious script to an unsuspecting user. The end user’s browser has no way to know that the script should not be trusted, and will execute the script. Because it thinks the script came from a trusted source, the malicious script can access any cookies, session tokens, or other sensitive information retained by the browser and used with that site. These scripts can even rewrite the content of the HTML page. ",
      image: "xss_2.png",
      points: 150,
      url: "http://localhost:4000/xssmedium",
    },
    {
      title: "Password",
      description: "Regular Expression Denial of Service (ReDos)...",
      informationPage: "TODO",
      image: "xss_3.png",
      points: 100,
      url: "http://localhost:4000/password",
    },
    {
      title: "Hidden",
      description:
        "This hack checks if you know where to look for hidden information!",
      informationPage:
        "Sometimes developers leave traces of old code and comments that contain sensitive information. Penetration testers often look for these comments or any lingering endpoints that is part of old code. They have many tools at their disposal that they can use to perform actions known as directory busting. Directory busting entails that hackers or penetration testers enumerates a large number of possible endpoints.",
      image: "hidden.png",
      points: 100,
      url: "http://localhost:4000/hidden",
    },
  ];

  const images = path.join(__dirname, "images");
  const destination = path.join(__dirname, "../../data/challenges/images");

  // Add challenges to database
  for (let i = 0; i < challenges.length; i++) {
    const challenge = challenges[i];
    const challengeModel = new Challenge(challenge);
    await challengeModel.save();

    // Copy image to destination
    const src = path.join(images, challenge.image);
    const dest = path.join(destination, challenge.image);
    fs.copyFileSync(src, dest);
  }

  const users = [
    {
      username: "admin",
      email: "admin@kth.se",
      password: bcrypt.hashSync("admin", bcrypt.genSaltSync(10)),
      completedHacks: challenges.map((c) => c.title),
      points: challenges.reduce((acc, c) => acc + c.points, 0),
    },
    {
      username: "user",
      email: "user@kth.se",
      password: bcrypt.hashSync("user", bcrypt.genSaltSync(10)),
      completedHacks: [],
      points: 0,
    },
  ];

  // Add users to database
  for (let i = 0; i < users.length; i++) {
    const user = users[i];
    const userModel = new User(user);
    await userModel.save();
  }
}

module.exports = createData;

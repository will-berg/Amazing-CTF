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
      points: 20,
      url: "http://localhost:3000/hacks/redos",
    },
    {
      title: "XSS-Easy",
      description:
        "In this hack you get to practice injecting a simple script into a web page.",
      informationPage: "Cross-Site Scripting (XSS) attacks are a type of injection, in which malicious scripts are injected into otherwise benign and trusted websites. XSS attacks occur when an attacker uses a web application to send malicious code, generally in the form of a browser side script, to a different end user. Flaws that allow these attacks to succeed are quite widespread and occur anywhere a web application uses input from a user within the output it generates without validating or encoding it.<br><br>An attacker can use XSS to send a malicious script to an unsuspecting user. The end user’s browser has no way to know that the script should not be trusted, and will execute the script. Because it thinks the script came from a trusted source, the malicious script can access any cookies, session tokens, or other sensitive information retained by the browser and used with that site. These scripts can even rewrite the content of the HTML page or perform different actions depending on what the user wants.",
      image: "xss_1.png",
      points: 3,
      url: "http://localhost:3000/hacks/xss/easy",
    },
    {
      title: "XSS-Medium",
      description:
        "Websites can implement different kinds of XSS protection. In this hack you get to practice bypassing a simple XSS protection known as sanitization.",
      informationPage: "Since XSS attacks are so prevalent on the web, many websites have implemented some form of protection against them. One such protection is called sanitization. Sanitization is the process of removing potentially malicious code from user input. This is done by removing all HTML tags from the input. This is a simple and effective way of preventing XSS attacks, but it is not perfect. There are many ways to bypass this protection, and one such way is by using tags that might seem harmless but could potentially cause severe damage.<br></br> For example, one might not expect the <img> tag to be dangerous, but it can be used to execute JavaScript. This is commonly done by setting the onerror attribute to a JavaScript function. This function will then be executed when the image is loaded without a src. This is a simple way of bypassing the sanitization protection, but there are many more ways of doing this.<br></br>One other way might be to inspect how strict the sanitization is. If it only checks for strictly <script> tags then it could be possible to bypass it by using an altered script (<ScRiPt>, <sCRiPt>, etc.) tag or by even encoding it in different way.",
      image: "xss_2.png",
      points: 10,
      url: "http://localhost:3000/hacks/xss/medium",
    },
    {
      title: "Password",
      description: "Passwords are an important feature of any website. In this hack you get to practice bypassing a simple password protection.",
      informationPage: "Passwords are an important feature of any website. They are used to authenticate users and protect sensitive information. Due to the important nature of passwords, they need to be stored in a safe way so that they cannot be stolen. This is often done using different type of encryption and hashing schemes. Though hashing is the recommended way, since it provides a one-way relation with the original string and hash, this challenge will focus on encryption.<br><br> In the case of saving passwords, we need to somehow transform them into a garbled string making it hard for an attacker to guess the original password. This is done using encryption. Encryption is a reversible process, meaning that we can get the original string from the encrypted string. This is done using a key, which is a secret string that is used to encrypt and decrypt the password, and some form of encryption function. There are various forms of encryption functions, and one of those is the so called Caesar cipher<br><br>This is a cipher used by Julius Caesar and it works by using shifts in the letter of the alpahbet. If we for example had a shift of 3, then the letter A would become D, B would become E and so on. The encryption function is then defined as:<br><br> E(x) = (x + k) mod 26<br><br>where x is the letter and k is the shift. The decryption function is defined as:<br><br> D(x) = (x - k) mod 26<br><br>where x is the letter and k is the shift.<br><br>This is a rather simple cipher and it can therefore be cracked in multiple ways. One such way is by using a so called frequency analysis, where you look at how frequent each letter is in the encrypted string and compare it to the frequency of letters in the English language. By doing this you can find the shift and thereby the original string.",
      image: "xss_3.png",
      points: 8,
      url: "http://localhost:3000/hacks/passwords/leak",
    },
    {
      title: "Hidden",
      description:
        "This hack checks if you know where to look for hidden information!",
      informationPage:
        "Sometimes developers leave traces of old code and comments that contain sensitive information. Penetration testers often look for these comments or any lingering endpoints that is part of old code. They have many tools at their disposal that they can use to perform actions known as directory busting. Directory busting entails that hackers or penetration testers enumerates a large number of possible endpoints.",
      image: "hidden.png",
      points: 5,
      url: "http://localhost:3000/hacks/hidden",
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

  // Move all images of profile images to the data folder
  const profiles = path.join(__dirname, "profiles");
  const destinationImages = path.join(__dirname, "../../data/profile/images");
  fs.readdirSync(profiles).forEach((file) => {
    const src = path.join(profiles, file);
    const dest = path.join(destinationImages, file);
    fs.copyFileSync(src, dest);
  });
}

module.exports = createData;

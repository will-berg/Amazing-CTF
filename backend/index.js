const express = require("express");
const favicon = require("serve-favicon");
const path = require("path");
const app = express();
const port = 5000;
const rootPath = "/api";
const db = require("./config/db");
const TestModel = require("./models/testSchema");
const registerRoute = require("./routes/register");
const loginRoute = require("./routes/login");
const cors = require("cors");
const passport = require('passport');
const session = require('express-session');

db();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// Has same favicon as frontend
app.use(favicon(path.join(__dirname, "public", "favicon.ico")));

app.use(passport.initialize())
require('./config/passport')(passport);
//cors setup to allow for calls from frontend
const corsOptions = {
  origin: "http://localhost:3000",
  credentials: true,
  
};
app.use(cors(corsOptions));


app.get(rootPath, (_req, res) => {
  res.send("Welcome to the API for Amazing-CTF!");
});

// Routes
const challenges = require("./routes/challenges");
app.use(`${rootPath}/challenges`, challenges);

app.get("/test", async (req, res) => {
  try {
    const test = await TestModel.find();
    res.json(test);
  } catch (err) {
    console.log(err);
  }
});

app.post("/test", async (req, res) => {
  console.log(req.body)
  const newName = req.body.name;
  if (!newName) {
    return res.status(400).json({ error: 'Name is required' });
  }
  console.log(newName);
  const newTest = new TestModel({
    name: newName
  });
  console.log(newTest)
  try {
    const test = await newTest.save();
    res.json(test);
  } catch (err) {
    console.log(err);
  } 
});

app.use("/register", registerRoute)
app.use("/login", loginRoute)

app.listen(port, () => {
  console.log(`Connected successfully on port ${port}`);
});

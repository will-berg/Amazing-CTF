const express = require("express");
const favicon = require("serve-favicon");
const path = require("path");
const profileRoute = require("./routes/profile");
const cors = require("cors");

const db = require("./config/db");

// Create express app
const app = express();
const rootPath = "";
const port = 5000;

// Connect to database
db();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// Loads favicon
app.use(favicon(path.join(__dirname, "public", "favicon.ico")));

// Cors setup to allow for calls from frontend
const corsOptions = {
  origin: "http://localhost:3000",
};
app.use(cors(corsOptions));

// Root path
app.get(rootPath, (_req, res) => {
  res.send("Welcome to the API for Amazing-CTF!");
});

// Routes
const challenges = require("./routes/challenges");
const registerRoute = require("./routes/register");
const loginRoute = require("./routes/login");
const submitFlagRoute = require("./routes/submitflag");

app.use(`${rootPath}/challenges`, challenges);
app.use(`${rootPath}/register`, registerRoute);
app.use(`${rootPath}/login`, loginRoute);
app.use(`${rootPath}/submitflag`, submitFlagRoute);
app.use(`${rootPath}/profile`, profileRoute);

app.listen(port, () => {
  console.log(`Connected successfully on port ${port}`);
});

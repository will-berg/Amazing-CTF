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
const challengesRoute = require("./routes/challenges");
const registerRoute = require("./routes/register");
const loginRoute = require("./routes/login");
const submitFlagRoute = require("./routes/submitflag");
const leaderboardRoute = require("./routes/leaderboard");

app.use(`${rootPath}/challenges`, challengesRoute);
app.use(`${rootPath}/register`, registerRoute);
app.use(`${rootPath}/login`, loginRoute);
app.use(`${rootPath}/submitflag`, submitFlagRoute);
app.use(`${rootPath}/profile`, profileRoute);
app.use(`${rootPath}/leaderboard`, leaderboardRoute);

// Start server but first connect to database
async function startServer() {
  try {
    await db();
    app.listen(port, () => console.log(`Server is running on port: ${port}`));
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
}

startServer();

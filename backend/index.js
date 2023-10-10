const express = require("express");
const favicon = require("serve-favicon");
const path = require("path");
const cors = require("cors");

const db = require("./db/db");

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
  credentials: true,
};
app.use(cors(corsOptions));

// Root path
app.get(rootPath, (_req, res) => {
  res.send("Welcome to the API for Amazing-CTF!");
});

// Routes
const challenges = require("./routes/challenges");
app.use(`${rootPath}/challenges`, challenges);

const registerRoute = require("./routes/register");
const loginRoute = require("./routes/login");
app.use("/register", registerRoute);
app.use("/login", loginRoute);

app.listen(port, () => {
  console.log(`Connected successfully on port ${port}`);
});

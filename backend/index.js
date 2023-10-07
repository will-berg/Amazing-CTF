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
app.use("/register", registerRoute)
app.use("/login", loginRoute)

app.listen(port, () => {
  console.log(`Connected successfully on port ${port}`);
});

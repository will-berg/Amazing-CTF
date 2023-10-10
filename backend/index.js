const express = require("express");
const favicon = require("serve-favicon");
const path = require("path");
const app = express();
const port = 5000;
const rootPath = "/api";
const db = require("./config/db");
const registerRoute = require("./routes/register");
const loginRoute = require("./routes/login");
const submitFlagRoute = require("./routes/submitflag");
const cors = require("cors");

db();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// Has same favicon as frontend
app.use(favicon(path.join(__dirname, "public", "favicon.ico")));

//cors setup to allow for calls from frontend
const corsOptions = {
  origin: "http://localhost:3000",
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
app.use("/submitflag", submitFlagRoute)

app.listen(port, () => {
  console.log(`Connected successfully on port ${port}`);
});

const express = require('express');
const favicon = require('serve-favicon')
const path = require('path')

const app = express();
const port = 3000;
const rootPath = '/api';

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// Has same favicon as frontend
app.use(favicon(path.join(__dirname, '..', 'frontend', 'public', 'favicon.ico')))

app.get(rootPath, (_req, res) => {
    res.send('Welcome to the API for Amazing-CTF!');
});

// Routes
const challenges = require('./routes/challenges');
app.use(`${rootPath}/challenges`, challenges);

app.listen(port, () => {
    console.log(`Connected successfully on port ${port}`);
});

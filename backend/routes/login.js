const express = require("express");
const router = express.Router();
const User = require("../models/userModel");
const bcrypt = require("bcrypt");
const passport = require("passport");
const jwt = require('jsonwebtoken');

router.post('/', passport.authenticate('local'), (req, res) => {
    // Generate JWT, remember to change secret key
    const token = jwt.sign({ userId: req.user.id }, 'Mehir123', { expiresIn: '24h' }); 
    res.json({ token, user: req.user });
});

module.exports = router;

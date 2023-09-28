const express = require("express");
const router = express.Router();
const User = require("../models/userModel");
const bcrypt = require("bcrypt");

router.post("/", async (req, res) => {
    const { email, name, password } = req.body;
    if (!email || !password) {
        return res
        .status(400)
        .json({ error: "Username and password are required" });
    }
    
    const newUser = new User({
        email: email,
        name: name,
        password: bcrypt.hashSync(password, 10)
    });
    
    try {
        const user = await newUser.save();
        res.json(user);
    } catch (err) {
        console.log(err);
    }
})

router.get("/", async (req, res) => {
    try {
        const users = await User.find();
        res.json(users);
    } catch (err) {
        console.log(err);
    }
})

module.exports = router;
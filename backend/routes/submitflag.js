const express = require('express');
const router = express.Router();
const userModel = require('../models/userModel');
const validateUser = require('../middlewares/validateUser');

const points = [
    {
        hackName: "xss-easy",
        points: 5,
        flag: "4a!7Yz"
    },
    {
        hackName: "xss-medium",
        points: 10,
        flag: "R@3t^p"
    },
    {
        hackName: "xss-hard",
        points: 20,
        flag: "o7*Hj4"
    }
]
    


router.post('/', validateUser, async (req, res) => {
    console.log("in submit flag");

    const flag = req.body.flag;
    console.log(flag);
    try {
        const user = await userModel.findOne({ email: req.user.email });
        console.log(user);
        const newPoint = points.find((point) => point.flag === flag);
        console.log("Hack: " + newPoint.hackName);
        console.log("Earned Points: " + newPoint.points);
        if(!newPoint) {
            console.log("invalid flag");
            return res.status(400).json({ error: "No such flag exists!" });
        }
        if(user.completedHacks.includes(newPoint.hackName)) {
            console.log("already solved");
            return res.status(400).json({ error: "You have already solved this hack!" });
        }
        user.points += newPoint.points;
        user.completedHacks.push(newPoint.hackName);
        await user.save();
        const updatedUser = await userModel.findOne({ email: req.user.email });
        res.status(200).json({ message: "flag has been submitted", user: updatedUser });
        
    }catch(err){
        console.log("error in catch")
        res.status(500).send({ message: "Server error", details: err.message });
        console.log(err);
    }
});

module.exports = router;
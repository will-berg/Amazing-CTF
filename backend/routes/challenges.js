const express = require('express');
const path = require('path');
const fs = require('fs');
const sharp = require('sharp')

const router = express.Router();
const filePath = path.join(__dirname, '../images/challenges');

// Temporary data
// const challenges = [
//     {
//         id: 1,
//         title: 'Challenge 1',
//         description: 'This is the first challenge',
//         image: 'challenge1.png',
//         points: 100
//     },
//     {
//         id: 2,
//         title: 'Challenge 2',
//         description: 'This is the second challenge',
//         image: 'challenge1.png',
//         points: 200
//     },
//     {
//         id: 3,
//         title: 'Challenge 3',
//         description: 'This is the third challenge',
//         image: 'challenge1.png',
//         points: 300
//     }
// ];

const challenges = [
    {
        id: 1,
        title: 'ReDos',
        description: 'Regular Expression Denial of Service (ReDos)...Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.',
        imageUrl: '/images/regex.png',
        points: 100,
    },
    {
        id: 2,
        title: 'SQLInjection',
        description: 'Regular Expression Denial of Service (ReDos)...Lorem Ipsum is simply dummy text o standard dummy text ever since the 1500s, when an unknown printer',
        imageUrl: '/images/injection.png',
        point: 200,
    },
    {
        id: 3,
        title: 'Deserialization',
        description: 'Regular Expression Denial of Service (ReDos)...Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printert to make a type specimen book.',
        imageUrl: '/images/serialize.png',
        points: 150,
    },
    {
        id: 4,
        title: 'XSS',
        description: 'Regular Expression Denial of Service (ReDos)...',
        imageUrl: '/images/xss.png',
        points: 100,
    },
    {
        id: 5,
        title: 'Prototype Pollution',
        description: 'Regular Expression Denial of Service (ReDos)...Lorem Ipsum is simply dummy text of the printi',
        imageUrl: '/images/pollution.png',
        points: 100,
    },
    {
        id: 5,
        title: 'Something',
        description: 'Regular Expression Denial of Service (ReDos)...Lorem Ipsum is simply dummy text of the printi',
        imageUrl: '/images/injection.png',
        points: 100,
    },
];
let nextId = 4;

//GET all challenges
// router.get('/', (_req, res) => {
//     // Load images
//     const challengesWithImages = challenges.map(c => {
//         const imagePath = path.join(filePath, c.image);
//         const image = fs.readFileSync(imagePath, 'base64');
//         return {
//             id: c.id,
//             title: c.title,
//             description: c.description,
//             image: image,
//             points: c.points
//         };
//     });

//     res.send(challengesWithImages);
// });

//GET all challenges
router.get('/', (_req, res) => {
    // Load images
    const challengesWithImages = challenges.map(c => {
        return {
            id: c.id,
            title: c.title,
            description: c.description,
            imageUrl: c.imageUrl,
            points: c.points
        };
    });

    res.send(challengesWithImages);
});


// GET a single challenge
router.get('/:id', (req, res) => {
    const challenge = challenges.find(c => c.id === parseInt(req.params.id));
    if (!challenge) return res.status(404).send('The challenge with the given ID was not found');

    // Load image
    const image = fs.readFileSync(path.join(filePath, challenge.image), 'base64');
    challenge.image = image;

    res.send(challenge);
});

// POST a new challenge
router.post('/', (req, res) => {
    // Validate the request
    if (!req.body.title || !req.body.description || !req.body.image || !req.body.points) 
        return res.status(400).send('Bad request');

    // Save image
    const image = req.body.image;
    const fileName = `challenge${nextId}.jpg`;
    fs.writeFile(path.join(filePath, fileName), image, 'base64', (err) => {
        if (err) return res.status(500).send('Internal server error');
    });

    const challenge = {
        id: nextId,
        title: req.body.title,
        description: req.body.description,
        image: fileName,
        points: req.body.points
    };
    nextId++;
    challenges.push(challenge);

    res.status(201).send(challenge);
});

// PUT (update) an existing challenge
router.put('/:id', (req, res) => {
    // Validate the request (at least one field must be present)
    if (!req.body.title && !req.body.description && !req.body.image && !req.body.points) 
        return res.status(400).send('Bad request');

    const challenge = challenges.find(c => c.id === parseInt(req.params.id));
    if (!challenge) return res.status(404).send('The challenge with the given ID was not found');

    // Update the challenge
    if (req.body.title) challenge.title = req.body.title;
    if (req.body.description) challenge.description = req.body.description;
    if (req.body.points) challenge.points = req.body.points;

    // Save image
    if (req.body.image) {
        // Remove old image
        fs.unlink(path.join(filePath, challenge.image), (err) => {
            if (err) return res.status(500).send('Internal server error');
        });

        // Save new image
        const image = req.body.image;
        const fileName = `challenge${challenge.id}.jpg`;
        fs.writeFile(path.join(filePath, fileName), image, 'base64', (err) => {
            if (err) return res.status(500).send('Internal server error');
        });
        challenge.image = fileName;
    }

    res.send(challenge);
});

module.exports = router;
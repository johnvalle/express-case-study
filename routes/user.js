const express = require('express');
const router = express.Router()
const uuid = require('uuid');

const User = require('../models/User');
const UserController = require('../controllers/UserController');

// fetch all
router.get('/', async (req, res) => {
    try {
        const users = await User.find();
        res.json(users);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
})

// fetch one
router.get('/:id', UserController.fetchOne, (req, res) => {
    res.json(res.user)
})

// create
router.post('/', async (req, res) => {
    console.log(req.body)
    const { name, birthday, username, description, isPrivate } = req.body;

    const code = uuid.v4();
    const isDeactivated = { value: false };
    const user = new User({ code, name, username, birthday, description, isPrivate, isDeactivated });

    try {
        const newUser = await user.save();
        res.status(201).json(newUser); //201 for successfully making object
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
})

// update
router.patch('/:id', (req, res) => {
    
})

// update privacy
router.patch('/:id/set-privacy', UserController.fetchOne, async (req, res) => {
    if (typeof(req.body.isPrivate) !== "boolean") res.status(400).send({ message: "Invalid request. Data must be of type boolean." });
    res.user.isPrivate = [{
        value: req.body.isPrivate,
        dateUpdated: Date.now()
    }];
    try {
        let updatedUser = await res.user.save();
        res.json({ 
            message: "Privacy sucessfully updated.",
            data: updatedUser
        });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
})

// deactivate user
router.patch('/:id/deactivate', UserController.fetchOne, async (req, res) => {
    
})

// delete
router.delete('/:id', UserController.fetchOne, async (req, res) => {
    try {
        await res.user.remove();
        res.json({ message: "User succesfully deleted." })
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
})

module.exports = router
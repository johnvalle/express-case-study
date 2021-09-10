const express = require('express');
const router = express.Router()

const Tweet = require('../models/Tweet');

router.get('/', async (req, res) => {
    try {
        const tweets = await Tweet.find();
        res.json(tweets);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

router.post('/', async (req, res) => {
    let { userId, body } = req.body;
    let meta = [{
        likes: 0,
        retweets: 0,
        isPrivate: false
    }]
    let tweet = new Tweet({ userId, body, meta });
    try {
        let newTweet = await tweet.save();
        res.status(201).json(newTweet);
    } catch (err) {
        res.status(400).message({ message: err.message });
    }
})

module.exports = router;
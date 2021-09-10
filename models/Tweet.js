const mongoose = require('mongoose');

const tweetMetaSchema = mongoose.Schema({
    likes: {
        type: Number,
        default: 0,
        required: true,
    },
    retweets: {
        type: Number,
        default: 0,
        required: true,
    },
    isPrivate: {
        type: Boolean,
        required: false
    },
});

const tweetSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true
    },
    dateCreated: {
        type: Date,
        required: true,
        default: Date.now()
    },
    body: {
        type: String,
        required: true,
        maxlength: 280
    },
    meta: [tweetMetaSchema]
});

module.exports = mongoose.model('Tweet', tweetSchema);
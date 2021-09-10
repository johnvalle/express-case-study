const mongoose = require('mongoose');

const isPrivateSchema = new mongoose.Schema({
    value: {
        type: Boolean,
        required: true,
        default: false,
    },
    dateUpdated: {
        type: Date,
        required: true,
        default: Date.now()
    }
});

const isDeactivatedSchema = new mongoose.Schema({
    value: {
        type: Boolean,
        required: true,
        default: false,
    },
    dateUpdated: {
        type: Date,
        required: true,
        default: Date.now()
    }
})

const userSchema = new mongoose.Schema({
    code: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    birthday: {
        type: Date,
        required: true
    },
    username: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    dateCreated: {
        type: Date,
        required: true,
        default: Date.now()
    },
    isPrivate: [isPrivateSchema],
    isDeactivated: [isDeactivatedSchema]
});

module.exports = mongoose.model('User', userSchema);
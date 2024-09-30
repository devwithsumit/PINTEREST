const mongoose = require('mongoose');
const { type } = require('os');
const { Schema } = mongoose;

const userSchema = new Schema({
    fullname: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    bio: { type: String, default: '' },
    posts: [{
        type : mongoose.Schema.Types.ObjectId,
        ref : 'post'
    }],
    profilePicture: { type: String, default: '' }, // URL or file path
    pins: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }]
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);

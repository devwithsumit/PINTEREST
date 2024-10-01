const mongoose = require('mongoose');
const { MAX } = require('uuid');
const { Schema } = mongoose;

const userSchema = new Schema({
    title: String,
    caption : String,
    image : String, 
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    likes: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }]
}, { timestamps: true });

module.exports = mongoose.model('post', userSchema);

const mongoose = require('mongoose');

const VideoSchema = new mongoose.Schema({

    VideoUrl: {
        type: String
    },
    isActive: {
        type: Boolean,
        default: false
    }

}, { timestamps: true })

const Video = mongoose.model('Video', VideoSchema);

module.exports = Video;
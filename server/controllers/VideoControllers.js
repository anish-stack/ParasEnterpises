const Video = require('../models/VideoGallery');

// Create a new video
const createVideo = async (req, res) => {
    try {
        const { VideoUrl, isActive } = req.body;

        // Validate input
        if (!VideoUrl) {
            return res.status(400).json({ message: 'Video URL is required' });
        }

        const newVideo = new Video({ VideoUrl, isActive });
        const savedVideo = await newVideo.save();
        
        res.status(201).json({ message: 'Video created successfully', data: savedVideo });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

// Delete a video by ID
const deleteVideo = async (req, res) => {
    try {
        const { id } = req.params;

        const deletedVideo = await Video.findByIdAndDelete(id);
        
        if (!deletedVideo) {
            return res.status(404).json({ message: 'Video not found' });
        }

        res.status(200).json({ message: 'Video deleted successfully', data: deletedVideo });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

// Update a video by ID
const updateVideo = async (req, res) => {
    try {
        const { id } = req.params;
        const { VideoUrl, isActive } = req.body;

        // Validate input
        if (!VideoUrl) {
            return res.status(400).json({ message: 'Video URL is required' });
        }

        const updatedVideo = await Video.findByIdAndUpdate(id, { VideoUrl, isActive }, { new: true });
        
        if (!updatedVideo) {
            return res.status(404).json({ message: 'Video not found' });
        }
        
        res.status(200).json({ message: 'Video updated successfully', data: updatedVideo });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

// Get all videos
const getAllVideos = async (req, res) => {
    try {
        const videos = await Video.find();

        res.status(200).json({ message: 'Videos fetched successfully', data: videos });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

module.exports = {
    createVideo,
    deleteVideo,
    updateVideo,
    getAllVideos
};

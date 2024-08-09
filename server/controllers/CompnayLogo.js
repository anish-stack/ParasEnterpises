const CompanyLogo = require('../models/CompanyLogoModel');
const uploadImages = require('../middlewares/Cloudinary');

exports.UploadCompanyLogoImage = async (req, res) => {
    try {
        // Ensure the file is present
        if (!req.file) {
            return res.status(400).json({ message: 'No file uploaded' });
        }

        const file = req.file;
        // Upload image to Cloudinary
        const results = await uploadImages(file.buffer);
        // Check if results is an array and handle the first item
        if (!Array.isArray(results) || results.length === 0) {
            return res.status(500).json({ message: 'No valid response from Cloudinary' });
        }

        const { public_id, imageUrl } = results[0];

        // Ensure the result has the required fields
        if (!public_id || !imageUrl) {
            return res.status(500).json({ message: 'Invalid response from Cloudinary' });
        }

        // Create a new company logo entry
        const newLogo = new CompanyLogo({
            image: {
                public_id,
                url: imageUrl
            }
        });

        // Save to the database
        await newLogo.save();

        // Respond with success
        res.status(201).json({
            message: 'Company logo uploaded successfully',
            data: newLogo
        });
    } catch (error) {
        // Handle errors
        // console.error('Error uploading company logo:', error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};


exports.getAllCompanyLogos = async (req, res) => {
    try {
        // Fetch all company logos
        const logos = await CompanyLogo.find();
        res.status(200).json({ message: 'Fetched all company logos', data: logos });
    } catch (error) {
        console.error('Error fetching company logos:', error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

exports.deleteCompanyLogo = async (req, res) => {
    try {
        const { public_id } = req.params;

        // Find the logo to delete
        const logo = await CompanyLogo.findOne({ 'image.public_id': public_id });
        if (!logo) {
            return res.status(404).json({ message: 'Logo not found' });
        }



        // Delete the logo from the database
        await CompanyLogo.deleteOne({ 'image.public_id': public_id });

        res.status(200).json({ message: 'Company logo deleted successfully' });
    } catch (error) {
        console.error('Error deleting company logo:', error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};
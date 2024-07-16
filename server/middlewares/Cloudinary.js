const Cloudinary = require('cloudinary').v2;

Cloudinary.config({
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_SECRET_KEY,
    cloud_name: process.env.CLOUD_NAME
});

const uploadSingleImage = (fileBuffer) => {
    return new Promise((resolve, reject) => {
        const stream = Cloudinary.uploader.upload_stream((error, result) => {
            if (result) {
                resolve({ public_id: result.public_id, imageUrl: result.secure_url });
            } else {
                reject(error || new Error("Failed to upload image"));
            }
        });
        stream.end(fileBuffer);
    });
};

const UploadImages = async (fileBuffers) => {
    if (!Array.isArray(fileBuffers)) {
        fileBuffers = [fileBuffers];
    }

    try {
        const uploadPromises = fileBuffers.map(fileBuffer => uploadSingleImage(fileBuffer));
        const uploadResults = await Promise.all(uploadPromises);
        return uploadResults;
    } catch (error) {
        throw new Error(`Image upload failed: ${error.message}`);
    }
};

module.exports = UploadImages;
const multer = require('multer');
const storage = multer.memoryStorage();
const upload = multer({ storage });

// Middleware for single image upload
const singleUploadImage = upload.single('image');

// Middleware for multiple images upload
const multipleImages = upload.array('images', 10); // 10 is the max count of images you want to allow

// Middleware for multiple fields
const UploadMultipleFields = upload.fields([
    { name: 'SliderImages', maxCount: 10 },
    { name: 'DataSheet', maxCount: 1 },
    { name: 'MainImage', maxCount: 1 }

]);

module.exports = {
    singleUploadImage,
    multipleImages,
    UploadMultipleFields
};

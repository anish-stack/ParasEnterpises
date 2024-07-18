const bannerModel = require('../models/banner.model');
const uploadImages = require('../middlewares/Cloudinary');


// Controller to create a new main banner
exports.createBanner = async (req, res) => {
    try {
        const { title, active } = req.body;
        const file = req.file;

        // Validate required fields
        if (!title || !file) {
            return res.status(400).json({
                success: false,
                message: 'Please provide title and banner image'
            });
        }

        // Check if banner with the same title already exists
        const existingBanner = await bannerModel.findOne({ title });
        if (existingBanner) {
            return res.status(400).json({
                success: false,
                message: 'Banner with this title already exists'
            });
        }

        const [imageUrl] = await uploadImages(file.buffer);
        console.log("Image", imageUrl);
        const { public_id, imageUrl: secureUrl } = imageUrl;

        // Create new banner object
        const newBanner = new bannerModel({
            title,
            active,
            image: {
                public_id,
                url: secureUrl
            }
        });

        // Save new banner to database
        await newBanner.save();

        // Respond with success message and new banner data
        res.status(201).json({
            success: true,
            data: newBanner,
            message: 'Banner created successfully',
            imageUrl: imageUrl.imageUrl
        });

    } catch (error) {
        console.error('Error creating banner:', error);
        res.status(500).json({
            success: false,
            message: 'Internal Server Error'
        });
    }
};


exports.getAllBanner = async (req,res) =>{
    try {
        const getAllBanner = await bannerModel.find();
        if(getAllBanner === 0){
            return res.status(400).json({
                success: false,
                msg: "Banner Not Avilable Now"
            })
        }
        res.status(201).json({
            success:true,
            data:getAllBanner,
            msg: "All Banner Found"
        })
        
    } catch (error) {
        console.log("Error : ", error);
        return res.status(500).json({
            success: false,
            message: "Internal Server Error"
        });
    }
}
exports.deleteBanner = async (req, res) => {
    try {
        const id = req.params.id;
        const checkBanner = await bannerModel.deleteOne({ _id: id })
        if (!checkBanner) {
            return res.status(403).json({
                success: false,
                msg: "Banner Not Found"
            })
        }
        res.status(200).json({
            success: true,
            msg: "Banner Deleted Succesfully !!"
        })
    } catch (error) {
        console.log("Error : ", error);
        return res.status(500).json({
            success: false,
            message: "Internal Server Error"
        });
    }
}
exports.updateBanner = async (req, res) => {
    try {
        const BannerId = req.params.id;
        const updates = req.body;
        const file = req.file;

        if (Object.keys(updates).length === 0 && !file) {
            return res.status(400).json({
                success: false,
                msg: "No fields to update."
            });
        }

        if (file) {
            const [imageUrl] = await uploadImages(file.buffer);
            const { public_id, imageUrl: secureUrl } = imageUrl;
            updateData.image = {
                public_id,
                url: secureUrl
            };
        }

        const updatedBanner = await bannerModel.findByIdAndUpdate(BannerId, updates, { new: true });

        if (!updatedBanner) {
            return res.status(404).json({
                success: false,
                msg: "Banner not found."
            });
        }

        res.status(200).json({
            success: true,
            msg: "Banner updated successfully.",
            data: updatedBanner
        });

    } catch (error) {
        console.error("Error:", error);
        return res.status(500).json({
            success: false,
            message: "Internal Server Error"
        });
    }
};


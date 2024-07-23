const Tag = require('../models/Tag.model')

exports.CreateTag = async (req, res) => {
    try {
        const { tagName, tagColour } = req.body
        if (!tagName) {
            return res.status(400).json({
                status: false,
                message: "Please provide tag name"
            })
        }
        if (!tagColour) {
            return res.status(400).json({
                status: false,
                message: "Please provide tag colour"
            })
        }
        const tag = await Tag.findOne({ tagName , tagColour })
        if (tag) {
            return res.status(400).json({
                status: false,
                message: "Tags already exists"
            })
        }
        const newTag = await Tag.create({ tagName , tagColour })
        return res.status(201).json({
            status: true,
            message: "Tag created successfully",
            data: newTag
        })

    } catch (error) {
        console.log(error)
        return res.status(500).json({
            success: false,
            message: "Internal Error"
        })
    }
}

exports.GetTag = async (req, res) => {
    try {
        const allTag = await Tag.find()
        if (!allTag) {
            return res.status(400).json({
                status: false,
                message: "No tag found"
            })
        }
        return res.status(200).json({
            status: true,
            message: "Tag found successfully",
            data: allTag
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            success: false,
            message: "Internal Error"
        })
    }
}

exports.DeleteSingleTag = async (req, res) => {
    try {
        const { _id } = req.params; 
        // console.log(_id)
        const tag = await Tag.findByIdAndDelete(_id); 
        if (!tag) {
            return res.status(400).json({
                status: false,
                message: "Tag not found"
            });
        }
        
        return res.status(200).json({
            status: true,
            message: "Tag deleted successfully",
        });
    } catch (error) {
        console.error(`Error deleting tag with ID ${_id}:`, error); // Improved logging
        return res.status(500).json({
            status: false, // Changed to 'status' for consistency
            message: "Internal Server Error"
        });
    }
};


exports.UpdateTag = async (req, res) => {
    try {
        const { _id } = req.params;
        const { tagName, tagColour } = req.body;

        if (!tagName && !tagColour) {
            return res.status(400).json({
                status: false,
                message: "Please provide tag name or tag colour to update"
            });
        }

        const updatedFields = {};
        if (tagName) updatedFields.tagName = tagName;
        if (tagColour) updatedFields.tagColour = tagColour;

        const updatedTag = await Tag.findByIdAndUpdate(_id, updatedFields, { new: true });

        if (!updatedTag) {
            return res.status(400).json({
                status: false,
                message: "Tag not found"
            });
        }

        return res.status(200).json({
            status: true,
            message: "Tag updated successfully",
            data: updatedTag
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Internal Error"
        });
    }
};

const Category = require('../models/CategoriesModel');
const uploadImages = require('../middlewares/Cloudinary');

// Create category with image and name
exports.CategoryCreate = async (req, res) => {
    try {
        const file= req.file;
        const { name } = req.body;

        if (!file) {
            return res.status(403).json({
                success: false,
                msg: "Please Upload Any File First"
            });
        }

        if (!name) {
            return res.status(403).json({
                success: false,
                msg: "Please fill All Field"
            });
        }

        const [imageUrl] = await uploadImages(file.buffer);
        console.log("Image", imageUrl);
        const { public_id, imageUrl: secureUrl } = imageUrl;

        // Create the category in the database
        const newCategory = new Category({
            name,
            image: {
                public_id,
                url: secureUrl
            }
        });


        await newCategory.save();

        res.status(201).json({
            success: true,
            msg: "Category created successfully",
            imageUrl: imageUrl.imageUrl
        });

    } catch (error) {
        console.log(error);
        return res.status(501).json({
            success: false,
            msg: "Internal Server Error"
        });
    }
};

// Update category
exports.updateCategory = async (req, res) => {
    try {
        const { id } = req.params;
        const { name } = req.body;
        const file = req.file;

        let updateData = { name };

        if (file) {
            const [imageUrl] = await uploadImages(file.buffer);
            const { public_id, imageUrl: secureUrl } = imageUrl;
            updateData.image = {
                public_id,
                url: secureUrl
            };
        }

        const updatedCategory = await Category.findByIdAndUpdate(id, updateData, { new: true });

        if (!updatedCategory) {
            return res.status(404).json({
                success: false,
                msg: "Category not found"
            });
        }

        res.status(200).json({
            success: true,
            msg: "Category updated successfully",
            category: updatedCategory
        });

    } catch (error) {
        console.log(error);
        return res.status(501).json({
            success: false,
            msg: "Internal Server Error"
        });
    }
};

// Delete category
exports.deleteCategory = async (req, res) => {
    try {
        const { id } = req.params;

        const deletedCategory = await Category.findByIdAndDelete(id);

        if (!deletedCategory) {
            return res.status(404).json({
                success: false,
                msg: "Category not found"
            });
        }

        res.status(200).json({
            success: true,
            msg: "Category deleted successfully"
        });

    } catch (error) {
        console.log(error);
        return res.status(501).json({
            success: false,
            msg: "Internal Server Error"
        });
    }
};

// Delete all categories
exports.deleteAllCategories = async (req, res) => {
    try {
        await Category.deleteMany();

        res.status(200).json({
            success: true,
            msg: "All categories deleted successfully"
        });

    } catch (error) {
        console.log(error);
        return res.status(501).json({
            success: false,
            msg: "Internal Server Error"
        });
    }
};

// Get all categories
exports.getAllCategories = async (req, res) => {
    try {
        const categories = await Category.find().sort({ createdAt: -1 });

        res.status(200).json({
            success: true,
            categories
        });

    } catch (error) {
        console.log(error);
        return res.status(501).json({
            success: false,
            msg: "Internal Server Error"
        });
    }
};

// Get category by ID
exports.getCategoryById = async (req, res) => {
    try {
        const { id } = req.params;
        const category = await Category.findById(id);

        if (!category) {
            return res.status(404).json({
                success: false,
                msg: "Category not found"
            });
        }

        res.status(200).json({
            success: true,
            category
        });

    } catch (error) {
        console.log(error);
        return res.status(501).json({
            success: false,
            msg: "Internal Server Error"
        });
    }
};

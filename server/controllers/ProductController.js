const Product = require('../models/ProductModel');
const uploadImages = require('../middlewares/Cloudinary');

// Create product with images and other details
exports.CreateProduct = async (req, res) => {
    try {
        const SliderImages = req.files['SliderImages'] || [];
        const DataSheetImages = req.files['DataSheet'] || [];
        const MainImage = req.files['MainImage'] || [];

        // Extract product details from request body
        const { ProductName, Category, SmallDescription, Price, DiscountPercentage, PriceAfterDiscount, HowManyStock, isStockOut, isLatestProduct, Specifications } = req.body;

        // Perform other necessary validations on the product details
        if (!ProductName || !SmallDescription || !Price || !DiscountPercentage || !PriceAfterDiscount || !HowManyStock) {
            return res.status(400).json({
                success: false,
                msg: "Please fill all the required fields."
            });
        }

        // Upload images to Cloudinary
        const uploadImageBuffers = async (files) => {
            const fileBuffers = files.map(file => file.buffer);
            const uploadResults = await uploadImages(fileBuffers);
            return uploadResults;
        };

        let sliderImagesUrls = [];
        if (SliderImages.length > 0) {
            sliderImagesUrls = await uploadImageBuffers(SliderImages);
            sliderImagesUrls = sliderImagesUrls.map(image => ({
                public_id: image.public_id,
                url: image.imageUrl
            }));
        }
        const dataSheetImagesUrls = await uploadImageBuffers(DataSheetImages);
        console.log(dataSheetImagesUrls)
        const mainImageUrl = await uploadImageBuffers(MainImage);
        // console.log(sliderImagesUrls)
        // Create the product in the database
        const newProduct = new Product({
            ProductName,
            Category,
            SmallDescription,
            Price,
            DiscountPercentage,
            PriceAfterDiscount,
            HowManyStock,
            isStockOut,
            isLatestProduct,
            Specifications: Specifications ? Specifications.split(',') : [], // Convert Specifications to array if provided as a string
            SliderImages: sliderImagesUrls,
            DataSheet: dataSheetImagesUrls.map(image => ({
                public_id: image.public_id,
                url: image.imageUrl
            }))[0], // Assuming only one DataSheet image
            MainImage: {
                public_id: mainImageUrl[0].public_id, // Assuming only one main image
                url: mainImageUrl[0].imageUrl
            }
        });

        await newProduct.save();

        res.status(201).json({
            success: true,
            msg: "Product created successfully",
            product: newProduct
        });

    } catch (error) {
        console.log(error);
        return res.status(501).json({
            success: false,
            msg: "Internal Server Error"
        });
    }
};

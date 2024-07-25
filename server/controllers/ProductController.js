const Product = require('../models/ProductModel');
const uploadImages = require('../middlewares/Cloudinary');

// Create product with images and other details
exports.CreateProduct = async (req, res) => {
    try {
        const DataSheetImages = req.files['DataSheet'] || [];
        const MainImage = req.files['MainImage'] || [];
        console.log(req.body)
        const { ProductName, Category, SmallDescription, Price, Tag, DiscountPercentage, PriceAfterDiscount, HowManyStock, isStockOut, isLatestProduct, Specifications } = req.body;

        if (!ProductName || !SmallDescription || !Price || !DiscountPercentage || !PriceAfterDiscount || !HowManyStock) {
            return res.status(400).json({
                success: false,
                msg: "Please fill all the required fields."
            });
        }

        const uploadImageBuffers = async (files) => {
            const fileBuffers = files.map(file => file.buffer);
            const uploadResults = await uploadImages(fileBuffers);
            return uploadResults;
        };

        const dataSheetImagesUrls = await uploadImageBuffers(DataSheetImages);
        const mainImageUrl = await uploadImageBuffers(MainImage);

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
            Specifications: Specifications.map(spec => ({
                title: spec.title,
                details: spec.details
            })),
            Tag,
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

exports.GetAllProduct = async (req, res) => {
    try {
        const allProduct = await Product.find();
        if (!allProduct) {
            return res.status(404).json({
                success: false,
                msg: "No product found"
            });
        }
        return res.status(200).json({
            success: true,
            msg: "All product found",
            product: allProduct
        });
    } catch (error) {
        console.log(error);
        return res.status(501).json({
            success: false,
            msg: "Internal Server Error"
        });
    }
};

exports.singleProduct = async (req, res) => {
    try {
        const { id } = req.params;
        if (!id) {
            return res.status(404).json({
                success: false,
                msg: "No id Is Given"
            });
        }

        const checkProduct = await Product.findById(id);
        if (!checkProduct) {
            return res.status(404).json({
                success: false,
                msg: "No Product Found With This id"
            });
        }

        const findProductWithSameCategory = await Product.find({ Category: checkProduct.Category, _id: { $ne: id } });

        if (findProductWithSameCategory.length === 0) {
            return res.status(200).json({
                success: true,
                product: checkProduct,
                relatedProducts: [],
                msg: "No Relative Products Found"
            });
        } else {
            return res.status(200).json({
                success: true,
                product: checkProduct,
                relatedProducts: findProductWithSameCategory,
                msg: "Relative Products Found"
            });
        }
    } catch (error) {
        return res.status(500).json({
            success: false,
            msg: "Server Error",
            error: error.message
        });
    }
};

exports.GetOnlyLatestProduct = async (req, res) => {
    try {
        const latestProducts = await Product.find({ isLatestProduct: true });
        if (latestProducts.length === 0) {
            return res.status(404).json({
                success: false,
                msg: "No latest products found"
            });
        }
        return res.status(200).json({
            success: true,
            msg: "Latest products found",
            products: latestProducts
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            msg: "Internal Server Error"
        });
    }
};

exports.UpdateProductWithImage = async (req, res) => {
    try {
        const { id } = req.params;

        if (!id) {
            return res.status(400).json({
                success: false,
                msg: "No id is given"
            });
        }

        const existingProduct = await Product.findById(id);

        if (!existingProduct) {
            return res.status(404).json({
                success: false,
                msg: "No product found with this id"
            });
        }

        // Extract and structure Specifications
        const specifications = [];
        for (let i = 0; req.body[`Specifications[${i}].title`]; i++) {
            specifications.push({
                title: req.body[`Specifications[${i}].title`],
                details: req.body[`Specifications[${i}].details`]
            });
        }

        // Prepare updatedFields
        let updatedFields = {
            ProductName: req.body.ProductName,
            Category: req.body.Category,
            SmallDescription: req.body.SmallDescription,
            Price: req.body.Price,
            DiscountPercentage: req.body.DiscountPercentage,
            PriceAfterDiscount: req.body.PriceAfterDiscount,
            HowManyStock: req.body.HowManyStock,
            Tag: req.body.Tag,
            isStockOut: req.body.isStockOut === 'true',
            isLatestProduct: req.body.isLatestProduct === 'true',
            Specifications: specifications
        };

        // File handling
        const DataSheetImages = req.files['DataSheet'] || [];
        const MainImage = req.files['MainImage'] || [];

        // Function to upload images
        const uploadImageBuffers = async (files) => {
            if (!files.length) return [];
            const fileBuffers = files.map(file => file.buffer);
            return await uploadImages(fileBuffers);
        };

        // Process DataSheetImages
        if (DataSheetImages.length > 0) {
            const dataSheetImagesUrls = await uploadImageBuffers(DataSheetImages);
            updatedFields.DataSheet = dataSheetImagesUrls.map(image => ({
                public_id: image.public_id,
                url: image.imageUrl
            }))[0]; // Assuming only one DataSheet image
        }

        // Process MainImage
        if (MainImage.length > 0) {
            const mainImageUrls = await uploadImageBuffers(MainImage);
            updatedFields.MainImage = {
                public_id: mainImageUrls[0].public_id, // Assuming only one main image
                url: mainImageUrls[0].imageUrl
            };
        }

        // Update the product
        const updatedProduct = await Product.findByIdAndUpdate(id, updatedFields, { new: true });

        if (!updatedProduct) {
            return res.status(404).json({
                success: false,
                msg: "Failed to update the product"
            });
        }

        res.status(200).json({
            success: true,
            msg: "Product updated successfully",
            product: updatedProduct
        });

    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            msg: "Internal Server Error"
        });
    }
};
exports.ChangeLatestProductStatusChange = async (req, res) => {
    try {
        const { id } = req.params;
        if (!id) {
            return res.status(400).json({
                success: false,
                msg: "No id Is Given"
            });
        }

        const existingProduct = await Product.findById(id);
        if (!existingProduct) {
            return res.status(404).json({
                success: false,
                msg: "No Product Found With This id"
            });
        }

        existingProduct.isLatestProduct = !existingProduct.isLatestProduct;
        await existingProduct.save();

        res.status(200).json({
            success: true,
            msg: "Latest product status changed successfully",
            product: existingProduct
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            msg: "Internal Server Error"
        });
    }
};

exports.deleteProduct = async (req, res) => {
    try {
        const { id } = req.params;
        if (!id) {
            return res.status(400).json({
                success: false,
                msg: "No id Is Given"
            });
        }

        const existingProduct = await Product.findById(id);
        if (!existingProduct) {
            return res.status(404).json({
                success: false,
                msg: "No Product Found With This id"
            });
        }

        await existingProduct.deleteOne();

        res.status(200).json({
            success: true,
            msg: "Product deleted successfully"
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            msg: "Internal Server Error"
        });
    }
};


exports.getProductsByCategory = async (req, res) => {
    try {
      const { Name } = req.params;
        console.log(Name)
      // Check if category name is provided
      if (!Name) {
        return res.status(400).json({ message: 'Category name is required' });
      }
  
      // Fetch products based on the category name
      const products = await Product.find({ Category: Name });
  
      // If no products found, respond with a message
      if (products.length === 0) {
        return res.status(404).json({ message: 'No products found for this category' });
      }
  
      // Respond with the fetched products
      res.status(200).json(products);
    } catch (error) {
      // Handle errors
      console.error('Error fetching products:', error);
      res.status(500).json({ message: 'Server error' });
    }
  };
  
  
const Categories = require('../models/CategoriesModel');
const Banners = require('../models/banner.model');
const News = require('../models/NewsModel');
const Orders = require('../models/OrderModel');
const Product = require('../models/ProductModel');
const Video = require('../models/VideoGallery');
const Vouchers = require('../models/Vouncher.model');
const Contacts = require('../models/Contact.model');

exports.DashboardData = async (req, res) => {
    try {
        // Fetch all orders and calculate the total final price
        const orders = await Orders.find({});
        console.log(orders)
        const totalFinalPrice = orders.reduce((total, order) => total + order.reqBodyData.CartItems.finalPrice, 0);

        // Count documents in each collection
        const categoriesCount = await Categories.countDocuments();
        const bannersCount = await Banners.countDocuments();
        const newsCount = await News.countDocuments();
        const ordersCount = await Orders.countDocuments();
        const productsCount = await Product.countDocuments();
        const videosCount = await Video.countDocuments();
        const vouchersCount = await Vouchers.countDocuments();
        const contactsCount = await Contacts.countDocuments();

        // Prepare the response data
        const responseData = {
            totalFinalPrice,
            counts: {
                categories: categoriesCount,
                banners: bannersCount,
                news: newsCount,
                orders: ordersCount,
                products: productsCount,
                videos: videosCount,
                vouchers: vouchersCount,
                contacts: contactsCount
            }
        };

        // Send the response
        res.status(200).json(responseData);
    } catch (error) {
        console.error('Error fetching dashboard data:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

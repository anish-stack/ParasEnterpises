const Order = require('../models/OrderModel');
const sendEmail = require('../utils/SendEmail');
const razorpay = require('razorpay');
const crypto = require('crypto');

var instance = new razorpay({
    key_id: process.env.RAZORPAY_API_KEY || "rzp_test_XPcfzOlm39oYi8",
    key_secret: process.env.RAZORPAY_API_SECRET || "Q79P6w7erUar31TwW4GLAkpa",
});

exports.CheckOut = async (req, res) => {
    try {
        const { paymentMode, CartItems } = req.body;
        console.log(CartItems.finalPrice)
        if (paymentMode === 'Online') {
            const options = {
                amount: Number(CartItems.finalPrice.toFixed(0) * 100), // amount in the smallest currency unit
                currency: "INR",
                receipt: `OrderForProduct_${Date.now()}`,
            };
            const razorpayOrder = await instance.orders.create(options);
            if (!razorpayOrder) {
                return res.status(500).send('Some error occurred while creating the Razorpay order.');
            }

            const newOrder = new Order({
                reqBodyData: req.body, // Save the entire req.body
                razorpayOrderId: razorpayOrder.id,
                transactionId: req.body.transactionId,
                PaymentDone: true,
                paymentStatus: razorpayOrder.status,
                userId: req.user.id
            });

            const savedOrder = await newOrder.save();

            // Return the order details to the client
            return res.json({
                success: true,
                data: savedOrder,
                order: razorpayOrder
            });
        } else {
            const newOrder = new Order({
                reqBodyData: req.body, // Save the entire req.body
                paymentStatus: "COD",
                PaymentDone: true,
                userId: req.user.id
            });

            const savedOrder = await newOrder.save();

            return res.status(201).json({
                success: true,
                message: 'Order Successful !!',
                data: savedOrder
            });
        }
    } catch (error) {
        console.log(error);
        res.status(500).send('Internal Server Error');
    }
};

exports.paymentVerification = async (req, res) => {
    try {
        const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;

        if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
            return res.status(400).json({
                success: false,
                message: 'Missing required payment details',
            });
        }

        const body = razorpay_order_id + "|" + razorpay_payment_id;
        const expectedSignature = crypto
            .createHmac("sha256", process.env.RAZORPAY_API_SECRET || "Q79P6w7erUar31TwW4GLAkpa")
            .update(body)
            .digest("hex");

        const isAuthentic = expectedSignature === razorpay_signature;

        if (isAuthentic) {
            const latestOrder = await Order.findOneAndUpdate(
                { razorpayOrderId: razorpay_order_id },
                {
                    $set: {
                        transactionId: razorpay_payment_id,
                        PaymentDone: true,
                        paymentStatus: "Success"
                    }
                },
                { new: true }
            );

            if (!latestOrder) {
                return res.status(403).json({
                    success: false,
                    message: "No Order Found"
                });
            }


            res.redirect(`${process.env.FRONTEND_URL}/Payment-Success?Payment="Done"&Order=${latestOrder._id}`);
        } else {
            res.redirect(`${process.env.FRONTEND_URL}/Payment-failed?Payment="Failed"`);
        }
    } catch (error) {
        console.error("Payment Verification Error: ", error);
        res.status(500).json({
            success: false,
            message: "An error occurred during payment verification",
            error: error.message
        });
    }
};


exports.OrderByOrderId = async (req, res) => {
    try {
        // Extract orderId from query parameters or route parameters
        const { orderId } = req.params;

        if (!orderId) {
            return res.status(400).json({
                success: false,
                message: 'Order ID is required',
            });
        }

        // Find the order by ID
        const order = await Order.findById(orderId);

        if (!order) {
            return res.status(404).json({
                success: false,
                message: 'Order not found',
            });
        }

        // Send the order details in the response
        res.status(200).json({
            success: true,
            order,
        });
    } catch (error) {
        console.error("Error fetching order by ID: ", error);
        res.status(500).json({
            success: false,
            message: 'An error occurred while fetching the order',
            error: error.message,
        });
    }
};
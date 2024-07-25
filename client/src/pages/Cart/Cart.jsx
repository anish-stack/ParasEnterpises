import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { Link, Navigate } from 'react-router-dom';

const Cart = ({ handleUpdateQuantity, handleRemove }) => {
    const cart = JSON.parse(sessionStorage.getItem('cart')) || [];
    const [cartItems, setCartItems] = useState(cart);
    const [coupon, setCoupon] = useState('');
    const deliveryFee = 50;
    const [quantities, setQuantities] = useState({});
    const [vouchers, setVouchers] = useState([]);
    const [discountPercent, setDiscountPercent] = useState(0);
    const [message, setMessage] = useState('');
    const [messageType, setMessageType] = useState(''); // 'success' or 'error'

    useEffect(() => {
        const initialQuantities = {};
        cartItems.forEach(item => {
            initialQuantities[item.product._id] = item.quantity;
        });
        setQuantities(initialQuantities);
    }, [cartItems]);

    useEffect(() => {
        const fetchVouchers = async () => {
            try {
                const response = await axios.get('http://localhost:7000/api/v1/getAllVouncher');
                setVouchers(response.data.data);
            } catch (error) {
                console.error("Error fetching vouchers:", error);
            }
        };

        fetchVouchers();
    }, []);

    const handleApplyCoupon = () => {
        const matchedVoucher = vouchers.find(voucher => 
            voucher.CouponCode === coupon && voucher.isActive
        );

        if (matchedVoucher) {
            setDiscountPercent(matchedVoucher.descountpercent);
            setMessage('Coupon applied successfully!');
            setMessageType('success');
        } else {
            setDiscountPercent(0);
            setMessage('Invalid or inactive coupon code!');
            setMessageType('error');
        }
    };

    const handleQuantityChange = (productId, delta) => {
        setQuantities(prevQuantities => ({
            ...prevQuantities,
            [productId]: Math.max(1, prevQuantities[productId] + delta)
        }));

        setCartItems(prevItems =>
            prevItems.map(item =>
                item.product._id === productId
                    ? { ...item, quantity: Math.max(1, item.quantity + delta) }
                    : item
            )
        );

        handleUpdateQuantity(productId, delta);
    };

    const calculateTotalPrice = () => {
        return cartItems.reduce((total, item) => total + item.product.PriceAfterDiscount * item.quantity, 0);
    };

    const totalPrice = calculateTotalPrice();
    const discountAmount = (totalPrice * discountPercent) / 100;
    const finalPrice = totalPrice - discountAmount + deliveryFee;

    const handleCheckOut = () => {
        const paymentInfo = {
            cartItems,
            finalPrice:finalPrice,
            couponApplied: discountPercent > 0,
            couponCode: discountPercent > 0 ? coupon : '',
            discountApplied: discountAmount
        };

        sessionStorage.setItem('paymentInfo', JSON.stringify(paymentInfo));

        // Optionally, display a message or update the UI to indicate checkout success
        setMessage('Checkout information saved successfully!');
        setMessageType('success');
        window.location.href="/Checkout"
    };

    return (
        <div className="max-w-7xl mx-auto md:p-4">
            {cartItems.length === 0 ? (
                <div className="text-center min-h-[70vh] flex items-center justify-center text-xl font-bold">
                    No Products in Cart
                </div>
            ) : (
                <div className="flex flex-col lg:flex-row">
                    <div className="lg:w-3/4 p-4">
                        <h2 className="text-2xl font-bold mb-4 text-blue-600">Shopping <span className='text-red-500'>Cart</span></h2>
                        <hr className='w-20 h-1 mb-3 bg-red-400' />
                        {cartItems.map((item, index) => (
                            <div key={index} className="flex items-center mb-4 p-4 bg-white shadow">
                                <img src={item.product.MainImage.url} alt={item.product.ProductName} className="w-24 h-24 object-cover mr-4" />
                                <div className="flex-1">
                                    <h3 className="font-bold">{item.product.ProductName}</h3>
                                    <p><i className="fa-solid fa-rupee-sign"></i> {item.product.PriceAfterDiscount}</p>
                                </div>
                                <div className="flex items-center">
                                    <button
                                        className="px-2 py-1 bg-gray-200 rounded"
                                        onClick={() => handleQuantityChange(item.product._id, -1)}
                                    >
                                        -
                                    </button>
                                    <span className="px-4">{quantities[item.product._id]}</span>
                                    <button
                                        className="px-2 py-1 bg-gray-200 rounded"
                                        onClick={() => handleQuantityChange(item.product._id, 1)}
                                    >
                                        +
                                    </button>
                                </div>
                                <button
                                    className="text-red-500 ml-4"
                                    onClick={() => handleRemove(item.product._id)}
                                >
                                    <i className="fa-solid fa-trash"></i>
                                </button>
                            </div>
                        ))}
                    </div>
                    <div className="lg:w-1/4 p-6 bg-white shadow-lg rounded-lg">
                        <h2 className="text-3xl font-bold mb-6">Order Summary</h2>
                        <p className="mb-4 text-lg">Items Total: <i className="fa-solid fa-rupee-sign"></i> {totalPrice.toFixed(0)}</p>
                        <p className="mb-4 text-lg">Delivery Fee: <i className="fa-solid fa-rupee-sign"></i> {deliveryFee}</p>
                        <div className="mb-6">
                            <label htmlFor="coupon" className="block mb-2 text-lg">Coupon Code</label>
                            <input
                                type="text"
                                id="coupon"
                                value={coupon}
                                onChange={(e) => setCoupon(e.target.value)}
                                className="w-full p-3 border border-gray-300 rounded-lg mb-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                            <button
                                className="w-full bg-gradient-to-r from-blue-500 to-indigo-500 text-white px-4 py-2 rounded-full shadow-md hover:shadow-lg transition duration-300 transform hover:scale-105"
                                onClick={handleApplyCoupon}
                            >
                                Apply Coupon
                            </button>
                        </div>
                        {message && (
                            <p className={`text-sm font-bold mb-4 ${messageType === 'success' ? 'text-green-500' : 'text-red-500'}`}>
                                {message}
                            </p>
                        )}
                        <p className="text-2xl font-bold mb-6">Total: <i className="fa-solid fa-rupee-sign"></i> {finalPrice.toFixed(0)}</p>
                        <button
                            onClick={handleCheckOut}
                            className="block w-full bg-gradient-to-r from-green-400 to-green-600 text-white text-center px-4 py-2 rounded-full shadow-md hover:shadow-lg transition duration-300 transform hover:scale-105"
                        >
                            Checkout
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Cart;

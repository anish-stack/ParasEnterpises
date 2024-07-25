import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import 'tailwindcss/tailwind.css';

const Checkout = () => {
    const [isTokenValid, setIsTokenValid] = useState(false);
    const [paymentInfo, setPaymentInfo] = useState(null);
    const [address, setAddress] = useState(null);
    const [formData, setFormData] = useState({
        streetAddress: '',
        houseNo: '',
        pincode: '',
        landmark: '',
        city: '',
        ContactNumber: '',
        state: '',
        paymentMode: 'COD',
        CartItems: []
    });

    const checkTokenValidity = () => {
        const token = localStorage.getItem('ParasUserToken');
        const tokenExpired = localStorage.getItem('ParasUserTokenExpired');

        if (token && tokenExpired) {
            const expirationTime = parseInt(tokenExpired, 10);
            const currentTime = new Date().getTime();
            setIsTokenValid(currentTime < expirationTime);
        } else {
            setIsTokenValid(false);
        }
    };

    useEffect(() => {
        checkTokenValidity();
    }, []);

    useEffect(() => {
        try {
            const storedPaymentInfo = sessionStorage.getItem('paymentInfo');
            if (storedPaymentInfo) {
                setPaymentInfo(JSON.parse(storedPaymentInfo));
            }
        } catch (error) {
            console.error("Error retrieving payment info from session storage:", error);
        }
    }, []);

    useEffect(() => {
        if (paymentInfo) {
            setFormData((prevData) => ({
                ...prevData,
                CartItems: paymentInfo
            }));
        }
    }, [paymentInfo]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const BackendUrl = import.meta.env.VITE_REACT_APP_BACKEND_URL;
    const token = localStorage.getItem('ParasUserToken');

    const GetDeliveryAddress = async () => {
        try {
            const res = await axios.get(`${BackendUrl}/get-Delivery-Address`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            console.log(res.data.deliveryAddress);
            setAddress(res.data.deliveryAddress);
            setFormData((prevData) => ({
                ...prevData,
                streetAddress: res.data.deliveryAddress.Street || '',
                houseNo: res.data.deliveryAddress.HouseNo || '',
                pincode: res.data.deliveryAddress.PinCode || '',
                landmark: res.data.deliveryAddress.NearByLandMark || '',
                city: res.data.deliveryAddress.City || '',
                ContactNumber: res.data.deliveryAddress.ContactNumber || '',
                state: res.data.deliveryAddress.State || '',
            }));
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        if (token) {
            GetDeliveryAddress();
        }
    }, [token]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post(`${BackendUrl}/Checkout`, formData, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            if (formData.paymentMode === 'Online') {
                const order = res.data.order;

                const options = {
                    key: "rzp_test_XPcfzOlm39oYi8",
                    amount: order?.amount || null,
                    currency: "INR",
                    name: "Paras Enterprises",
                    description: `Payment For Paras Enterprises`,
                    image: "https://i.pinimg.com/originals/9e/ff/85/9eff85f9a3f9540bff61bbeffa0f6305.jpg",
                    order_id: order?.id,
                    callback_url: `${BackendUrl}/Payment-Verification`,
                    prefill: {
                        contact: formData.ContactNumber
                    },
                    notes: {
                        "address": "Razorpay Corporate Office"
                    },
                    theme: {
                        "color": "#2DBCB6"
                    }
                };

                const razorpay = new window.Razorpay(options);
                razorpay.on('payment.failed', function (response) {
                    toast.error('Payment failed. Please try again.');
                });
                razorpay.open();
            } else {
                const orderId = res.data.data._id;
                console.log(res.data.data._id);
                window.location.href = `/Payment-Success?PaymentMode=Cod&Order=${orderId}`;
            }
        } catch (error) {
            console.error("Error during checkout:", error);
        }
    };

    return (
        <div className="max-w-7xl mx-auto p-1">
            <div className="flex flex-col lg:flex-row bg-white shadow-lg rounded-lg overflow-hidden">
                <div className="lg:w-2/4 p-6">
                    <h2 className="text-3xl font-bold mb-6 text-gray-800">Checkout</h2>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label className="block font-bold mb-2">
                                Street Address <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="text"
                                name="streetAddress"
                                value={formData.streetAddress}
                                onChange={handleChange}
                                required
                                className="w-full p-1 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
                        </div>
                        <div>
                            <label className="block font-bold mb-2">
                                House No <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="text"
                                name="houseNo"
                                value={formData.houseNo}
                                onChange={handleChange}
                                required
                                className="w-full p-1 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
                        </div>
                        <div>
                            <label className="block font-bold mb-2">
                                Pincode <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="text"
                                name="pincode"
                                value={formData.pincode}
                                onChange={handleChange}
                                required
                                className="w-full p-1 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
                        </div>
                        <div>
                            <label className="block font-bold mb-2">Landmark</label>
                            <input
                                type="text"
                                name="landmark"
                                value={formData.landmark}
                                onChange={handleChange}
                                className="w-full p-1 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
                        </div>
                        <div>
                            <label className="block font-bold mb-2">
                                City <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="text"
                                name="city"
                                value={formData.city}
                                onChange={handleChange}
                                required
                                className="w-full p-1 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
                        </div>
                        <div>
                            <label className="block font-bold mb-2">
                                Contact Number <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="text"
                                name="ContactNumber"
                                value={formData.ContactNumber}
                                onChange={handleChange}
                                required
                                className="w-full p-1 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
                        </div>
                        <div>
                            <label className="block font-bold mb-2">
                                State <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="text"
                                name="state"
                                value={formData.state}
                                onChange={handleChange}
                                required
                                className="w-full p-1 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
                        </div>
                        <div>
                            <label className="block font-bold mb-2 text-gray-700">
                                Payment Mode <span className="text-red-500">*</span>
                            </label>
                            <div className="flex items-center space-x-4">
                                <label className="flex items-center">
                                    <input
                                        type="radio"
                                        name="paymentMode"
                                        value="COD"
                                        checked={formData.paymentMode === 'COD'}
                                        onChange={handleChange}
                                        className="mr-2"
                                    />
                                    COD
                                </label>
                                <label className="flex items-center">
                                    <input
                                        type="radio"
                                        name="paymentMode"
                                        value="Online"
                                        checked={formData.paymentMode === 'Online'}
                                        onChange={handleChange}
                                        className="mr-2"
                                    />
                                    Online Payment
                                </label>
                            </div>
                        </div>
                        <button
                            type="submit"
                            className="w-full bg-blue-500 text-white font-bold py-2 px-4 rounded-lg hover:bg-blue-600 focus:outline-none focus:bg-blue-600">
                            Submit
                        </button>
                    </form>
                </div>
                <div className="lg:w-2/4 p-6 bg-gray-100">
                    <div className="p-1 bg-gray-100">
                        {paymentInfo ? (
                            <div>
                                <h2 className="text-xl font-bold mb-4">Checkout Summary</h2>
                                <div className="mb-6">
                                    <h3 className="text-lg font-semibold mb-2">Cart Items</h3>
                                    {paymentInfo.cartItems.map((item, index) => (
                                        <div key={index} className="p-1 mb-4 bg-white shadow-md rounded-md">
                                            <div className="flex items-center mb-4">
                                                <img
                                                    src={item.product.MainImage.url}
                                                    alt={item.product.ProductName}
                                                    className="w-20 h-20 object-cover rounded-md mr-4"
                                                />
                                                <div>
                                                    <h4 className="text-lg font-semibold">{item.product.ProductName}</h4>
                                                    <p className="text-gray-600">Price: {item.product.PriceAfterDiscount.toFixed(2)}</p>
                                                    <p className="text-gray-600">Quantity: {item.quantity}</p>
                                                </div>
                                            </div>

                                        </div>
                                    ))}
                                </div>
                                <div className="mb-6">
                                    <h3 className="text-lg font-semibold mb-2">Coupon Details</h3>

                                    <p className="text-gray-600">Coupon Code: {paymentInfo.couponCode}</p>
                                    <p className="text-gray-600">Discount Applied: Rs {paymentInfo.discountApplied.toFixed(2)}</p>
                                    <p className="text-gray-600">Total Payable Amount: Rs {paymentInfo.finalPrice.toFixed(2)}</p>

                                </div>
                            </div>
                        ) : (
                            <p className="text-gray-500">No payment information available.</p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Checkout;

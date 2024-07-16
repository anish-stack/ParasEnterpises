import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import 'tailwindcss/tailwind.css';

const Checkout = () => {
    const [formData, setFormData] = useState({
        streetAddress: '',
        houseNo: '',
        pincode: '',
        landmark: '',
        city: '',
        state: '',
        paymentMode: 'COD',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle form submission
    };

    return (
        <div className="max-w-7xl mx-auto p-4">
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
                                className="w-full p-4 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
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
                                className="w-full p-4 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
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
                                className="w-full p-4 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
                        </div>
                        <div>
                            <label className="block font-bold mb-2">Landmark</label>
                            <input
                                type="text"
                                name="landmark"
                                value={formData.landmark}
                                onChange={handleChange}
                                className="w-full p-4 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
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
                                className="w-full p-4 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
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
                                className="w-full p-4 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
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
                                    Online
                                </label>
                            </div>
                        </div>
                        <Link to={'/Payment-Success'} className="w-full block text-center bg-gradient-to-r from-green-400 to-green-600 text-white text-lg px-6 py-3 rounded-full shadow-lg hover:shadow-xl transition duration-300 transform hover:scale-105">
                            Place Order <i class="fa-solid fa-truck-fast"></i>
                        </Link>
                    </form>
                </div>
                <div className="hidden lg:block lg:w-2/4 p-4">
                    <img src="https://i.ibb.co/r6qs010/image.png" loading='lazy' alt="Checkout" className="w-full h-full object-cover" />
                </div>
            </div>
        </div>
    );
};

export default Checkout;

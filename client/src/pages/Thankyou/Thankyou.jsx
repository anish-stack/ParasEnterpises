import React from 'react';
import { useLocation } from 'react-router-dom';
import thankyouGif from './thank-you.gif';

const ThankYou = () => {
    const location = useLocation();
    const { name } = location.state || {};

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-red-100 to-blue-300 p-4">
            <div className="bg-white p-8 rounded-lg shadow-lg text-center max-w-lg w-full">
                <h1 className="text-4xl font-bold text-blue-600 mb-4">Thank You!</h1>
                <img src={thankyouGif} alt="Thank You" className="w-32 h-32 mx-auto mb-6" />
                <p className="text-2xl font-medium mb-4">Dear {name || 'Customer'},</p>
                <p className="text-gray-700 mb-6">Thank you for your interest in buying our product in bulk. We will contact you soon to discuss further details.</p>
                <a href="/" className="inline-block bg-blue-500 text-white py-2 px-4 rounded-full shadow hover:bg-blue-600 transition duration-300">
                    Return to Home
                </a>
            </div>
        </div>
    );
}

export default ThankYou;

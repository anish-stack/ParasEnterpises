import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Cart = () => {
    const initialCartItems = [
        {
            id: 1,
            ProductName: "CB-HFT(YG)",
            Price: 769,
            Quantity: 3,
            image: 'https://parasenterprises.com/images/Yellow_green_stripeHeatShrinkTubing.jpg'
        },
        {
            id: 2,
            ProductName: "CB-HFT(YG)",
            Price: 769,
            Quantity: 3,
            image: 'https://parasenterprises.com/images/Yellow_green_stripeHeatShrinkTubing.jpg'
        },
        {
            id: 3,
            ProductName: "CB-HFT(YG)",
            Price: 769,
            Quantity: 3,
            image: 'https://parasenterprises.com/images/Yellow_green_stripeHeatShrinkTubing.jpg'
        }
    ];

    const [cartItems, setCartItems] = useState(initialCartItems);
    const [coupon, setCoupon] = useState('');
    const deliveryFee = 50;

    const handleQuantityChange = (id, delta) => {
        setCartItems(prevItems =>
            prevItems.map(item =>
                item.id === id
                    ? { ...item, Quantity: Math.max(1, item.Quantity + delta) }
                    : item
            )
        );
    };

    const handleRemoveItem = (id) => {
        setCartItems(prevItems => prevItems.filter(item => item.id !== id));
    };

    const handleApplyCoupon = () => {
        // Logic to apply coupon
    };

    const calculateTotalPrice = () => {
        return cartItems.reduce((total, item) => total + item.Price * item.Quantity, 0);
    };

    const finalPrice = calculateTotalPrice() + deliveryFee;

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
                        {cartItems.map(item => (
                            <div key={item.id} className="flex items-center mb-4 p-4 bg-white shadow">
                                <img src={item.image} alt={item.ProductName} className="w-24 h-24 object-cover mr-4" />
                                <div className="flex-1">
                                    <h3 className="font-bold">{item.ProductName}</h3>
                                    <p><i className="fa-solid fa-rupee-sign"></i> {item.Price}</p>

                                </div>
                                <div className="flex items-center">
                                    <button
                                        className="px-2 py-1 bg-gray-200 rounded"
                                        onClick={() => handleQuantityChange(item.id, -1)}
                                    >
                                        -
                                    </button>
                                    <span className="px-4">{item.Quantity}</span>
                                    <button
                                        className="px-2 py-1 bg-gray-200 rounded"
                                        onClick={() => handleQuantityChange(item.id, 1)}
                                    >
                                        +
                                    </button>
                                </div>
                                <button
                                    className="text-red-500 ml-4"
                                    onClick={() => handleRemoveItem(item.id)}
                                >
                                    <i className="fa-solid fa-trash"></i>
                                </button>
                            </div>
                        ))}
                    </div>
                    <div className="lg:w-1/4 p-6 bg-white shadow-lg rounded-lg">
                        <h2 className="text-3xl font-bold mb-6">Order Summary</h2>
                        <p className="mb-4 text-lg">Items Total: <i className="fa-solid fa-rupee-sign"></i> {calculateTotalPrice()}</p>
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
                        <p className="text-2xl font-bold mb-6">Total: <i className="fa-solid fa-rupee-sign"></i> {finalPrice}</p>
                        <Link to="/Checkout" className="block w-full bg-gradient-to-r from-green-400 to-green-600 text-white text-center px-4 py-2 rounded-full shadow-md hover:shadow-lg transition duration-300 transform hover:scale-105">
                            Checkout
                        </Link>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Cart;

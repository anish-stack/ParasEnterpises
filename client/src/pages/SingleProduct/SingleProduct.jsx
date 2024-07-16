import React, { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import AutoMotive from '../../components/Products/AutomotiveProducts';
import toast from 'react-hot-toast';
import DataSheet from './Data sheet.png';

const SingleProduct = () => {
    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        window.scrollTo({
            top: 0,
            left: 0,
            behavior: 'smooth',
        });
    }, [location.search]);

    const [quantity, setQuantity] = useState(1);
    const [openAccordionIndex, setOpenAccordionIndex] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [formData, setFormData] = useState({ name: '', email: '', contact: '', time: '' });

    const toggleAccordion = (index) => {
        setOpenAccordionIndex(openAccordionIndex === index ? null : index);
    };

    const increaseQuantity = () => {
        setQuantity(prevQuantity => {
            if (prevQuantity >= 5) {
                setIsModalOpen(true);
                return prevQuantity; // Prevent increase beyond 5
            }
            return prevQuantity + 1;
        });
    };

    const decreaseQuantity = () => {
        if (quantity > 1) {
            setQuantity(prevQuantity => prevQuantity - 1);
        }
    };

    const specifications = [
        {
            title: "Specification 1",
            details: "CB-HFT(YG) YELLOW/GREEN STRIPED HEAT-SHRINKABLE TUBING CB-HFT(YG) is a yellow and green striped heat-shrinkable tubing which is flexible, flame-retardant and resistant to common fluids and solvents. This tubing may be used in yellow and green wiring linkage and ground marking."
        },
        {
            title: "Specification 2",
            details: "CB-HFT(YG) YELLOW/GREEN STRIPED HEAT-SHRINKABLE TUBING CB-HFT(YG) is a yellow and green striped heat-shrinkable tubing which is flexible, flame-retardant and resistant to common fluids and solvents. This tubing may be used in yellow and green wiring linkage and ground marking."
        },
        {
            title: "Specification 3",
            details: "CB-HFT(YG) YELLOW/GREEN STRIPED HEAT-SHRINKABLE TUBING CB-HFT(YG) is a yellow and green striped heat-shrinkable tubing which is flexible, flame-retardant and resistant to common fluids and solvents. This tubing may be used in yellow and green wiring linkage and ground marking."
        }
    ];

    const handleAddToCart = () => {
        toast.success("Successfully Added to Cart");
        window.location.href = "/Cart";
    };

    const handleFormSubmit = (e) => {
        e.preventDefault();
        navigate('/thank-you', { state: { name: formData.name } });
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevFormData => ({ ...prevFormData, [name]: value }));
    };

    return (
        <div className="max-w-7xl mx-auto py-8 px-4">
            {/* Breadcrumbs */}
            <nav className="text-gray-600 mb-4">
                <ol className="list-none p-0 inline-flex">
                    <li className="flex items-center">
                        <a href="#" className="text-blue-500">Home</a>
                        <span className="mx-2">/</span>
                    </li>
                    <li className="flex items-center">
                        <a href="/Shop" className="text-blue-500">Shop</a>
                        <span className="mx-2">/</span>
                    </li>
                    <li className="flex items-center text-gray-800">CB-HFT(YG)</li>
                </ol>
            </nav>
            {/* Product Details */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Product Image */}
                <div>
                    <img src="https://parasenterprises.com/images/Yellow_green_stripeHeatShrinkTubing.jpg" alt="Product" className="w-full h-auto object-contain" />
                </div>
                {/* Product Information */}
                <div>
                    <h2 className="text-2xl font-semibold mb-2">CB-HFT(YG)</h2>
                    <p className="text-gray-600 mb-4">Category</p>
                    <p>Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
                    <div className="flex items-center mt-2 mb-4">
                        <span className="text-lg font-semibold mr-2"><i className="fa-solid mr-1 fa-rupee-sign"></i>100</span>
                        <del className="text-red-500"><i className="fa-solid mr-1 fa-rupee-sign"></i>120</del>
                    </div>
                    <div className="mt-8">
                        <h3 className="text-xl font-semibold mb-4">Estimated Delivery Time</h3>
                        <p className="text-gray-600">2-3 business days</p>
                    </div>
                    {/* Quantity Counter */}
                    <div className="flex mt-4 items-center mb-4">
                        <button onClick={decreaseQuantity} className="px-3 py-1 bg-blue-400 text-white rounded-l-md focus:outline-none">-</button>
                        <input type="text" value={quantity} readOnly className="px-3 py-1 bg-gray-100 text-center w-16" />
                        <button onClick={increaseQuantity} className="px-3 py-1 bg-red-400 text-white rounded-r-md focus:outline-none">+</button>
                    </div>
                    {/* Buttons */}
                    <div className="flex mt-12 space-x-2">
                        <Link to={'/Checkout'} className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 focus:outline-none">Buy Now</Link>
                        <button onClick={handleAddToCart} className="bg-gray-800 text-white px-4 py-2 rounded-md hover:bg-gray-900 focus:outline-none">Add to Cart</button>
                    </div>
                </div>
            </div>
            <div className='w-full mx-auto px-4 py-5'>
                <div className=''>
                    <img src={DataSheet} alt="" />
                </div>
            </div>
            {/* Accordion for Product Specifications */}
            <div className="mt-8">
                <h3 className="text-xl font-semibold mb-4">Product Specifications</h3>
                <div>
                    {specifications.map((specification, index) => (
                        <div key={index} className="border rounded-lg overflow-hidden mb-4">
                            <div
                                className="flex items-center justify-between bg-gray-200 px-4 py-2 cursor-pointer"
                                onClick={() => toggleAccordion(index)}
                            >
                                <span>{specification.title}</span>
                                <svg className={`w-4 h-4 ${openAccordionIndex === index ? 'transform rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                </svg>
                            </div>
                            <div className={`${openAccordionIndex === index ? 'block' : 'hidden'} border-t px-4 py-2`}>
                                <p>{specification.details}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <AutoMotive />

            {/* Modal for Bulk Purchase */}
            {isModalOpen && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
                        <h3 className="text-2xl font-semibold mb-6">Bulk Quantity Purchase <i className="fa-regular fa-face-grin-wide"></i></h3>
                        <p className="mb-6 text-gray-700">If you wish to purchase more than 5 units, please contact us directly.</p>
                        <form onSubmit={handleFormSubmit} className="space-y-6">
                            <div>
                                <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
                                <input
                                    type="text"
                                    id="name"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleInputChange}
                                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-3 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                    required
                                />
                            </div>
                            <div>
                                <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleInputChange}
                                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-3 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                    required
                                />
                            </div>
                            <div>
                                <label htmlFor="contact" className="block text-sm font-medium text-gray-700">Contact Number</label>
                                <input
                                    type="text"
                                    id="contact"
                                    name="contact"
                                    value={formData.contact}
                                    onChange={handleInputChange}
                                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-3 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                    required
                                />
                            </div>
                            <div>
                                <label htmlFor="time" className="block text-sm font-medium text-gray-700">Preferred Contact Time</label>
                                <input
                                    type="datetime-local"
                                    id="time"
                                    name="time"
                                    value={formData.time}
                                    onChange={handleInputChange}
                                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-3 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                    required
                                />
                            </div>
                            <div className="flex justify-end space-x-4">
                                <button
                                    type="button"
                                    onClick={closeModal}
                                    className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400 flex items-center space-x-2"
                                >
                                    <i className="fas fa-times"></i>
                                    <span>Cancel</span>
                                </button>
                                <button
                                    type="submit"
                                    className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 flex items-center space-x-2"
                                >
                                    <i className="fas fa-paper-plane"></i>
                                    <span>Submit</span>
                                </button>
                            </div>
                        </form>
                    </div>
                </div>

            )}
        </div>
    );
}

export default SingleProduct;

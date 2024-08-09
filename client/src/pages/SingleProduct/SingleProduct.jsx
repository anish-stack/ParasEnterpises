import React, { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom';
import AutoMotive from '../../components/Products/AutomotiveProducts';

import axios from 'axios';
import Heading from '../../components/Heading/Heading';
const SingleProduct = ({ handleAddToCart }) => {

    const location = useLocation();
    const navigate = useNavigate();
    const { id } = useParams()
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
    const [product, setProduct] = useState([])
    const [relative, setRelative] = useState([])

    const toggleAccordion = (index) => {
        setOpenAccordionIndex(openAccordionIndex === index ? null : index);
    };
    const BackendUrl = import.meta.env.VITE_REACT_APP_BACKEND_URL;

    const handleFetchProduct = async () => {
        try {
            const response = await axios.get(`${BackendUrl}/get-single-product/${id}`);
            console.log(response.data.product)
            // Assuming relatedProducts is a property of response.data
            const relatedProducts = response.data.relatedProducts || [];

            // Check if product data exists
            if (!response.data.product) {
                return <p>Loading .....</p>;
            }

            // Set the fetched product data
            setProduct([response.data.product]);
            setRelative(relatedProducts)

        } catch (error) {
            console.error("Error fetching product data:", error);
        }
    };

    useEffect(() => {
        handleFetchProduct()
    }, [id])

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



    const addtoCart = (product) => {
        handleAddToCart(product, quantity);
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
                        <a href="/" className="text-blue-500">Products</a>
                        <span className="mx-2">/</span>
                    </li>
                    <li className="flex items-center text-gray-800">{product.map((items) => items.ProductName)}</li>
                </ol>
            </nav>
            {/* Product Details */}
            {product && product.map((item, index) => (
                <div className='' key={index}>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {/* Product Image */}
                        <div>
                            <img src={item.MainImage.url} alt={`${item.ProductName + 'Images'}`} className="w-full h-auto md:h-[70%] aspect-square object-contain" />
                        </div>
                        {/* Product Information */}
                        <div>
                            <h2 className="text-2xl font-semibold mb-2">{item.ProductName}</h2>
                            <p className="text-gray-600 mb-4">{item.Category}</p>
                            <p>{item.SmallDescription}</p>
                            <div className="flex items-center mt-2 mb-4">
                                <span className="text-lg font-semibold mr-2"><i className="fa-solid mr-1 fa-rupee-sign"></i>{item.PriceAfterDiscount.toFixed(0)}</span>
                                <del className="text-red-500"><i className="fa-solid mr-1 fa-rupee-sign"></i>{item.Price}</del>
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
                                <button onClick={() => addtoCart(item)} className="bg-gray-800 text-white px-4 py-2 rounded-md hover:bg-gray-900 focus:outline-none">Add to Cart</button>
                            </div>
                        </div>
                    </div>
                    <div className='w-full mx-auto px-4 py-5'>
                        <div className=''>
                            <img src={item.DataSheet.url} alt="" />
                        </div>
                    </div>
                    {/* Accordion for Product Specifications */}
                    <div className="mt-8">
                        <h3 className="text-xl font-semibold mb-4">Product Specifications</h3>
                        <div>
                            {item.Specifications.map((specification, index) => (
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
                </div>

            ))}


            {relative.length > 0 ? (
                <div>
                    <Heading level="1" className="text-blue-600">
                        Related  <span data-aos="fade-up" className='text-red-400'>Products</span>
                    </Heading>
                    <div className="w-full md:max-w-7xl mx-auto py-5 px-2 md:py-8">
                        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-2 md:gap-8">
                            {relative.map((item, index) => (
                                <Link
                                    to={`/Single-Product/${item._id}?&productName=${item.ProductName.replace(/\s+/g, '-')}`}
                                    key={item.id}
                                    data-aos="zoom-y-out"
                                    data-aos-delay="50"
                                    className="bg-white shadow-md rounded-lg overflow-hidden"
                                >
                                    <img
                                        src={item.MainImage.url}
                                        alt={item.ProductName}
                                        className="w-full h-32 md:h-48 object-cover"
                                    />
                                    <div className="p-1 md:p-4">
                                        <p className='text-sm border-b-2 w-1/2 border-b-red-300'>{item.Category}</p>
                                        <h2 className="text-xl font-semibold mt-3 mb-2">{item.ProductName}</h2>
                                        <p className="text-gray-600 truncate mb-2">{item.SmallDescription.substring(1, 22) + '......'}</p>
                                        <div className="flex justify-between items-center">
                                            <span className="text-gray-800">
                                                <i className="fa-solid mr-1 fa-rupee-sign"></i>{item.Price}
                                            </span>
                                            <span className="text-sm text-red-500 line-through">
                                                <i className="fa-solid mr-1 fa-rupee-sign"></i>{item.Price + item.PriceAfterDiscount}
                                            </span>
                                        </div>
                                        <div className="md:flex justify-between gap-1 mb-2 py-3 mt-4 items-center">
                                            <Link
                                                to={'/Checkout'}
                                                className="bg-blue-500 block w-full text-xs md:w-auto md:truncate hover:bg-blue-700 text-white mb-3 md:mb-0 font-bold py-2 px-4 rounded"
                                            >
                                                Buy Now
                                            </Link>
                                            <Link
                                                to={'/Cart'}
                                                className="bg-green-400 block w-full md:w-auto text-xs hover:bg-green-500 text-white mb-3 md:mb-0 font-bold py-2 px-4 rounded"
                                            >
                                                Add to Cart <i className="fa-solid fa-cart-plus"></i>
                                            </Link>
                                        </div>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </div>
                </div>
            ) : (
                <AutoMotive />
            )}




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

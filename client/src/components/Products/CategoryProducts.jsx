import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';

const CategoryProducts = () => {
    const { Name } = useParams();
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const BackendUrl = import.meta.env.VITE_REACT_APP_BACKEND_URL;

    useEffect(() => {
        const handleFetch = async () => {
            try {
                const formattedName = Name.replace(/-/g, ' ');
                setLoading(true);
                const res = await axios.get(`${BackendUrl}/get-product-by-categories/${formattedName}`);
                // console.log(res.data)
                setProducts(res.data); // Assuming the response data is an array of products
            } catch (error) {
                setError('Error fetching products.');
                console.error('Error fetching products:', error);
            } finally {
                setLoading(false);
            }
        };

        handleFetch();
    }, [Name, BackendUrl]);

    if (loading) return (
        <div className="flex flex-col items-center justify-center min-h-screen py-8 px-4">
            <div className="text-center">
                <i className="fa-solid fa-hourglass-end text-4xl text-blue-500 mb-4 animate-spin"></i>
                <p className="text-lg font-semibold text-gray-800 mb-2">Please hold on...</p>
                <p className="text-gray-600 mb-4">We are fetching some amazing products for you!</p>
                <i className="fa-solid fa-face-laugh-beam text-yellow-400 text-2xl"></i>
            </div>
        </div>
    );


    if (error) return (
        <div className="flex flex-col items-center justify-center min-h-screen py-8 px-4">
            <div className="text-center">
                <i className="fa-solid fa-face-sad-tear text-4xl text-red-500 mb-4"></i>
                <p className="text-lg font-semibold text-gray-800 mb-2">Sorry, we have no products in this category right now.</p>
                <p className="text-gray-600 mb-4">We are working hard to add more items to our list.</p>
                <i className="fa-solid fa-heart text-red-400 text-2xl"></i>
            </div>
        </div>
    );


    return (
        <div>
            <div className='max-w-7xl mx-auto p-5 '>
                <nav className="text-gray-700 mb-6">
                    <ol className="flex items-center space-x-4">
                        <li className="flex items-center">
                            <Link to="/" className="text-blue-600 hover:text-blue-800 font-semibold">
                                Home
                            </Link>
                            <svg className="w-4 h-4 mx-2 text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                <path d="M10.293 4.293a1 1 0 011.414 0L15 7.586a1 1 0 010 1.414l-3.293 3.293a1 1 0 01-1.414-1.414L13.586 9H4a1 1 0 010-2h9.586L10.293 4.293z" />
                            </svg>
                        </li>
                        <li className="flex items-center">
                            <Link to="/" className="text-blue-600 hover:text-blue-800 font-semibold">
                                Products Of Category
                            </Link>
                            <svg className="w-4 h-4 mx-2 text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                <path d="M10.293 4.293a1 1 0 011.414 0L15 7.586a1 1 0 010 1.414l-3.293 3.293a1 1 0 01-1.414-1.414L13.586 9H4a1 1 0 010-2h9.586L10.293 4.293z" />
                            </svg>
                        </li>
                        <li className="text-gray-800 font-semibold">{Name}</li>
                    </ol>
                </nav>
                <hr />
            </div>

            <span data-aos="fade-up" className='text-red-400'> /</span>

            <div className="w-full md:max-w-7xl mx-auto py-5 px-2 md:py-8">
                <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-2 md:gap-8">
                    {products && products.map(product => (
                        <Link to={`/Single-Product/${product._id}?&productName=${product.ProductName.replace(/\s+/g, '-')}`} key={product._id} data-aos="zoom-y-out" data-aos-delay="50" className="bg-white shadow-md rounded-lg overflow-hidden">
                            <img src={product.MainImage.url} alt={product.ProductName} className="w-full h-32 md:h-48 object-cover" />
                            <div className="p-1 md:p-4">
                                <p className='text-sm border-b-2 w-1/2 border-b-red-300'>{product.Category}</p>
                                <h2 className="text-xl font-semibold mt-3 mb-2">{product.ProductName}</h2>
                                <p className="text-gray-600 truncate mb-2">{product.SmallDescription.substring(0, 22) + '......'}</p>
                                <div className="flex justify-between items-center">
                                    <span className="text-gray-800">
                                        <i className="fa-solid mr-1 fa-rupee-sign"></i>{product.Price}
                                    </span>
                                    <span className="text-sm text-red-500 line-through">
                                        <i className="fa-solid mr-1 fa-rupee-sign"></i>{product.Price + product.DiscountPercentage}
                                    </span>
                                </div>
                                {product.isStockOut && (
                                    <div className="bg-red-500 text-white text-xs font-semibold px-2 py-1 rounded absolute top-2 right-2">
                                        Out Of Stock
                                    </div>
                                )}
                                <div className="md:flex justify-between gap-1 mb-2 py-3 mt-4 items-center">
                                    <Link to={'/Checkout'} className="bg-blue-500 block w-full text-xs md:w-auto md:truncate hover:bg-blue-700 text-white mb-3 md:mb-0 font-bold py-2 px-4 rounded">
                                        Buy Now
                                    </Link>
                                    <Link to={`/Single-Product/${product._id}?&productName=${product.ProductName.replace(/\s+/g, '-')}`} className="bg-red-400 block w-full md:w-auto text-xs hover:bg-red-500 text-white mb-3 md:mb-0 font-bold py-2 px-4 rounded">
                                        Add to Cart <i className="fa-solid fa-cart-plus"></i>
                                    </Link>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default CategoryProducts;

import React, { useEffect } from 'react'
import AOS from "aos";
import "aos/dist/aos.css";
import Heading from '../Heading/Heading';
import { Link } from 'react-router-dom';
const AutoMotive = () => {
    useEffect(() => {
        AOS.init({
            disable: "phone",
            duration: 700,
            easing: "ease-out-cubic",
        });
    }, []);
    const Data = [
        {
            id: 1,
            name: "Product 1",
            category: "Category 1",
            description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
            image: "https://via.placeholder.com/150",
            price: 50.00,
            discount: 10.00,
            active: true
        },
        {
            id: 2,
            name: "Product 2",
            category: "Category 2",
            description: "Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
            image: "https://via.placeholder.com/150",
            price: 35.00,
            discount: 5.00,
            active: false
        },
        {
            id: 3,
            name: "Product 3",
            category: "Category 1",
            description: "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
            image: "https://via.placeholder.com/150",
            price: 70.00,
            discount: 15.00,
            active: true
        },
        {
            id: 4,
            name: "Product 4",
            category: "Category 1",
            description: "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
            image: "https://via.placeholder.com/150",
            price: 70.00,
            discount: 15.00,
            active: true
        },
        {
            id: 5,
            name: "Product 5",
            category: "Category 1",
            description: "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
            image: "https://via.placeholder.com/150",
            price: 70.00,
            discount: 15.00,
            active: true
        },
        {
            id: 6,
            name: "Product 6",
            category: "Category 1",
            description: "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
            image: "https://via.placeholder.com/150",
            price: 70.00,
            discount: 15.00,
            active: true
        },
        {
            id: 7,
            name: "Product 7",
            category: "Category 1",
            description: "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
            image: "https://via.placeholder.com/150",
            price: 70.00,
            discount: 15.00,
            active: true
        },
        {
            id: 8,
            name: "Product 8",
            category: "Category 1",
            description: "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
            image: "https://via.placeholder.com/150",
            price: 70.00,
            discount: 15.00,
            active: true
        }
    ];
    return (
        <div>
            <Heading level="1" className="text-blue-600">Auto-Motive <span data-aos="fade-up" className='text-red-400'>Products</span></Heading>
            <div className=" w-full md:max-w-7xl  mx-auto py-5 px-2 md:py-8">
                <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-2 md:gap-8">
                    {Data.map(product => (
                        <Link to={`/Single-Product?id=${product.id}`} key={product.id} data-aos="zoom-y-out" data-aos-delay="50" className="bg-white shadow-md rounded-lg overflow-hidden">
                            <img src={product.image} alt={product.name} className="w-full  h-32 md:h-48 object-cover" />
                            <div className=" p-1 md:p-4">
                                <p className='text-sm border-b-2 w-1/2  border-b-red-300'>{product.category}</p>
                                <h2 className="text-xl font-semibold mt-3 mb-2">{product.name}</h2>
                                <p className="text-gray-600 truncate mb-2">{product.description}</p>
                                <div className="flex justify-between items-center">
                                    <span className="text-gray-800"><i className="fa-solid mr-1 fa-rupee-sign"></i>{product.price}</span>
                                    <span className="text-sm text-red-500 line-through"><i className="fa-solid mr-1 fa-rupee-sign"></i>{product.price + product.discount}</span>
                                </div>
                                <div className="md:flex justify-between gap-1 mb-2 py-3 mt-4 items-center">
                                    <button className="bg-blue-500 w-full text-xs md:w-auto md:truncate hover:bg-blue-700 text-white mb-3 md:mb-0 font-bold py-2 px-4 rounded">Buy Now</button>
                                    <button className="bg-red-400 w-full md:w-auto text-xs hover:bg-red-500 text-white mb-3 md:mb-0 font-bold py-2 px-4 rounded">Add to Cart <i className="fa-solid fa-cart-plus"></i> </button>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default AutoMotive

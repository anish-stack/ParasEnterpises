import React, { useEffect, useState } from 'react';
import axios from 'axios';
import AOS from "aos";
import "aos/dist/aos.css";
import Heading from '../Heading/Heading';
import { Link } from 'react-router-dom';
const Products = ({handleAddToCart}) => {
    useEffect(() => {
        AOS.init({
            disable: "phone",
            duration: 700,
            easing: "ease-out-cubic",
        });
    }, []);
    const [products, setProduct] = useState([]);

    const handleFetch = async () => {
        try {
            const res = await axios.get('https://www.api.parasenterprises.com/api/v1/get-all-product');
            const reverseData = res.data.product
            // console.log(res.data.product)
            const filterIsLatestProduct = reverseData.filter((item) => item.isLatestProduct && item.isStockOut ===false)
            const main = filterIsLatestProduct.reverse()
            setProduct(main)
            // console.log(products)
        } catch (error) {
            console.error('There was an error fetching the products!', error);
        }
    }
    useEffect(() => {
        handleFetch()
    }, [])
    return (
        <div>
            <Heading level="1" className="text-blue-600">Latest <span data-aos="fade-up" className='text-blue-400'>Products</span></Heading>
            <div className=" w-full md:max-w-7xl  mx-auto py-5 px-2 md:py-8">
                <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-2 md:gap-8">
                    {products && products.map(product => (
                        <Link to={`/Single-Product/${product._id}?&productName=${product.ProductName.replace(/\s+/g, '-')}`} key={product.id} data-aos="zoom-y-out" data-aos-delay="50" className="bg-white shadow-md rounded-lg overflow-hidden">
                            <img src={product.MainImage.url} alt={product.ProductName} className="w-full  h-32 md:h-48 object-cover" />
                            <div className=" p-1 md:p-4">
                                <p className='text-sm border-b-2 w-1/2  border-b-red-300'>{product.Category}</p>
                                <h2 className="text-xl font-semibold mt-3 mb-2">{product.ProductName}</h2>
                                <p className="text-gray-600 truncate mb-2">{product.SmallDescription.substring(1, 22) + '......'}</p>
                                <div className="flex justify-between items-center">
                                    <span className="text-gray-800"><i className="fa-solid mr-1 fa-rupee-sign"></i>{product.Price}</span>
                                    <span className="text-sm text-red-500 line-through"><i className="fa-solid mr-1 fa-rupee-sign"></i>{product.Price + product.PriceAfterDiscount}</span>
                                </div>
                                {product.isStockOut === true && (
                                    <div className="bg-red-500 text-white text-xs font-semibold px-2 py-1 rounded absolute top-2 right-2">
                                        Out Of Stock
                                    </div>
                                )}

                                <div className="md:flex justify-between gap-1 mb-2 py-3 mt-4 items-center">
                                    <Link to={'/Checkout'} className="bg-blue-500 block w-full text-xs md:w-auto md:truncate hover:bg-blue-700 text-white mb-3 md:mb-0 font-bold py-2 px-4 rounded">Buy Now</Link>
                                    <Link to={`/Single-Product/${product._id}?&productName=${product.ProductName.replace(/\s+/g, '-')}`} className="bg-green-400 block w-full md:w-auto text-xs hover:bg-green-500 text-white mb-3 md:mb-0 font-bold py-2 px-4 rounded">Add to Cart <i className="fa-solid fa-cart-plus"></i> </Link>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default Products

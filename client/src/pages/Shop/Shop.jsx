import React, { useState } from 'react';
import Heading from '../../components/Heading/Heading';
import { Link } from 'react-router-dom';

const Shop = () => {
    const Location = window.location
    const searchValue = Location.search.substring(1);
    console.log(searchValue)
    const [filters, setFilters] = useState({
        category: '',
        sortBy: '',
        priceRange: { min: 0, max: 100 },
    });

    // Pagination state
    const [currentPage, setCurrentPage] = useState(1);
    const productsPerPage = 6;
    
    const products = [
        { id: 1, name: "Product 1", category: "Category 1", description: "Lorem ipsum dolor sit amet.", image: "https://via.placeholder.com/150", price: 50.00, discount: 10.00, active: true },
        { id: 2, name: "Product 2", category: "Category 2", description: "Sed do eiusmod tempor.", image: "https://via.placeholder.com/150", price: 35.00, discount: 5.00, active: false },
        { id: 3, name: "Product 3", category: "Category 1", description: "Ut enim ad minim veniam.", image: "https://via.placeholder.com/150", price: 70.00, discount: 15.00, active: true },
        { id: 4, name: "Product 4", category: "Category 1", description: "Duis aute irure dolor in reprehenderit.", image: "https://via.placeholder.com/150", price: 80.00, discount: 20.00, active: true },
        { id: 5, name: "Product 5", category: "Category 2", description: "Excepteur sint occaecat cupidatat non proident.", image: "https://via.placeholder.com/150", price: 60.00, discount: 5.00, active: false },
        { id: 6, name: "Product 6", category: "Category 3", description: "Sunt in culpa qui officia deserunt.", image: "https://via.placeholder.com/150", price: 55.00, discount: 5.00, active: true },
        { id: 7, name: "Product 7", category: "Category 3", description: "Mollit anim id est laborum.", image: "https://via.placeholder.com/150", price: 95.00, discount: 10.00, active: true },
        { id: 8, name: "Product 8", category: "Category 1", description: "Lorem ipsum dolor sit amet, consectetur.", image: "https://via.placeholder.com/150", price: 100.00, discount: 15.00, active: true },
        { id: 9, name: "Product 9", category: "Category 2", description: "Adipiscing elit, sed do eiusmod tempor.", image: "https://via.placeholder.com/150", price: 40.00, discount: 10.00, active: true },
        { id: 10, name: "Product 10", category: "Category 3", description: "Incididunt ut labore et dolore magna aliqua.", image: "https://via.placeholder.com/150", price: 85.00, discount: 20.00, active: true },
    ];

    const handleFilterChange = (e) => {
        const { name, value } = e.target;
        setFilters({ ...filters, [name]: value });
    };

    const handlePriceRangeChange = (e) => {
        const { name, value } = e.target;
        setFilters({ ...filters, priceRange: { ...filters.priceRange, [name]: Number(value) } });
    };

    const filteredProducts = products
        .filter(product =>
            (!filters.category || product.category === filters.category) &&
            (product.price >= filters.priceRange.min && product.price <= filters.priceRange.max)
        )
        .sort((a, b) => {
            if (filters.sortBy === 'price-asc') return a.price - b.price;
            if (filters.sortBy === 'price-desc') return b.price - a.price;
            if (filters.sortBy === 'name-asc') return a.name.localeCompare(b.name);
            if (filters.sortBy === 'name-desc') return b.name.localeCompare(a.name);
            return 0;
        });

    // Pagination logic
    const indexOfLastProduct = currentPage * productsPerPage;
    const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
    const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);

    // Change page
    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    return (
        <div className="shop min-h-screen p-3 mx-auto w-full">
            <Heading level="1" className="text-blue-600">Our <span className='text-red-400'>Shop</span></Heading>

            <div className="flex items-center justify-center max-w-7xl mx-auto gap-7 flex-col md:flex-row">
                {/* Sticky Filters */}
                <div className="filters p-3 shadow-xl  w-full lg:min-h-screen md:w-1/5 mb-8 md:mb-0 md:sticky md:top-0 md:left-0">
                    <h2 className="text-xl font-semibold mb-4">Filters</h2>
                    <div className='grid grid-cols-3 gap-3 lg:grid-cols-1'>
                        <div className="mb-4">
                            <label className="block mb-2">Category</label>
                            <select
                                name="category"
                                value={filters.category}
                                onChange={handleFilterChange}
                                className="w-full p-2 border rounded">
                                <option value="">All</option>
                                <option value="Category 1">Category 1</option>
                                <option value="Category 2">Category 2</option>
                                <option value="Category 3">Category 3</option>
                            </select>
                        </div>
                        <div className="mb-4">
                            <label className="block mb-2">Sort By</label>
                            <select
                                name="sortBy"
                                value={filters.sortBy}
                                onChange={handleFilterChange}
                                className="w-full p-2 border rounded">
                                <option value="">None</option>
                                <option value="price-asc">Price: Low to High</option>
                                <option value="price-desc">Price: High to Low</option>
                                <option value="name-asc">Name: A to Z</option>
                                <option value="name-desc">Name: Z to A</option>
                            </select>
                        </div>
                        <div className="mb-4">
                            <label className="block mb-2">Price Range</label>
                            <div className="flex items-center">
                                <input
                                    type="number"
                                    name="min"
                                    value={filters.priceRange.min}
                                    onChange={handlePriceRangeChange}
                                    className="w-1/2 p-2 border rounded mr-2"
                                    placeholder="Min"
                                />
                                <input
                                    type="number"
                                    name="max"
                                    value={filters.priceRange.max}
                                    onChange={handlePriceRangeChange}
                                    className="w-1/2 p-2 border rounded"
                                    placeholder="Max"
                                />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Products */}
                <div className="products w-full md:w-4/5 grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {currentProducts.map(product => (
                        <Link to={`/Single-Product?id=${product.id}`} key={product.id} className="bg-white shadow-md rounded-lg overflow-hidden">
                            <img src={product.image} alt={product.name} className="w-full h-32 md:h-48 object-cover" />
                            <div className="p-1 md:p-4">
                                <p className="text-sm border-b-2 w-1/2 border-b-red-300">{product.category}</p>
                                <h2 className="text-xl font-semibold mt-3 mb-2">{product.name}</h2>
                                <p className="text-gray-600 truncate mb-2">{product.description}</p>
                                <div className="flex justify-between items-center">
                                    <span className="text-gray-800"><i className="fas fa-rupee-sign mr-1"></i>{product.price}</span>
                                    <span className="text-sm text-red-500 line-through"><i className="fas fa-rupee-sign mr-1"></i>{product.price + product.discount}</span>
                                </div>
                                <div className="md:flex justify-between gap-1 mb-2 py-3 mt-4 items-center">
                                    <button className="bg-blue-500 w-full text-xs md:w-auto md:truncate hover:bg-blue-700 text-white mb-3 md:mb-0 font-bold py-2 px-4 rounded">Buy Now</button>
                                    <button className="bg-green-400 w-full md:w-auto text-xs hover:bg-green-500 text-white mb-3 md:mb-0 font-bold py-2 px-4 rounded">Add to Cart <i className="fas fa-cart-plus"></i></button>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>

            {/* Pagination */}
            <div className="pagination mt-4 flex justify-center">
                {Array.from({ length: Math.ceil(filteredProducts.length / productsPerPage) }, (_, i) => (
                    <button key={i} onClick={() => paginate(i + 1)} className={`mx-1 px-3 py-1 bg-gray-200 hover:bg-gray-400 ${currentPage === i + 1 ? 'bg-gray-400 text-white' : 'text-gray-800'}`}>
                        {i + 1}
                    </button>

                ))}
            </div>

        </div>
    )
}

export default Shop




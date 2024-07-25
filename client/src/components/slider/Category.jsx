import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Category = () => {
  const [categories, setCategories] = useState([]);
  const BackendUrl = import.meta.env.VITE_REACT_APP_BACKEND_URL;

  const handleFetch = async () => {
    try {
      const res = await axios.get(`${BackendUrl}/get-all-categories`);
      const reverseData = res.data.categories.slice(0, 3).reverse();
      setCategories(reverseData.reverse());
    } catch (error) {
      console.error('There was an error fetching the categories!', error);
    }
  };

  useEffect(() => {
    handleFetch();
  }, []);

  return (
    <div className="py-2 h-[75vh] bg-blue-500 px-2">
      <div className="max-w-7xl mx-auto">
        {categories.map((category, index) => (
          <div
            key={index}
            className="relative bg-white mb-3 shadow-md rounded-lg overflow-hidden hover:shadow-lg transition-shadow duration-300"
          >
            <img
              src={category.image.url}
              alt={category.name}
              className="w-full h-[10.5rem] object-cover"
            />
            <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-300">
              <Link
                to={`/Category-Products/${category.name.replace(/\s+/g, '-')}`}
                className="inline-block bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition-colors duration-300"
              >
                <i className="fa-solid fa-arrow-right"></i>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Category;

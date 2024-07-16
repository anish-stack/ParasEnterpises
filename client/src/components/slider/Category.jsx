import React from 'react';

const categories = [
  {
    img: "https://parasenterprises.com/heat_Shrink_tubing_Automotive.png",
    name: "Category 1",
    link: "/shop/category-1"
  },
  {
    img: "https://parasenterprises.com/image2_72.jpg",
    name: "Category 2",
    link: "/shop/category-2"
  },
  {
    img: "https://parasenterprises.com/stress_control_tube.jpg",
    name: "Category 3",
    link: "/shop/category-3"
  }
];

const Category = () => {
  return (
    <div className="py-2 h-[75vh] bg-blue-500 px-2">
      <div className="max-w-7xl mx-auto">
        {categories.map((category, index) => (
          <div
            key={index}
            className="relative bg-white mb-3 shadow-md rounded-lg overflow-hidden hover:shadow-lg transition-shadow duration-300"
          >
            <img
              src={category.img}
              alt={category.name}
              className="w-full h-[10.5rem] object-cover"
            />
            <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-300">
              <a
                href={category.link}
                className="inline-block bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition-colors duration-300"
              >
                <i className="fa-solid fa-arrow-right"></i>
              </a>
            </div>
            
          </div>
        ))}
      </div>
    </div>
  );
};

export default Category;

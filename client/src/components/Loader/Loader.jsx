import React from 'react';
import LoaderImage from './Picture1.png';
import './Loader.css'; // Import CSS file for loader styles

const Loader = () => {
  return (
    <div className="flex items-center justify-center h-screen bg-white">
      <div className="flex flex-col items-center">
        {/* Apply animation classes to the image */}
        <img src={LoaderImage} alt="Paras Enterprises" className="loader-image animate-blink animate-zoom h-24 w-auto mb-4" />
        <p className="text-lg font-semibold text-gray-800">Paras Enterprises</p>
      </div>
    </div>
  );
};

export default Loader;

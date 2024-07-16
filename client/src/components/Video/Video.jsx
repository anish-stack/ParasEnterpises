import React from 'react';
import Heading from '../Heading/Heading';

const Video = () => {
    return (

        <div className="p-4">
            <Heading level="1" className="text-blue-600">Video <span className='text-red-400'>Gallery</span></Heading>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <div className="relative overflow-hidden rounded-lg shadow-lg transform hover:scale-105 transition-transform duration-300">
                    <iframe width="560" height="315" src="https://www.youtube.com/embed/UgmXo7RhaCc?si=1KNDyV_r18Y_hdEi" title="YouTube video player" frameborder="0"   allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
                </div>
                <div className="relative overflow-hidden rounded-lg shadow-lg transform hover:scale-105 transition-transform duration-300">
                    <iframe width="560" height="315" src="https://www.youtube.com/embed/UgmXo7RhaCc?si=1KNDyV_r18Y_hdEi" title="YouTube video player" frameborder="0"   allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
                </div>
                <div className="relative overflow-hidden rounded-lg shadow-lg transform hover:scale-105 transition-transform duration-300">
                    <iframe width="560" height="315" src="https://www.youtube.com/embed/UgmXo7RhaCc?si=1KNDyV_r18Y_hdEi" title="YouTube video player" frameborder="0"   allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
                </div>
            </div>
        </div>


    );
}

export default Video;

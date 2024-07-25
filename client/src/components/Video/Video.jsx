import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Heading from '../Heading/Heading';
import { Link } from 'react-router-dom'
const Video = () => {
    const [videos, setVideos] = useState([]);
    const [visibleCount, setVisibleCount] = useState(6);
    const BackendUrl = import.meta.env.VITE_REACT_APP_BACKEND_URL;

    // Function to fetch videos
    const handleFetch = async () => {
        try {
            const res = await axios.get(`${BackendUrl}/get-all-video`);
            const filterData = res.data.data.filter((item) => item.isActive);
            const reverseData = filterData.reverse();
            setVideos(reverseData);
        } catch (error) {
            console.error('There was an error fetching the videos!', error);
        }
    };

    useEffect(() => {
        handleFetch();
    }, []);

    // Function to handle "View More" button click
    const handleViewMore = () => {
        setVisibleCount((prevCount) => prevCount + 6);
    };

    // Determine the videos to display based on visibleCount
    const displayedVideos = videos.slice(0, visibleCount);

    return (
        <div className="p-4 max-w-[1400px] mx-auto">
            <Heading level="1" className="text-blue-600">
                Video <span className='text-red-400'>Gallery</span>
            </Heading>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {displayedVideos.length > 0 ? (
                    displayedVideos.map((video) => (
                        <div
                            key={video._id}
                            className="relative overflow-hidden rounded-lg shadow-lg transform  transition-transform duration-300"
                            dangerouslySetInnerHTML={{ __html: video.VideoUrl }}
                        />
                    ))
                ) : (
                    <p>No videos available</p>
                )}
            </div>
            {videos.length > 6 && displayedVideos.length < videos.length && (
                <div className="text-center mt-4">
                    <Link
                        to={'/View-more-Videos'}
                        className="bg-red-500 py-3 px-5 text-white rounded-3xl"
                    >
                        View More
                    </Link>
                </div>
            )}
        </div>
    );
};

export default Video;

import React, { useState, useEffect } from 'react';
import axios from 'axios'; // Ensure axios is imported
import Heading from '../../components/Heading/Heading';
import { Link } from 'react-router-dom';

const NewsSection = () => {
    const [news, setNews] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [searchTerm, setSearchTerm] = useState('');
    const itemsPerPage = 8;

    useEffect(() => {
        handleFetch(); // Fetch news on component mount
    }, []);

    const handleFetch = async () => {
        try {
            const res = await axios.get('http://localhost:7000/api/v1/get-all-news');
            const reverseData = res.data;
            const main = reverseData.reverse();
            setNews(main);
        } catch (error) {
            console.error('There was an error fetching the news!', error);
        }
    };

    // Pagination logic
    const indexOfLastNews = currentPage * itemsPerPage;
    const indexOfFirstNews = indexOfLastNews - itemsPerPage;
    const currentNews = news.slice(indexOfFirstNews, indexOfLastNews);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    return (
        <section className="max-w-7xl mx-auto py-12 px-4">
            <Heading level="1" className="text-blue-600">Latest <span data-aos="fade-up" className='text-red-400'>News</span></Heading>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {currentNews.map((item) => (
                    <Link to={`/single-news/${item._id}`} key={item._id} className="bg-white rounded-lg overflow-hidden shadow-lg">
                        <img
                            src={item.ImageOfNews || 'https://upload.wikimedia.org/wikipedia/commons/1/14/No_Image_Available.jpg'}
                            onError={(e) => e.target.src = "https://upload.wikimedia.org/wikipedia/commons/1/14/No_Image_Available.jpg"}
                            alt={item.Headline}
                            className="w-full h-48 object-cover object-center"
                        />


                        <div className="p-6">
                            <p className="text-gray-500 text-sm">{new Date(item.DateOfNews).toLocaleDateString()}</p>
                            <hr className="my-4" />
                            <h3 className="text-xl font-semibold mb-4">{item.Headline}</h3>
                            <p className="text-gray-600">
                                {item.SubHeading.length > 100 ? `${item.SubHeading.substring(0, 100)}...` : item.SubHeading}
                            </p>
                            <div className="mt-4">
                                <button className="bg-red-600 text-white py-2 px-4 rounded-md flex items-center space-x-2 hover:bg-red-700">
                                    <i className="fab fa-readme"></i>
                                    <span>Read More</span>
                                </button>
                            </div>
                        </div>
                    </Link>
                ))}

            </div>

            {/* Pagination */}
            {news.length > itemsPerPage && (
                <div className="flex justify-center mt-8">
                    {[...Array(Math.ceil(news.length / itemsPerPage)).keys()].map((pageNumber) => (
                        <button
                            key={pageNumber + 1}
                            onClick={() => paginate(pageNumber + 1)}
                            className={`mx-1 px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 focus:outline-none ${currentPage === pageNumber + 1 ? 'bg-gray-300' : ''}`}
                        >
                            {pageNumber + 1}
                        </button>
                    ))}
                </div>
            )}
        </section>
    );
};

export default NewsSection;

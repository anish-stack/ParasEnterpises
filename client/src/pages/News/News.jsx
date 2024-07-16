import React, { useState } from 'react';
import Heading from '../../components/Heading/Heading';
import { Link } from 'react-router-dom';

const NewsSection = () => {
    // Example news data with real content
    const [currentPage, setCurrentPage] = useState(1);
    const newsPerPage = 6;

    const newsItems = [
        {
            id: 1,
            title: "New Discoveries in Space Exploration",
            image: "https://plus.unsplash.com/premium_photo-1688561384438-bfa9273e2c00?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8bmV3c3xlbnwwfHwwfHx8MA%3D%3D",
            content: "Scientists have recently discovered a new exoplanet orbiting a distant star, bringing new insights into planetary formation."
        },
        {
            id: 2,
            title: "Advancements in Renewable Energy Technologies",
            image: "https://images.unsplash.com/photo-1588681664899-f142ff2dc9b1?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8bmV3c3xlbnwwfHwwfHx8MA%3D%3D",
            content: "Researchers have developed a breakthrough solar panel technology that promises to increase efficiency by 30%."
        },
        {
            id: 3,
            title: "Impact of AI on Healthcare",
            image: "https://images.unsplash.com/photo-1572949645841-094f3a9c4c94?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8bmV3c3xlbnwwfHwwfHx8MA%3D%3D",
            content: "Artificial Intelligence is revolutionizing healthcare with predictive analytics and personalized treatment plans."
        },
        {
            id: 4,
            title: "Global Climate Change Initiatives",
            image: "https://plus.unsplash.com/premium_photo-1688561383203-31fed3d85417?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8bmV3c3xlbnwwfHwwfHx8MA%3D%3D",
            content: "World leaders are convening to discuss new strategies to combat climate change and reduce carbon emissions."
        },
        {
            id: 5,
            title: "Breakthroughs in Quantum Computing",
            image: "https://plus.unsplash.com/premium_photo-1664297878197-0f50d094db72?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTN8fG5ld3N8ZW58MHx8MHx8fDA%3D",
            content: "Scientists achieve quantum supremacy with a new quantum computing algorithm, paving the way for faster calculations."
        },
        {
            id: 6,
            title: "Future of Autonomous Vehicles",
            image: "https://images.unsplash.com/photo-1475721027785-f74eccf877e2?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjB8fG5ld3N8ZW58MHx8MHx8fDA%3D",
            content: "Autonomous vehicles are expected to transform transportation systems globally with improved safety and efficiency."
        },
        {
            id: 7,
            title: "Advancements in Medical Research",
            image: "https://via.placeholder.com/400x250",
            content: "Researchers develop a new vaccine delivery system that enhances vaccine efficacy against infectious diseases."
        },
        {
            id: 8,
            title: "Space Tourism Becomes Reality",
            image: "https://via.placeholder.com/400x250",
            content: "Commercial space travel companies announce plans for regular tourist flights to low Earth orbit and beyond."
        },
        {
            id: 9,
            title: "Ethical AI Development Guidelines",
            image: "https://via.placeholder.com/400x250",
            content: "Global organizations establish ethical guidelines for AI development to ensure fairness and transparency."
        }
    ];

    // Pagination logic
    const indexOfLastNews = currentPage * newsPerPage;
    const indexOfFirstNews = indexOfLastNews - newsPerPage;
    const currentNews = newsItems.slice(indexOfFirstNews, indexOfLastNews);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    return (
        <section className="max-w-7xl mx-auto py-12 px-4">
                        <Heading level="1" className="text-blue-600">Latest <span data-aos="fade-up" className='text-red-400'>News</span></Heading>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {currentNews.map((item) => (
                    <Link to={'/single-news'} key={item.id} className="bg-white rounded-lg overflow-hidden shadow-lg">
                        <img src={item.image} alt={item.title} className="w-full h-48 object-cover object-center" />
                        <div className="p-6">
                            <h3 className="text-xl font-semibold mb-4">{item.title}</h3>
                            <p className="text-gray-600">{item.content}</p>
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
            {newsItems.length > newsPerPage && (
                <div className="flex justify-center mt-8">
                    {[...Array(Math.ceil(newsItems.length / newsPerPage)).keys()].map((pageNumber) => (
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
}

export default NewsSection;

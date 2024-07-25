import React, { useEffect, useState } from 'react';
import axios from 'axios'
import { useParams } from 'react-router-dom';

const SingleNews = () => {

    const [SingleNews, setSingleNews] = useState([])
    const { id } = useParams()
    const BackendUrl = import.meta.env.VITE_REACT_APP_BACKEND_URL;

    const fetchNews = async () => {
        try {
            const response = await axios.get(`${BackendUrl}/get-single-news/${id}`)
            setSingleNews([response.data])
            console.log(response.data)
        } catch (error) {
            console.log(error)
        }
    }
    useEffect(() => {
        fetchNews()
    }, [id])

    return (
        <div className="bg-gray-100 min-h-screen">
            <div className="max-w-7xl mx-auto px-4 py-8">
                {/* Breadcrumbs */}
                <nav className="text-gray-600 mb-4">
                    <ol className="list-none p-0 inline-flex">
                        <li className="flex items-center">
                            <a href="/" className="text-blue-500 hover:underline">Home</a>
                            <span className="mx-2">/</span>
                        </li>
                        <li className="flex items-center">
                            <a href="/news" className="text-blue-500 hover:underline">News</a>
                            <span className="mx-2">/</span>
                        </li>
                        <li className="text-gray-800">New Exam Standards Implemented Worldwide</li>
                    </ol>
                </nav>

                {/* News Title and Date */}
                {/* <div className="text-center mb-8">
                    <h1 className="text-4xl font-bold text-blue-600 mb-4">New Exam Standards Implemented Worldwide</h1>
                    <p className="text-sm text-gray-500">June 26, 2024</p>
                </div> */}

                {/* News Sections */}
                <div className="mt-8">
                    {SingleNews.map((item, index) => (
                        <>
                            <div className="text-start mb-8">
                                <h1 className="text-4xl font-bold text-blue-600 mb-4">{item.Headline}</h1>
                                <p className="text-sm text-gray-500">{new Date(item.DateOfNews).toLocaleDateString()}</p>
                            </div>
                            {/* Section 1: Two Photos */}
                            <div className="grid grid-cols-1 md:grid-cols-1 gap-8">
                                <div className="relative overflow-hidden rounded-lg  shadow-lg ">
                                    <img src={item.ImageOfNews} alt="Exam Standards Image 1" className=" w-full aspect-auto object-cover" />
                                </div>
                                {/* <div className="relative overflow-hidden rounded-lg shadow-lg aspect-w-1 aspect-h-1">
                                    <img src="https://www.paripoornaacademy.com/neetcoachingcenter/images/paripoorna-neet-m-bannar-2.jpg" alt="Exam Standards Image 2" className="object-cover" />
                                </div> */}
                            </div>
                            <p className="text-lg p-2 text-gray-500">{item.SubHeading}</p>

                            {/* Section 2: Single Photo with Content */}
                            <div className="mt-8 grid grid-cols-1  gap-8 items-center">
                                    <div dangerouslySetInnerHTML={{ __html: item.NewsData }}></div>
                               
                            </div>

                      

                        </>
                    ))}


                </div>
            </div>
        </div>
    );
}

export default SingleNews;

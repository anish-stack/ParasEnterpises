import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Heading from '../Heading/Heading';

function Testimonial() {
    const [logos, setLogos] = useState([]);

    const handleFetch = async () => {
        try {
            const res = await axios.get('https://parasenterpises.onrender.com/api/v1/get-all-company-logos');
            // Update the state with the fetched data
            setLogos(res.data.data || []);
        } catch (error) {
            console.error('There was an error fetching the logos!', error);
        }
    };

    useEffect(() => {
        handleFetch();
    }, []);

    return (
        <>
            {logos.length > 0 && (
                <section className="py-24">
                    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                        <div className="mb-20 text-center">
                            <Heading level="1" className="text-blue-600">
                                Our <span data-aos="fade-up" className='text-blue-400'>Partners</span>
                            </Heading>
                            <h1 className="text-4xl text-gray-900 font-bold">We work with the best partners</h1>
                        </div>
                        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 xl:grid-cols-5">
                            {logos.map((logo) => (
                                <a
                                    key={logo._id}
                                    href="#"
                                    className="flex justify-center items-center border border-solid border-gray-200 shadow-sm h-24 rounded-2xl"
                                >
                                    <img className="h-20 w-full" src={logo.image.url} alt="Company Logo" />
                                </a>
                            ))}
                        </div>
                    </div>
                </section>
            )}
        </>
    );
}

export default Testimonial;

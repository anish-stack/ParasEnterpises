import React from 'react';
import Heading from '../Heading/Heading';

const Certification = () => {
    return (
        <div className="flex flex-col items-center py-10">
                        <Heading level="1" className="text-blue-600">Our <span data-aos="fade-up" className='text-red-400'>Certifications</span></Heading>

            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-6"></h2>
            <div className="w-full md:max-w-7xl">
                <div className="flex flex-col md:flex-row p-2 justify-between md:space-x-4 overflow-hidden">
                    <div className="w-full mb-2 md:w-1/2 bg-red-100 shadow-md rounded-lg p-6 inline-block">
                        <p className="text-xl font-semibold mb-2 text-blue-900">Quality & Safety Certificate</p>
                        <p className="text-blue-800">
                            Paras Enterprises is committed to delivering products of the highest quality standards. Our Quality & Safety Certificate confirms that our products meet industry safety regulations and quality benchmarks.
                        </p>
                        <p className="text-blue-800">
                            UL certificate:
                            <ul className="list-disc pl-6 text-blue-800">
                                <li>UL Approved</li>
                                <li>UL 224 125ºC</li>
                                <li>VW-1 600V</li>
                            </ul>
                        </p>
                    </div>
                    <div className="w-full mb-2 md:w-1/2 bg-red-100 shadow-md rounded-lg p-6 inline-block">
                        <p className="text-xl font-semibold mb-2 text-red-900">CSA certificate:</p>
                        <p className="text-red-800">
                            The CSA certificate signifies that our products meet the safety and performance requirements outlined by the Canadian Standards Association (CSA). Our products are certified for use in various applications, ensuring reliability and compliance with industry standards.
                        </p>
                        <p className="text-red-800">CSA 125ºC / 600V OFT</p>
                    </div>
                </div>
                <div className="border-t border-gray-300 mt-6"></div>
            </div>
        </div>
    );
}

export default Certification;

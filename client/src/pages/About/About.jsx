import React from 'react';
import Video from '../../components/Video/Video';

const About = () => {
  return (
    <>

      <div className="max-w-5xl mx-auto p-4">
        <h1 className="text-3xl font-bold mb-4" data-aos="fade-up">About Paras Enterprises</h1>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8" data-aos="fade-up">
          <div>
            <p className="mb-4">
              We are one of the leading marketing organizations for a wide range of heat shrinkable products and solutions
              in India. Established in 1996, we have built a strong reputation for providing high-quality products and
              excellent service.
            </p>
            <p className="mb-4">
              Our product range includes splice protection sleeves, fusion splicing solutions, ribbon splice protection
              sleeves, micro sleeves, flame retardant heat shrinkable tubes, and much more. We cater to various industries
              such as railways, defense, automotive, electronics, and telecommunications.
            </p>
            <p className="mb-4">
              At Paras Enterprises, customer satisfaction is our top priority. With over 1000 satisfied customers and
              channel partners, we continuously strive to exceed expectations through prompt delivery, efficient after-sales
              service, and technical support.
            </p>
          </div>
          <div>
            <h2 className="text-xl font-bold mb-4">Our Strengths</h2>
            <ul className="list-disc ml-6 mb-4">
              <li>Technical support service to provide technical information and application guidelines.</li>
              <li>Continuous monitoring of delivery performance and lead times.</li>
              <li>Responsive distribution network to customers.</li>
            </ul>
            <h2 className="text-xl font-bold mb-4">Specifications and Approvals</h2>
            <ul className="list-disc ml-6 mb-4">
              <li>UL 224 VW1</li>
              <li>CSA Approved</li>
              <li>ROHS Compliance</li>
            </ul>
          </div>
        </div>
        <div className="mt-8" data-aos="fade-up">
          <h2 className="text-2xl font-bold mb-4">Mission and Vision</h2>
          <p className="mb-4">
            Our mission is to deliver innovative and reliable heat shrinkable products and solutions that exceed our
            customers' expectations and contribute to their success.
          </p>
          <p className="mb-4">
            Our vision is to be the preferred partner for heat shrinkable products and solutions, known for our commitment
            to quality, service, and customer satisfaction.
          </p>
        </div>
        <div className="flex justify-center my-8" data-aos="fade-up">
          <button className="bg-blue-500 text-white px-6 py-3 rounded-full shadow-lg hover:shadow-xl transition duration-300 transform hover:scale-105 mr-4">
            Contact Us
          </button>
          <button className="bg-red-500 text-white px-6 py-3 rounded-full shadow-lg hover:shadow-xl transition duration-300 transform hover:scale-105">
            Shop Now
          </button>
        </div>

      </div>

      <Video />
    </>
  );
};

export default About;

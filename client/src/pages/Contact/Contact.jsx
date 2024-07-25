import React, { useState } from 'react';
import Heading from '../../components/Heading/Heading';
import axios from 'axios';
import { toast } from 'react-hot-toast'
const Contact = () => {
    const [formData, setFormData] = useState({
        Email: '',
        Name: '',
        ContactNumber: '',
        Message: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value
        }));
    };

    const BackendUrl = import.meta.env.VITE_REACT_APP_BACKEND_URL;

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(`${BackendUrl}/create-contact`, formData);
            console.log(response)
   
            toast.success('Message sent successfully!');
            setFormData({
                Email: '',
                Name: '',
                ContactNumber: '',
                Message: ''
            });
        } catch (error) {
      
            toast.error('Failed to send message. Please try again.');
        }
    };

    return (
        <div className="py-10 bg-gray-100">
       
            <div className="max-w-7xl mx-auto px-4">
                <Heading level="1" className="text-blue-600">Contact <span data-aos="fade-up" className='text-red-400'>Us</span></Heading>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Address */}
                    <div data-aos="flip-up" className="bg-white shadow-md rounded-lg p-6">
                        <div className="flex items-center mb-4">
                            <i className="fas fa-map-marker-alt text-red-500 mr-3"></i>
                            <p className="text-gray-800">Regd Office: 122, Gagandeep Building, Rajendra Place, New Delhi - 110008</p>
                        </div>
                        <div className="flex items-center">
                            <i className="fas fa-map-marker-alt text-red-500 mr-3"></i>
                            <p className="text-gray-800">Branch Office: J-13/11, Rajouri Garden, New Delhi - 110027, INDIA</p>
                        </div>
                    </div>
                    {/* Phone and Email */}
                    <div data-aos="flip-up" className="bg-white shadow-md rounded-lg p-6">
                        <div className="flex items-center mb-4">
                            <i className="fas fa-phone text-red-500 mr-3"></i>
                            <p className="text-gray-800">Phone: +91-9311333254, 9811151571</p>
                        </div>
                        <div className="flex items-center">
                            <i className="fas fa-envelope text-red-500 mr-3"></i>
                            <p className="text-gray-800">Email: info@parasenterprises.com, paras71@rediffmail.com</p>
                        </div>
                    </div>
                </div>
                {/* Contact Form */}
                <div className='w-full flex flex-col md:flex-row items-center justify-between gap-4'>
                    <div className='w-full lg:w-3/5' data-aos="fade-right">
                        <form className="mt-8" onSubmit={handleSubmit}>
                            <div className="mb-4">
                                <label htmlFor="Name" className="block text-gray-800 font-semibold mb-2">Name</label>
                                <input type="text" id="Name" name="Name" value={formData.Name} onChange={handleChange} className="w-full border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500" required />
                            </div>
                            <div className="mb-4">
                                <label htmlFor="Email" className="block text-gray-800 font-semibold mb-2">Email</label>
                                <input type="email" id="Email" name="Email" value={formData.Email} onChange={handleChange} className="w-full border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500" required />
                            </div>
                            <div className="mb-4">
                                <label htmlFor="ContactNumber" className="block text-gray-800 font-semibold mb-2">Contact Number</label>
                                <input type="tel" id="ContactNumber" name="ContactNumber" value={formData.ContactNumber} onChange={handleChange} className="w-full border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500" required />
                            </div>
                            <div className="mb-4">
                                <label htmlFor="Message" className="block text-gray-800 font-semibold mb-2">Message</label>
                                <textarea id="Message" name="Message" value={formData.Message} onChange={handleChange} rows="5" className="w-full border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500" required></textarea>
                            </div>
                            <button type="submit" className="bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600 focus:outline-none focus:bg-blue-600">Send Message</button>
                        </form>
                    </div>
                    <div className='w-full lg:w-2/5' data-aos="fade-left">
                        <iframe title="Google Map" className="w-full mt-8" height="400" src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14008.149415163966!2d77.12606757454474!3d28.646760983946355!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390ce4ecec43b609%3A0x61c8a0b47b5ed0f2!2sRajendra%20Place%2C%20New%20Delhi%2C%20Delhi%20110008!5e0!3m2!1sen!2sin!4v1623971357315!5m2!1sen!2sin" allowFullScreen loading="lazy"></iframe>
                    </div>
                    {/* Embedded Google Maps */}
                </div>
            </div>
        </div>
    );
}

export default Contact;

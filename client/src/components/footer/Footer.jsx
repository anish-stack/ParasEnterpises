import React from 'react';

const Footer = () => {
    return (
        <footer className="bg-gray-800 text-white py-8">
            <div className="max-w-7xl mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {/* Address */}
                    <div>
                        <h3 className="text-lg font-bold mb-4">Paras Enterprises</h3>
                        <p>Regd Office: 122, Gagandeep Building, Rajendra Place, New Delhi - 110008, INDIA</p>
                        <p>Branch Office: J-13/11, Rajouri Garden, New Delhi - 110027, INDIA</p>
                        <p>Phone: +91-9311333254, 9811151571</p>
                    </div>
                    {/* Quick Links */}
                    <div>
                        <h3 className="text-lg font-bold mb-4">Quick Links</h3>
                        <ul>
                            <li><a href="/About">About Us</a></li>
                            <li><a href="/Shop">Shop</a></li>
                            <li><a href="/Offers">Offers</a></li>
                            <li><a href="/Contact">Contact Us</a></li>
                        </ul>
                    </div>
                         {/* Quick Links */}
                    <div>
                        <h3 className="text-lg font-bold mb-4">Policies</h3>
                        <ul>
                            <li><a href="/Terms-And-Conditions">Term & Conditions</a></li>
                            <li><a href="/Privacy-Policy">Privacy Policy</a></li>
                            <li><a href="/Shipping-Policy">Shipping Policy</a></li>
                            <li><a href="/Refund-Policy">Return & Refund</a></li>
                        </ul>
                    </div>
                    {/* Social Icons */}
                    <div>
                        <h3 className="text-lg font-bold mb-4">Follow Us</h3>
                        <div className="flex space-x-4">
                            <a href="#" className="text-white hover:text-gray-400">
                                <i className="fab fa-facebook-f"></i>
                            </a>
                            <a href="#" className="text-white hover:text-gray-400">
                                <i className="fab fa-twitter"></i>
                            </a>
                            <a href="#" className="text-white hover:text-gray-400">
                                <i className="fab fa-instagram"></i>
                            </a>
                        </div>
                    </div>
                </div>
                {/* Copyright */}
                <div className="border-t border-gray-600 mt-8 pt-4 text-sm text-center">
                    <p>&copy; 2024 Paras Enterprises. All rights reserved.</p>
                    <p>Terms of Service | Privacy Policy</p>
                </div>
            </div>
        </footer>
    );
}

export default Footer;

import React, { useEffect } from 'react';
import 'tailwindcss/tailwind.css';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { Link } from 'react-router-dom';

const PaymentSuccess = () => {
  const orderInfo = {
    orderId: '123456789',
    estimatedDelivery: '5-7 business days',
    items: [
      {
        id: 1,
        name: 'Product 1',
        quantity: 2,
        price: 200,
      },
      {
        id: 2,
        name: 'Product 2',
        quantity: 1,
        price: 150,
      },
    ],
    totalAmount: 550,
  };

  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  return (
    <div className="max-w-5xl mx-auto p-6">
      <div className="flex flex-col items-center lg:flex-row lg:justify-between">
        <div className="lg:w-1/2 p-6" data-aos="fade-up">
          <h2 className="text-3xl font-bold mb-4 text-red-500">Payment Successful!</h2>
          <p className="mb-4 text-lg">Thank you for your purchase. Your order has been placed successfully.</p>
          <div className="bg-white shadow-sm rounded-lg p-6 mb-4">
            <h3 className="text-xl font-bold mb-2">Order Information</h3>
            <p className="mb-2"><strong>Order ID:</strong> {orderInfo.orderId}</p>
            <p className="mb-2"><strong>Estimated Delivery:</strong> {orderInfo.estimatedDelivery}</p>
            <h4 className="text-lg font-bold mt-4 mb-2">Items:</h4>
            <ul className="list-disc pl-5">
              {orderInfo.items.map(item => (
                <li key={item.id} className="mb-2">
                  {item.name} - Quantity: {item.quantity} - Price: <i className="fa-solid fa-rupee-sign"></i> {item.price}
                </li>
              ))}
            </ul>
            <p className="font-bold mt-4 text-lg">Total Amount: <i className="fa-solid fa-rupee-sign"></i> {orderInfo.totalAmount}</p>
          </div>
          <Link to={'/Shop'} className="bg-gradient-to-r from-blue-500 to-indigo-500 text-white px-6 py-3 rounded-full shadow-lg hover:shadow-xl transition duration-300 transform hover:scale-105">
            Shop More
          </Link>
        </div>
        <div className="hidden lg:block lg:w-1/2 p-6" data-aos="fade-left">
          <img src="https://i.ibb.co/T0wvNJf/image.png" alt="Success" className="w-full h-auto rounded-lg " />
        </div>
      </div>
    </div>
  );
};

export default PaymentSuccess;

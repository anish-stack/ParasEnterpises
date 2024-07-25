import React, { useEffect, useState } from 'react';
import 'tailwindcss/tailwind.css';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { Link, useLocation } from 'react-router-dom';
import axios from 'axios';

const PaymentSuccess = () => {
  const location = useLocation();
  const [orderId, setOrderid] = useState(null);
  const [orderInfo, setOrderInfo] = useState(null);

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const OrderId = queryParams.get('Order');
    setOrderid(OrderId);
  }, [location]);

  const BackendUrl = import.meta.env.VITE_REACT_APP_BACKEND_URL;

  const handlefetchOrder = async () => {
    try {
      const res = await axios.get(`${BackendUrl}/Order-Information/${orderId}`);
      setOrderInfo(res.data.order);
    } catch (error) {
      console.error('Error fetching order:', error);
    }
  };

  useEffect(() => {
    if (orderId) {
      handlefetchOrder();
    }
    AOS.init({ duration: 1000 });
  }, [orderId]);

  if (!orderInfo) return <p className="text-center text-lg">Loading...</p>;

  return (
    <div className="max-w-5xl mx-auto p-6">
      <div className="flex flex-col items-center lg:flex-row lg:justify-between">
        <div className="lg:w-1/2 p-6" data-aos="fade-up">
          <h2 className="text-3xl font-bold mb-4 text-red-500">Payment Successful!</h2>
          <p className="mb-4 text-lg">Thank you for your purchase. Your order has been placed successfully.</p>
          <div className="bg-white shadow-sm rounded-lg p-6 mb-4">
            <h3 className="text-xl font-bold mb-2">Order Information</h3>
            <p className="mb-2"><strong>Order ID:</strong> {orderInfo._id}</p>
            <p className="mb-2"><strong>Transaction ID:</strong> {orderInfo.paymentStatus === 'COD' ? "Cash On Delivery" : orderInfo.transactionId}</p>
            <p className="mb-2"><strong>{orderInfo.paymentStatus === 'COD' ? "Unpaid Amount" : "Amount Paid"}:</strong> <i className="fa-solid fa-rupee-sign"></i> {orderInfo.reqBodyData?.CartItems?.finalPrice}</p>
            <h4 className="text-lg font-bold mt-4 mb-2">Items:</h4>
            <ul className="list-disc pl-5">
              {orderInfo.reqBodyData.CartItems.cartItems.map((item, index) => (
                <li key={index} className="mb-2 flex items-center">
                  <img src={item.product.MainImage.url} alt={item.product.ProductName} className="w-16 h-16 inline-block mr-2" />
                  <div>
                    {item.product.ProductName} - Quantity: {item.quantity} - Price: <i className="fa-solid fa-rupee-sign"></i> {item.product.PriceAfterDiscount}
                  </div>
                </li>
              ))}
            </ul>
          </div>
          <Link to={'/'} className="bg-gradient-to-r from-blue-500 to-indigo-500 text-white px-6 py-3 rounded-full shadow-lg hover:shadow-xl transition duration-300 transform hover:scale-105">
            Shop More
          </Link>
        </div>
        <div className="hidden lg:block lg:w-1/2 p-6" data-aos="fade-left">
          <img src="https://i.ibb.co/T0wvNJf/image.png" alt="Success" className="w-full h-auto rounded-lg" />
        </div>
      </div>
    </div>
  );
};

export default PaymentSuccess;

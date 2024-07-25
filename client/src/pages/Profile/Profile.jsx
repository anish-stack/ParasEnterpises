import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Profile = () => {
    const [user, setUser] = useState(null);
    const [order, setOrder] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [ordersPerPage] = useState(8);
    const [activeTab, setActiveTab] = useState('Online');
    const [showModal, setShowModal] = useState(false);
    const [isEdit, setIsEdit] = useState(false);
    const [deliveryAddress, setDeliveryAddress] = useState({
        city: '',
        pincode: '',
        houseNo: '',
        street: '',
        nearByLandMark: ''
    });

    const BackendUrl = import.meta.env.VITE_REACT_APP_BACKEND_URL;
    const token = localStorage.getItem('ParasUserToken');

    const fetchUserDetails = async () => {
        try {
            const res = await axios.get(`${BackendUrl}/user-details`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            setUser(res.data.user);
            setOrder(res.data.orders || []);
        } catch (error) {
            setError('Failed to fetch user details.');
            console.error('Error fetching user details:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchUserDetails();
    }, []);

    if (loading) return <p>Loading...</p>;

    if (error) return <p>{window.location.href = "/"}</p>;

    const indexOfLastOrder = currentPage * ordersPerPage;
    const indexOfFirstOrder = indexOfLastOrder - ordersPerPage;
    const currentOrders = order
        .filter(o => o.reqBodyData.paymentMode === activeTab)
        .slice(indexOfFirstOrder, indexOfLastOrder);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    const handleLogout = async () => {
        try {
            const res = await axios.get(`${BackendUrl}/Logout`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            console.log(res.data);
            localStorage.clear();
            window.location.href = "/";
        } catch (error) {
            console.log(error);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setDeliveryAddress({
            ...deliveryAddress,
            [name]: value,
        });
    };

    const handleAddDeliveryAddress = async () => {
        try {
            const response = await axios.post(`${BackendUrl}/Add-Delivery-Address`, deliveryAddress, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            console.log('Delivery address added:', response.data);
            setShowModal(false);
            fetchUserDetails();  // Fetch updated user details
        } catch (error) {
            console.error('Error adding delivery address:', error);
        }
    };

    const handleEditDeliveryAddress = (address) => {
        setDeliveryAddress({
            city: address.City,
            pincode: address.PinCode,
            houseNo: address.HouseNo,
            street: address.Street,
            nearByLandMark: address.NearByLandMark,
        });
        setIsEdit(true);
        setShowModal(true);
    };

    const handleUpdateDeliveryAddress = async () => {
        try {
            const response = await axios.post(`${BackendUrl}/update-Delivery-Address`, deliveryAddress, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            console.log('Delivery address updated:', response.data);
            setShowModal(false);
            fetchUserDetails();  // Fetch updated user details
        } catch (error) {
            console.error('Error updating delivery address:', error);
        }
    };

    const handleSubmit = () => {
        if (isEdit) {
            handleUpdateDeliveryAddress();
        } else {
            handleAddDeliveryAddress();
        }
    };

    return (
        <div className="bg-gray-100 min-h-screen p-6">
            <div className="max-w-7xl mx-auto bg-white rounded-lg shadow-lg p-6">
                <div className="flex items-center mb-6">
                    <i className="fa-solid fa-user text-4xl text-blue-600 mr-4"></i>
                    <h1 className="text-3xl font-bold">Profile</h1>
                </div>
                {user ? (
                    <div>
                        <p className="text-xl font-semibold mb-2"><strong>Name:</strong> {user.FullName}</p>
                        <p className="text-xl mb-2"><strong>Email:</strong> {user.Email}</p>
                        <p className="text-xl mb-4"><strong>Contact Number:</strong> {user.ContactNumber}</p>

                        <h2 className="text-2xl font-semibold mb-4">User Address</h2>
                        <hr className='w-1/3 border border-black' />
                        {user.DeliveryAddress ? (
                            <>
                                <p className="text-lg mb-2"><strong>City:</strong> {user.DeliveryAddress.City}</p>
                                <p className="text-lg mb-2"><strong>HouseNo:</strong> {user.DeliveryAddress.HouseNo}</p>
                                <p className="text-lg mb-2"><strong>Near by Landmark:</strong> {user.DeliveryAddress.NearByLandMark}</p>
                                <p className="text-lg mb-2"><strong>Pincode:</strong> {user.DeliveryAddress.PinCode}</p>
                                <p className="text-lg mb-2"><strong>Street Address:</strong> {user.DeliveryAddress.Street}</p>

                                <button
                                    onClick={() => handleEditDeliveryAddress(user.DeliveryAddress)}
                                    className="px-4 py-2 bg-red-500 text-white rounded-r-lg"
                                >
                                    Edit Delivery Address
                                </button>
                                <h2 className="text-2xl font-semibold mb-4">Orders</h2>
                            </>
                        ) : (
                            <button
                                onClick={() => setShowModal(true)}
                                className="px-4 mt-5 mb-5 py-2 bg-green-500 text-white rounded-r-lg"
                            >
                                Add Delivery Address
                            </button>
                        )}
                        
                        {/* Tab Navigation */}
                        <div className="mb-4">
                            <button
                                onClick={() => setActiveTab('Online')}
                                className={`px-4 py-2 ${activeTab === 'Online' ? 'bg-blue-500 text-white' : 'bg-gray-200'} rounded-l-lg`}
                            >
                                Online Payment
                            </button>
                            <button
                                onClick={() => setActiveTab('COD')}
                                className={`px-4 py-2 ${activeTab === 'COD' ? 'bg-blue-500 text-white' : 'bg-gray-200'} rounded-r-lg`}
                            >
                                Cash on Delivery
                            </button>
                        </div>

                        {currentOrders.length > 0 ? (
                            <div className="overflow-x-auto">
                                <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
                                    <thead className="bg-gray-50">
                                        <tr>
                                            <th className="py-2 px-4 border-b-2 border-gray-200">Order ID</th>
                                            <th className="py-2 px-4 border-b-2 border-gray-200">Payment Status</th>
                                            <th className="py-2 px-4 border-b-2 border-gray-200">Amount Paid</th>
                                            <th className="py-2 px-4 border-b-2 border-gray-200">Transaction ID</th>
                                            <th className="py-2 px-4 border-b-2 border-gray-200">Delivery Address</th>
                                            <th className="py-2 px-4 border-b-2 border-gray-200">Status</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {currentOrders.map(order => (
                                            <tr key={order._id} className="bg-white">
                                                <td className="py-2 px-4 border-b border-gray-200">{order._id}</td>
                                                <td className="py-2 px-4 border-b border-gray-200">{order.paymentStatus}</td>
                                                <td className="py-2 px-4 border-b border-gray-200">₹{order.reqBodyData?.CartItems?.finalPrice}</td>
                                                <td className="py-2 px-4 border-b border-gray-200">{order.transactionId || "COD"}</td>
                                                <td className="py-2 px-4 border-b border-gray-200">{order.reqBodyData.streetAddress}, {order.reqBodyData.city}, {order.reqBodyData.pincode}</td>
                                                <td className="py-2 px-4 border-b border-gray-200">{order.status}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        ) : (
                            <p>No orders found.</p>
                        )}

                        {/* Pagination */}
                        <div className="mt-4">
                            {Array.from({ length: Math.ceil(order.length / ordersPerPage) }, (_, index) => (
                                <button
                                    key={index}
                                    onClick={() => paginate(index + 1)}
                                    className={`px-3 py-1 ${currentPage === index + 1 ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
                                >
                                    {index + 1}
                                </button>
                            ))}
                        </div>
                    </div>
                ) : (
                    <p>No user data available.</p>
                )}

                <div className="mt-4">
                    <button
                        onClick={handleLogout}
                        className="px-4 py-2 bg-red-500 text-white rounded"
                    >
                        Logout
                    </button>
                </div>
            </div>

            {/* Modal for adding/editing delivery address */}
            {showModal && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-white p-6 rounded-lg shadow-lg">
                        <h2 className="text-xl font-bold mb-4">{isEdit ? 'Edit Delivery Address' : 'Add Delivery Address'}</h2>
                        <form>
                            <div className="mb-4">
                                <label htmlFor="city" className="block text-sm font-semibold">City</label>
                                <input
                                    type="text"
                                    id="city"
                                    name="city"
                                    value={deliveryAddress.city}
                                    onChange={handleInputChange}
                                    className="w-full px-4 py-2 border rounded-lg"
                                />
                            </div>
                            <div className="mb-4">
                                <label htmlFor="pincode" className="block text-sm font-semibold">Pincode</label>
                                <input
                                    type="text"
                                    id="pincode"
                                    name="pincode"
                                    value={deliveryAddress.pincode}
                                    onChange={handleInputChange}
                                    className="w-full px-4 py-2 border rounded-lg"
                                />
                            </div>
                            <div className="mb-4">
                                <label htmlFor="houseNo" className="block text-sm font-semibold">House Number</label>
                                <input
                                    type="text"
                                    id="houseNo"
                                    name="houseNo"
                                    value={deliveryAddress.houseNo}
                                    onChange={handleInputChange}
                                    className="w-full px-4 py-2 border rounded-lg"
                                />
                            </div>
                            <div className="mb-4">
                                <label htmlFor="street" className="block text-sm font-semibold">Street</label>
                                <input
                                    type="text"
                                    id="street"
                                    name="street"
                                    value={deliveryAddress.street}
                                    onChange={handleInputChange}
                                    className="w-full px-4 py-2 border rounded-lg"
                                />
                            </div>
                            <div className="mb-4">
                                <label htmlFor="nearByLandMark" className="block text-sm font-semibold">Near By LandMark</label>
                                <input
                                    type="text"
                                    id="nearByLandMark"
                                    name="nearByLandMark"
                                    value={deliveryAddress.nearByLandMark}
                                    onChange={handleInputChange}
                                    className="w-full px-4 py-2 border rounded-lg"
                                />
                            </div>
                            <div className="flex justify-end">
                                <button
                                    type="button"
                                    onClick={handleSubmit}
                                    className="px-4 py-2 bg-blue-500 text-white rounded-lg mr-2"
                                >
                                    {isEdit ? 'Update' : 'Add'}
                                </button>
                                <button
                                    type="button"
                                    onClick={() => setShowModal(false)}
                                    className="px-4 py-2 bg-gray-500 text-white rounded-lg"
                                >
                                    Cancel
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Profile;

import axios from 'axios';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AddShopBanner = () => {
    const [formData, setData] = useState({
        saleBannerTitle: '',
        saleBannerImage: null,
        active: false
    });
    const [isLoading, setIsloding] = useState(false)
    
    const handleChange = (event) => {
        const { name, value, type, checked } = event.target;
        if (type === 'checkbox') {
            setData(prevData => ({
                ...prevData,
                active: checked
            }));
        } else if (type === 'file') {
            setData(prevData => ({
                ...prevData,
                saleBannerImage: event.target.files[0]
            }));
        } else {
            setData(prevData => ({
                ...prevData,
                [name]: value
            }));
        }
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        setIsloding(true)
        console.log(formData)
        const data = new FormData();
        data.append('saleBannerTitle', formData.saleBannerTitle);
        data.append('saleBannerImage', formData.saleBannerImage);
        data.append('active', formData.active);

        try {
            const response = await axios.post('https://www.api.parasenterprises.com/api/v1/create-sale-banner', data, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            setIsloding(false)

            toast.success("Shop Banner Added Successfully !!");
            window.location.href = '/all-shop-banners';
        } catch (error) {
            setIsloding(false)

            console.error('Error:', error);
            toast.error(error.response?.data?.message || 'An error occurred');
        }
    };

    return (
        <>
            <ToastContainer />
            <div className="bread">
                <div className="head">
                    <h4>Add Shop Banner</h4>
                </div>
                <div className="links">
                    <Link to="/all-shop-banners" className="add-new">Back <i className="fa-regular fa-circle-left"></i></Link>
                </div>
            </div>

            <div className="d-form">
                <form className="row g-3" onSubmit={handleSubmit}>
                    <div className="col-md-6">
                        <label htmlFor="saleBannerTitle" className="form-label">Shop Banner Name</label>
                        <input type="text" onChange={handleChange} name='saleBannerTitle' value={formData.saleBannerTitle} className="form-control" id="saleBannerTitle" />
                    </div>
                    <div className="col-md-6">
                        <label htmlFor="saleBannerImage" className="form-label">Shop Banner Image</label>
                        <input type="file" onChange={handleChange} name='saleBannerImage' className="form-control" id="saleBannerImage" />
                    </div>
                    <div className="col-12">
                        <div className="form-check">
                            <input className="form-check-input" onChange={handleChange} type="checkbox" name="active" id="active" checked={formData.active} />
                            <label className="form-check-label" htmlFor="active">
                                Active 
                            </label>
                        </div>
                    </div>
                    <div className="col-12 text-center">
                        <button type="submit" disabled={isLoading} className={`${isLoading ? 'not-allowed':'allowed'}`}>{isLoading ? "Please Wait..." : "Add Shop Banner"}</button>
                    </div>
                </form>
            </div>
        </>
    );
}

export default AddShopBanner;

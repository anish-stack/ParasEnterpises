import axios from 'axios';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AddBanner = () => {
    const [formData, setFormData] = useState({
        title: '',
        image: null,
        active: false
    });
    const [isLoading, setIsLoading] = useState(false);
    
    const handleChange = (event) => {
        const { name, value, type, checked } = event.target;
        if (type === 'checkbox') {
            setFormData(prevData => ({
                ...prevData,
                active: checked
            }));
        } else if (type === 'file') {
            setFormData(prevData => ({
                ...prevData,
                image: event.target.files[0]
            }));
        } else {
            setFormData(prevData => ({
                ...prevData,
                [name]: value
            }));
        }
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        setIsLoading(true);

        const data = new FormData();
        data.append('title', formData.title);
        data.append('image', formData.image);
        data.append('active', formData.active);

        try {
            const response = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/create-main-banner`, data, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            setIsLoading(false);

            toast.success("Banner Added Successfully !!");
            window.location.href = '/all-banners';
        } catch (error) {
            setIsLoading(false);

            console.error('Error:', error);
            toast.error(error.response?.data?.message || 'An error occurred');
        }
    };

    return (
        <>
            <ToastContainer />
            <div className="bread">
                <div className="head">
                    <h4>Add Banner</h4>
                </div>
                <div className="links">
                    <Link to="/all-banners" className="add-new">Back <i className="fa-regular fa-circle-left"></i></Link>
                </div>
            </div>

            <div className="d-form">
                <form className="row g-3" onSubmit={handleSubmit}>
                    <div className="col-md-6">
                        <label htmlFor="title" className="form-label">Banner Name</label>
                        <input type="text" onChange={handleChange} name='title' value={formData.title} className="form-control" id="title" />
                    </div>
                    <div className="col-md-6">
                        <label htmlFor="image" className="form-label">Banner Image</label>
                        <input type="file" onChange={handleChange} name='image' className="form-control" id="image" />
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
                        <button type="submit" disabled={isLoading} className={`${isLoading ? 'not-allowed':'allowed'}`}>{isLoading ? "Please Wait..." : "Add Banner"}</button>
                    </div>
                </form>
            </div>
        </>
    );
};

export default AddBanner;

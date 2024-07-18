import axios from 'axios';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AddCategory = () => {
    const [formData, setData] = useState({
        name: '',
        image: null,
    });
    const [isLoading, setIsLoading] = useState(false);
    
    const handleChange = (event) => {
        const { name, value, type } = event.target;
        if (type === 'file') {
            setData(prevData => ({
                ...prevData,
                image: event.target.files[0]
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
        setIsLoading(true);
        const data = new FormData();
        data.append('name', formData.name);
        data.append('image', formData.image);

        try {
            const response = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/create-category`, data, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            setIsLoading(false);
            toast.success("Category Added Successfully !!");
            window.location.href = '/all-category';
        } catch (error) {
            setIsLoading(false);
            console.error('Error:', error.message);
            toast.error(error.response?.data?.msg || 'An error occurred');
        }
    };

    return (
        <>
            <ToastContainer />
            <div className="bread">
                <div className="head">
                    <h4>Add Category</h4>
                </div>
                <div className="links">
                    <Link to="/all-category" className="add-new">Back <i className="fa-regular fa-circle-left"></i></Link>
                </div>
            </div>

            <div className="d-form">
                <form className="row g-3" onSubmit={handleSubmit}>
                    <div className="col-md-6">
                        <label htmlFor="name" className="form-label">Category Name</label>
                        <input type="text" onChange={handleChange} name='name' value={formData.name} className="form-control" id="name" />
                    </div>
                    <div className="col-md-6">
                        <label htmlFor="image" className="form-label">Category Image</label>
                        <input type="file" onChange={handleChange} name='image' className="form-control" id="image" />
                    </div>
                    <div className="col-12 text-center">
                        <button type="submit" disabled={isLoading} className={`${isLoading ? 'not-allowed':'allowed'}`}>
                            {isLoading ? "Please Wait..." : "Add Category"}
                        </button>
                    </div>
                </form>
            </div>
        </>
    );
}

export default AddCategory;

import axios from 'axios';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AddTag = () => {
    const [formData, setData] = useState({
        title: '',
        TagColour: ''
    });
    const [isLoading, setIsLoading] = useState(false);

    const handleChange=(event,index)=>{
        const {name,value} = event.target;
        setData(prevData =>({
          ...prevData,
          [name]:value
        }))
      }

    const handleSubmit = async (event) => {
        event.preventDefault();

        // Validation
        if (!formData.title || !formData.TagColour) {
            toast.error('Please submit all fields');
            return;
        }

        setIsLoading(true);

        try {
            const response = await axios.post('https://api.swhealthcares.com/api/v1/create-tag', formData);
            setIsLoading(false);
            toast.success("Tag Added Successfully !!");
            // Optionally, redirect or reset the form here
            window.location.href = '/all-tags';
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
                    <h4>Add Tag</h4>
                </div>
                <div className="links">
                    <Link to="/all-tags" className="add-new">Back <i className="fa-regular fa-circle-left"></i></Link>
                </div>
            </div>

            <div className="d-form">
                <form className="row g-3" onSubmit={handleSubmit}>
                    <div className="col-md-6">
                        <label htmlFor="title" className="form-label">Tag Name</label>
                        <input type="text" onChange={handleChange} name='title' value={formData.title} className="form-control" id="title" />
                    </div>
                    <div className="col-md-6">
                        <label htmlFor="TagColour" className="form-label">Tag Color</label>
                        <input type="color" onChange={handleChange} name='TagColour' value={formData.TagColour} className="form-control" id="TagColour" />
                    </div>
                    
                    <div className="col-12 text-center">
                        <button type="submit" disabled={isLoading} className={`${isLoading ? 'not-allowed':'allowed'}`}>
                            {isLoading ? "Please Wait..." : "Add Tag"}
                        </button>
                    </div>
                </form>
            </div>
        </>
    );
}

export default AddTag;

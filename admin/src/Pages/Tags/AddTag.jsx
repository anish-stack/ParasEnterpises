import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AddTag = () => {
    const [formData, setFormData] = useState({
        tagName: '',
        tagColour: ''
    });
    const [isLoading, setIsLoading] = useState(false);
    const [tags, setTags] = useState([]);

    useEffect(() => {
        fetchTags();
    }, []);

    const fetchTags = async () => {
        try {
            const response = await axios.get('https://www.api.parasenterprises.com/api/v1/getAllTag');
            setTags(response.data.data); // Assuming tags are returned in response.data.data
        } catch (error) {
            console.error('Error fetching tags:', error);
            toast.error('Failed to fetch tags');
        }
    };

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData(prevData => ({
            ...prevData,
            [name]: value
        }));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        // Validation
        if (!formData.tagName || !formData.tagColour) {
            toast.error('Please submit all fields');
            return;
        }

        setIsLoading(true);

        try {
            const response = await axios.post('https://www.api.parasenterprises.com/api/v1/createTag', formData);
            setIsLoading(false);
            toast.success("Tag Added Successfully !!");
            // Optionally, redirect or reset the form here
            // window.location.href = '/all-tags';
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
                        <label htmlFor="tagName" className="form-label">Tag Name</label>
                        <input type="text" onChange={handleChange} name='tagName' value={formData.tagName} className="form-control" id="title" />
                    </div>
                    <div className="col-md-6">
                        <label htmlFor="tagColour" className="form-label">Tag Color</label>
                        <input type="color" onChange={handleChange} name='tagColour' value={formData.tagColour} className="form-control" id="TagColour" />
                    </div>

                    <div className="col-12 text-center">
                        <button type="submit" disabled={isLoading} className={`${isLoading ? 'not-allowed' : 'allowed'}`}>
                            {isLoading ? "Please Wait..." : "Add Tag"}
                        </button>
                    </div>
                </form>
            </div>

            {/* Display Tags */}
            {/* <div className="tags-list">
                <h5>Existing Tags</h5>
                <ul>
                    {tags.map((tag, index) => (
                        <li key={index}>{tag.tagName} - <span style={{ backgroundColor: tag.tagColour, padding: '2px 8px', borderRadius: '4px', color: 'white' }}>{tag.tagColour}</span></li>
                    ))}
                </ul>
            </div> */}
        </>
    );
}

export default AddTag;

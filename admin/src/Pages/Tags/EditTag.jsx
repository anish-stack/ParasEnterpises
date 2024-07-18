import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const EditTag = () => {
    const { id } = useParams();

    const [formData, setData] = useState({
        title: '',
        TagColour:''
    });

    const [loading, setLoading] = useState(true); // Add loading state
    const [btnLoading, setBtnLoading] = useState(false);

    const handleChange = (e) => {
        const { name, value, type, checked, files } = e.target;
        if (type === 'checkbox') {
            setData({
                ...formData,
                [name]: checked
            });
        } else if (type === 'file') {
            const file = files[0];
            setData({
                ...formData,
                [name]: file,
                previewImage: URL.createObjectURL(file) // Set preview image URL
            });
        } else {
            setData({
                ...formData,
                [name]: value
            });
        }
    };

    const handleFetch = async () => {
        try {
            const res = await axios.get(`https://api.swhealthcares.com/api/v1/get-all-tag`);
            const tags = res.data.data;
            const filterData = tags.filter((item) => item._id === id);
            if (filterData.length > 0) {
                setData({
                    title: filterData[0].title,
                    TagColour: filterData[0].TagColour,
                });
            }
            setLoading(false); // Set loading to false after data is fetched
        } catch (error) {
            console.error('Error fetching Tags:', error);
            setLoading(false); // Set loading to false even if there's an error
        }
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        setBtnLoading(true)

        try {
            const response = await axios.put(`https://api.swhealthcares.com/api/v1/update-tag/${id}`, formData);
            toast.success("Tag Updated Successfully!");
            setBtnLoading(false);
            window.location.href = '/all-tags';
        } catch (error) {
            setBtnLoading(false)
            console.error('Error updating Tag:', error);
            toast.error(error.response?.data?.message || 'An error occurred');
        }
    };

    useEffect(() => {
        handleFetch();
    }, [id]);

    return (
        <>
            <ToastContainer />
            <div className="bread">
                <div className="head">
                    <h4>Edit Tag</h4>
                </div>
                <div className="links">
                    <Link to="/all-tags" className="add-new">Back <i className="fa-regular fa-circle-left"></i></Link>
                </div>
            </div>

            <div className="d-form">
                {loading ? (
                    <p>Loading...</p>
                ) : (
                    <form className="row g-3" onSubmit={handleSubmit}>
                        <div className="col-md-4">
                            <label htmlFor="title" className="form-label">Tag Name</label>
                            <input type="text" onChange={handleChange} name='title' value={formData.title} className="form-control" id="title" />
                        </div>
                        <div className="col-md-6">
                            <label htmlFor="TagColour" className="form-label">Tag Color</label>
                            <input type="color" onChange={handleChange} name='TagColour' value={formData.TagColour} className="form-control" id="TagColour" />
                        </div>

                        <div className="col-12 text-center">
                            <button type="submit" className={`${btnLoading ? 'not-allowed':'allowed'}`} >{btnLoading ? "Please Wait.." : "Update Tag"} </button>
                        </div>
                    </form>
                )}
            </div>
        </>
    );
};

export default EditTag;

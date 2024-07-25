import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AddProduct = () => {
    const [categories, setCategories] = useState([]);
    const [allTags, setTags] = useState([]);

    const [isLoading, setIsLoading] = useState(false);
    const [imagePreview, setImagePreview] = useState(null); // Single image preview
    const [dataSheetPreview, setDataSheetPreview] = useState(null); // Single DataSheet preview

    const [formData, setFormData] = useState({
        ProductName: '',
        Category: '',
        SmallDescription: '',
        Price: '',
        DiscountPercentage: '',
        PriceAfterDiscount: '',
        HowManyStock: '',
        Tag: '',
        isStockOut: false,
        isLatestProduct: false,
        DataSheet: null, // Single file
        Specifications: [{ title: '', details: '' }],
        MainImage: null, // Single file
    });

    const handleFileChange = (e, fieldName) => {
        const file = e.target.files[0];
        const preview = URL.createObjectURL(file);

        setFormData((prevFormData) => ({
            ...prevFormData,
            [fieldName]: file
        }));

        if (fieldName === 'DataSheet') {
            setDataSheetPreview(preview);
        } else if (fieldName === 'MainImage') {
            setImagePreview(preview);
        }
    };

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        const val = type === 'checkbox' ? checked : value;

        // Create a copy of formData with the updated field
        const updatedFormData = {
            ...formData,
            [name]: val
        };

        // Calculate PriceAfterDiscount if Price or DiscountPercentage is changed
        if (name === 'Price' || name === 'DiscountPercentage') {
            const price = name === 'Price' ? parseFloat(val) : parseFloat(updatedFormData.Price);
            const discountPercentage = name === 'DiscountPercentage' ? parseFloat(val) : parseFloat(updatedFormData.DiscountPercentage);

            if (!isNaN(price) && !isNaN(discountPercentage)) {
                const priceAfterDiscount = price - (price * discountPercentage / 100);
                updatedFormData.PriceAfterDiscount = priceAfterDiscount.toFixed(2);
            } else {
                updatedFormData.PriceAfterDiscount = '';
            }
        }

        // Update the state
        setFormData(updatedFormData);
    };

    const handleSpecsChange = (e, index, field) => {
        const newSpecs = formData.Specifications.slice();
        newSpecs[index] = {
            ...newSpecs[index],
            [field]: e.target.value
        };
        setFormData({
            ...formData,
            Specifications: newSpecs
        });
    };

    const handleAddSpec = () => {
        setFormData({
            ...formData,
            Specifications: [...formData.Specifications, { title: '', details: '' }]
        });
    };

    const handleRemoveSpec = (index) => {
        const newSpecs = formData.Specifications.slice();
        newSpecs.splice(index, 1);
        setFormData({
            ...formData,
            Specifications: newSpecs
        });
    };

    const handleFetch = async () => {
        try {
            const res = await axios.get('http://localhost:7000/api/v1/get-all-categories');
            setCategories(res.data.categories);
            console.log('category', res.data.categories)
        } catch (error) {
            console.error('There was an error fetching the categories!', error);
        }
    };

    const handleTags = async () => {
        try {
            const res = await axios.get('http://localhost:7000/api/v1/getAllTag');
            setTags(res.data.data);
        } catch (error) {
            console.error('There was an error fetching the tags!', error);
        }
    };

    useEffect(() => {
        handleFetch();
        handleTags();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            const formDataToSend = new FormData();

            // Append non-file fields
            for (const key in formData) {
                if (key === 'Specifications') {
                    formData[key].forEach((spec, index) => {
                        formDataToSend.append(`Specifications[${index}][title]`, spec.title);
                        formDataToSend.append(`Specifications[${index}][details]`, spec.details);
                    });
                } else if (key !== 'MainImage' && key !== 'DataSheet') {
                    formDataToSend.append(key, formData[key]);
                }
            }

            // Append MainImage file
            if (formData.MainImage) {
                formDataToSend.append('MainImage', formData.MainImage);
            }

            // Append DataSheet file
            if (formData.DataSheet) {
                formDataToSend.append('DataSheet', formData.DataSheet);
            }

            const response = await axios.post('http://localhost:7000/api/v1/create-product', formDataToSend, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });

            console.log(response.data);
            toast.success('Product Added Successfully');
            setIsLoading(false);
        } catch (error) {
            console.error('Error:', error);
            toast.error("An Error Occurred");
            setIsLoading(false);
        }
    };

    return (
        <>
            <ToastContainer />
            <div className="bread">
                <div className="head">
                    <h4>Add Product</h4>
                </div>
                <div className="links">
                    <Link to="/all-products" className="add-new">Back <i className="fa-regular fa-circle-left"></i></Link>
                </div>
            </div>

            <div className="d-form">
                <form className="row g-3" onSubmit={handleSubmit}>
                    <div className="col-md-6">
                        <label htmlFor="Category" className="form-label">Category</label>
                        <select onChange={handleChange} name='Category' value={formData.Category} className="form-select" id="Category">
                            <option value="">Category</option>
                            {categories && categories.map((category, index) => {
                                return <option key={index} value={category.name}>{category.name}</option>;
                            })}
                        </select>
                    </div>
                    <div className="col-md-6">
                        <label htmlFor="Tag" className="form-label">Tag</label>
                        <select onChange={handleChange} name='Tag' value={formData.Tag} className="form-select" id="Tag">
                            <option value="">Tag</option>
                            {allTags && allTags.map((tag, index) => {
                                return <option key={index} value={tag.tagName}>{tag.tagName}</option>;
                            })}
                        </select>
                    </div>
                    <div className="col-md-12">
                        <label htmlFor="ProductName" className="form-label">Product Name</label>
                        <input type="text" onChange={handleChange} name='ProductName' value={formData.ProductName} className="form-control" id="ProductName" />
                    </div>

                    <div className="col-12">
                        <label className="form-label">Specifications</label>
                        {formData.Specifications.map((spec, index) => (
                            <div key={index} className="d-flex mb-2">
                                <input
                                    type="text"
                                    value={spec.title}
                                    onChange={(e) => handleSpecsChange(e, index, 'title')}
                                    placeholder="Title"
                                    className="form-control me-2"
                                />
                                <input
                                    type="text"
                                    value={spec.details}
                                    onChange={(e) => handleSpecsChange(e, index, 'details')}
                                    placeholder="Details"
                                    className="form-control me-2"
                                />
                                <button type="button" onClick={() => handleRemoveSpec(index)} className="btn btn-danger">Remove</button>
                            </div>
                        ))}
                        <button type="button" onClick={handleAddSpec} className="btn btn-primary">Add Specification</button>
                    </div>

                    <div className="container">
                        <div className="row">
                            <div className="col-md-6">
                                <label htmlFor="MainImage" className="form-label">Main Image</label>
                                <input
                                    type="file"
                                    className="form-control"
                                    id="MainImage"
                                    accept="image/*"
                                    onChange={(e) => handleFileChange(e, 'MainImage')}
                                />
                                {imagePreview && <img src={imagePreview} alt="Preview" className="img-thumbnail mt-2" />}
                            </div>
                            <div className="col-md-6">
                                <label htmlFor="DataSheet" className="form-label">Data Sheet</label>
                                <input
                                    type="file"
                                    className="form-control"
                                    id="DataSheet"

                                    onChange={(e) => handleFileChange(e, 'DataSheet')}
                                />
                                {dataSheetPreview && (
                                    <img
                                        src={dataSheetPreview}
                                        alt="Preview"
                                        className="mt-2 w-full h-48 object-cover"
                                    />
                                )}
                            </div>
                        </div>
                    </div>

                    <div className="col-md-6">
                        <label htmlFor="Price" className="form-label">Price</label>
                        <input type="number" onChange={handleChange} name='Price' value={formData.Price} className="form-control" id="Price" />
                    </div>

                    <div className="col-md-6">
                        <label htmlFor="DiscountPercentage" className="form-label">Discount Percentage</label>
                        <input type="number" onChange={handleChange} name='DiscountPercentage' value={formData.DiscountPercentage} className="form-control" id="DiscountPercentage" />
                    </div>

                    <div className="col-md-6">
                        <label htmlFor="PriceAfterDiscount" className="form-label">Price After Discount</label>
                        <input type="text" value={formData.PriceAfterDiscount} className="form-control" id="PriceAfterDiscount" readOnly />
                    </div>

                    <div className="col-md-6">
                        <label htmlFor="HowManyStock" className="form-label">How Many in Stock</label>
                        <input type="number" onChange={handleChange} name='HowManyStock' value={formData.HowManyStock} className="form-control" id="HowManyStock" />
                    </div>

                    <div className="col-md-6">
                        <label htmlFor="SmallDescription" className="form-label">Small Description</label>
                        <textarea onChange={handleChange} name='SmallDescription' value={formData.SmallDescription} className="form-control" id="SmallDescription" rows="3"></textarea>
                    </div>

                    <div className="col-md-6">
                        <label htmlFor="isStockOut" className="form-label">Out of Stock</label>
                        <input type="checkbox" onChange={handleChange} name='isStockOut' checked={formData.isStockOut} className="form-check-input" id="isStockOut" />
                    </div>

                    <div className="col-md-6">
                        <label htmlFor="isLatestProduct" className="form-label">Latest Product</label>
                        <input type="checkbox" onChange={handleChange} name='isLatestProduct' checked={formData.isLatestProduct} className="form-check-input" id="isLatestProduct" />
                    </div>

                    <div className="col-12 text-center">
                        <button type="submit" className="btn btn-primary" disabled={isLoading}>
                            {isLoading ? 'Adding...' : 'Add Product'}
                        </button>
                    </div>
                </form>
            </div>
        </>
    );
};

export default AddProduct;

import axios from 'axios';
import React, { useEffect, useState, useCallback } from 'react';
import { Link, useParams } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const EditProduct = () => {
    const [categories, setCategories] = useState([]);
    const [allTags, setTags] = useState([]);
    const { id } = useParams();
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

        setFormData(prevFormData => ({
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
        const newSpecs = formData.Specifications.map((spec, i) =>
            i === index ? { ...spec, [field]: e.target.value } : spec
        );
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
        const newSpecs = formData.Specifications.filter((_, i) => i !== index);
        setFormData({
            ...formData,
            Specifications: newSpecs
        });
    };

    const fetchCategories = useCallback(async () => {
        try {
            const res = await axios.get('https://www.api.parasenterprises.com/api/v1/get-all-categories');
            setCategories(res.data.categories);
        } catch (error) {
            console.error('There was an error fetching the categories!', error);
        }
    }, []);

    const fetchTags = useCallback(async () => {
        try {
            const res = await axios.get('https://www.api.parasenterprises.com/api/v1/getAllTag');
            setTags(res.data.data);
        } catch (error) {
            console.error('There was an error fetching the tags!', error);
        }
    }, []);

    const fetchSingleProduct = useCallback(async () => {
        try {
            const res = await axios.get(`https://www.api.parasenterprises.com/api/v1/get-single-product/${id}`);
            const data = res.data.product;

            setFormData({
                ProductName: data.ProductName,
                Category: data.Category,
                SmallDescription: data.SmallDescription,
                Price: data.Price,
                DiscountPercentage: data.DiscountPercentage,
                PriceAfterDiscount: data.PriceAfterDiscount,
                HowManyStock: data.HowManyStock,
                Tag: data.Tag,
                isStockOut: data.isStockOut,
                isLatestProduct: data.isLatestProduct,
                DataSheet: data.DataSheet,
                Specifications: data.Specifications,
                MainImage: data.MainImage,
            });

            if (data.MainImage) {
                setImagePreview(data.MainImage.url);
            }

            if (data.DataSheet) {
                setDataSheetPreview(data.DataSheet.url);
            }
        } catch (error) {
            console.error('There was an error fetching the product!', error);
        }
    }, [id]);

    useEffect(() => {
        fetchCategories();
        fetchTags();
        fetchSingleProduct();
    }, [fetchCategories, fetchTags, fetchSingleProduct]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            const formDataToSend = new FormData();

            // Append non-file fields
            for (const key in formData) {
                if (key === 'Specifications') {
                    formData[key].forEach((item, index) => {
                        formDataToSend.append(`Specifications[${index}].title`, item.title);
                        formDataToSend.append(`Specifications[${index}].details`, item.details);
                    });
                } else if (key !== 'MainImage' && key !== 'DataSheet') {
                    formDataToSend.append(key, formData[key]);
                }
            }

            // Append MainImage file
            if (formData.MainImage instanceof File) {
                formDataToSend.append('MainImage', formData.MainImage);
            }

            // Append DataSheet file
            if (formData.DataSheet instanceof File) {
                formDataToSend.append('DataSheet', formData.DataSheet);
            }

            const response = await axios.put(`https://www.api.parasenterprises.com/api/v1/update-product/${id}`, formDataToSend, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });

            toast.success('Product Updated Successfully');
        } catch (error) {
            console.error('Error:', error);
            toast.error("An Error Occurred");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <>
            <ToastContainer />
            <div className="bread">
                <div className="head">
                    <h4>Edit Product</h4>
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
                            {categories.map((category, index) => (
                                <option key={index} value={category.name}>{category.name}</option>
                            ))}
                        </select>
                    </div>
                    <div className="col-md-6">
                        <label htmlFor="Tag" className="form-label">Tag</label>
                        <select onChange={handleChange} name='Tag' value={formData.Tag} className="form-select" id="Tag">
                            <option value="">Tag</option>
                            {allTags.map((tag, index) => (
                                <option key={index} value={tag.tagName}>{tag.tagName}</option>
                            ))}
                        </select>
                    </div>
                    <div className="col-md-12">
                        <label htmlFor="ProductName" className="form-label">Product Name</label>
                        <input onChange={handleChange} type="text" className="form-control" name="ProductName" id="ProductName" value={formData.ProductName} required />
                    </div>
                    <div className="col-md-12">
                        <label htmlFor="SmallDescription" className="form-label">Small Description</label>
                        <textarea onChange={handleChange} className="form-control" name="SmallDescription" id="SmallDescription" value={formData.SmallDescription} required />
                    </div>
                    <div className="col-md-6">
                        <label htmlFor="Price" className="form-label">Price</label>
                        <input onChange={handleChange} type="number" className="form-control" name="Price" id="Price" value={formData.Price} required />
                    </div>
                    <div className="col-md-6">
                        <label htmlFor="DiscountPercentage" className="form-label">Discount Percentage</label>
                        <input onChange={handleChange} type="number" className="form-control" name="DiscountPercentage" id="DiscountPercentage" value={formData.DiscountPercentage} required />
                    </div>
                    <div className="col-md-6">
                        <label htmlFor="PriceAfterDiscount" className="form-label">Price After Discount</label>
                        <input type="text" className="form-control" name="PriceAfterDiscount" id="PriceAfterDiscount" value={formData.PriceAfterDiscount} readOnly />
                    </div>
                    <div className="col-md-6">
                        <label htmlFor="HowManyStock" className="form-label">Stock Quantity</label>
                        <input onChange={handleChange} type="number" className="form-control" name="HowManyStock" id="HowManyStock" value={formData.HowManyStock} required />
                    </div>
                    <div className="col-md-6">
                        <label htmlFor="MainImage" className="form-label">Main Image</label>
                        <input onChange={(e) => handleFileChange(e, 'MainImage')} type="file" className="form-control" id="MainImage" />
                        {imagePreview && <img src={imagePreview} alt="Preview"  className="preview-image w-25 " />}
                    </div>
                    <div className="col-md-12">
                        <label htmlFor="DataSheet" className="form-label">Data Sheet</label>
                        <input onChange={(e) => handleFileChange(e, 'DataSheet')} type="file" className="form-control" id="DataSheet" />
                        {dataSheetPreview && <a href={dataSheetPreview} target="_blank" rel="noopener noreferrer">View DataSheet</a>}
                    </div>
                    <div className="col-md-12">
                        <label htmlFor="Specifications" className="form-label">Specifications</label>
                        {formData.Specifications.map((spec, index) => (
                            <div key={index} className="spec-row">
                                <input onChange={(e) => handleSpecsChange(e, index, 'title')} type="text" className="form-control" placeholder="Title" value={spec.title} />
                                <input onChange={(e) => handleSpecsChange(e, index, 'details')} type="text" className="form-control" placeholder="Details" value={spec.details} />
                                <button type="button" onClick={() => handleRemoveSpec(index)} className="btn btn-danger">Remove</button>
                            </div>
                        ))}
                        <button type="button" onClick={handleAddSpec} className="btn btn-primary">Add Specification</button>
                    </div>
                    <div className="col-md-6">
                        <div className="form-check">
                            <input onChange={handleChange} type="checkbox" className="form-check-input" id="isStockOut" name="isStockOut" checked={formData.isStockOut} />
                            <label className="form-check-label" htmlFor="isStockOut">Stock Out</label>
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="form-check">
                            <input onChange={handleChange} type="checkbox" className="form-check-input" id="isLatestProduct" name="isLatestProduct" checked={formData.isLatestProduct} />
                            <label className="form-check-label" htmlFor="isLatestProduct">Latest Product</label>
                        </div>
                    </div>
                    <div className="col-md-12">
                        <button type="submit" className="btn btn-primary" disabled={isLoading}>
                            {isLoading ? 'Updating...' : 'Update Product'}
                        </button>
                    </div>
                </form>
            </div>
        </>
    );
};

export default EditProduct;

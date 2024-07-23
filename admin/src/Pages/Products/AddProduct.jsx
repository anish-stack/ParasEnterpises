import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AddProduct = () => {
    const [categories, setCategories] = useState([]);
    const [allTags, setTags] = useState([]);

    const [isLoading, setIsLoading] = useState(false);
    const [imagePreviews, setImagePreviews] = useState([]);
    const [sliderImagePreviews, setSliderImagePreviews] = useState([]);
    const [dataSheetPreview, setDataSheetPreview] = useState(null); // New state for DataSheet preview

    const [formData, setFormData] = useState({
        ProductName: '',
        Category: '',
        SmallDescription: '',
        Price: '',
        DiscountPercentage: '',
        PriceAfterDiscount: '',
        HowManyStock: '',
        isStockOut: false,
        isLatestProduct: false,
        DataSheet: { public_id: '', url: '', files: [] }, // Ensure this is properly initialized
        Specifications: [''],
        MainImage: { public_id: '', url: '', files: [] }, // Ensure this is properly initialized
        SliderImages: [{ public_id: '', url: '', files: [] }] // Ensure this is properly initialized
    });

    const handleFileChange = (e, fieldName) => {
        const files = e.target.files;
        const fileArray = Array.from(files);
        const previews = fileArray.map(file => URL.createObjectURL(file));
    
        setFormData((prevFormData) => ({
            ...prevFormData,
            [fieldName]: {
                ...prevFormData[fieldName],
                files: fileArray
            }
        }));
    
        if (fieldName === 'SliderImages') {
            setSliderImagePreviews(previews);
        } else if (fieldName === 'DataSheet') {
            setDataSheetPreview(previews[0]);
        } else {
            setImagePreviews(previews);
        }
    };

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        const val = type === 'checkbox' ? checked : value;
        setFormData({
            ...formData,
            [name]: val
        });
    };

    const handleSpecsChange = (e, index) => {
        const newSpecs = formData.Specifications.slice();
        newSpecs[index] = e.target.value;
        setFormData({
            ...formData,
            Specifications: newSpecs
        });
    };

    const handleAddSpec = () => {
        setFormData({
            ...formData,
            Specifications: [...formData.Specifications, '']
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
            console.log('category',res.data.categories)
        } catch (error) {
            console.error('There was an error fetching the categories!', error);
        }
    };

    const handleTags = async () => {
        try {
            const res = await axios.get('http://localhost:7000/api/v1/get-all-tag');
            setTags(res.data.data);
        } catch (error) {
            console.error('There was an error fetching the tags!', error);
        }
    };

    useEffect(() => {
        handleFetch();
        handleTags();
    }, []);

    // const handleSubmit = async (e) => {
    //     e.preventDefault();
    //     setIsLoading(true);
    
    //     try {
    //         const formDataToSend = new FormData();
    
    //         console.log('Form Data:', formData);
    
    //         for (const key in formData) {
    //             if (formData.hasOwnProperty(key)) {
    //                 console.log(`Key: ${key}, Value:`, formData[key]);
    //                 if (Array.isArray(formData[key])) {
    //                     formData[key].forEach((item, index) => {
    //                         if (item instanceof Object && item.files) {
    //                             item.files.forEach((file, fileIndex) => {
    //                                 formDataToSend.append(`${key}[${index}].files`, file);
    //                             });
    //                         } else {
    //                             formDataToSend.append(`${key}[${index}]`, item);
    //                         }
    //                     });
    //                 } else if (formData[key] instanceof Object && formData[key].files) {
    //                     formData[key].files.forEach((file, index) => {
    //                         formDataToSend.append(`${key}.files`, file);
    //                     });
    //                 } else {
    //                     formDataToSend.append(key, formData[key]);
    //                 }
    //             }
    //         }
    
    //         const response = await axios.post('http://localhost:7000/api/v1/create-product', formDataToSend, {
    //             headers: {
    //                 'Content-Type': 'multipart/form-data'
    //             }
    //         });
    
    //         console.log(response.data);
    //         toast.success('Product Added Successfully');
    //         setIsLoading(false);
    //     } catch (error) {
    //         console.error('Error:', error);
    //         toast.error("An Error Occurred");
    //         setIsLoading(false);
    //     }
    // };
    

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
    
        try {
            const formDataToSend = new FormData();
    
            // Append non-file fields
            for (const key in formData) {
                if (key === 'Specifications') {
                    formData[key].forEach((item, index) => {
                        formDataToSend.append(`Specifications[${index}]`, item);
                    });
                } else if (key !== 'MainImage' && key !== 'SliderImages' && key !== 'DataSheet') {
                    formDataToSend.append(key, formData[key]);
                }
            }
    
            // Append MainImage files
            if (formData.MainImage.files.length > 0) {
                formData.MainImage.files.forEach((file, index) => {
                    formDataToSend.append(`MainImage.files`, file);
                });
            }
    
            // Append SliderImages files
            if (formData.SliderImages.length > 0) {
                formData.SliderImages.forEach((image, imageIndex) => {
                    if (image.files.length > 0) {
                        image.files.forEach((file, fileIndex) => {
                            formDataToSend.append(`SliderImages[${imageIndex}].files`, file);
                        });
                    }
                });
            }
    
            // Append DataSheet files
            if (formData.DataSheet.files.length > 0) {
                formData.DataSheet.files.forEach((file, index) => {
                    formDataToSend.append(`DataSheet.files`, file);
                });
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
                    <div className="col-md-4">
                        <label htmlFor="Category" className="form-label">Category</label>
                        <select onChange={handleChange} name='Category' value={formData.Category} className="form-select" id="Category">
                            <option value="">Category</option>
                            {categories && categories.map((category, index) => {
                                return <option key={index} value={category.name}>{category.name}</option>;
                            })}
                        </select>
                    </div>

                    <div className="col-md-6">
                        <label htmlFor="ProductName" className="form-label">Product Name</label>
                        <input type="text" onChange={handleChange} name='ProductName' value={formData.ProductName} className="form-control" id="ProductName" />
                    </div>

                    <div className="col-12">
                        <label htmlFor="SmallDescription" className="form-label">Product Description</label>
                        <textarea onChange={handleChange} name='SmallDescription' value={formData.SmallDescription} className="form-control" id="SmallDescription" />
                    </div>

                    <div className="col-12">
                        <label className="form-label">Specifications</label>
                        {formData.Specifications.map((spec, index) => (
                            <div key={index} className="d-flex mb-2">
                                <input
                                    type="text"
                                    value={spec}
                                    onChange={(e) => handleSpecsChange(e, index)}
                                    className="form-control me-2"
                                />
                                <button type="button" onClick={() => handleRemoveSpec(index)} className="btn btn-danger">Remove</button>
                            </div>
                        ))}
                        <button type="button" onClick={handleAddSpec} className="btn btn-primary">Add Specification</button>
                    </div>

                    <div className="mb-4">
                        {imagePreviews.length > 0 && (
                            <div className="d-flex gap-2 align-items-start">
                                {imagePreviews.map((src, index) => (
                                    <img key={index} src={src} alt={`Preview ${index}`} className="img-thumbnail mb-2" style={{ width: '100px', height: '100px' }} />
                                ))}
                            </div>
                        )}
                    </div>
                    <div className="mb-4">
                        <label className="form-label">Main Image</label>
                        <input
                            type="file"
                            name="MainImage"
                            className="form-control-file border p-2 mt-1 rounded shadow-sm"
                            onChange={(e) => handleFileChange(e, 'MainImage')}
                        />
                    </div>

                    <div className="mb-4">
                        <label className="form-label">Slider Images</label>
                        {sliderImagePreviews.length > 0 && (
                            <div className="d-flex gap-2 align-items-start">
                                {sliderImagePreviews.map((src, index) => (
                                    <img key={index} src={src} alt={`Slider Preview ${index}`} className="img-thumbnail mb-2" style={{ width: '100px', height: '100px' }} />
                                ))}
                            </div>
                        )}
                        <input
                            type="file"
                            name="SliderImages"
                            multiple
                            className="form-control-file border p-2 mt-1 rounded shadow-sm"
                            onChange={(e) => handleFileChange(e, 'SliderImages')}
                        />
                    </div>

                    <div className="mb-4"> {/* New DataSheet field */}
                        <label className="form-label">DataSheet</label>
                        {dataSheetPreview && (
                            <div className="d-flex gap-2 align-items-start">
                                <img src={dataSheetPreview} alt="DataSheet Preview" className="img-thumbnail mb-2" style={{ width: '100px', height: '100px' }} />
                            </div>
                        )}
                        <input
                            type="file"
                            name="DataSheet"
                            className="form-control-file border p-2 mt-1 rounded shadow-sm"
                            onChange={(e) => handleFileChange(e, 'DataSheet')}
                        />
                    </div>

                    <div className="col-md-4">
                        <label htmlFor="Price" className="form-label">Price</label>
                        <input type="number" onChange={handleChange} name='Price' value={formData.Price} className="form-control" id="Price" />
                    </div>

                    <div className="col-md-4">
                        <label htmlFor="DiscountPercentage" className="form-label">Discount Percentage</label>
                        <input type="number" min="1" max="80" onChange={(e) => {
                            handleChange(e);
                            if (e.target.value !== '') {
                                const price = parseFloat(formData.Price);
                                const discountPercentage = parseFloat(e.target.value);
                                const discountedPrice = price - (price * (discountPercentage / 100));
                                setFormData(prevState => ({
                                    ...prevState,
                                    PriceAfterDiscount: discountedPrice.toFixed(2)
                                }));
                            }
                        }} name='DiscountPercentage' value={formData.DiscountPercentage} className="form-control" id="DiscountPercentage" />
                    </div>

                    <div className="col-md-4">
                        <label htmlFor="PriceAfterDiscount" className="form-label">Discount Price</label>
                        <input type="number" name='PriceAfterDiscount' value={formData.PriceAfterDiscount} className="form-control" id="PriceAfterDiscount" disabled />
                    </div>

                    <div className="col-md-4">
                        <label htmlFor="HowManyStock" className="form-label">Stock Quantity</label>
                        <input type="number" onChange={handleChange} name='HowManyStock' value={formData.HowManyStock} className="form-control" id="HowManyStock" />
                    </div>

                    <div className="col-md-4">
                        <label htmlFor="isStockOut" className="form-label">Stock Out</label>
                        <input type="checkbox" onChange={handleChange} name='isStockOut' checked={formData.isStockOut} className="form-check-input" id="isStockOut" />
                    </div>

                    <div className="col-md-4">
                        <label htmlFor="isLatestProduct" className="form-label">Latest Product</label>
                        <input type="checkbox" onChange={handleChange} name='isLatestProduct' checked={formData.isLatestProduct} className="form-check-input" id="isLatestProduct" />
                    </div>

                    <div className="col-12 text-center">
                        <button type="submit" className={`btn btn-primary ${isLoading ? 'not-allowed' : 'allowed'}`} disabled={isLoading}>{isLoading ? "Please Wait..." : "Add Product"}</button>
                    </div>
                </form>
            </div>
        </>
    );
}

export default AddProduct;

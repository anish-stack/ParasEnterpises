import React, { useState } from 'react';
import axios from 'axios';

const CreateProducts = () => {
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
        Specifications: [],
        SliderImages: [],
        MainImage: null,
        DataSheet: null,
    });

    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);

    // Handle form field changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });

        // Calculate Price After Discount if DiscountPercentage and Price are provided
        if (name === 'DiscountPercentage' || name === 'Price') {
            const discount = parseFloat(formData.DiscountPercentage);
            const price = parseFloat(formData.Price);
            if (!isNaN(discount) && !isNaN(price)) {
                const afterDiscount = price * (1 - discount / 100);
                setFormData({ ...formData, PriceAfterDiscount: afterDiscount.toFixed(2) });
            }
        }
    };

    // Handle image file selection and preview
    const handleImageChange = (e) => {
        const files = Array.from(e.target.files);
        const name = e.target.name;

        // Preview images using FileReader API
        const imagePreviews = files.map(file => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => {
                setFormData(prevState => ({
                    ...prevState,
                    [name]: [...prevState[name], { file, preview: reader.result }]
                }));
            };
            return null;
        });

        // Set form data with selected images
        setFormData({ ...formData, [name]: files });
    };

    // Handle adding a new specification field
    const handleAddSpecification = () => {
        if (formData.Specifications.length < 3) {
            setFormData({
                ...formData,
                Specifications: [...formData.Specifications, '']
            });
        }
    };

    // Handle removing a specification field
    const handleRemoveSpecification = (index) => {
        const newSpecifications = [...formData.Specifications];
        newSpecifications.splice(index, 1);
        setFormData({
            ...formData,
            Specifications: newSpecifications
        });
    };

    // Handle specification change
    const handleSpecificationChange = (e, index) => {
        const newSpecifications = [...formData.Specifications];
        newSpecifications[index] = e.target.value;
        setFormData({
            ...formData,
            Specifications: newSpecifications
        });
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const formDataToSend = new FormData();
            Object.keys(formData).forEach(key => {
                if (key === 'SliderImages' || key === 'MainImage' || key === 'DataSheet') {
                    formData[key].forEach((file, index) => {
                        formDataToSend.append(`${key}[${index}]`, file);
                    });
                } else {
                    formDataToSend.append(key, formData[key]);
                }
            });

            const response = await axios.post('http://localhost:7000/api/v1/create-product', formDataToSend, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            console.log('Product created successfully:', response.data);
            // Handle success, maybe redirect or show a success message

        } catch (error) {
            console.error('Error creating product:', error);
            // Handle errors, set error state to display to the user
            setLoading(false);
            setErrors(error.response.data);
        }

        setLoading(false);
    };

    return (
        <div className="max-w-7xl mx-auto p-4">
            <h2 className="text-2xl font-bold mb-4">Create New Product</h2>
            <form onSubmit={handleSubmit} className="max-w-3xl mx-auto">
                <div className='grid grid-cols-2 gap-2'>
                    {/* Product Name */}
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700">Product Name *</label>
                        <input type="text" name="ProductName" value={formData.ProductName} onChange={handleChange} required className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
                        {errors.ProductName && <span className="text-red-500 text-sm">{errors.ProductName}</span>}
                    </div>

                    {/* Category */}
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700">Category</label>
                        <input type="text" name="Category" value={formData.Category} onChange={handleChange} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
                        {/* Add validation and error handling if necessary */}
                    </div>

                </div>
                {/* Small Description */}
                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">Small Description *</label>
                    <textarea name="SmallDescription" value={formData.SmallDescription} onChange={handleChange} required rows="3" className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
                    {errors.SmallDescription && <span className="text-red-500 text-sm">{errors.SmallDescription}</span>}
                </div>

                <div className="grid grid-cols-3 gap-2">
                    {/* Price */}
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700">Price *</label>
                        <input type="number" name="Price" value={formData.Price} onChange={handleChange} required className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
                        {errors.Price && <span className="text-red-500 text-sm">{errors.Price}</span>}
                    </div>

                    {/* Discount Percentage */}
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700">Discount Percentage *</label>
                        <input type="number" name="DiscountPercentage" value={formData.DiscountPercentage} onChange={handleChange} required className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
                        {errors.DiscountPercentage && <span className="text-red-500 text-sm">{errors.DiscountPercentage}</span>}
                    </div>

                    {/* Price After Discount */}
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700">Price After Discount</label>
                        <input type="number" name="PriceAfterDiscount" value={formData.PriceAfterDiscount} disabled className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
                    </div>
                </div>
                <div className="grid grid-cols-3 gap-2">
                    {/* How Many Stock */}
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700">How Many Stock *</label>
                        <input type="number" name="HowManyStock" value={formData.HowManyStock} onChange={handleChange} required className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
                        {errors.HowManyStock && <span className="text-red-500 text-sm">{errors.HowManyStock}</span>}
                    </div>

                    <div className="mb-4">

                        <input type="checkbox" id="isStockOut" name="isStockOut" checked={formData.isStockOut} onChange={handleChange} className="mr-2" />
                        <label htmlFor="isStockOut" className="text-sm font-medium text-gray-700">Stock Out</label>
                    </div>


                    <div className="mb-4">
                        <input type="checkbox" id="isLatestProduct" name="isLatestProduct" checked={formData.isLatestProduct} onChange={handleChange} className="mr-2" />
                        <label htmlFor="isLatestProduct" className="text-sm font-medium text-gray-700">Latest Product</label>
                    </div>

                </div>
                <div className='grid grid-cols-3 gap-3'>
 {/* Slider Images */}
 <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">Slider Images</label>
                    <input type="file" name="SliderImages" accept="image/*" onChange={handleImageChange} multiple className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
                    <div className="mt-2 grid grid-cols-3 gap-4">
                        {formData.SliderImages.map((image, index) => (
                            <div key={index} className="relative">
                                <img src={image.preview} alt={`Slider ${index + 1}`} className="w-full h-32 object-cover rounded-md" />
                                <button type="button" className="absolute top-0 right-0 bg-red-500 text-white p-1 rounded-full" onClick={() => handleRemoveImage('SliderImages', index)}>X</button>
                            </div>
                        ))}
                    </div>
                    {errors.SliderImages && <span className="text-red-500 text-sm">{errors.SliderImages}</span>}
                </div>

                {/* Main Image */}
                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">Main Image</label>
                    <input type="file" name="MainImage" accept="image/*" onChange={handleImageChange} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
                    {formData.MainImage && (
                        <img src={formData.MainImage.preview} alt="Main" className="mt-2 w-full h-48 object-cover rounded-md" />
                    )}
                    {errors.MainImage && <span className="text-red-500 text-sm">{errors.MainImage}</span>}
                </div>

                {/* Data Sheet */}
                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">Data Sheet</label>
                    <input type="file" name="DataSheet" accept="image/*" onChange={handleImageChange} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
                    {formData.DataSheet && (
                        <a href={formData.DataSheet.preview} target="_blank" className="mt-2 block text-blue-500">View Data Sheet</a>
                    )}
                    {errors.DataSheet && <span className="text-red-500 text-sm">{errors.DataSheet}</span>}
                </div>

                </div>

                {/* Specifications */}
                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">Specifications *</label>
                    {formData.Specifications.map((specification, index) => (
                        <div key={index} className="flex items-center mb-2">
                            <input
                                type="text"
                                name="Specifications"
                                value={specification}
                                onChange={(e) => handleSpecificationChange(e, index)}
                                required
                                className="flex-1 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            />
                            {index > 0 && (
                                <button type="button" onClick={() => handleRemoveSpecification(index)} className="ml-2 px-2 py-1 bg-red-500 text-white rounded-md focus:outline-none hover:bg-red-600">Remove</button>
                            )}
                        </div>
                    ))}
                    {formData.Specifications.length < 3 && (
                        <button type="button" onClick={handleAddSpecification} className="px-2 py-1 bg-green-500 text-white rounded-md focus:outline-none hover:bg-green-600">Add Specification</button>
                    )}
                    {errors.Specifications && <span className="text-red-500 text-sm">{errors.Specifications}</span>}
                </div>

               
                {/* Stock Out and Latest Product */}


                {/* Submit Button */}
                <div className="mt-6">
                    <button type="submit" className={`px-4 py-2 bg-green-500 text-white rounded-md focus:outline-none hover:bg-green-600 ${loading ? 'opacity-50 cursor-not-allowed' : ''}`} disabled={loading}>
                        {loading ? 'Creating...' : 'Create Product'}
                    </button>
                </div>
            </form >
        </div >
    );
};

export default CreateProducts;

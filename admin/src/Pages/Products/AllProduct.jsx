import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom'
import Swal from 'sweetalert2';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AllProduct = () => {
    const [products, setProduct] = useState([]);

    // --- Pagination ---
    const [currentPage, setCurrentPage] = useState('1')
    const itemPerPage = 8

    const handleFetch = async () => {
        try {
            const res = await axios.get('https://api.swhealthcares.com/api/v1/get-all-product');
            const reverseData = res.data.data
            const main = reverseData.reverse()
            setProduct(main)
            console.log(products)
        } catch (error) {
            console.error('There was an error fetching the products!', error);
        }
    }
    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    // --- Pagination ---
    const indexOfLastItem = currentPage * itemPerPage;
    const indexOfFirstItem = indexOfLastItem - itemPerPage;
    const currentItems = products.slice(indexOfFirstItem, indexOfLastItem)

    useEffect(() => {
        handleFetch();
    }, []);

    const handleDelete = async (id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    const res = await axios.delete(`https://api.swhealthcares.com/api/v1/delete-product/${id}`);
                    console.log(res.data);
                    toast.success("Product Deleted Successfully");
                    handleFetch();

                    Swal.fire({
                        title: "Deleted!",
                        text: "Your file has been deleted.",
                        icon: "success"
                    });
                } catch (error) {
                    console.error(error);
                    toast.error(error.response.data.message);
                }
            }
        });
    };

    return (
        <>
            <ToastContainer />
            <div className="bread">
                <div className="head">
                    <h4>All Product List </h4>
                </div>
                <div className="links">
                    <Link to="/add-product" className="add-new">Add New <i class="fa-solid fa-plus"></i></Link>
                </div>
            </div>

            <div className="filteration">
                <div className="selects">
                    {/* <select>
                        <option>Ascending Order </option>
                        <option>Descending Order </option>
                    </select> */}
                </div>
                <div className="search">
                    <label htmlFor="search">Search </label> &nbsp;
                    <input type="text" name="search" id="search" />
                </div>
            </div>

            <section className="d-table ">
                <table class="table table-bordered table-striped table-hover">
                    <thead>
                        <tr>
                            <th scope="col">Sr.No.</th>
                            <th scope="col">Category</th>
                            <th scope="col">Product Name</th>
                            <th scope="col">Product Image</th>
                            <th scope="col">Price</th>
                            <th scope="col">Discount Price</th>
                            <th scope="col">Tag</th>
                            <th scope="col">Stock Quantity</th>
                            <th scope="col">Edit</th>
                            <th scope="col">Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {currentItems.map((product, index) => (
                            <tr key={product._id}>
                                <th scope="row">{index + 1}</th>
                                <td>{product.categoryName}</td>
                                <td>{product.productName}</td>
                                <td><img src={product.firstImage} alt={product.productName} style={{ width: '50px', height: '50px' }} /></td>
                                <td>{product.price}</td>
                                <td>{product.discountPrice}</td>
                                <td>{product.tag}</td>
                                <td>{product.stockQuantity}</td>
                                <td><Link to={`/edit-product/${product._id}`} className="bt edit">Edit <i class="fa-solid fa-pen-to-square"></i></Link></td>
                                <td><Link onClick={() => { handleDelete(product._id) }} className="bt delete" >Delete <i class="fa-solid fa-trash"></i></Link></td>
                            </tr>
                        ))}
                    </tbody>

                </table>

                <nav>
                    <ul className="pagination justify-content-center">
                        {Array.from({ length: Math.ceil(products.length / itemPerPage) }, (_, i) => (
                            <li key={i + 1} className={`page-item ${currentPage === i + 1 ? 'active' : ''}`}>
                                <button className="page-link" onClick={() => handlePageChange(i + 1)}>{i + 1}</button>
                            </li>
                        ))}
                    </ul>
                </nav>
            </section>
        </>
    )
}

export default AllProduct
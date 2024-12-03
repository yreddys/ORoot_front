import React from 'react';
import { Link } from 'react-router-dom';
import './AdminHome.css'
const AdminHomeForm = () => {
  return (
    <div className="admin-home-container">
      <h1>Admin Dashboard</h1>
      <nav>
        <ul>
          <li>
            <Link to="/add-product">Add Product</Link>
          </li>
          <li>
            <Link to="/update-product">Update Product</Link>
          </li>
          <li>
            <Link to="/all-products">View All Products</Link>
          </li>
          <li>
            <Link to="/delete-product">Delete Product</Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default AdminHomeForm;

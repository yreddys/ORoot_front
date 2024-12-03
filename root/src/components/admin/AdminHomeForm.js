import React from "react";
import { Link } from "react-router-dom";
import "./AdminHome.css";

const AdminHomeForm = () => {
  return (
    <div className="admin-home-container">
      <h1>Admin Dashboard</h1>
      <nav>
        <ul className="admin-nav-list">
          <li>
            <Link to="/admin-add-product" className="admin-nav-link">
              Add Product
            </Link>
          </li>
          <li>
            <Link to="/admin-edit-products" className="admin-nav-link">
              Update Product
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default AdminHomeForm;

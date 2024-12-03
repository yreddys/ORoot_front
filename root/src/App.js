import React from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import EditProducts from "./components/admin/EditProducts"; // Corrected path for AllProducts
import AddProductForm from "./components/admin/AddProductForm"; // Corrected path for AddProductForm

const App = () => {
  return (
    <Router>
      <div className="app-container">
        <header>
          <h1>ADMINS'S Management</h1>
          <nav>
            <ul>
              <li>
                <Link to="/admin-addproduct">Add Product</Link>
              </li>
              <li>
                <Link to="/admin-all-products">All Products</Link>
              </li>
            </ul>
          </nav>
        </header>

        <main>
          <Routes>
            <Route path="/admin-addproduct" element={<AddProductForm />} /> {/* Route to AddProductForm */}
            <Route path="/admin-all-products" element={<EditProducts />} /> {/* Route to AllProducts */}
          </Routes>
        </main>
      </div>
    </Router>
  );
};

export default App;

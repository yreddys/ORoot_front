import React from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import AllProducts from "./components/admin/AllProducts"; // Corrected path for AllProducts
import AddProductForm from "./components/admin/AddProductForm"; // Corrected path for AddProductForm

const App = () => {
  return (
    <Router>
      <div className="app-container">
        <header>
          <h1>Product Management</h1>
          <nav>
            <ul>
              <li>
                <Link to="/">Add Product</Link>
              </li>
              <li>
                <Link to="/all-products">All Products</Link>
              </li>
            </ul>
          </nav>
        </header>

        <main>
          <Routes>
            <Route path="/" element={<AddProductForm />} /> {/* Route to AddProductForm */}
            <Route path="/all-products" element={<AllProducts />} /> {/* Route to AllProducts */}
          </Routes>
        </main>
      </div>
    </Router>
  );
};

export default App;

import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/home/Navbar"; // Import Navbar
import Footer from "./components/home/Footer"; // Import Footer
import HomePage from "./components/home/Home"; // Import HomePage
import AdminHomeForm from "./components/admin/AdminHomeForm"; // Import Admin Dashboard
import AddProductForm from "./components/admin/AddProductForm"; // Import Add Product
import EditProducts from "./components/admin/EditProducts"; // Import Edit Products

const App = () => {
  return (
    <Router>
      <div className="app-container">
        {/* Navbar at the top */}
        <Navbar />

        {/* Main content area */}
        <div className="content">
          <Routes>
            {/* Home page */}
            <Route path="/" element={<HomePage />} />

            {/* Admin-related routes */}
            <Route path="/admin" element={<AdminHomeForm />} />
            <Route path="/admin-add-product" element={<AddProductForm />} />
            <Route path="/admin-edit-products" element={<EditProducts />} />
          </Routes>
        </div>

        {/* Footer at the bottom */}
        <Footer />
      </div>
    </Router>
  );
};

export default App;

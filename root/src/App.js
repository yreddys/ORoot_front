import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/home/Navbar";
import HomePage from "./components/home/Home";
import AdminHomeForm from "./components/admin/AdminHomeForm";
import AddProductForm from "./components/admin/AddProductForm";
import EditProducts from "./components/admin/EditProducts";

const App = () => {
  return (
    <Router>
      <div>
        {/* Navbar is included globally */}
        <Navbar />

        {/* Define routes for your application */}
        <Routes>
          {/* Home page route */}
          <Route path="/" element={<HomePage />} />

          {/* Admin routes */}
          <Route path="/admin" element={<AdminHomeForm />} />
          <Route path="/admin-add-product" element={<AddProductForm />} />
          <Route path="/admin-edit-products" element={<EditProducts />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;

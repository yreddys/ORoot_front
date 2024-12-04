import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/home/Navbar";
import Footer from "./components/home/Footer";
import HomePage from "./components/home/Home";
import AdminHomeForm from "./components/admin/AdminHomeForm";
import AddProductForm from "./components/admin/AddProductForm";
import EditProducts from "./components/admin/EditProducts";
import ProductDetails from "./components/orders/ProductDetailsPage";
import BuyNow from "./components/orders/BuyNowPage";
import OrderConfirmation from "./components/orders/OrderConfirmationPage";
import ApiService from "./service/ApiService"; // Import your API service

const App = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await ApiService.getAllProducts();
        setProducts(data);
      } catch (err) {
        console.error("Error fetching products:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) return <p>Loading...</p>;

  return (
    <Router>
      <div className="app-container">
        {/* Navbar at the top */}
        <Navbar />

        {/* Main content area */}
        <div className="content">
          <Routes>
            {/* Home page */}
            <Route path="/" element={<HomePage products={products} />} />

            {/* Product-related routes */}
            <Route path="/product-details/:id" element={<ProductDetails products={products} />} />
            <Route path="/buy-now/:id" element={<BuyNow products={products} />} />
            <Route path="/order-confirmation" element={<OrderConfirmation />} />

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

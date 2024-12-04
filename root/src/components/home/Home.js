import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ApiService from "../../service/ApiService";
import "./HomePage.css";

const HomePage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // Fetch products from API
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await ApiService.getAllProducts();
        console.log("Fetched products:", data); // Debug fetched data
        setProducts(data);
      } catch (err) {
        console.error("Error fetching products:", err);
        setError("Failed to fetch products.");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) {
    return <p>Loading products...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div className="homepage">
      <header>
        <h1>Welcome to Our Store</h1>
        <p>Browse Our Collection of Products</p>
      </header>
      <div className="product-grid">
        {products.map((product) => (
          <div
            className="product-card"
            key={product.id}
            onClick={() => navigate(`/product-details/${product.id}`)} // Navigate to ProductDetailsPage
          >
            <img
              src={
                product.photo
                  ? product.photo.startsWith("data:image/")
                    ? product.photo
                    : `data:image/jpeg;base64,${product.photo}`
                  : "https://via.placeholder.com/150"
              }
              alt={product.name}
              className="product-image"
            />
            <div className="product-details">
              <h2>{product.name}</h2>
              <p>Category: {product.category}</p>
              <p>Price: ${product.price}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HomePage;

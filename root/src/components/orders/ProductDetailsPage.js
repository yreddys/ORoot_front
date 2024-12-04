import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./ProductDetails.css";

const ProductDetails = ({ products }) => {
  const { id } = useParams();
  const navigate = useNavigate();

  if (!products || products.length === 0) {
    return <p>No products available.</p>;
  }

  const product = products.find((item) => item.id === parseInt(id));

  if (!product) {
    return <p>Product not found!</p>;
  }

  return (
    <div className="product-details">
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
      <h2>{product.name}</h2>
      <p>Category: {product.category}</p>
      <p>Price: ${product.price}</p>
      <button onClick={() => navigate("/cart")}>Add to Cart</button>
      <button onClick={() => navigate(`/buy-now/${product.id}`)}>Buy Now</button>
    </div>
  );
};

export default ProductDetails;

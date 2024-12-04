import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./ProductDetails.css";

const resolvePhoto = (photo) => {
  if (!photo) return "https://via.placeholder.com/150";
  return photo.startsWith("data:image/") ? photo : `data:image/jpeg;base64,${photo}`;
};

const ProductDetails = ({ products }) => {
  const { id } = useParams();
  const navigate = useNavigate();

  if (!products || products.length === 0) {
    return <p>Loading products...</p>;
  }

  const product = products.find((item) => item.id === parseInt(id));

  if (!product) {
    return <p>Product not found!</p>;
  }

  return (
    <div className="product-details">
      <img src={resolvePhoto(product.photo)} alt={product.name} className="product-image" />
      <h2>{product.name}</h2>
      <p>Category: {product.category}</p>
      <p>Price: ${product.price}</p>
      <button onClick={() => navigate("/cart")}>Add to Cart</button>
      <button onClick={() => navigate(`/buy-now/${product.id}`)}>Buy Now</button>
    </div>
  );
};

export default ProductDetails;

import React, { useState } from "react";
import { useParams } from "react-router-dom";
import ApiService from "../../service/ApiService";
import "./BuyNow.css";

const BuyNow = ({ products }) => {
  const { id } = useParams();

  if (!products || products.length === 0) {
    return <p>Products not available. Please try again later.</p>;
  }

  const product = products.find((item) => item.id === parseInt(id));

  if (!product) {
    return <p>Product not found!</p>;
  }

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
    quantity: 1,
  });
  const [confirmation, setConfirmation] = useState(null);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.quantity <= 0) {
      setError("Quantity must be greater than zero.");
      return;
    }
    setError(null);

    const orderRequest = {
      items: [{ productId: product.id, quantity: formData.quantity }],
      address: {
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        address: formData.address,
        city: formData.city,
        state: formData.state,
        pincode: formData.pincode,
      },
    };

    try {
      const response = await ApiService.placeOrder(orderRequest);
      setConfirmation(response);
    } catch (err) {
      console.error("Error placing order:", err);
      setError("Failed to place order. Please try again.");
    }
  };

  return (
    <div className="buy-now">
      <h2>Buy {product.name}</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" name="firstName" placeholder="First Name" onChange={handleChange} required />
        <input type="text" name="lastName" placeholder="Last Name" onChange={handleChange} required />
        <input type="email" name="email" placeholder="Email" onChange={handleChange} required />
        <textarea name="address" placeholder="Address" onChange={handleChange} required></textarea>
        <input type="text" name="city" placeholder="City" onChange={handleChange} required />
        <input type="text" name="state" placeholder="State" onChange={handleChange} required />
        <input type="text" name="pincode" placeholder="Pincode" onChange={handleChange} required />
        <input type="number" name="quantity" placeholder="Quantity" min="1" onChange={handleChange} required />
        <button type="submit">Confirm Order</button>
      </form>
      {error && <p className="error-message">{error}</p>}
      {confirmation && <p>Order Confirmed! Order ID: {confirmation.orderId}</p>}
    </div>
  );
};

export default BuyNow;

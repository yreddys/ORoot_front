import React from "react";
import { useLocation, Link } from "react-router-dom";
import "./OrderConfirmation.css";

const OrderConfirmation = () => {
  const location = useLocation();
  const { confirmation } = location.state || {};

  if (!confirmation) {
    return <p>No order confirmation details available.</p>;
  }

  return (
    <div className="order-confirmation">
      <h3>Order Confirmed!</h3>
      <p><strong>Order ID:</strong> {confirmation.orderId}</p>
      <p><strong>Total Amount:</strong> ${confirmation.totalAmount.toFixed(2)}</p>

      <h4>Items Ordered:</h4>
      <ul>
        {confirmation.items.map((item, index) => (
          <li key={index}>
            <strong>{item.productName}</strong> - Quantity: {item.quantity}, Price: ${item.price.toFixed(2)}
          </li>
        ))}
      </ul>

      <h4>Shipping Address:</h4>
      <p><strong>Name:</strong> {confirmation.address.firstName} {confirmation.address.lastName}</p>
      <p><strong>Email:</strong> {confirmation.address.email}</p>
      <p><strong>Mobile No:</strong> {confirmation.address.mobileNo}</p>
      <p>
        <strong>Address:</strong> {confirmation.address.address}, {confirmation.address.city}, {confirmation.address.state}, {confirmation.address.pincode}
      </p>

      <Link to="/" className="home-link">Back to Home</Link>
    </div>
  );
};

export default OrderConfirmation;

import React, { useState } from 'react';
import axios from 'axios';
import './AddProduct.css'

const AddProductForm = () => {
  const [name, setName] = useState('');
  const [category, setCategory] = useState('');
  const [price, setPrice] = useState('');
  const [photo, setPhoto] = useState(null);
  const [message, setMessage] = useState('');

  // Handle the change in form inputs
  const handleNameChange = (e) => setName(e.target.value);
  const handleCategoryChange = (e) => setCategory(e.target.value);
  const handlePriceChange = (e) => setPrice(e.target.value);
  const handlePhotoChange = (e) => setPhoto(e.target.files[0]);

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Create form data object to handle file upload
    const formData = new FormData();
    formData.append('name', name);
    formData.append('category', category);
    formData.append('Price', price);
    formData.append('photo', photo);

    try {
      // POST request to backend API
      const response = await axios.post('http://localhost:8080/admin/add-product', formData, {
        headers: {
          'Content-Type': 'multipart/form-data', // Important for file upload
        },
      });

      // Set success message
      setMessage('Product added successfully!');
      // Reset form values
      setName('');
      setCategory('');
      setPrice('');
      setPhoto(null);
    } catch (error) {
      // Handle error
      setMessage('Error adding product: ' + error.response.data);
    }
  };

  return (
    <div className="add-product-form">
      <h2>Add a New Product</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Product Name</label>
          <input
            type="text"
            id="name"
            name="name"
            value={name}
            onChange={handleNameChange}
            required
          />
        </div>

        <div>
          <label htmlFor="category">Category</label>
          <input
            type="text"
            id="category"
            name="category"
            value={category}
            onChange={handleCategoryChange}
            required
          />
        </div>

        <div>
          <label htmlFor="price">Price</label>
          <input
            type="number"
            id="price"
            name="price"
            value={price}
            onChange={handlePriceChange}
            required
          />
        </div>

        <div>
          <label htmlFor="photo">Product Photo</label>
          <input
            type="file"
            id="photo"
            name="photo"
            accept="image/*"
            onChange={handlePhotoChange}
            required
          />
        </div>

        <div>
          <button type="submit">Add Product</button>
        </div>
      </form>

      {message && <p>{message}</p>}
    </div>
  );
};

export default AddProductForm;

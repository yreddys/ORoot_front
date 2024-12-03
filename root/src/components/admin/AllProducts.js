import React, { useState, useEffect } from "react";
import ApiService from "../../service/ApiService";

const AllProducts = () => {
  const [products, setProducts] = useState([]);
  const [editingProduct, setEditingProduct] = useState({
    name: "",
    category: "",
    price: "",
    photo: null,
  });
  const [editingProductId, setEditingProductId] = useState(null);
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // Load products from the backend
  const loadProducts = async () => {
    try {
      const response = await ApiService.getAllProducts();
      console.log("Fetched products:", response); // Log fetched products

      // Map response to ensure all products have an `id`
      const formattedProducts = response.map((product) => ({
        ...product,
        id: product.id || product.productId, // Use `productId` if `id` is missing
      }));

      setProducts(formattedProducts);
    } catch (error) {
      setError(error.response?.data?.message || "Failed to fetch products.");
      setTimeout(() => setError(""), 5000);
    }
  };

  useEffect(() => {
    loadProducts();
  }, []);

  const handleEditClick = (product) => {
    if (!product || !product.id) {
      setError("Invalid product for editing. Missing ID.");
      setTimeout(() => setError(""), 5000);
      return;
    }

    setEditingProductId(product.id);
    setEditingProduct({
      name: product.name,
      category: product.category,
      price: product.price,
      photo: null,
    });
    setPreview(product.photo ? `data:image/jpeg;base64,${product.photo}` : null);
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      setPreview(URL.createObjectURL(selectedFile));
    } else {
      setFile(null);
      setPreview(null);
    }
  };

  const handleUpdate = async () => {
    if (!editingProductId) {
      setError("No product selected for updating.");
      setTimeout(() => setError(""), 5000);
      return;
    }

    try {
      const formData = new FormData();
      formData.append("name", editingProduct.name);
      formData.append("category", editingProduct.category);
      formData.append("price", editingProduct.price);
      if (file) {
        formData.append("photo", file);
      }

      await ApiService.updateProduct(editingProductId, formData);
      setSuccess("Product updated successfully!");
      setTimeout(() => setSuccess(""), 5000);

      setEditingProductId(null);
      setFile(null);
      setPreview(null);

      // Reload products after update
      await loadProducts();
    } catch (error) {
      setError(error.response?.data?.message || "Failed to update product.");
      setTimeout(() => setError(""), 5000);
    }
  };

  const handleDelete = async (productId) => {
    if (!productId) {
      setError("Invalid product ID for deletion.");
      setTimeout(() => setError(""), 5000);
      return;
    }

    if (window.confirm("Are you sure you want to delete this product?")) {
      try {
        await ApiService.deleteProduct(productId);
        setSuccess("Product deleted successfully!");
        setTimeout(() => setSuccess(""), 5000);

        // Reload products after deletion
        await loadProducts();
      } catch (error) {
        setError(error.response?.data?.message || "Failed to delete product.");
        setTimeout(() => setError(""), 5000);
      }
    }
  };

  return (
    <div className="all-products-container">
      <h2>All Products</h2>
      {error && <p className="error-message">{error}</p>}
      {success && <p className="success-message">{success}</p>}
      <ul>
        {products.map((product, index) => {
          if (!product.id) {
            console.error(`Product missing ID at index ${index}:`, product);
            return null;
          }
          return (
            <li key={product.id} className="product-item">
              <h3>{product.name}</h3>
              <p>Category: {product.category}</p>
              <p>Price: ${product.price}</p>
              {product.photo && (
                <img
                  src={`data:image/jpeg;base64,${product.photo}`}
                  alt={product.name}
                  style={{ width: "150px", height: "150px" }}
                />
              )}
              <div>
                <button onClick={() => handleEditClick(product)}>Edit</button>
                <button onClick={() => handleDelete(product.id)}>Delete</button>
              </div>
            </li>
          );
        })}
      </ul>
      {editingProductId && (
        <div className="edit-product-form">
          {preview && <img src={preview} alt="Preview" />}
          <div>
            <label>Product Name</label>
            <input
              type="text"
              value={editingProduct.name}
              onChange={(e) =>
                setEditingProduct((prev) => ({
                  ...prev,
                  name: e.target.value,
                }))
              }
            />
          </div>
          <div>
            <label>Category</label>
            <input
              type="text"
              value={editingProduct.category}
              onChange={(e) =>
                setEditingProduct((prev) => ({
                  ...prev,
                  category: e.target.value,
                }))
              }
            />
          </div>
          <div>
            <label>Price</label>
            <input
              type="number"
              value={editingProduct.price}
              onChange={(e) =>
                setEditingProduct((prev) => ({
                  ...prev,
                  price: e.target.value,
                }))
              }
            />
          </div>
          <div>
            <label>Product Image</label>
            <input type="file" onChange={handleFileChange} />
          </div>
          <button onClick={handleUpdate}>Update Product</button>
          <button onClick={() => setEditingProductId(null)}>Cancel</button>
        </div>
      )}
    </div>
  );
};

export default AllProducts;

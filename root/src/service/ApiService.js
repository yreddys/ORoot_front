import axios from "axios";

export default class ApiService {
  static BASE_URL = "http://localhost:8080";
 

  // Fetch all products
  static async getAllProducts() {
    const response = await axios.get(`${this.BASE_URL}/admin/all-products`);
    return response.data;
  }
  // Place an order
  static async placeOrder(orderRequest) {
    const response = await axios.post(`${this.BASE_URL}/orders/place-order`, orderRequest);
    return response.data;
  }
  // Update an existing product
  static async updateProduct(productId, formData) {
    const response = await axios.put(`${this.BASE_URL}/admin/update/${productId}`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  }

  // Delete a product
  static async deleteProduct(productId) {
    const response = await axios.delete(`${this.BASE_URL}/admin/delete/product/${productId}`);
    return response.data;
  }
}

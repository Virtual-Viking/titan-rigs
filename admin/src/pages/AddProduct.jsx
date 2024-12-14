import React, { useState } from "react";
import "./AddProduct.css";
import axios from "axios";

const AddProduct = () => {
  const [productData, setProductData] = useState({
    name: "",
    price: "",
    category: "",
    description: "",
    quantity: 0,
    image: null,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProductData({ ...productData, [name]: value });
  };

  const handleFileChange = (e) => {
    setProductData({ ...productData, image: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    for (const key in productData) {
      formData.append(key, productData[key]);
    }
    try {
      const response = await axios.post("http://localhost:5000/api/products", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      alert("Product added successfully!");
    } catch (error) {
      console.error("Error adding product:", error);
    }
  };

  return (
    <div className="add-product">
      <h2>Add New Product</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Product Name"
          value={productData.name}
          onChange={handleChange}
          required
        />
        <input
          type="number"
          name="price"
          placeholder="Price"
          value={productData.price}
          onChange={handleChange}
          required
        />
        <select
          name="category"
          value={productData.category}
          onChange={handleChange}
          required
        >
          <option value="">Select Category</option>
          <option value="motherboard">Motherboard</option>
          <option value="processors">Processors</option>
          <option value="ram">RAM</option>
          {/* Add more categories here */}
        </select>
        <textarea
          name="description"
          placeholder="Product Description"
          value={productData.description}
          onChange={handleChange}
        ></textarea>
        <input
          type="number"
          name="quantity"
          placeholder="Quantity"
          value={productData.quantity}
          onChange={handleChange}
          required
        />
        <input type="file" name="image" onChange={handleFileChange} required />
        <button type="submit">Add Product</button>
      </form>
    </div>
  );
};

export default AddProduct;

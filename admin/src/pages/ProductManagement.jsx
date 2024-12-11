import React from "react";
import { useFormik } from "formik";
import axios from "axios";

const ProductManagement = () => {
  const formik = useFormik({
    initialValues: {
      name: "",
      description: "",
      price: "",
      category: "",
      image: null,
    },
    onSubmit: async (values) => {
      const formData = new FormData();
      formData.append("name", values.name);
      formData.append("description", values.description);
      formData.append("price", values.price);
      formData.append("category", values.category);
      formData.append("image", values.image);

      try {
        const response = await axios.post("http://localhost:5000/api/products", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
        alert("Product added successfully!");
        console.log(response.data);
      } catch (error) {
        console.error("Error adding product:", error);
        alert("Failed to add product.");
      }
    },
  });

  return (
    <div style={{ maxWidth: "600px", margin: "50px auto", padding: "20px", border: "1px solid #ccc", borderRadius: "8px" }}>
      <h2>Add New Product</h2>
      <form onSubmit={formik.handleSubmit}>
        <div style={{ marginBottom: "15px" }}>
          <label>Product Name</label>
          <input
            type="text"
            name="name"
            onChange={formik.handleChange}
            value={formik.values.name}
            style={{ width: "100%", padding: "8px" }}
            required
          />
        </div>
        <div style={{ marginBottom: "15px" }}>
          <label>Description</label>
          <textarea
            name="description"
            onChange={formik.handleChange}
            value={formik.values.description}
            style={{ width: "100%", padding: "8px" }}
            required
          />
        </div>
        <div style={{ marginBottom: "15px" }}>
          <label>Price</label>
          <input
            type="number"
            name="price"
            onChange={formik.handleChange}
            value={formik.values.price}
            style={{ width: "100%", padding: "8px" }}
            required
          />
        </div>
        <div style={{ marginBottom: "15px" }}>
          <label>Category</label>
          <select
            name="category"
            onChange={formik.handleChange}
            value={formik.values.category}
            style={{ width: "100%", padding: "8px" }}
            required
          >
            <option value="" label="Select category" />
            <option value="Electronics" label="Electronics" />
            <option value="Fashion" label="Fashion" />
            <option value="Home" label="Home" />
            <option value="Books" label="Books" />
          </select>
        </div>
        <div style={{ marginBottom: "15px" }}>
          <label>Product Image</label>
          <input
            type="file"
            name="image"
            onChange={(event) => formik.setFieldValue("image", event.currentTarget.files[0])}
            style={{ width: "100%" }}
            required
          />
        </div>
        <button type="submit" style={{ padding: "10px 20px", backgroundColor: "#28a745", color: "#fff", border: "none", borderRadius: "4px", cursor: "pointer" }}>
          Add Product
        </button>
      </form>
    </div>
  );
};

export default ProductManagement;

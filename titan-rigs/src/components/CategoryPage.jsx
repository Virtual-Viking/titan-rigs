import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./CategoryPage.css";

const CategoryPage = () => {
  const { categoryName } = useParams();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCategoryProducts = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          `http://localhost:5000/api/products/category/${categoryName}`
        );
        const data = await response.json();
        if (data.products) {
          const productsWithImages = await Promise.all(
            data.products.map(async (product) => {
              const imageResponse = await fetch(
                `http://localhost:5000/api/products/category/images/${categoryName}/${product.id}`
              );
              const imageData = await imageResponse.json();
              return {
                ...product,
                image_url: imageData.image_url || "default-image-placeholder.png",
              };
            })
          );
          setProducts(productsWithImages);
        } else {
          setProducts([]);
        }
      } catch (error) {
        console.error("Error fetching category products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCategoryProducts();
  }, [categoryName]);

  if (loading) {
    return <div>Loading products...</div>;
  }

  return (
    <div className="category-page">
      <h1>{categoryName.toUpperCase()}</h1>
      <div className="product-grid">
        {products.length > 0 ? (
          products.map((product) => (
            <div key={product.id} className="product-card">
              <img src={product.image_url} alt={product.name} className="product-image" />
              <div className="product-info">
                <h3>{product.name}</h3>
                <p>Brand: {product.brand}</p>
                <p>Price: ${product.price}</p>
                <p>Stock: {product.qty}</p>
              </div>
            </div>
          ))
        ) : (
          <p>No products found in this category.</p>
        )}
      </div>
    </div>
  );
};

export default CategoryPage;

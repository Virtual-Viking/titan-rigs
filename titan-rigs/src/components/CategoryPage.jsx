import React, { useEffect, useState, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { CartContext } from "../context/CartContext"; // Import CartContext
import "./CategoryPage.css";
import addtocart from "../assets/add-to-cart.svg"; // Import the add-to-cart icon

const CategoryPage = () => {
  const { categoryName } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useContext(CartContext); // Access the addToCart function from CartContext
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
                image_url:
                  imageData.image_url || "default-image-placeholder.png",
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

  const handleAddToCart = (e, product) => {
    e.stopPropagation(); // Prevent the click event from bubbling up to the parent div
    addToCart(product); // Add the product to the cart
    navigate("/add-to-cart"); // Redirect to AddToCartPage
  };

  if (loading) {
    return <div>Loading products...</div>;
  }

  return (
    <div className="category-page">
      <h1>{categoryName.toUpperCase()}</h1>
      <div className="products-grid">
        {products.length > 0 ? (
          products.map((product) => (
            <div
              key={product.id}
              className="product-card"
              onClick={() =>
                navigate(
                  `/product?name=${encodeURIComponent(
                    product.name
                  )}&category=${encodeURIComponent(categoryName)}`
                )
              }
            >
              <img
                src={product.image_url}
                alt={product.name}
                className="product-image"
              />
              <div className="product-info">
                <h3>{product.name}</h3>
                <p>Brand: {product.brand}</p>
                <p>Price: ${product.price}</p>
                <p>Stock: {product.qty}</p>
              </div>

              {/* Add to Cart Button */}
              <div
                className="add-to-cart"
                onClick={(e) => handleAddToCart(e, product)} // Call handleAddToCart on button click
              >
                <img src={addtocart} alt="Add to cart" />
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

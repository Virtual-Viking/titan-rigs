import React, { useState, useEffect, useContext } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { CartContext } from "../context/CartContext"; // Import the CartContext
import "./ProductPage.css"; // Import the CSS file for styling

const ProductPage = () => {
  const location = useLocation(); // Get the location object to access the URL
  const queryParams = new URLSearchParams(location.search); // Parse the query params
  const name = queryParams.get("name");
  const category = queryParams.get("category");
  const navigate = useNavigate();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [addedToCart, setAddedToCart] = useState(false); // State to track if product is added to cart

  const { addToCart } = useContext(CartContext); // Access addToCart function from context

  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        setLoading(true);

        // Call the API to fetch product details using name and category
        const response = await fetch(
          `http://localhost:5000/api/product/search?name=${encodeURIComponent(
            name
          )}&category=${encodeURIComponent(category)}`
        );

        if (!response.ok) {
          throw new Error("Failed to fetch product details");
        }

        const data = await response.json();
        setProduct(data.products); // Assuming products is an array
        setError(null); // Clear any previous errors
      } catch (err) {
        console.error("Error fetching product details:", err);
        setError("Failed to load product details.");
      } finally {
        setLoading(false);
      }
    };

    if (name && category) {
      fetchProductDetails();
    }
  }, [name, category]);

  const handleAddToCart = (item) => {
    const transformedItem = {
      ...item,
      image_url:
        item.images && item.images.length > 0 ? item.images[0].image_url : null, // Add the first image URL
      images: undefined,
    };
    addToCart(transformedItem); // Add the item to the cart via the context
    setAddedToCart(true); // Set state to indicate the item has been added
    setTimeout(() => setAddedToCart(false), 2000); // Reset the "added to cart" message after 2 seconds
    navigate("/add-to-cart");
  };

  if (loading) {
    return (
      <div className="product-page-loading">Loading product details...</div>
    );
  }

  if (error) {
    return <div className="product-page-error">{error}</div>;
  }

  if (!product || product.length === 0) {
    return <div className="product-page-error">No product found</div>;
  }

  return (
    <div className="product-page">
      <div className="product-details-container">
        {product.map((item) => (
          <div key={item.id} className="product-details">
            <h1 className="product-title">{item.name}</h1>
            <div className="product-details">
              <div className="product-image-container">
                {/* Render all images in the images array */}
                {item.images && item.images.length > 0 ? (
                  item.images.map((img, index) => (
                    <img
                      key={index}
                      src={img.image_url || "default_image_url.jpg"} // Add a fallback if no image URL
                      alt={`${item.name} - Image ${index + 1}`}
                      className=""
                      style={{ width: "45%" }}
                    />
                  ))
                ) : (
                  <img
                    src="default_image_url.jpg"
                    alt={item.name}
                    className=""
                    style={{ width: "45%" }}
                  />
                )}
              </div>
              <div className="product-info-container">
                <p>
                  <strong>Brand:</strong> {item.brand}
                </p>
                <p>
                  <strong>Price:</strong> ${item.price}
                </p>
                <p>
                  <strong>Stock:</strong> {item.qty}
                </p>
                <p>
                  <strong>Release Date:</strong>{" "}
                  {new Date(item.release_date).toLocaleDateString()}
                </p>
                <p>
                  <strong>Offers:</strong> {item.offers}
                </p>

                {/* Conditional rendering for each category */}
                {category === "processors" && (
                  <>
                    <p>
                      <strong>Model:</strong> {item.model}
                    </p>
                    <p>
                      <strong>Chipset:</strong> {item.chipset}
                    </p>
                    <p>
                      <strong>Socket:</strong> {item.socket}
                    </p>
                    <p>
                      <strong>Max TDP:</strong> {item.maxtdp}
                    </p>
                  </>
                )}

                {/* Other category-specific details here */}

                {/* Add to Cart button */}
                <button
                  className="add-to-cart-button"
                  onClick={() => handleAddToCart(item)}
                >
                  {addedToCart ? "Added to Cart" : "Add to Cart"}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductPage;

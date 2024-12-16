import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import "./ProductPage.css"; // Import the CSS file for styling

const ProductPage = () => {
  const location = useLocation(); // Get the location object to access the URL
  const queryParams = new URLSearchParams(location.search); // Parse the query params
  const name = queryParams.get("name");
  const category = queryParams.get("category");

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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
                      className="product-image"
                      style={{ width: "45%" }}
                    />
                  ))
                ) : (
                  <img
                    src="default_image_url.jpg"
                    alt={item.name}
                    className="product-image"
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

                {/* Conditional rendering for AIO-specific fields */}
                {category === "aio" && (
                  <>
                    <p>
                      <strong>Length:</strong> {item.len}
                    </p>
                    <p>
                      <strong>Color:</strong> {item.color}
                    </p>
                    <p>
                      <strong>Socket:</strong>{" "}
                      {item.socket ? JSON.stringify(item.socket) : "N/A"}
                    </p>
                  </>
                )}

                {/* Conditional rendering for Cabinet-specific fields */}
                {category === "cabinet" && (
                  <>
                    <p>
                      <strong>Form Factor:</strong> {item.formfactor}
                    </p>
                    <p>
                      <strong>Cabinet Color:</strong> {item.cabinetcol}
                    </p>
                    <p>
                      <strong>GPU Length:</strong> {item.gpulen || "N/A"}
                    </p>
                    <p>
                      <strong>Radiator Length:</strong>{" "}
                      {item.radiatorlen || "N/A"}
                    </p>
                    <p>
                      <strong>Color:</strong> {item.color}
                    </p>
                  </>
                )}

                {/* Conditional rendering for SSD-specific fields */}
                {category === "ssd" && (
                  <>
                    <p>
                      <strong>PCIe Gen:</strong> {item.pciegen}
                    </p>
                    <p>
                      <strong>Interface:</strong> {item.interface}
                    </p>
                    <p>
                      <strong>Capacity:</strong> {item.capacity}
                    </p>
                  </>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductPage;

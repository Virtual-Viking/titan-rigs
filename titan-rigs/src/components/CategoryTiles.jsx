import React from "react";
import { useNavigate } from "react-router-dom";
import "./CategoryTiles.css";

const CategoryTiles = () => {
  const navigate = useNavigate();

  const categories = [
    { image: "processor-tile.png", route: "/processors" },
    { image: "gpu-tile.png", route: "/gpus" },
    { image: "motherboard-tile.png", route: "/motherboards" },
    { image: "monitor-tile.png", route: "/monitors" },
  ];

  return (
    <div className="category-tiles-wrapper">
      <div className="category-tiles-container">
        {categories.map((category, index) => (
          <div
            key={index}
            className="category-tile"
            onClick={() => navigate(category.route)}
          >
            <img src={`/assets/${category.image}`} alt={`Category ${index}`} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategoryTiles;

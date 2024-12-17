import Lottie from "lottie-react";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Slider.css";

import pauseAnimation from "/src/assets/pause.json";

const Slider = ({ onCategoryChange }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [activeCategory, setActiveCategory] = useState(null); // State to track active category
  const navigate = useNavigate();

  const slides = [
    {
      id: 1,
      image: "/src/assets/slider/1.png",
      bgColor: "#000",
      text: "Upgrade to Nvidia For Best Gaming Experience",
      textColor: "#fff",
      link: "/product/1",
    },
    {
      id: 2,
      image: "/src/assets/slider/2.jpg",
      bgColor: "#000",
      text: "With a purchase of $1500 or above, get an AC Mirage Steam key free!!",
      textColor: "#fff",
      link: "/product/2",
    },
    {
      id: 3,
      image: "/src/assets/slider/3.jpg",
      bgColor: "#000",
      text: "Get the Latest Gaming Consoles Today!",
      textColor: "#fff",
      link: "/product/3",
    },
    {
      id: 4,
      image: "/src/assets/slider/4.jpg",
      bgColor: "#003f5c",
      text: "Experience Immersive Gaming!",
      textColor: "#fff",
      link: "/product/4",
    },
  ];

  useEffect(() => {
    let slideInterval;
    if (!isPaused) {
      slideInterval = setInterval(() => {
        setCurrentSlide((prevSlide) => (prevSlide + 1) % slides.length);
      }, 3000);
    }
    return () => clearInterval(slideInterval);
  }, [isPaused, slides.length]);

  const handlePauseClick = () => {
    setIsPaused((prev) => !prev);
  };

  const handleCategoryClick = (category) => {
    setActiveCategory(category); // Set the active category
    if (onCategoryChange) {
      onCategoryChange(category);
    }
    navigate(`/category/${category}`);
  };

  const handleRig = () => {
    navigate("/rig-builder");
  };

  return (
    <div className="slider-wrapper">
      {/* Background Color */}
      <div
        className="slider-background"
        style={{ backgroundColor: slides[currentSlide].bgColor }}
      ></div>

      {/* Departments List */}
      <div className="departments-container">
        <ul className="department-list">
          <li className="departments-header" onClick={() => handleRig()}>
            RIG-BUILDER
          </li>
          <li
            onClick={() => handleCategoryClick("processors")}
            className={activeCategory === "processors" ? "active-category" : ""}
          >
            Processors
          </li>
          <li
            onClick={() => handleCategoryClick("motherboard")}
            className={
              activeCategory === "motherboard" ? "active-category" : ""
            }
          >
            Motherboards
          </li>
          <li
            onClick={() => handleCategoryClick("gpu")}
            className={activeCategory === "gpu" ? "active-category" : ""}
          >
            GPUs
          </li>
          <li
            onClick={() => handleCategoryClick("ram")}
            className={activeCategory === "ram" ? "active-category" : ""}
          >
            RAM
          </li>
          <li
            onClick={() => handleCategoryClick("psu")}
            className={activeCategory === "psu" ? "active-category" : ""}
          >
            PSUs
          </li>
          <li
            onClick={() => handleCategoryClick("aio")}
            className={activeCategory === "aio" ? "active-category" : ""}
          >
            AIOs
          </li>
          <li
            onClick={() => handleCategoryClick("cabinet")}
            className={activeCategory === "cabinet" ? "active-category" : ""}
          >
            Cabinets
          </li>
          <li
            onClick={() => handleCategoryClick("ssd")}
            className={activeCategory === "ssd" ? "active-category" : ""}
          >
            SSDs
          </li>
        </ul>
      </div>

      {/* Slider */}
      <div className="slider">
        <a href={slides[currentSlide].link}>
          <img
            src={slides[currentSlide].image}
            alt={`Slide ${currentSlide + 1}`}
            className="slider-image"
          />
        </a>
        <div
          className="slider-text"
          style={{ color: slides[currentSlide].textColor }}
        >
          {slides[currentSlide].text}
        </div>
      </div>

      {/* Pause Button */}
      <button className="pause-button" onClick={handlePauseClick}>
        <Lottie
          animationData={pauseAnimation}
          loop={false}
          style={{ width: 50, height: 50 }}
        />
      </button>
    </div>
  );
};

export default Slider;

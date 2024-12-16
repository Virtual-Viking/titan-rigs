import React, { useState, useEffect } from "react";
import "./Slider.css";
import Lottie from "lottie-react";
import { useNavigate } from "react-router-dom";

import pauseAnimation from "/src/assets/pause.json";

const Slider = ({ onCategoryChange }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
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

      {/* Departments List code startt not in navbar.jsx, here here, only here */}
      <div className="departments-container">
        <h3 className="departments-header" onClick={() => handleRig()}>
          RIG-BUILDER
        </h3>
        <ul className="department-list">
          <li onClick={() => handleCategoryClick("processors")}>Processors</li>
          <li onClick={() => handleCategoryClick("motherboard")}>
            Motherboards
          </li>
          <li onClick={() => handleCategoryClick("gpu")}>GPUs</li>
          <li onClick={() => handleCategoryClick("ram")}>RAM</li>
          <li onClick={() => handleCategoryClick("psu")}>PSUs</li>
          <li onClick={() => handleCategoryClick("aio")}>AIOs</li>
          <li onClick={() => handleCategoryClick("cabinet")}>Cabinets</li>
          <li onClick={() => handleCategoryClick("ssd")}>SSDs</li>
        </ul>
      </div>

      {/* tarun please place slider code here, without messing the structure, dont use chatgpt use brain.exe  */}
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

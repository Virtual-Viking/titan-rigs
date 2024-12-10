import React, { useState, useEffect } from "react";
import "./Slider.css";
import Lottie from "lottie-react";
import pauseAnimation from "/src/assets/pause.json";

const Slider = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
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
      text: "With a purchase of 1500$ or above get AC Mirage Steam key free!!",
      textColor: "#fff",
      link: "/product/2",
    },
    {
      id: 3,
      image: "/src/assets/slider/3.jpg",
      bgColor: "#000",
      // text: "Get the Latest Gaming Consoles Today!",
      textColor: "#fff",
      link: "/product/3",
    },
    {
      id: 3,
      image: "/src/assets/slider/4.jpg",
      bgColor: "#003f5c",
      // text: "Get the Latest Gaming Consoles Today!",
      textColor: "#fff",
      link: "/product/3",
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

  return (
    <div className="slider-wrapper">
      {/* Background Color */}
      <div
        className="slider-background"
        style={{ backgroundColor: slides[currentSlide].bgColor }}
      ></div>

      {/* Departments List */}
      <div className="departments-container">
        <div className="departments-header">Departments</div>
        <ul className="departments-list">
          <li>Processor</li>
          <li>Motherboard</li>
          <li>RAM</li>
          <li>Storage</li>
          <li>Graphic card</li>
          <li>Power Supply</li>
          <li>Monitor</li>
          <li>O ther components</li>
        </ul>
      </div>

      {/* Image Slider */}
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

import React from 'react';

const HeroSection = () => {
  return (
    <section className="bg-gray-100 py-20">
      <div className="container mx-auto flex items-center justify-between">
        <div className="max-w-lg">
          <h1 className="text-4xl font-bold mb-4">Explore the Latest Electronics</h1>
          <p className="text-lg text-gray-700 mb-6">Discover top-rated products at unbeatable prices. Shop Now!</p>
          <a
            href="/shop"
            className="bg-blue-500 hover:bg-blue-600 text-white py-3 px-6 rounded-lg text-lg"
          >
            Shop Now
          </a>
        </div>
        <img
          src="/path/to/hero-image.jpg"
          alt="Electronics"
          className="w-1/2"
        />
      </div>
    </section>
  );
};

export default HeroSection;
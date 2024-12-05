import React from 'react';

const HeroSection = () => {
  return (
    <div className="bg-gray-100 py-16">
      <div className="container mx-auto text-center">
        <h1 className="text-4xl font-bold mb-4">Explore the Latest Electronics</h1>
        <p className="text-lg text-gray-600 mb-6">
          Shop quality products at unbeatable prices. Shop Now!
        </p>
        <button className="bg-blue-500 hover:bg-blue-600 text-white py-3 px-6 rounded-lg shadow-lg">
          Shop Now
        </button>
      </div>
    </div>
  );
};

export default HeroSection;

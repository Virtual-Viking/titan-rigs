import React from 'react';

const CategoriesSection = () => {
  const categories = ['Processors', 'Graphics Cards', 'Storage', 'Motherboards'];

  return (
    <div className="py-12 bg-gray-50">
      <div className="container mx-auto text-center">
        <h2 className="text-3xl font-bold mb-8">Shop by Category</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {categories.map((category) => (
            <button
              key={category}
              className="py-4 px-6 bg-gray-200 hover:bg-gray-300 text-lg font-semibold rounded-lg shadow-md"
            >
              {category}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CategoriesSection;

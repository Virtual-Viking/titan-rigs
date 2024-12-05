import React from 'react';

const categories = [
  { name: 'Processors', image: '/path/to/processor.jpg' },
  { name: 'Graphics Cards', image: '/path/to/gpu.jpg' },
  { name: 'Storage', image: '/path/to/storage.jpg' },
  { name: 'Motherboards', image: '/path/to/motherboard.jpg' },
];

const CategoriesSection = () => {
  return (
    <section className="py-10 bg-gray-50">
      <div className="container mx-auto">
        <h2 className="text-3xl font-bold mb-6">Shop by Category</h2>
        <div className="grid grid-cols-4 gap-4">
          {categories.map((category, index) => (
            <div key={index} className="text-center">
              <img src={category.image} alt={category.name} className="w-full h-40 object-cover mb-4 rounded-lg" />
              <h3 className="text-lg font-semibold">{category.name}</h3>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategoriesSection;

import React from 'react';
import logo from '../assets/logo.svg'; 

const Navbar = () => {
  return (
    <nav className="bg-secondary text-textMain py-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center">
        <a href="/">
            <img src={logo} alt="Titan Rigs Logo" className="h-10 w-auto mr-3" />
        </a>
          {/* <span className="text-2xl font-bold">Titan Rigs</span> */}
        </div>
        <div className="flex space-x-6">
          {/* <a href="/" className="hover:text-accent">Home</a> */}
          <a href="/about" className="hover:text-accent">About Us</a>
          <a href="/rig-builder" className="hover:text-accent">RIG Builder</a>
          <a href="/login" className="hover:text-accent">Login</a>
        </div>
        <div>
          <a
            href="/contact"
            className="bg-accent hover:bg-yellow-400 text-black font-bold py-2 px-4 rounded"
          >
            Contact Us
          </a>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

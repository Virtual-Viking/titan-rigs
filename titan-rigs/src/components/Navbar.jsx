import React from 'react';
import { Link } from 'react-router-dom'; // Use Link for navigation

const Navbar = () => {
  return (
    <nav className="bg-secondary text-textMain py-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center">
          <a href="/">
            <img src="/src/assets/logo.svg" alt="Titan Rigs Logo" className="h-10 w-auto mr-3" />
          </a>
        </div>
        <div className="flex space-x-6">
          <Link to="/" className="hover:text-accent">Home</Link>
          <Link to="/about" className="hover:text-accent">About Us</Link>
          <Link to="/rig-builder" className="hover:text-accent">RIG Builder</Link>
          <Link
            to="/contact"
            className="hover:text-accent"
          >
            Contact Us
          </Link>
        </div>
        <div>
          <Link to="/login" className="hover:text-accent">Login</Link>  {/* Use Link to navigate */}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
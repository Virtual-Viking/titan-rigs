import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import CategoriesSection from './components/CategoriesSection';
import Footer from './components/Footer';
import LoginPage from './components/LoginPage';  // Make sure LoginPage is correctly imported

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<HeroSection />} />
        <Route path="/login" element={<LoginPage />} />  {/* Correct route for LoginPage */}
        {/* Add other routes as necessary */}
      </Routes>
      <CategoriesSection />
      <Footer />
    </Router>
  );
}

export default App;

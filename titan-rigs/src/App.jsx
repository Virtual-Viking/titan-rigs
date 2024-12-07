import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import CategoriesSection from './components/CategoriesSection';
import Footer from './components/Footer';
import LoginPage from './components/LoginPage';  // Make sure LoginPage is correctly imported

const App = () => {
  return (
    <Router>
      <div className="app-container">
        <Navbar />
        <Routes>
          <Route path="/" element={
            <>
              <div className="hero-section">Hero Section Placeholder</div>
              <CategoriesSection />
            </>
          } />
          <Route path="/login" element={<LoginPage />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
};

export default App;

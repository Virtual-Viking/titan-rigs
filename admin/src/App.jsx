import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import AdminDashboard from "./pages/AdminDashboard";
import AddProduct from "./pages/AddProduct";
import "./App.css";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route
          path="/AdminDashboard/*"
          element={
            <>
              <AdminDashboard />
            </>
          }
        >
          <Route path="add-product" element={<AddProduct />} />
          {/* Add more routes as needed */}
        </Route>
      </Routes>
    </Router>
  );
};

export default App;

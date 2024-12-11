import React, { useState } from "react";
import AdminSidebar from "../pages/AdminSidebar";
import AdminHeader from "../pages/AdminHeader";
// import Overview from "../pages/Overview";
// import ManageProducts from "../pages/ManageProducts";
// import ManageOrders from "../pages/ManageOrders";
// import SalesAnalytics from "../pages/SalesAnalytics";
// import UsersManagement from "../pages/UsersManagement";
// import Settings from "../pages/Settings";
import "./AdminDashboard.css";

const AdminDashboard = () => {
  return (
    <div className="admin-dashboard">
      <div className="admin-sidebar">
        <h2>Admin Panel</h2>
        <ul>
          <li className="active">Dashboard</li>
          <li>Orders</li>
          <li>Add Product</li>
          <li>Settings</li>
        </ul>
      </div>
      <div className="main-content">
        <div className="admin-header">
          <h1>Welcome to Admin Dashboard</h1>
          <input type="text" placeholder="Search..." />
        </div>
        <p>This is a placeholder for dashboard content.</p>
      </div>
    </div>
  );
};

export default AdminDashboard;

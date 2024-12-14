import React from "react";
import { Link } from "react-router-dom";
// import "./AdminSidebar.css";

const AdminSidebar = () => {
  return (
    <div className="admin-sidebar">
      <ul>
        <li>
          <Link to="/AdminDashboard">Dashboard</Link>
        </li>
        <li>
          <Link to="/AdminDashboard/orders">Orders</Link>
        </li>
        <li>
          <Link to="/AdminDashboard/add-product">Add Product</Link>
        </li>
        <li>
          <Link to="/AdminDashboard/settings">Settings</Link>
        </li>
      </ul>
    </div>
  );
};

export default AdminSidebar;

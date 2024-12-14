import React from "react";
import { Outlet } from "react-router-dom";
import AdminSidebar from "./AdminSidebar";
import AdminHeader from "./AdminHeader";
import AddProduct from "./AddProduct";
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
      <AdminSidebar />
      <div className="admin-main-content">
        <AdminHeader />
        <Outlet /> {/* Renders the nested routes */}
      </div>
    </div>
  );
};

export default AdminDashboard;

import React, { useState } from "react";
import AdminSidebar from "../components/AdminSidebar";
import AdminHeader from "../components/AdminHeader";
import Overview from "../components/Overview";
import ManageProducts from "../components/ManageProducts";
import ManageOrders from "../components/ManageOrders";
import SalesAnalytics from "../components/SalesAnalytics";
import UsersManagement from "../components/UsersManagement";
import Settings from "../components/Settings";

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState("Overview");

  const renderTabContent = () => {
    switch (activeTab) {
      case "Overview":
        return <Overview />;
      case "ManageProducts":
        return <ManageProducts />;
      case "ManageOrders":
        return <ManageOrders />;
      case "SalesAnalytics":
        return <SalesAnalytics />;
      case "UsersManagement":
        return <UsersManagement />;
      case "Settings":
        return <Settings />;
      default:
        return <Overview />;
    }
  };

  return (
    <div className="admin-dashboard">
      <AdminSidebar setActiveTab={setActiveTab} activeTab={activeTab} />
      <div className="main-content">
        <AdminHeader />
        {renderTabContent()}
      </div>
    </div>
  );
};

export default AdminDashboard;

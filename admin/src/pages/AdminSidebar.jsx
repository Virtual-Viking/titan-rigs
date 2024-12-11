import React from "react";

const AdminSidebar = ({ setActiveTab, activeTab }) => {
  const tabs = [
    { name: "Overview", icon: "📊" },
    { name: "ManageProducts", icon: "🛒" },
    { name: "ManageOrders", icon: "📦" },
    { name: "SalesAnalytics", icon: "📈" },
    { name: "UsersManagement", icon: "👥" },
    { name: "Settings", icon: "⚙️" },
  ];

  return (
    <div className="admin-sidebar">
      <h2>Admin Panel</h2>
      <ul>
        {tabs.map((tab) => (
          <li
            key={tab.name}
            className={activeTab === tab.name ? "active" : ""}
            onClick={() => setActiveTab(tab.name)}
          >
            <span className="icon">{tab.icon}</span> {tab.name}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AdminSidebar;

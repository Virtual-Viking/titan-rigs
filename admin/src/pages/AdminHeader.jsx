import React from "react";

const AdminHeader = () => {
  return (
    <div className="admin-header">
      <h1>Admin Dashboard</h1>
      <div className="header-right">
        <input type="text" placeholder="Search..." />
        <button>Logout</button>
      </div>
    </div>
  );
};

export default AdminHeader;

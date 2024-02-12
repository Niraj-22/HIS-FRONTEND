import React from "react";
import { Outlet } from "react-router-dom";
import PrivateNavbar from "../PrivateNavbar";
import { useAdmin } from "../context/AuthContent";
import NoAccessPage from "../pages/NoAccessPage";
const AdminLayout = () => {
  const admin = useAdmin();

  if (!admin) {
    return <NoAccessPage />;
  }

  return (
    <div className="flex">
      <PrivateNavbar />
      <div className="flex-1 ">
        <Outlet />
      </div>
    </div>
  );
};

export default AdminLayout;

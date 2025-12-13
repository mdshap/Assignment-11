import React, { use } from "react";
import DashSidebar from "../Pages/Dashboard/DashSidebar";
import { Outlet } from "react-router";
import { AuthContext } from "../../Authentication/AuthContext";
import Loader from "../Pages/Loader/Loader";

const Dashboard = () => {
    
  const { loading } = use(AuthContext);

  if (loading) {
    return <Loader />;
  }

  return (
    <div data-theme="light" className="flex max-w-[1440px] mx-auto">
      <DashSidebar />
      <Outlet />
    </div>
  );
};

export default Dashboard;

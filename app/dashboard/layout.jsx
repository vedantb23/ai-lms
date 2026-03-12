import React from "react";
import SideBar from "./_components/SideBar";
import DashboardHeader from "./_components/DashboardHeader";

const Layout = ({ children }) => {
  return (
    <div>
      <div className="md:w-64 hidden md:block fixed">
        <SideBar />
      </div>
      <div className="md:ml-64">
        <DashboardHeader />
        <div className="">{children}</div>
      </div>
    </div>
  );
};

export default Layout;

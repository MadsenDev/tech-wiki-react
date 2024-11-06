// src/components/layouts/Layout.js
import React from "react";
import Sidebar from "../sidebar/Sidebar";
import Header from "../header/Header";

const Layout = ({ children }) => {
  return (
    <div className="flex h-screen bg-neutral-100 text-gray-800">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <Header />

        {/* Main Content: Apply scrolling behavior here */}
        <main className="flex-1 p-8 overflow-y-auto">{children}</main>
      </div>
    </div>
  );
};

export default Layout;
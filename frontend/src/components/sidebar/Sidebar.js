// src/components/sidebar/Sidebar.js
import React from "react";
import SidebarSection from "./SidebarSection";
import { useUser } from "../../context/UserContext";

const Sidebar = () => {
    const { user } = useUser();
  return (
    <aside className="w-64 bg-neutral-800 text-white min-h-screen shadow-nav flex flex-col">
      {/* Sidebar Header */}
      <div className="p-6 font-bold text-2xl text-primary">Tech Wiki</div>

      {/* Main Navigation Sections */}
      <nav className="flex-1 overflow-y-auto space-y-6">
        <SidebarSection
          title="Main"
          items={[
            { label: "Home", icon: "FaHome", path: "/" },
            { label: "Guides", icon: "FaBook", path: "/guides" },
            { label: "Browse By Categories", icon: "FaList", path: "/browse-categories" },
          ]}
        />
        <SidebarSection
          title="Tools"
          items={[
            { label: "Settings", icon: "FaCog", path: "/settings" },
          ]}
        />

        {/* Admin Section - visible only to users with 'admin' role */}
        {user && user.role === "admin" && (
          <SidebarSection
            title="Admin"
            items={[
              { label: "User Management", icon: "FaUserShield", path: "/admin/users" },
              { label: "Category Management", icon: "FaList", path: "/admin/categories" },
              { label: "Guide Management", icon: "FaList", path: "/admin/guides" },
              { label: "System Settings", icon: "FaCog", path: "/admin/system" },
            ]}
          />
        )}
      </nav>

      {/* Footer */}
      <div className="p-6 text-center text-neutral-400">
        © {new Date().getFullYear()} Tech Wiki
      </div>
    </aside>
  );
};

export default Sidebar;
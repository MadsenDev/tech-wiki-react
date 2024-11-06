// src/components/sidebar/SidebarItem.js
import React from "react";
import { getIcon } from "../../utils/getIcon";
import { Link } from "react-router-dom"; // Assuming we’re using React Router

const SidebarItem = ({ label, icon, path }) => {
  const IconComponent = getIcon(icon);

  return (
    <li>
      <Link
        to={path}
        className="flex items-center px-4 py-2 rounded-lg text-neutral-200 hover:bg-neutral-700 transition"
      >
        {IconComponent && <IconComponent className="w-5 h-5 mr-3 text-secondary" />}
        <span>{label}</span>
      </Link>
    </li>
  );
};

export default SidebarItem;
// src/components/sidebar/SidebarSection.js
import React from "react";
import SidebarItem from "./SidebarItem";

const SidebarSection = ({ title, items }) => {
  return (
    <div className="mb-4">
      <h3 className="px-4 py-2 text-sm font-semibold text-neutral-300 uppercase tracking-wider">
        {title}
      </h3>
      <ul className="space-y-1">
        {items.map((item) => (
          <SidebarItem key={item.label} {...item} />
        ))}
      </ul>
    </div>
  );
};

export default SidebarSection;
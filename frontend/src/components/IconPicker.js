// src/components/IconPicker.js
import React, { useState } from "react";
import * as Icons from "react-icons/fa"; // Import all FontAwesome icons
import Input from "./common/Input";
import { FaSearch } from "react-icons/fa";

const IconPicker = ({ onIconSelect }) => {
  const [search, setSearch] = useState("");
  const [selectedIcon, setSelectedIcon] = useState(null);

  // Filter icons based on search query
  const filteredIcons = Object.keys(Icons).filter((iconName) =>
    iconName.toLowerCase().includes(search.toLowerCase())
  );

  // Handle icon selection
  const handleIconClick = (iconName) => {
    setSelectedIcon(iconName);
    onIconSelect(iconName);
  };

  return (
    <div className="icon-picker bg-neutral-800 rounded-lg shadow-lg p-4 text-neutral-200">
      {/* Search Input */}
      <div className="mb-4 flex items-center border-b border-neutral-600 pb-2">
        <FaSearch className="text-neutral-400 mr-2" />
        <Input
          type="text"
          placeholder="Search icons..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full text-sm border-0 focus:outline-none"
        />
      </div>

      {/* Icons Grid */}
      <div className="grid grid-cols-6 gap-2 overflow-y-auto max-h-64 p-2">
        {filteredIcons.length > 0 ? (
          filteredIcons.map((iconName) => {
            const IconComponent = Icons[iconName];
            const isSelected = selectedIcon === iconName;

            return (
              <div
                key={iconName}
                onClick={() => handleIconClick(iconName)}
                className={`flex justify-center items-center p-2 rounded-lg cursor-pointer transition-all ${
                  isSelected
                    ? "bg-primary text-neutral-900 shadow-md scale-105"
                    : "bg-neutral-700 text-neutral-400 hover:bg-neutral-600"
                }`}
                title={iconName}
              >
                <IconComponent size={24} />
              </div>
            );
          })
        ) : (
          <p className="col-span-6 text-center text-sm text-neutral-400 mt-4">
            No icons found
          </p>
        )}
      </div>
    </div>
  );
};

export default IconPicker;
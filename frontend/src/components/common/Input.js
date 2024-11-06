// src/components/common/Input.js
import React from "react";
import { FaSearch } from "react-icons/fa";

const Input = ({ placeholder, icon: Icon, type = "text", ...props }) => (
  <div className="flex items-center border rounded-xl text-gray-800 shadow-card px-3 py-2 bg-neutral-50 focus-within:ring-2 ring-primary">
    {Icon && <Icon className="text-primary mr-2 w-5 h-5" />}
    <input
      type={type}
      placeholder={placeholder}
      style={{
        backgroundColor: 'transparent', // Ensures input has no background
        boxShadow: 'none',               // Removes default focus ring
        padding: '0',                    // Resets padding for better control
        margin: '0',                     // Removes default margin
      }}
      className="flex-1 appearance-none outline-none py-1 placeholder-gray-500 text-gray-800 leading-tight"
      {...props}
    />
  </div>
);

export default Input;
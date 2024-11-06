// src/components/common/Select.js
import React from "react";

const Select = ({ options = [], placeholder = "Select an option", ...props }) => (
  <div className="border rounded-xl shadow-card text-gray-800 px-3 py-2 bg-neutral-50 focus-within:ring-2 ring-primary">
    <select
      className="w-full appearance-none outline-none py-1 bg-transparent text-gray-800 leading-tight"
      style={{
        backgroundColor: 'transparent',
        boxShadow: 'none',
        padding: '0',
        margin: '0',
      }}
      {...props}
    >
      {props.multiple ? null : <option value="" disabled hidden>{placeholder}</option>}
      {options.map((option, index) => (
        <option key={index} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  </div>
);

export default Select;
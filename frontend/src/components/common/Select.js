// src/components/common/Select.js
import React from "react";

const Select = ({ options = [], placeholder = "Select an option", ...props }) => (
  <div className="border rounded-xl shadow-card text-neutral-200 px-3 py-2 bg-neutral-800 focus-within:ring-2 ring-accent">
    <select
      className="w-full appearance-none outline-none py-1 bg-transparent text-neutral-200 leading-tight"
      {...props}
    >
      {props.multiple ? null : (
        <option value="" disabled hidden>
          {placeholder}
        </option>
      )}
      {options.map((option, index) => (
        <option key={index} value={option.value} className="bg-neutral-700 text-neutral-200">
          {option.label}
        </option>
      ))}
    </select>
  </div>
);

export default Select;
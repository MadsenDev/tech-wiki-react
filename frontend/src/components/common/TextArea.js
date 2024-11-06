// src/components/common/TextArea.js
import React from "react";

const TextArea = ({ placeholder, rows = 4, ...props }) => (
  <div className="border rounded-xl shadow-card text-gray-800 px-3 py-2 bg-neutral-50 focus-within:ring-2 ring-primary">
    <textarea
      placeholder={placeholder}
      rows={rows}
      style={{
        backgroundColor: 'transparent', // Ensures textarea has no background
        boxShadow: 'none',               // Removes default focus ring
        padding: '0',                    // Resets padding for better control
        margin: '0',                     // Removes default margin
        resize: 'none',                  // Prevents resizing to keep layout consistent
      }}
      className="w-full appearance-none outline-none py-1 placeholder-gray-500 text-gray-800 leading-tight"
      {...props}
    />
  </div>
);

export default TextArea;
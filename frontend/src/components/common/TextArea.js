// src/components/common/TextArea.js
import React from "react";

const TextArea = ({ placeholder, rows = 4, ...props }) => (
  <div className="border rounded-xl shadow-card text-neutral-200 px-3 py-2 bg-neutral-800 focus-within:ring-2 ring-accent">
    <textarea
      placeholder={placeholder}
      rows={rows}
      className="w-full appearance-none outline-none py-1 placeholder-neutral-400 bg-transparent text-neutral-200 leading-tight resize-none"
      {...props}
    />
  </div>
);

export default TextArea;
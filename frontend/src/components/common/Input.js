// src/components/common/Input.js
import React from "react";

const Input = ({ placeholder, icon: Icon, type = "text", ...props }) => (
  <div className="flex items-center border rounded-xl text-neutral-200 shadow-card px-3 py-2 bg-neutral-800 focus-within:ring-2 ring-accent">
    {Icon && <Icon className="text-accent mr-2 w-5 h-5" />}
    <input
      type={type}
      placeholder={placeholder}
      className="flex-1 appearance-none outline-none py-1 placeholder-neutral-400 bg-transparent text-neutral-200 leading-tight"
      {...props}
    />
  </div>
);

export default Input;
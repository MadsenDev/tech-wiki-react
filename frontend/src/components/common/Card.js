// src/components/common/Card.js
import React from "react";

const Card = ({ title, children, footer, actions, className }) => (
  <div className={`bg-neutral-700 p-6 rounded-2xl shadow-card flex flex-col hover:shadow-lg transition-shadow ${className}`}>
    {title && (
      <h2 className="text-2xl font-semibold mb-3 text-accent">
        {title}
      </h2>
    )}
    <div className="flex-grow text-neutral-200 leading-relaxed">{children}</div>
    {footer && (
      <div className="mt-4 text-sm text-neutral-400 border-t border-neutral-600 pt-3">
        {footer}
      </div>
    )}
    {actions && (
      <div className="mt-4 flex justify-end space-x-2">
        {actions}
      </div>
    )}
  </div>
);

export default Card;
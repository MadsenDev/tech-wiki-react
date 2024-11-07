// src/components/common/Modal.js
import React from "react";
import Header from "./Header";

const Modal = ({ isOpen, onClose, title, children, wide = false }) => {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 flex items-center justify-center z-50 bg-neutral-900 bg-opacity-75"
      onClick={onClose}
    >
      <div
        className={`bg-neutral-800 rounded-2xl shadow-lg p-6 w-full ${wide ? "max-w-7xl" : "max-w-lg"} relative`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="mb-4 relative">
          <Header size="h3" align="center" color="accent">{title}</Header>
          <button
            onClick={onClose}
            className="absolute right-0 top-0 text-neutral-500 hover:text-neutral-300 text-2xl leading-none"
          >
            &times;
          </button>
        </div>

        {/* Modal Content */}
        <div className="text-neutral-300">{children}</div>
      </div>
    </div>
  );
};

export default Modal;
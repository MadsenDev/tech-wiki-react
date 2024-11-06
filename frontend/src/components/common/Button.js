import React from "react";
import PropTypes from "prop-types";
import { FaSpinner } from "react-icons/fa";

const buttonStyles = {
  primary: "bg-primary text-white hover:bg-secondary",
  secondary: "bg-secondary text-white hover:bg-primary",
  outline: "border border-primary text-primary hover:bg-primary hover:text-white",
  icon: "p-2 text-primary bg-transparent hover:bg-neutral-100 rounded-full",
};

const sizeStyles = {
  sm: "px-3 py-1 text-sm",
  md: "px-4 py-2",
  lg: "px-5 py-3 text-lg",
};

const Button = ({ variant = "primary", size = "md", children, icon: Icon, isLoading, disabled, ...props }) => {
  const isDisabled = isLoading || disabled;

  return (
    <button
      className={`inline-flex items-center justify-center rounded-xl shadow-card transition 
                  ${buttonStyles[variant]} ${sizeStyles[size]} 
                  ${isDisabled ? "opacity-50 cursor-not-allowed" : ""}`}
      disabled={isDisabled}
      {...props}
    >
      {/* Icon with conditional margin */}
      {Icon && !isLoading && (
        <Icon className={`${children ? "mr-2" : "mx-1"}`} />
      )}
      
      {/* Loading spinner if in loading state */}
      {isLoading && <FaSpinner className="animate-spin mr-2" />}
      
      {/* Button text */}
      {children}
    </button>
  );
};

// Define prop types for clarity and default prop values
Button.propTypes = {
  variant: PropTypes.oneOf(["primary", "secondary", "outline", "icon"]),
  size: PropTypes.oneOf(["sm", "md", "lg"]),
  icon: PropTypes.elementType, // Pass icon component like FaSearch
  isLoading: PropTypes.bool,
  disabled: PropTypes.bool,
  children: PropTypes.node,
};

Button.defaultProps = {
  variant: "primary",
  size: "md",
  isLoading: false,
  disabled: false,
};

export default Button;
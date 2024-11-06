// src/components/common/Header.js
import React from "react";
import PropTypes from "prop-types";

const Header = ({ size, align, color, children, className }) => {
  const Tag = size; // Dynamic header tag, e.g., h1, h2, etc.

  return (
    <Tag
      className={`text-${color} text-${align} ${className} ${
        size === "h1" ? "text-4xl font-bold" :
        size === "h2" ? "text-3xl font-semibold" :
        size === "h3" ? "text-2xl font-semibold" :
        "text-xl font-medium"
      }`}
    >
      {children}
    </Tag>
  );
};

Header.propTypes = {
  size: PropTypes.oneOf(["h1", "h2", "h3", "h4"]),
  align: PropTypes.oneOf(["left", "center", "right"]),
  color: PropTypes.string,
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
};

Header.defaultProps = {
  size: "h3",
  align: "center",
  color: "primary",
  className: "",
};

export default Header;
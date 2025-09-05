// components/atoms/Button.jsx
import React from "react";

const Button = ({ children, onClick, className = "" }) => {
  return (
    <button
      onClick={onClick}
      className={`bg-[#FFC300] hover:bg-yellow-500 text-black px-4 py-2 rounded font-medium transition-colors ${className}`}
    >
      {children}
    </button>
  );
};

export default Button;

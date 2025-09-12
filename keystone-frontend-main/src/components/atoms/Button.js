// components/atoms/Button.jsx
import React from "react";

const Spinner = () => (
  <svg
    className="animate-spin -ml-1 mr-2 h-5 w-5 text-current"
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
  >
    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"></path>
  </svg>
);

const Button = ({ children, onClick, className = "", type = "button", disabled = false, loading = false }) => {
  const isDisabled = disabled || loading;
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={isDisabled}
      className={`bg-[#FFC300] hover:bg-yellow-500 disabled:opacity-60 disabled:cursor-not-allowed text-black px-4 py-2 rounded font-medium transition-colors inline-flex items-center justify-center ${className}`}
    >
      {loading && <Spinner />}
      <span>{children}</span>
    </button>
  );
};

export default Button;

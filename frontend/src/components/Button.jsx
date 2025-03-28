import React from "react";

const Button = ({ text, onClick, className = "" }) => {
  return (
    <button 
      className={`w-full py-3 bg-gradient-to-r from-blue-600 to-purple-800 border-none text-white text-lg font-semibold rounded-lg cursor-pointer transition-transform duration-300 hover:from-blue-600 hover:to-purple-700 hover:-translate-y-1 ${className}`}
      onClick={onClick}
    >
      {text}
    </button>
  );
};

export default Button;
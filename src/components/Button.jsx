// Button.jsx
import React from 'react';

const Button = ({ children, onClick, className = '', type = 'button' }) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`bg-[#081F5C] text-white px-6 py-2 rounded-xl shadow-md hover:bg-[#061743] transition duration-300 active:scale-95 cursor-pointer ${className}`}
    >
      {children}
    </button>
  );
};

export default Button;

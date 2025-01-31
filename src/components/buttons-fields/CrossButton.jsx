import React from "react";
import { RxCross2 } from "react-icons/rx";

function CrossButton({ onClick, padding = "p-1.5", size = 32, className }) {
  return (
    <RxCross2
      size={size}
      className={`${padding} rounded-full cursor-pointer hover:bg-gray-100/80 active:text-gray-600 text-gray-500 active:scale-95 ${className}`}
      onClick={onClick}
    />
  );
}

export default CrossButton;

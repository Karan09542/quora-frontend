import React from "react";

const BorderButton = ({ onClick, name, className, isBorder = true, style }) => {
  return (
    <button
      onClick={onClick}
      className={`text-[13px] active:opacity-80  text-[#2E69FF] font-medium ${
        isBorder
          ? "border border-[#2E69FF] hover:bg-[#EBF0FF]"
          : "hover:bg-[#00000008]"
      } rounded-full px-3 py-1 ${className}`}
      style={style}
    >
      {name}
    </button>
  );
};

export default BorderButton;

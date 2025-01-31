import React from "react";

function SmallText({ text, isHidden = true, onClick, className }) {
  return (
    <div
      onClick={onClick}
      className={`group-hover:visible ${
        isHidden ? "invisible" : ""
      } text-[13px] text-[var(--text-color-93)] cursor-pointer hover:underline ${className}`}
    >
      {text}
    </div>
  );
}

export default SmallText;

import React from "react";

const MaxLength = ({
  maxLength,
  minLength = 0,
  isShow = true,
  top = "50%",
  right = "1.04rem",
}) => {
  return (
    <div
      className={`absolute -translate-y-1/2  text-[13px] z-20 bg-white p-2 ${
        maxLength === minLength
          ? "text-red-500 "
          : "text-[var(--text-color-93)]"
      }`}
      style={{ top, right }}
    >
      {isShow && maxLength}
    </div>
  );
};

export default MaxLength;

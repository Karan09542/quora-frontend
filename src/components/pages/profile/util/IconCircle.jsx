import React from "react";

function IconCircle({
  Icon,
  onClick,
  hoverColor,
  isBorder,
  padding = "0.25rem",
  className,
  iconSize = "20",
  strokeWidth,
  iconClassName,
}) {
  return (
    <div
      onClick={onClick}
      className={` ${
        isBorder ? "border" : ""
      } active:opacity-[0.8] border-[#dadada] ${
        hoverColor ?? "hover:bg-[#f7f7f7]"
      } rounded-full cursor-pointer ${className}`}
      style={{
        padding,
      }}
    >
      {Icon && (
        <Icon
          color="var(--text-gen-color)"
          className={`"w-5 h-5" [&>path]:stroke-[var(--text-gen-color)] ${iconClassName} `}
          style={{ width: iconSize, height: iconSize, strokeWidth }}
        />
      )}
    </div>
  );
}

export default IconCircle;

import React from "react";
import { IoIosArrowDown } from "react-icons/io";

const DownArrowButton = ({
  LeftIcon,
  name,
  RightIcon,
  onClick,
  style,
  hoverColor,
  isRight = true,
  className,
  isBorder = true,
  letfIconSize,
  rightIconSize,
}) => {
  return (
    <div
      role="button"
      style={style}
      onClick={onClick}
      className={`cursor-pointer select-none flex ${
        isBorder ? "border" : ""
      } rounded-full px-3 py-1.5 items-center gap-1 ${
        hoverColor ? hoverColor : "hover:bg-[#FFFFFF33]"
      } ${className}`}
    >
      {LeftIcon && (
        <LeftIcon style={{ width: letfIconSize, height: letfIconSize }} />
      )}
      <span className="font-semibold text-[14px]">{name}</span>
      {RightIcon ? (
        <RightIcon style={{ width: rightIconSize, height: rightIconSize }} />
      ) : (
        isRight && <IoIosArrowDown size={rightIconSize} />
      )}
    </div>
  );
};

export default DownArrowButton;

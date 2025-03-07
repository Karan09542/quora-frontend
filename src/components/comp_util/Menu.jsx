import React from "react";
import { useNavigate } from "react-router-dom";

const Menu = ({
  pathMenu,
  currentPath,
  color,
  className,
  isHr = true,
  style,
}) => {
  const navigate = useNavigate();
  return (
    <div
      style={style}
      className={`${className} sticky w-full z-[1] pt-0.5 bg-white top-12`}
    >
      <div className={`flex gap-x-0.5 text-[13px] mt-2`}>
        {pathMenu?.map((menu) => {
          return (
            <button
              style={{ color, "--bottom-border-color": color ?? "#B92B27" }}
              key={menu?.name}
              onClick={() => {
                navigate(menu?.navigate);
              }}
              className={`min-w-[55px] text-ellipsis text-nowrap overflow-hidden relative font-medium  capitalize px-2 py-4 ${
                menu?.navigate === currentPath
                  ? "text-[#B92B27] bottom-border after:bg-[var(--bottom-border-color)]"
                  : "text-[var(--text-color-93)] hover:bg-[#00000008]"
              }`}
            >
              {menu?.name}
            </button>
          );
        })}
      </div>
      {isHr && <hr />}
    </div>
  );
};

export default Menu;

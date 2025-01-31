import React from "react";
import IconCircle from "../pages/profile/util/IconCircle";

function IconButton({ Icon, name, className, onClick, strokeWidth }) {
  return (
    <div onClick={onClick} className={`${className}`}>
      <div className="flex flex-col items-center w-fit">
        <IconCircle
          Icon={Icon}
          hoverColor={""}
          iconSize={24}
          className={"bg-[#00000108] w-fit"}
          padding={8}
          strokeWidth={strokeWidth}
        />
        <p className="text-[13px] text-[var(--text-gen-color)]">{name}</p>
      </div>
    </div>
  );
}

export default IconButton;

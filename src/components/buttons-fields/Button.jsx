import React from "react";
import { CgSpinner } from "react-icons/cg";

function Button({
  onClick,
  name,
  type = "button",
  className,
  isFill = true,
  loading,
  style,
}) {
  return (
    <button
      type={type}
      className={`${className} flex items-center gap-2 px-5 py-[0.5rem] text-white !rounded-3xl`}
      disabled={!isFill}
      value={"Login"}
      onClick={onClick}
      style={style}
    >
      {loading && <CgSpinner className="w-5 h-5 animate-spin" />}
      {name}
    </button>
  );
}

export default Button;

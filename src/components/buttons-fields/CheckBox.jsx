import React from "react";
import { IoMdCheckmark } from "react-icons/io";

const CheckBox = ({ isChecked }) => {
  return (
    <div className="group-hover:ring-4 rounded-[0.15rem] group-hover:ring-[#d5e1ff]">
      <div
        className={`flex relative items-center justify-center w-[21px] h-[21px] border border-[#dee0e1] ${
          isChecked
            ? "bg-[#1457ff] rounded-[4px] [&>svg]:text-white"
            : "group-hover:border-[#1457ff] rounded-[0.15rem]"
        }`}
      >
        {isChecked && <IoMdCheckmark size={17} />}
      </div>
    </div>
  );
};

export default CheckBox;

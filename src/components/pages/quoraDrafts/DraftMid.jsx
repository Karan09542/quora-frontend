import React from "react";
import QuoraDraftComponent from "./QuoraDraftComponent";
import { IoIosArrowDown } from "react-icons/io";

function DraftMid({ className }) {
  return (
    <div className={`${className}`}>
      <div className="mb-2">
        <div className="flex justify-between mb-2 [&>:first-child]:font-semibold [&>:first-child]:text-[vaar(--text-dark)] child-flex ">
          <span>1 Draft</span>
          <span className="text-[0.788rem] [&>span]:cursor-pointer hover:[&>:first-child]:underline text-gray-500 child-flex">
            <span>Delete all drafts</span>
            <span className="px-3 py-1.5 font-semibold  rounded-full click-hover-effect">
              <span>Most recent</span> <IoIosArrowDown size={16} />
            </span>
          </span>
        </div>
        <hr />
      </div>
      <QuoraDraftComponent />
    </div>
  );
}

export default DraftMid;

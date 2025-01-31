import React from "react";
import Pen from "../../../assets/answer/pen.svg?react";
import MrDustbin from "../../../assets/answer/mrDustbin.svg?react";
function QuoraDraftComponent() {
  return (
    <div className="text-gray-500 [&>:not([class*='ram'])]:px-3 pt-3 border rounded-lg shadow-sm">
      <p className="text-sm dot-after">
        <span>Answer</span> <span>Unplished</span>
      </p>
      <h1 className="text-[var(--text-dark)] font-bold">
        What are the best full-stack web development languages?
      </h1>
      <div className="content">Show Draft content</div>
      <div className="flex justify-between w-40 px-1 pb-0.5 child-flex ram [&>div]:py-2 [&>div]:px-3 [&>div]:rounded-full">
        <div className="text-sm font-bold text-blue-500 [&>svg>g>path]:stroke-blue-600 click-hover-effect">
          <Pen />
          <span>Edit</span>
        </div>
        <div className="click-hover-effect">
          <MrDustbin />
          <span>Discard</span>
        </div>
      </div>
    </div>
  );
}

export default QuoraDraftComponent;

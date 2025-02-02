import React from "react";
import { handleDraftToText, textUpperCase } from "../../../utils/fn_utils";
import useTraversal from "../../../hooks/useTraversal";

function SubSubCommentSwaha({ username, content, onClick }) {
  return (
    <>
      <div
        ref={(el) => {
          if (!el) return;
          const parent = useTraversal(el, "parentElement", 3); // console.

          const left = el.offsetLeft - parent?.offsetLeft;
          el.style.width = `${parent?.clientWidth}px`;
          el.style.left = `-${left + left * 0.5}px`;
        }}
        onClick={onClick}
        className="mt-2 relative overflow-ellipsis text-nowrap overflow-hidden  text-[13px] text-[var(--text-gen-color)] bg-[#00000008] border hover:border-[#b1b3b6] cursor-pointer px-2 py-1 rounded"
      >
        <span className="font-bold">{textUpperCase(username)}&nbsp;</span>
        <span className="overflow-hidden ">
          {handleDraftToText(content, true)}
        </span>
      </div>

      {/* राम राम राम राम */}
    </>
  );
}

export default SubSubCommentSwaha;

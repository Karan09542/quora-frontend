import React from "react";
import Ask from "../../../../assets/ask.svg?react";
import {
  useOpenModelStore,
  useUnderlineToStore,
} from "../../../../../Store/model";
function AskButton() {
  const setOpenModel = useOpenModelStore((state) => state.setOpenModel);
  const setUnderlineTo = useUnderlineToStore((state) => state.setUnderlineTo);
  return (
    <div
      role="button"
      className="flex items-center gap-1 border px-2.5 py-1 w-fit rounded-full border-[#d7d7d7] hover:bg-[#00000008]"
      onClick={() => {
        setOpenModel("create post");
        setUnderlineTo("add question");
      }}
    >
      <Ask className="w-5 h-5 [&>*]:stroke-[var(--text-gen-color)]" />
      <p className="text-[13px] text-[var(--text-gen-color)]">Ask</p>
    </div>
  );
}

export default AskButton;

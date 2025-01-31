import React from "react";
import Notify from "../../../../assets/notify.svg?react";
function NotifyButton({ staticIsNotify }) {
  const [isNotify, setIsNotify] = React.useState(staticIsNotify);
  return (
    <div
      role="button"
      className={`border rounded-full px-2.5 py-1 w-fit ${
        isNotify
          ? "hover:bg-[#EBF0FF] border-[#2E69FF]"
          : "border-[#d7d7d7] hover:bg-[#00000008]"
      }`}
      onClick={() => setIsNotify(!isNotify)}
    >
      <div className="flex items-center gap-1 select-none">
        <Notify
          className={` w-5 h-5 ${
            isNotify
              ? "[&>g>g>:nth-child(1)]:fill-[#2E69FF] -mt-1 [&>g>g>circle]:hidden scale-[1.2] [&>*]:stroke-[#2E69FF]"
              : "[&>*]:stroke-[var(--text-gen-color)]"
          }`}
        />
        <div
          className={`text-[13px] font-medium ${
            isNotify ? "text-[#2E69FF]" : "text-[var(--text-gen-color)]"
          }`}
        >
          {" "}
          Notify me
        </div>
      </div>
    </div>
  );
}

export default NotifyButton;

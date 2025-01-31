import React from "react";
import QuoraLink from "../../../../assets/link.svg?react";
import Later from "../../../../assets/later.svg?react";
import Notify from "../../../../assets/notify.svg?react";
import Merge from "../../../../assets/merge.svg?react";
import Log from "../../../../assets/log.svg?react";
import Report from "../../../../assets/report.svg?react";
import { useOpenModelStore } from "../../../../../Store/model";
import { hideAll } from "tippy.js";

function MoreMenuPopup({ setIsMore }) {
  const setOpenModel = useOpenModelStore((state) => state.setOpenModel);
  const moreMenu = [
    {
      svg: QuoraLink,
      text: "Copy link",
      onClick: () => {
        hideAll();
      },
    },
    {
      svg: Later,
      text: "Answer later",
      onClick: () => {
        hideAll();
      },
    },
    {
      svg: Notify,
      text: "Notify me about edits",
      onClick: () => {
        hideAll();
      },
    },
    {
      svg: Merge,
      text: "Merge questions",
      onClick: () => {
        hideAll();
      },
    },
    {
      svg: Log,
      text: "Log",
      onClick: () => {
        hideAll();
      },
    },
    {
      svg: Report,
      text: "Report",
      onClick: () => {
        setOpenModel("report");
        hideAll();
      },
    },
  ];
  return (
    <div
      onClick={() => setIsMore(false)}
      className="[&>div]:px-3 bg-white p-0 [&>div]:py-0.5 text-[0.8rem] text-gray-600 [&>div]:gap-2 [&>div]:leading-8 child-flex [&>div>span]:cursor-pointer hover:[&>div>span]:underline [&>:first-child]:rounded-t-md [&>:last-child]:rounded-b-md hover:[&>div]:bg-gray-100"
    >
      {moreMenu.map((item, index) => (
        <div key={item?.text} onClick={item?.onClick}>
          <item.svg className="w-[18px] contrast-200" />{" "}
          <span>{item.text}</span>
        </div>
      ))}
    </div>
  );
}

export default MoreMenuPopup;

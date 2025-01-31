import React from "react";
import TopicImage from "../../../../assets/topic.webp";
import FollowButton from "../../../buttons-fields/FollowButton";
import { Link } from "react-router-dom";
import ThreeDots from "../../../../assets/iconPopup/threeDots.svg?react";
import Tippy from "@tippyjs/react";
import { hideAll } from "tippy.js";
function TopicBigTile({ topic, topicPath, isHr = false }) {
  const topicMenu = [
    { text: `Mute ${topic}` },
    { text: "Log" },
    { text: "Manage" },
  ];

  const TopicMenuPopup = () => (
    <div className="[&>div]:px-3 p-0 [&>div]:py-0.5 text-[0.8rem] text-gray-600 [&>div]:gap-2 [&>div]:leading-8 child-flex [&>div>p]:cursor-pointer [&>div>p]:w-full hover:[&>div>p]:underline [&>:first-child]:rounded-t-md [&>:last-child]:rounded-b-md hover:[&>div]:bg-gray-100">
      {topicMenu.map((item, index) => (
        <div
          key={item?.text}
          onClick={() => {
            hideAll();
            item?.onClick();
          }}
        >
          <p>{item.text}</p>
        </div>
      ))}
    </div>
  );
  return (
    <div className="flex items-center justify-between py-4 bg-white border rounded shadow-sm">
      <div className="flex items-center gap-4 px-4">
        <Link to={`/topic/${topicPath}`} target="_blank">
          <img
            className="w-20 h-20 rounded cursor-pointer aspect-square"
            src={TopicImage}
            alt="topic"
          />
        </Link>
        <div className="flex flex-col gap-y-3">
          <p className="text-[var(--text-dark)] text-[21px] font-bold ">
            {topic}
          </p>
          <FollowButton />
        </div>
      </div>
      <Tippy
        trigger="click"
        className="[&>:first-child]:p-0 bg-white nav-shadow rounded [&>:nth-child(2)]:text-white [&>:nth-child(2)]:drop-shadow-[0_0px_0px_rgba(0,0,0,0.3)] border"
        content={<TopicMenuPopup />}
      >
        <div className="hover:bg-[#f7f7f7] p-2 rounded-full mx-2 cursor-pointer">
          <ThreeDots />
        </div>
      </Tippy>
      {isHr && <hr />}
    </div>
  );
}

export default TopicBigTile;

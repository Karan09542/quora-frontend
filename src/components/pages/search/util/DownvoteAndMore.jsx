import React from "react";
import Tippy from "@tippyjs/react";
import { hideAll } from "tippy.js";
import Downvote from "../../../../assets/downvote.svg?react";
import More from "../../../../assets/more.svg?react";
import { handleQuestionDownvote } from "../../../../utils/handlerFetch";

function DownvoteAndMore({
  isOwnQuestion,
  isDownvote,
  setIsDownvote,
  _id,
  baseURL,
  accessToken,
  setIsMore,
  isMore,
  MoreMenuPopup,
}) {
  return (
    <div className="flex items-center gap-2 mt-2 [&>span]:rounded-full [&>span]:p-2 px-2">
      {/* downvote tippy */}
      <Tippy content="Downvote" disabled={isOwnQuestion} className="py-0.5">
        <span
          className={`${
            isOwnQuestion ? "opacity-50" : "hover:bg-gray-100 cursor-pointer"
          }`}
        >
          <Downvote
            onClick={() => {
              if (isOwnQuestion) return;
              setIsDownvote(!isDownvote);
              handleQuestionDownvote(_id, baseURL, accessToken);
            }}
            className={` ${
              isDownvote
                ? "[&>path]:fill-blue-600 [&>path]:stroke-blue-600 animate-[ubhar_0.1s_ease-in-out] "
                : ""
            }`}
          />
        </span>
      </Tippy>
      {/* more tippy */}
      <Tippy
        hideOnClick={false}
        onClickOutside={() => {
          setIsMore(false);
          if (isMore) hideAll({ duration: 0 });
        }}
        delay={[0, isMore ? 100000 : 100]}
        interactive={isMore ? true : false}
        placement={isMore ? "auto" : "top"}
        content={isMore ? <MoreMenuPopup setIsMore={setIsMore} /> : "More"}
        className={`[&>:first-child]:p-0 ${
          isMore
            ? " bg-white nav-shadow rounded [&>:nth-child(2)]:text-white [&>:nth-child(2)]:drop-shadow-[0_0px_0px_rgba(0,0,0,0.3)] border"
            : "p-1.5"
        }`}
        // className="py-0.5"
      >
        <span
          className={`hover:bg-gray-100`}
          onClick={() => {
            setIsMore(!isMore);
            setReport({ reportedContent: _id, contentType: "question" });
          }}
        >
          <More className={``} />
        </span>
      </Tippy>
    </div>
  );
}

export default DownvoteAndMore;

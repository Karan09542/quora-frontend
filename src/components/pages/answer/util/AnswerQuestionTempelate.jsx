import React, { useEffect } from "react";
import { IoIosArrowForward } from "react-icons/io";
import { Link } from "react-router-dom";
import {
  decorateQuestion,
  handleFollowNumAnimation,
} from "../../../../utils/fn_utils";
import { hideAll } from "tippy.js";
import Tippy from "@tippyjs/react";

// svg
import Pen from "../../../../assets/answer/pen.svg?react";
import Wifi from "../../../../assets/answer/wifi.svg?react";
import NotPen from "../../../../assets/answer/notPen.svg?react";
import More from "../../../../assets/more.svg?react";
import Downvote from "../../../../assets/downvote.svg?react";
import CrossButton from "../../../buttons-fields/CrossButton";
import { handleQuestionDownvote } from "../../../../utils/handlerFetch";
import MoreMenuPopup from "./MoreMenuPopup";
import { useIsToAnswerStore, useReportStore } from "../../../../../Store/model";

const AnswerQuestionTempelate = ({
  _id,
  question,
  createdBy,
  totalAnswers,
  isDownvoted,
  feeds,
  baseURL,
  accessToken,
  //
  // setQuestion,
  // setQuestionId,
}) => {
  const setReport = useReportStore((state) => state.setReport);
  useEffect(() => {
    setReport({ reportedContent: _id, contentType: "question" });
    return () => {
      setReport({});
    };
  }, []);
  const [hide, setHide] = React.useState(false);
  const [isFollow, setIsFollow] = React.useState(createdBy?.isFollowing);
  const [isDownvote, setIsDownvote] = React.useState(isDownvoted);
  const [isMore, setIsMore] = React.useState(false);
  const setIsToAnswer = useIsToAnswerStore((state) => state.setIsToAnswer);
  const setQuestion = useIsToAnswerStore((state) => state.setQuestion);
  const setQuestionId = useIsToAnswerStore((state) => state.setQuestionId);

  return (
    <div>
      {!hide && (
        <div className="p-4">
          <div className="flex justify-between">
            <Link to={`/${decorateQuestion(question)}`} target="_blank">
              <p className=" font-bold text-[var(--text-dark)] grow pr-5 hover:underline">
                {question}
              </p>
            </Link>
            <div onClick={() => setHide(!hide)}>
              <CrossButton className={"-mt-2 text-[#4c4c4c] "} />
            </div>
          </div>
          <p className="mt-1 text-sm text-gray-400 dot-after">
            <span className="font-semibold">
              {totalAnswers === 0 ? "No answer yet" : totalAnswers + " answer"}
            </span>{" "}
            <span>Last requested Nov 22</span>
          </p>

          {/* BUTTONS */}
          <div className="flex items-center justify-between">
            {/* leftFlex */}
            <div className="flex max-[552px]:[&_span]:text-xs max-[552px]:[&_svg]:w-[1.2rem]  [&>span]:px-3.5 [&>span]:py-[0.4rem]  [&>span:first-child]:border [&>span]:rounded-full items-center  mt-3 text-sm font-semibold text-gray-500 child-flex">
              <span
                onClick={() => {
                  setIsToAnswer(true);
                  setQuestion(question);
                }}
                className="click-hover-effect"
              >
                <Pen /> <span onClick={() => setQuestionId(_id)}>Answer</span>
              </span>
              <span
                onClick={() => setIsFollow(!isFollow)}
                className={`click-hover-effect dot-after ${
                  isFollow ? "[&>span]:text-blue-600 " : ""
                }`}
              >
                <Wifi
                  className={`${
                    isFollow
                      ? " [&>g]:stroke-blue-600 [&>g>circle]:fill-blue-600 animate-[ubhar_0.1s_ease-in-out] "
                      : ""
                  }`}
                />{" "}
                <span>Follow</span>{" "}
                <span
                  ref={(el) => handleFollowNumAnimation(el, isFollow)}
                  className="relative [&>span:last-child]:top-4 overflow-hidden w-2  flex flex-col h-5 [&>span]:absolute [&>span]:transition-all [&>span]:duration-[0.2s] "
                >
                  <span>
                    {isFollow
                      ? createdBy?.totalFollowers
                      : createdBy?.totalFollowers - 1}
                  </span>
                  <span>
                    {isFollow
                      ? createdBy?.totalFollowers
                      : createdBy?.totalFollowers + 1}
                  </span>
                </span>
              </span>
              <span className="click-hover-effect">
                <NotPen /> <span>Pass</span>
              </span>
            </div>
            {/* rightFlex */}
            <div className="flex max-[552px]:[&_svg]:w-5  max-[552px]:[&_svg]:h-5 max-[552px]:gap-0.5 items-center gap-2 mt-2 [&_span]:rounded-full hover:[&_span]:bg-gray-100 [&_span]:p-2 ">
              <Tippy content="Downvote" className="py-0.5">
                <span>
                  <Downvote
                    onClick={() => {
                      handleQuestionDownvote(_id, baseURL, accessToken);
                      setIsDownvote(!isDownvote);
                    }}
                    className={`${
                      isDownvote
                        ? "[&>path]:fill-blue-600 [&>path]:stroke-blue-600 animate-[ubhar_0.1s_ease-in-out] "
                        : ""
                    }`}
                  />
                </span>
              </Tippy>
              <Tippy
                hideOnClick={false}
                onClickOutside={() => {
                  setIsMore(false);
                  if (isMore) hideAll({ duration: 0 });
                }}
                delay={[0, isMore ? 100000 : 100]}
                interactive={isMore ? true : false}
                placement={isMore ? "auto" : "top"}
                content={
                  isMore ? <MoreMenuPopup setIsMore={setIsMore} /> : "More"
                }
                className={`[&>:first-child]:p-0 ${
                  isMore
                    ? " bg-white nav-shadow rounded [&>:nth-child(2)]:text-white [&>:nth-child(2)]:drop-shadow-[0_0px_0px_rgba(0,0,0,0.3)] border"
                    : "p-1.5"
                }`}
                // className="py-0.5"
              >
                <span onClick={() => setIsMore(!isMore)}>
                  <More className={``} />
                </span>
              </Tippy>
            </div>
          </div>
        </div>
      )}
      {hide && (
        <div className="pt-2 pb-1 [&>div]:px-3.5 ">
          <div className="flex justify-between items-center first:text-[0.97rem] text-gray-700 first:font-medium">
            <p>You've hidden this story</p>
            <div
              onClick={() => setHide(!hide)}
              className="self-start px-4 py-1 text-[0.9rem] text-gray-500 border rounded-full cursor-pointer hover:bg-gray-100 active:opacity-80"
            >
              Undo
            </div>
          </div>
          <div className="py-2 [&>div:first-child]:rounded-t [&>div:last-child]:rounded-b [&>div]:-mt-px [&>div]:py-2">
            {feeds.map((feed) => (
              <div className="px-3.5 leading- flex items-center justify-between py-1 text-[0.79rem] text-gray-500 border  cursor-pointer hover:bg-gray-100 active:opacity-80 font-semibold text-sm">
                <span>{feed}</span>
                <IoIosArrowForward size={18} />
              </div>
            ))}
          </div>
        </div>
      )}
      <hr />
    </div>
  );
};

export default AnswerQuestionTempelate;

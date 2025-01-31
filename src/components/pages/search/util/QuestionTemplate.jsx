import React, { useEffect } from "react";
import Heading from "../../setting/Heading";
import { Link } from "react-router-dom";
import Pen from "../../../../assets/answer/pen.svg?react";
import Wifi from "../../../../assets/answer/wifi.svg?react";
import Request from "../../../../assets/search/request.svg?react";
import More from "../../../../assets/more.svg?react";
import Downvote from "../../../../assets/downvote.svg?react";
import {
  useAccessTokenStore,
  useBaseURLStore,
  useIsToAnswerStore,
  useReportStore,
} from "../../../../../Store/model";
import MoreMenuPopup from "../../answer/util/MoreMenuPopup";
import { formatNumber } from "../../../../utils/formateNumber";
import { handleFollowing } from "../../../../utils/handlerFetch";
import useHighlight from "../../../../hooks/useHighlight";
import DownvoteAndMore from "./DownvoteAndMore";
import { decorateQuestion } from "../../../../utils/fn_utils";

function QuestionTemplate({
  _id,
  question,
  totalAnswers,
  totalFollowers,
  isFollowing,
  isAnswered,
  isDownvoted,
  isOwnQuestion,
  createdBy,
  query,
  //
  showIsFollow = true,
  showIsRequest = true,
}) {
  const setQuestionId = useIsToAnswerStore((state) => state.setQuestionId);
  const setQuestion = useIsToAnswerStore((state) => state.setQuestion);
  const setIsToAnswer = useIsToAnswerStore((state) => state.setIsToAnswer);
  const [isMore, setIsMore] = React.useState(false);

  const baseURL = useBaseURLStore((state) => state.baseURL);
  const accessToken = useAccessTokenStore((state) => state.accessToken);

  const followRef = React.useRef(null);
  const [isFollow, setIsFollow] = React.useState(isFollowing);
  const [isDownvote, setIsDownvote] = React.useState(isDownvoted);
  useEffect(() => {
    if (!showIsFollow) return;
    const spans = followRef?.current?.children;
    if (spans.length < 1) return;
    if (isFollow) {
      spans[0].style.top = "-1.25rem";
      spans[1].style.top = "0.125rem";
    } else if (!isFollow) {
      spans[0].style.top = "0.125rem";
      spans[1].style.top = "1.25rem";
    }
  }, [isFollow]);

  const highlightRef = React.useRef(null);
  useHighlight({ query, highlightRef });

  return (
    <div>
      <Heading
        isHr={false}
        heading={
          <Link
            onClick={() => {
              localStorage.setItem("question", question);
            }}
            to={`/${decorateQuestion(question)}`}
            target="_blank"
          >
            <span
              ref={highlightRef}
              className="text-[var(--text-dark)] hover:underline font-bold cursor-pointer"
            >
              {question}
            </span>
          </Link>
        }
        className={"px-4 pt-4"}
      />
      {/* number of answers */}
      <div className="flex items-center justify-between px-4 pt-2 text-[var(--text-color-93)] text-[0.8125rem] first-letter:capitalize">
        <div>
          <span className="font-bold dot-after-direct">
            {totalAnswers === 0 ? "No answer yet" : `${totalAnswers} answer`}
          </span>
          <Link>
            <span className="hover:underline" id="more">
              &nbsp;Last followed 1y
            </span>
          </Link>
        </div>
        {!showIsFollow && !showIsRequest && isAnswered && (
          <div className="[&>div]:mt-0">
            <DownvoteAndMore
              isOwnQuestion={isOwnQuestion}
              _id={_id}
              isDownvote={isDownvote}
              MoreMenuPopup={MoreMenuPopup}
              accessToken={accessToken}
              baseURL={baseURL}
              isMore={isMore}
              setIsMore={setIsMore}
              setIsDownvote={setIsDownvote}
            />
          </div>
        )}
      </div>

      {/* Button */}
      <div className="flex items-center justify-between">
        <div
          className={`px-4 mb-2 flex [&>span]:px-3.5 [&>span]:py-[0.4rem]  ${
            isAnswered ? "" : "[&>span:first-child]:border"
          } [&>span]:rounded-full items-center  mt-1 text-sm font-semibold text-gray-500 child-flex`}
        >
          {/* answer */}
          {!isAnswered && (
            <span
              onClick={() => {
                setIsToAnswer(true);
                setQuestionId(_id);
                setQuestion(question);
              }}
              className="click-hover-effect"
            >
              <Pen /> <span>Answer</span>
            </span>
          )}
          {/* follow */}
          {showIsFollow && (
            <span
              onClick={() => {
                if (isOwnQuestion) return;
                setIsFollow(!isFollow);
                handleFollowing(createdBy?._id, baseURL, accessToken);
              }}
              className={`${
                isOwnQuestion
                  ? "opacity-50 !cursor-not-allowed"
                  : "click-hover-effect dot-after "
              } ${isFollow ? "[&>span]:text-blue-600 " : ""}`}
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
                ref={followRef}
                className="relative [&>span:last-child]:top-4 overflow-hidden w-2  flex flex-col h-5 [&>span]:absolute [&>span]:transition-all [&>span]:duration-[0.2s] "
              >
                <span>
                  {Math.max(
                    0,
                    formatNumber(
                      Number(+totalFollowers || 0) + (isFollowing ? -1 : 0)
                    )
                  )}
                </span>
                <span>
                  {Math.max(
                    0,
                    formatNumber(
                      Number(+totalFollowers || 0) + (isFollowing ? 0 : 1)
                    )
                  )}
                </span>
              </span>
            </span>
          )}
          {/* request */}
          {showIsRequest && (
            <span className="click-hover-effect">
              <Request />
              <span>Request</span>
            </span>
          )}
        </div>
        {/* rightFlex */}
        {(showIsFollow || showIsRequest || !isAnswered) && (
          <div className="px-4">
            <DownvoteAndMore
              isOwnQuestion={isOwnQuestion}
              _id={_id}
              isDownvote={isDownvote}
              MoreMenuPopup={MoreMenuPopup}
              accessToken={accessToken}
              baseURL={baseURL}
              isMore={isMore}
              setIsMore={setIsMore}
              setIsDownvote={setIsDownvote}
            />
          </div>
        )}
      </div>
      <hr />
    </div>
  );
}

export default QuestionTemplate;

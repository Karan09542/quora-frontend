import React, { useEffect } from "react";
import Ads from "../../ads/Ads";
import DownArrowButton from "../../buttons-fields/DownArrowButton";
//
import Pen from "../../../assets/answer/pen.svg?react";
import Wifi from "../../../assets/answer/wifi.svg?react";
import HomeThreeDotContentPopup from "../../quoraComponents/util/HomeThreeDotContentPopup";
import {
  useAccessTokenStore,
  useBaseURLStore,
  useIsToAnswerStore,
} from "../../../../Store/model";
import { handleFollowing } from "../../../utils/handlerFetch";

function QuestionPageRight({
  totalAnswers,
  questionId,
  question,
  isAlreadyAnswered,
  createdBy,
  isFollowing,
  isDownvoted,
  itsOwnQuestion,
  data,
  responsiveShow = true,
}) {
  // state
  const [isFollowingState, setIsFollowingState] = React.useState(isFollowing);
  const [isDownvotedState, setIsDownvotedState] = React.useState(isDownvoted);

  const [more, setMore] = React.useState(false);
  const setIsToAnswer = useIsToAnswerStore((state) => state.setIsToAnswer);
  const setQuestionId = useIsToAnswerStore((state) => state.setQuestionId);
  const setQuestion = useIsToAnswerStore((state) => state.setQuestion);

  const baseURL = useBaseURLStore((state) => state.baseURL);
  const accessToken = useAccessTokenStore((state) => state.accessToken);
  return (
    <div>
      <div className="flex items-center mb-5 ">
        {/* for answer */}
        <DownArrowButton
          LeftIcon={Pen}
          isRight={false}
          name={`Answer ${totalAnswers || ""}`}
          hoverColor={"hover:bg-[#ebf0ff]"}
          className={`border-[#2e69ff] [&>svg_*]:stroke-[rgb(46,105,255)] text-[#2e69ff] max-w-[170px] w-full grow justify-center ${
            isAlreadyAnswered ? "opacity-55" : "active:opacity-80"
          }`}
          onClick={() => {
            if (isAlreadyAnswered) {
              return;
            }
            setQuestion(question);
            setQuestionId(questionId);
            setIsToAnswer(true);
          }}
        />
        <DownArrowButton
          LeftIcon={Wifi}
          isRight={false}
          name="Follow"
          isBorder={false}
          hoverColor={"hover:bg-[#efeff0]"}
          className={`px-6  ${
            itsOwnQuestion ? "opacity-55" : "active:opacity-80"
          } ${
            isFollowingState
              ? "[&>svg_*]:stroke-[rgb(46,105,255)] text-[#2e69ff]"
              : "text-[var(--text-gen-color)]"
          }`}
          onClick={() => {
            if (itsOwnQuestion) {
              return;
            } else {
              handleFollowing(createdBy, baseURL, accessToken);
              setIsFollowingState(!isFollowingState);
            }
          }}
        />
        <HomeThreeDotContentPopup
          more={more}
          setMore={setMore}
          questionId={questionId}
          setHide={() => {}}
          setToggleQuestionDownvoted={(ram) => {
            setIsDownvotedState((prev) => !prev);
          }}
          isDownvoted={isDownvotedState}
        />
      </div>
      {responsiveShow && <Ads />}
    </div>
  );
}

export default QuestionPageRight;

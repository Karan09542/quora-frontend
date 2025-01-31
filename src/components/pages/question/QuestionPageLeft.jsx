import React from "react";
import { FaAngleDown } from "react-icons/fa6";
import { GoChevronDown } from "react-icons/go";
import {
  MdKeyboardArrowDown,
  MdOutlineKeyboardArrowDown,
} from "react-icons/md";
import RecommendedComponent from "../../comp_util/comment/recomand/RecommendedComponent";
import AnswerTile from "../../quoraComponents/util/AnswerTile";
function QuestionPageLeft({ question, allAnswer, totalAnswers, isLogin }) {
  return (
    <div>
      {/* heading */}
      <div>
        <h1 className="text-[21px] font-bold">{question}</h1>
        <div className="flex justify-between mt-4 [&>div]:px-3 [&>div]:py-1 [&>div]:rounded-full child-flex text-var(--text-gen-color) text-[13px]">
          {/* left */}
          <div>
            <p>All related (37)</p>
            <GoChevronDown
              strokeWidth={0.3}
              size={18}
              color="var(--text-gen-color)"
            />
          </div>
          {/* right */}
          <div className="!gap-2">
            <p>Sort</p>
            <RecommendedComponent className={`border`} />
          </div>
        </div>
      </div>
      {/* answers */}
      <div className="mt-1 [&>div]:mb-2.5 [&>div]:bg-white [&>div]:shadow [&>div]:rounded-lg">
        {allAnswer?.map((item, index) => (
          <AnswerTile
            key={item?._id}
            post={{ ...item, totalAnswers }}
            isCross={true}
            isQuestion={false}
            // for dynamic get question
            isLogin={isLogin}
            isCommentHeading={totalAnswers > 0 && isLogin}
          />
        ))}
      </div>
    </div>
  );
}

export default QuestionPageLeft;

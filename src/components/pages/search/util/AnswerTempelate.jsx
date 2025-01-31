import React from "react";
import Heading from "../../setting/Heading";
import AnswerTile from "../../../quoraComponents/util/AnswerTile";
import { Link } from "react-router-dom";
import { decorateQuestion } from "../../../../utils/fn_utils";

function AnswerTempelate({
  result,
  query,
  isHr = true,
  isLogin,
  isShowQuestion = false,
}) {
  return (
    <div>
      {result?.questionData && !isShowQuestion && (
        <Heading
          isHr={false}
          heading={
            <Link
              to={`/${decorateQuestion(result?.questionData?.question)}`}
              target="_blank"
            >
              <span className="text-[#195FAA] hover:underline font-bold cursor-pointer">
                {result?.questionData?.question}
              </span>
            </Link>
          }
          className={"px-4 pt-4"}
        />
      )}
      <div className="[&>div>div]:rounded-none [&>div>div]:bg-transparent [&>div>div]:border-none">
        <AnswerTile
          post={result}
          isCross={false}
          isShowQuestion={isShowQuestion}
          query={query}
          isLogin={isLogin}
        />
        <hr />
      </div>
    </div>
  );
}

export default AnswerTempelate;

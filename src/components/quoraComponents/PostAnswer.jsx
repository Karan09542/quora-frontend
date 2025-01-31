import React, { useEffect } from "react";
import CrossButton from "../buttons-fields/CrossButton";

import { useIsToAnswerStore } from "../../../Store/model";
import PostTemplete from "./PostTemplete";
import outSideClose from "../../hooks/outSideClose";

function PostAnswer() {
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, []);

  const setIsToAnswer = useIsToAnswerStore((state) => state.setIsToAnswer);
  const question = useIsToAnswerStore((state) => state.question);
  const setQuestion = useIsToAnswerStore((state) => state.setQuestion);
  const postRef = React.useRef(null);

  outSideClose({ setState: setIsToAnswer, ref: postRef, arg: false });
  outSideClose({ setState: setQuestion, ref: postRef, arg: "" });

  return (
    <div className="fixed top-0 z-20 w-full h-screen bg-[#242424E6]">
      <div
        ref={postRef}
        className="origin-center animate-[fadeIn_0.3s_ease-in-out] absolute w-full max-w-[760px] mx-auto -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2 item px-5 min-h-[300px]"
      >
        <div className="bg-white rounded-lg">
          {/* Header */}
          <div className="flex items-center px-1 pt-2.5 child-flex text-gray-600">
            <CrossButton
              onClick={() => {
                setIsToAnswer(false);
                setQuestion("");
              }}
              size={36}
            />{" "}
          </div>
          <PostTemplete
            className={"min-h-[350px]"}
            // question={
            //   "सीताराम सीताराम सीताराम कहियें जाही विधि राखे राम ताही विधि रहियें "
            // }
            question={question}
          />
        </div>
      </div>
    </div>
  );
}

export default PostAnswer;

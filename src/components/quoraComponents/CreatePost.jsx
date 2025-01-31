import React, { useEffect } from "react";
import CrossButton from "../buttons-fields/CrossButton";
import Globe from "../../assets/globe.svg?react";
import { FaAngleDown } from "react-icons/fa6";
import { useOpenModelStore, useUnderlineToStore } from "../../../Store/model";
import QuestionTemplete from "./QuestionTemplete";
import PostTemplete from "./PostTemplete";
import outSideClose from "../../hooks/outSideClose";

function CreatePost() {
  const underlineTo = useUnderlineToStore((state) => state.underlineTo);
  const setUnderlineTo = useUnderlineToStore((state) => state.setUnderlineTo);
  const setOpenModel = useOpenModelStore((state) => state.setOpenModel);

  const sectionBarCss =
    "after:bg-blue-600 after:top-[35px] after:left-0 after after:pt-[4px] after:rounded-t-full after:content-[''] after:absolute relative after:w-full";

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, []);

  const outToCloseRef = React.useRef(null);
  outSideClose({ setState: setOpenModel, ref: outToCloseRef, arg: null });
  outSideClose({ setState: setUnderlineTo, ref: outToCloseRef, arg: null });
  return (
    <div className="fixed top-0 z-10 w-full h-screen bg-[#242424E6]">
      <div
        ref={outToCloseRef}
        className="origin-center animate-[fadeIn_0.3s_ease-in-out] absolute w-full max-w-[760px] mx-auto -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2 item px-5 min-h-[300px]"
      >
        <div className="bg-white rounded-lg">
          {/* Header */}
          <div className="flex items-center px-1 py-2.5 child-flex text-gray-600">
            <CrossButton
              onClick={() => {
                setOpenModel(null);
                setUnderlineTo(null);
              }}
              size={36}
            />{" "}
            <div
              className={`active:opacity-80 hover:bg-gray-100 px-2 rounded-full text-sm mx-auto select-none`}
            >
              <Globe className={`p-1.5 [&+span]:font-medium`} />{" "}
              <span>Everyone</span> <FaAngleDown size={16} color="gray" />
            </div>
          </div>
          {/* Navigation of Add Question and Create Post */}
          <div
            className={`hover:[&>div]:cursor-pointer grid grid-cols-2 font-medium [&>div]:text-center [&>div]:leading-10 px-0.5 gap-1 text-sm`}
          >
            <div
              onClick={() => setUnderlineTo("add question")}
              className={`${
                underlineTo === "add question"
                  ? sectionBarCss
                  : "hover:bg-gray-50"
              }`}
            >
              Add Question
            </div>
            <div
              onClick={() => setUnderlineTo("create post")}
              className={`${
                underlineTo === "create post"
                  ? sectionBarCss
                  : "hover:bg-gray-50"
              }`}
            >
              Create Post
            </div>
          </div>
          <hr />
          {underlineTo === "add question" && <QuestionTemplete />}
          {underlineTo === "create post" && (
            <PostTemplete className={"min-h-[450px]"} />
          )}
        </div>
        <div>राम राम</div>
      </div>
    </div>
  );
}

export default CreatePost;

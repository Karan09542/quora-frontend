import React, { useEffect, useState } from "react";

import { FaAngleDown } from "react-icons/fa6";
import {
  useAccessTokenStore,
  useBaseURLStore,
  useOpenModelStore,
  useUnderlineToStore,
  useUserStore,
} from "../../../Store/model";
import { IoPlaySharp } from "react-icons/io5";
import People from "../../assets/people.svg?react";
import Tippy from "@tippyjs/react";
import { FaCheck } from "react-icons/fa6";
import { hideAll } from "tippy.js";
import Button from "../buttons-fields/Button";
import { set } from "react-hook-form";
import { toast } from "react-toastify";
import { useSearchParams } from "react-router-dom";

const QuestionTemplete = () => {
  const user = useUserStore((state) => state.user);
  const [searchParams] = useSearchParams();
  const [isPublic, setIsPublic] = useState(true);
  const [questionInput, setQuestionInput] = useState(searchParams.get("q"));
  const questionRef = React.useRef(null);

  const setUnderlineTo = useUnderlineToStore((state) => state.setUnderlineTo);
  const setOpenModel = useOpenModelStore((state) => state.setOpenModel);

  const handleChange = (e) => {
    const inputElement = questionRef.current;
    const cursorPosition = inputElement.selectionStart; // Get current cursor position

    let value = e.target.value.trim();

    // Ensure the first character is capitalized (if applicable)
    const firstChar = value.slice(0, 1);
    const restOfValue = value.slice(1);

    // Avoid calling toUpperCase for non-ASCII characters
    const isASCII = /^[\x00-\x7F]*$/.test(firstChar);
    value = isASCII ? firstChar.toUpperCase() + restOfValue : value;

    // Ensure the question mark is present
    if (value && !value.includes("?")) {
      value += "?";
    }

    // Update state and handle cursor positioning
    setQuestionInput(value);

    setTimeout(() => {
      // Restore cursor position, avoiding interference with complex scripts
      const questionMarkPosition = value.indexOf("?");
      if (
        questionMarkPosition !== -1 &&
        cursorPosition <= questionMarkPosition
      ) {
        inputElement.setSelectionRange(cursorPosition, cursorPosition);
      }
    }, 0);
  };

  // ---------------------
  const baseURL = useBaseURLStore((state) => state.baseURL);
  const accessToken = useAccessTokenStore((state) => state.accessToken);

  const handleAddQuestion = () => {
    if (!questionInput) {
      return;
    }
    fetch(`${baseURL}/question/create`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify({
        question: questionInput.trim(),
        isPublic: isPublic,
        tags: ["राम", "श्याम", "शिव"],
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.status === "success") {
          toast.success(data.message);
          setOpenModel(null);
          setUnderlineTo(null);
        } else {
          toast.error(data.message);
        }
      });
  };

  function PublicTemplete() {
    return (
      <div className="text-gray-500 [&>div]:gap-3  max-w-[230px] child-flex [&_h3]:text-gray-800 [&_p]:leading-[1.1rem] [&>div:nth-child(1)]:pb-5 font-normal hover:[&>div>div]:underline hover:[&>div]:cursor-pointer [&>div]:px-4 [&>div]:py-1.5 hover:[&>div]:bg-gray-100">
        {/* राम राम */}
        <div
          onClick={() => {
            setIsPublic(true);
            hideAll();
          }}
        >
          <div>
            <h3>Public</h3>
            <p>
              Others will see your identity alongside this question on your
              profile and in their feeds.
            </p>
          </div>
          {isPublic && <FaCheck size={36} color="#2E69FF" />}
        </div>
        <div
          onClick={() => {
            setIsPublic(false);
            hideAll();
          }}
        >
          <div>
            <h3>Limited</h3>
            <p>
              Your identity will be shown but this question will not appear in
              your followers' feeds or your profile.
            </p>
          </div>
          {!isPublic && <FaCheck size={36} color="#2E69FF" />}
        </div>
      </div>
    );
  }
  return (
    <>
      <div className="p-5 min-h-[300px] max-h-[60vh] overflow-y-auto">
        {/* Tips */}
        <div className=" bg-[#EBF0FF] rounded px-5 py-3 text-[#2E69FF]">
          <h3 className="text-[1.05rem] font-bold">
            Tips on getting good answers quickly
          </h3>
          <ul className="px-1 list-disc list-inside">
            <li>Make sure your question has not been asked already</li>
            <li>Keep your question short and to the point</li>
            <li>Double-check grammar and spelling</li>
          </ul>
        </div>
        {/* profile */}
        <div className="flex items-center gap-2 pt-5">
          {user?.profilePicture ? (
            <img
              src={user?.profilePicture}
              alt="profile"
              className="w-[1.1srem] h-[1.1rem] aspect-square rounded-full cursor-pointer"
            />
          ) : (
            <img
              src="https://qsf.cf2.quoracdn.net/-4-images.new_grid.profile_default.png-26-688c79556f251aa0.png"
              alt="profile"
              className="w-[1.1rem] h-[1.1rem] rounded-full cursor-pointer"
            />
          )}
          <IoPlaySharp color="#707070" size={11.1} />
          {/* public */}
          <Tippy
            interactive={true}
            trigger="click"
            // delay={[0, 100000]}
            placement="bottom-end"
            className="[&>div]:p-0 bg-white rounded-[0.1rem] text-[0.8rem] border  [&>:nth-child(2)]:text-white [&>:nth-child(2)]:drop-shadow-[0_0px_0px_rgba(0,0,0,0.6)] [&>:nth-child(2)]:-z-10"
            content={<PublicTemplete />}
          >
            <div className="flex items-center gap-1 px-3 py-[0.2rem] text-[0.83rem] font-medium text-gray-600 border rounded-full click-hover-effect">
              <People className="w-5 [&>g]:stroke-gray-600" />
              <span>{isPublic ? "Public" : "Limited"}</span>

              <FaAngleDown color="gray" />
            </div>
          </Tippy>
        </div>
        {/* Start to question */}
        <div className="pt-5 min-h-[256px]">
          <input
            value={questionInput}
            ref={questionRef}
            onChange={handleChange}
            type="text"
            className="w-full  text-[18px] leading-10 transition-all border-b outline-none placeholder:text-lg hover:border-blue-600"
            placeholder={`Start your question with "What", "How", "Why", etc. `}
          />
        </div>
      </div>
      <hr />
      {/* Bottom Cancle Add question */}
      <div className="flex items-center justify-end gap-2 px-5 py-2 text-sm text-gray-800 [&>*]:cursor-pointer select-none">
        <span
          onClick={() => {
            setOpenModel(null);
            setUnderlineTo(null);
          }}
          className="hover:bg-gray-100 active:opacity-80 px-3 py-[0.5rem] rounded-full"
        >
          Cancel
        </span>{" "}
        <Button
          onClick={handleAddQuestion}
          className={` ${
            !/\S/.test(questionInput)
              ? "!cursor-not-allowed pointer-events-none bg-blue-500 opacity-50"
              : "active:bg-blue-700 bg-blue-600"
          } `}
          name="Add question"
          disabled={!/\S/.test(questionInput)}
        />
      </div>
    </>
  );
};

export default QuestionTemplete;

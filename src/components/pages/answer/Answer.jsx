import React, { useEffect } from "react";
import Navbar from "../../header/Navbar";
import AnswerLeft from "./AnswerLeft";
import AnswerMid from "./AnswerMid";
import AnswerRight from "./AnswerRight";
import useResize from "../../../hooks/useResize";
import { ToastContainer } from "react-toastify";
import PostAnswer from "../../quoraComponents/PostAnswer";
import { useIsToAnswerStore, useOpenModelStore } from "../../../../Store/model";
import DisplayModePopup from "../../general-page/DisplayModePopup";
import "tippy.js/dist/tippy.css";
import Reports from "../../general-page/Reports";
import CreatePost from "../../quoraComponents/CreatePost";
import OtherLanguagePopup from "../../general-page/OtherLanguagePopup";

function Answer() {
  const { width } = useResize();
  const isToAnswer = useIsToAnswerStore((state) => state.isToAnswer);
  useEffect(() => {
    document.title = "Write Answers";
  }, []);
  const openModel = useOpenModelStore((state) => state.openModel);
  return (
    <>
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={true}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      {isToAnswer && <PostAnswer />}
      {openModel === "display mode" && <DisplayModePopup />}
      {openModel === "report" && <Reports />}
      {openModel === "create post" && <CreatePost />}
      {openModel === "add language" && <OtherLanguagePopup />}
      <div>
        <Navbar />
        <div
          className={`grid max-[652px]:grid-cols-1 max-[900px]:grid-cols-[160px_minmax(300px,1fr)]  grid-cols-[160px_572px_1fr] max-w-[1200px] mx-auto  [&>div]:w-full gap-x-4 ${
            width <= 552 ? "mt-16 px-3" : "mt-5 px-7"
          } `}
        >
          <AnswerLeft
            response_width={width}
            margin_top={"-20px"}
            margin_bottom="10px"
            threshholdWidth={652}
          />

          <AnswerMid />

          {width >= 900 && <AnswerRight />}
        </div>
      </div>
    </>
  );
}

export default Answer;

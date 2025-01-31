import React, { useEffect } from "react";
import Navbar from "../../header/Navbar";
import AnswerLeft from "./AnswerLeft";
import AnswerMid from "./AnswerMid";
import AnswerRight from "./AnswerRight";
import useResize from "../../../hooks/useResize";
import { ToastContainer } from "react-toastify";
import PostAnswer from "../../quoraComponents/PostAnswer";
import { useIsToAnswerStore, useOpenModelStore } from "../../../../Store/model";
import DisplayModePopup from "../../general-page/displayModePopup";
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
          className={`grid grid-cols-[160px_572px_1fr] max-w-[1200px] mx-auto  [&>div]:w-full gap-x-4 ${
            width <= 552 ? "mt-16" : "mt-5"
          } px-7`}
        >
          <AnswerLeft />
          <AnswerMid />
          <AnswerRight />
        </div>
      </div>
    </>
  );
}

export default Answer;

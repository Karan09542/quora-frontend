import React from "react";
import Navbar from "../../header/Navbar";
import useResize from "../../../hooks/useResize";
import { ToastContainer } from "react-toastify";
import PostAnswer from "../../quoraComponents/PostAnswer";
import { useIsToAnswerStore, useOpenModelStore } from "../../../../Store/model";
import AnswerLeft from "../answer/AnswerLeft";
import AnswerRight from "../answer/AnswerRight";
import DraftMid from "./DraftMid";
import DisplayModePopup from "../../general-page/displayModePopup";

function QuoraDraft() {
  const { width } = useResize();
  const isToAnswer = useIsToAnswerStore((state) => state.isToAnswer);
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
      <div>
        <Navbar />
        <div
          className={`grid grid-cols-[160px_572px_1fr] max-w-[1200px] mx-auto  [&>div]:w-full gap-x-4 ${
            width <= 552 ? "mt-16" : "mt-5"
          } px-7`}
        >
          <AnswerLeft />
          <DraftMid />
          <AnswerRight />
        </div>
      </div>
    </>
  );
}

export default QuoraDraft;

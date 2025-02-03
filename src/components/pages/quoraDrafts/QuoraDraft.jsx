import React from "react";
import Navbar from "../../header/Navbar";
import useResize from "../../../hooks/useResize";
import { ToastContainer } from "react-toastify";
import PostAnswer from "../../quoraComponents/PostAnswer";
import { useIsToAnswerStore, useOpenModelStore } from "../../../../Store/model";
import AnswerLeft from "../answer/AnswerLeft";
import AnswerRight from "../answer/AnswerRight";
import DraftMid from "./DraftMid";
import DisplayModePopup from "../../general-page/DisplayModePopup";

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
          <DraftMid className={"max-w-[572px]"} />
          {width >= 900 && <AnswerRight />}
        </div>
      </div>
    </>
  );
}

export default QuoraDraft;

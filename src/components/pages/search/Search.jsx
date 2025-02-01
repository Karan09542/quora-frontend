import React, { useEffect } from "react";
import Navbar from "../../header/Navbar";
import useResize from "../../../hooks/useResize";
import { ToastContainer } from "react-toastify";
import SearchLeft from "./SearchLeft";
import SearchMid from "./SearchMid";
import { useIsToAnswerStore, useOpenModelStore } from "../../../../Store/model";
import PostAnswer from "../../quoraComponents/PostAnswer";
import Reports from "../../general-page/Reports";
import CreatePost from "../../quoraComponents/CreatePost";
import OtherLanguagePopup from "../../general-page/OtherLanguagePopup";
import DisplayModePopup from "../../general-page/DisplayModePopup";

function Search() {
  const { width } = useResize();
  const isToAnswer = useIsToAnswerStore((state) => state.isToAnswer);
  const openModel = useOpenModelStore((state) => state.openModel);
  useEffect(() => {
    document.title = "Search";
  }, []);
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
      {openModel === "report" && <Reports />}
      {openModel === "create post" && <CreatePost />}
      {openModel === "add language" && <OtherLanguagePopup />}
      {openModel === "display mode" && <DisplayModePopup />}

      <div>
        <Navbar />
        <div
          className={`grid grid-cols-[160px_572px_1fr] max-w-[1200px] mx-auto  [&>div]:w-full gap-x-4 ${
            width <= 552 ? "mt-16" : "mt-5"
          } px-7`}
        >
          <SearchLeft />
          <SearchMid />
        </div>
      </div>
    </>
  );
}

export default Search;

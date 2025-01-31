import React, { useEffect } from "react";
import Navbar from "../header/Navbar";
import useResize from "../../hooks/useResize";
import BookmarkLeft from "./BookmarkLeft";
import BookmarkMid from "./BookmarkMid";
import { ToastContainer } from "react-toastify";
import { useOpenModelStore } from "../../../Store/model";
import CreatePost from "../quoraComponents/CreatePost";
import Reports from "../general-page/Reports";
import OtherLanguagePopup from "../general-page/OtherLanguagePopup";

function Bookmark() {
  const { width } = useResize();
  useEffect(() => {
    document.title = "Bookmarks";
  }, []);

  const openModel = useOpenModelStore((state) => state.openModel);
  return (
    <>
      {openModel === "report" && <Reports />}
      {openModel === "create post" && <CreatePost />}
      {openModel === "add language" && <OtherLanguagePopup />}

      <Navbar />
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
      <div
        className={`grid grid-cols-[160px_600px_1fr]  h-[90vh] max-w-[1200px] mx-auto  [&>div]:w-full gap-x-4 ${
          width <= 552 ? "mt-16" : "mt-5"
        } px-7 `}
      >
        <BookmarkLeft />
        <BookmarkMid />
      </div>
    </>
  );
}

export default Bookmark;

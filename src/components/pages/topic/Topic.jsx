import React, { useEffect } from "react";
import useResize from "../../../hooks/useResize";
import HomeLeft from "../../middle/HomeLeft";
import TopicMid from "./TopicMid";
import Navbar from "../../header/Navbar";
import { ToastContainer } from "react-toastify";

function Topic() {
  const { width } = useResize();
  useEffect(() => {
    document.title = "Quora";
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
      <Navbar />

      <div
        className={`grid grid-cols-[160px_588px_1fr] max-w-[1200px] mx-auto  [&>div]:w-full gap-x-4 ${
          width <= 552 ? "mt-16" : "mt-5"
        } px-7`}
      >
        {" "}
        <HomeLeft />
        <TopicMid />
      </div>
    </>
  );
}

export default Topic;

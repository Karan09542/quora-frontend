import React, { useEffect } from "react";
import Navbar from "../../header/Navbar";
import { useOpenModelStore } from "../../../../Store/model";
import DisplayModePopup from "../../general-page/displayModePopup";
import SpaceHeader from "./SpaceHeader";
import SpaceBottom from "./SpaceBottom";
import { ToastContainer } from "react-toastify";
import { useParams } from "react-router-dom";
function Spaces() {
  const openModel = useOpenModelStore((state) => state.openModel);
  const params = useParams();
  useEffect(() => {
    document.title = params?.spaceName;
  }, [params?.spaceName]);
  return (
    <>
      {openModel === "display mode" && <DisplayModePopup />}
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
      <SpaceHeader />
      <SpaceBottom />
    </>
  );
}

export default Spaces;

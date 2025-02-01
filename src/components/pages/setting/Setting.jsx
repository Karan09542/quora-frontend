import React, { useEffect } from "react";
import useResize from "../../../hooks/useResize";
import { ToastContainer } from "react-toastify";
import Navbar from "../../header/Navbar";
import SettingLeft from "./SettingLeft";
import SettingMid from "./SettingMid";
import {
  useOpenModelStore,
  useSectionStore,
  useSettingModelStore,
} from "../../../../Store/model";
import LanguageRemovePopup from "../../general-page/LanguageRemovePopup";
import OtherLanguagePopup from "../../general-page/OtherLanguagePopup";
import AddEmail from "../../general-page/AddEmail";
import ComboConfirmEmailPopup from "../../general-page/ComboConfirmEmailPopup";
import FollowPopup from "../../general-page/FollowPopup";
import FollowPersonalizePopup from "../../general-page/FollowPersonalizePopup";

function Setting() {
  const { width } = useResize();
  const settingModel = useSettingModelStore((state) => state.settingModel);
  const openModel = useOpenModelStore((state) => state.openModel);
  const setSection = useSectionStore((state) => state.setSection);
  const section = useSectionStore((state) => state.section);

  useEffect(() => {
    document.title = "Setting";
  }, []);
  useEffect(() => setSection(null), [section]);
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
      {settingModel === "remove language" && <LanguageRemovePopup />}
      {openModel === "add language" && <OtherLanguagePopup />}
      {[
        "add email",
        "change password",
        "deactivate account in all languages 1st check password",
        "delete account 1st check password",
      ].includes(settingModel) && <AddEmail />}
      {[
        "confirm email",
        "remove email",
        "delete account",
        "deactivate account in all languages",
      ].includes(settingModel) && <ComboConfirmEmailPopup />}
      {["Spaces you follow", "People you follow"].includes(settingModel) && (
        <FollowPopup />
      )}
      {["follow personalize"].includes(settingModel) && (
        <FollowPersonalizePopup />
      )}

      <div>
        <Navbar />
        <div
          className={`grid grid-cols-[160px_572px_1fr] max-w-[1200px] mx-auto  [&>div]:w-full gap-x-4 ${
            width <= 552 ? "mt-16" : "mt-5"
          } px-7`}
        >
          <SettingLeft />
          <SettingMid />
        </div>
      </div>
    </>
  );
}

export default Setting;

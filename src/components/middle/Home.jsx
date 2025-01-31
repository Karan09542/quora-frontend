import React, { useEffect } from "react";
import HomeLeft from "./HomeLeft";
import HomeMid from "./HomeMid";
import HomeRight from "./HomeRight";
import useResize from "../../hooks/useResize";
import CreatePost from "../quoraComponents/CreatePost";
import { useOpenModelStore } from "../../../Store/model";
import Reports from "../general-page/Reports";
import OtherLanguagePopup from "../general-page/OtherLanguagePopup";
import DisplayModePopup from "../general-page/displayModePopup";
import CreateSpacePopup from "../comp_util/spaces/popup/CreateSpacePopup";
import InvitePopup from "../comp_util/spaces/popup/InvitePopup";

function Home() {
  const { width } = useResize();
  const openModel = useOpenModelStore((state) => state.openModel);
  useEffect(() => {
    document.title = "Quora";
  }, []);
  return (
    <>
      {openModel === "create post" && <CreatePost />}
      {openModel === "report" && <Reports />}
      {openModel === "add language" && <OtherLanguagePopup />}
      {openModel === "display mode" && <DisplayModePopup />}
      {openModel === "create space" && <CreateSpacePopup />}
      {openModel?.isInvite && <InvitePopup />}
      <div
        className={`grid grid-cols-[138px_588px_1fr] max-w-[1200px] mx-auto  [&>div]:w-full gap-x-4 ${
          width <= 552 ? "mt-16" : "mt-5"
        } px-7`}
      >
        <HomeLeft />

        <HomeMid />
        <HomeRight />
      </div>
    </>
  );
}

export default Home;

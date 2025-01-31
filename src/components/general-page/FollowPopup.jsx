import React, { useEffect } from "react";
import outSideClose from "../../hooks/outSideClose";
import { useSettingModelStore } from "../../../Store/model";
import CrossButton from "../buttons-fields/CrossButton";
import PrivacyListTile from "../pages/setting/util/PrivacyListTile";
import Notify from "../../assets/notify.svg?react";
import NotifyAll from "../../assets/notifyAll.svg?react";
import NotifyOff from "../../assets/notifyOff.svg?react";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";

function FollowPopup() {
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, []);

  const setSettingModel = useSettingModelStore(
    (state) => state.setSettingModel
  );
  const settingModel = useSettingModelStore((state) => state.settingModel);
  const outToCloseRef = React.useRef(null);
  outSideClose({ setState: setSettingModel, ref: outToCloseRef, arg: null });

  const [toggleBellIcon, setToggleBellIcon] = React.useState(false);
  return (
    <div className="fixed top-0 z-20 w-full h-screen bg-[#242424E6]/85">
      <div
        ref={outToCloseRef}
        className="origin-center animate-[fadeIn_0.3s_ease-in-out] absolute w-full max-w-[658px] mx-auto -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2 item px-5 "
      >
        <div className="bg-white rounded-lg">
          {/* Header */}
          <div className="flex items-center px-2 pt-3 text-gray-600 child-flex">
            <CrossButton
              onClick={() => {
                setSettingModel(null);
              }}
              size={36}
            />
          </div>
          <h1
            className={`px-4 mt-2 text-[1.15rem] text-[var(--text-dark)] first-letter:uppercase font-bold`}
          >
            {settingModel}
          </h1>
          <hr />
          {/* spaces */}
          <div className="h-[310px] overflow-y-auto">
            <div className="flex items-center">
              {/* looping List tiles */}
              {settingModel === "Spaces you follow" && (
                <div className="flex items-center px-4 gap-2 [&>div]:p-0 [&>div]:py-3">
                  <img
                    src="https://anmolpages.com/wp-content/uploads/2023/12/Your-paragraph-text.png"
                    alt="balaji"
                    className="w-8 h-8 rounded-xl aspect-square"
                  />
                  <PrivacyListTile
                    title="People you follow "
                    isSwitch={false}
                  />
                </div>
              )}
              {settingModel === "People you follow" && (
                <div className="flex items-center px-4 [&>div]:py-5 [&>div]:px-2 ">
                  <img
                    src="https://anmolpages.com/wp-content/uploads/2023/12/Your-paragraph-text.png"
                    alt="balaji"
                    className="w-8 h-8 rounded-full aspect-square"
                  />
                  <PrivacyListTile
                    title="People you follow"
                    subtitle={
                      "जय जय जय जय जयजयजय जय जय जय श्रीराम जयश्रीराम जयययययययययययययययययश्रीराम"
                    }
                    isSwitch={false}
                  />
                </div>
              )}
              {/* Personalized */}
              {settingModel === "Spaces you follow" && (
                <div className="px-4 grow">
                  <button
                    onClick={() => setSettingModel("follow personalize")}
                    className="flex ml-auto gap-0.5 px-2 py-1 [&_svg]:w-5 [&_svg]:h-5 [&_svg>*]:stroke-[#2E69FF] border rounded-full text-[#2E69FF] border-[#2E69FF] hover:bg-[#EBF0FF] font-medium text-[13px]"
                  >
                    <span>
                      <Notify />
                    </span>
                    <span>Personalized</span>
                    <span>
                      <MdOutlineKeyboardArrowDown />
                    </span>
                  </button>
                </div>
              )}
              {settingModel === "People you follow" && (
                <div className="px-4 grow">
                  <button
                    onClick={() => setToggleBellIcon(!toggleBellIcon)}
                    className={`flex ml-auto p-1 [&_svg]:w-5 [&_svg]:h-5   rounded-full   ${
                      toggleBellIcon
                        ? "bg-[#EBECED] hover:bg-[#E0E2E3] [&_svg>g>g>path]:fill-[#636466] border border-[#d0d1d2]"
                        : "border border-[#2E69FF] [&_svg>*]:stroke-[#2E69FF] hover:bg-[#EBF0FF]"
                    }`}
                  >
                    <Notify />
                  </button>
                </div>
              )}
            </div>
            <hr />
          </div>
        </div>
      </div>
    </div>
  );
}

export default FollowPopup;

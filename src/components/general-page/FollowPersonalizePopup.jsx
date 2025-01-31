import React, { useEffect } from "react";
import { useSettingModelStore } from "../../../Store/model";
import outSideClose from "../../hooks/outSideClose";
import CrossButton from "../buttons-fields/CrossButton";
import Radio from "../buttons-fields/Radio";
import Heading from "../pages/setting/Heading";
import PrivacyListTile from "../pages/setting/util/PrivacyListTile";

function FollowPersonalizePopup() {
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
  outSideClose({
    setState: setSettingModel,
    ref: outToCloseRef,
    arg: "Spaces you follow",
  });

  const [isAllowed, setIsAllowed] = React.useReducer(
    (prev, next) => ({ ...prev, ...next }),
    {}
  );
  const handleChange = (key, checked) => {
    setIsAllowed({ [key]: checked });
  };
  const whatNotificationRecieveList = [
    {
      title: "All posts",
      name: "whatNotificationRecieve",
      onChange: (checked) =>
        handleChange("whatNotificationRecieve", "allPosts"),
      checked: isAllowed.whatNotificationRecieve === "allPosts",
    },
    {
      title: "Personalized",
      subtitle: "Content selected for you",
      name: "whatNotificationRecieve",
      onChange: (checked) =>
        handleChange("whatNotificationRecieve", "personalized"),
      checked: isAllowed.whatNotificationRecieve === "personalized",
    },
    {
      title: "Off",
      name: "whatNotificationRecieve",
      onChange: (checked) => handleChange("whatNotificationRecieve", "off"),
      checked: isAllowed.whatNotificationRecieve === "off",
    },
  ];
  const whereRecieveNotificationList = [
    {
      title: "Push",
      onChange: (checked) => handleChange("isNotificationOnPush", checked),
      checked: isAllowed.isNotificationOnPush,
    },
    {
      title: "Email",
      subtitle: "You can expect at most 1 email from this Space per day.",
      onChange: (checked) => handleChange("isNotificationOnEmail", checked),
      checked: isAllowed.isNotificationOnEmail,
    },
  ];
  return (
    <div className="fixed top-0 z-20 w-full h-screen bg-[#242424E6]/85">
      <div
        ref={outToCloseRef}
        className="origin-center animate-[fadeIn_0.3s_ease-in-out] absolute w-full max-w-[658px] mx-auto -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2 item px-5"
      >
        <div className="bg-white rounded-lg max-h-[100vh]">
          {/* Header */}
          <div className="flex items-center px-2 pt-3 text-gray-600 child-flex">
            <CrossButton
              onClick={() => {
                setSettingModel("Spaces you follow");
              }}
              size={36}
            />
          </div>
          <h1
            className={`px-4 my-2 text-[1.15rem] text-[var(--text-dark)] first-letter:uppercase font-bold`}
          >
            Space notification settings
          </h1>
          <hr />
          <div className="max-h-[50vh] h-[290px] overflow-y-auto mension-suggestion-shadow">
            {/* What notification you recieve Radio */}
            <div>
              <Heading
                heading={"What notification you recieve"}
                className={"px-4 mt-4 mb-1 [&>h1]:font-bold "}
                isHr={false}
              />
              <div className="mb-1 [&_p]:text-[12px] [&>*:nth-child(2)]:mb-2 ">
                {whatNotificationRecieveList.map((item, index) => (
                  <Radio
                    key={item?.title}
                    {...item}
                    className={"px-4 [&_h3]:font-normal [&_p]:text-[12px] "}
                  />
                ))}
              </div>
            </div>
            {/* hr */}
            <div className="px-4">
              <hr />
            </div>
            {/* Where you receive notifications  */}
            <div className="mb-7">
              <Heading
                heading={"Where you receive notifications"}
                className={"px-4 mt-2 mb-1 [&>h1]:font-bold "}
                isHr={false}
              />

              <div className=" [&>div]:p-0 [&>div]:pt-3 px-2">
                {whereRecieveNotificationList.map((item, index) => (
                  <PrivacyListTile key={item?.title} {...item} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FollowPersonalizePopup;

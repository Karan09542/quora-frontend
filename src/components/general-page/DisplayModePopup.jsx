import React, { useEffect } from "react";
import CrossButton from "../buttons-fields/CrossButton";
import {
  useAccessTokenStore,
  useBaseURLStore,
  useOpenModelStore,
  useUserStore,
} from "../../../Store/model";
import outSideClose from "../../hooks/outSideClose";
import ThemeLight from "../../assets/display/themeLight.svg?react";
import ThemeDark from "../../assets/display/themeDark.svg?react";
import Check from "../../assets/display/check.svg?react";
import { RxQuestionMarkCircled } from "react-icons/rx";
import Tippy from "@tippyjs/react";
import Button from "../buttons-fields/Button";

function DisplayModePopup() {
  const user = useUserStore((state) => state.user);
  const setUser = useUserStore((state) => state.setUser);
  const displayModeList = [
    {
      name: "light",
      svg: <ThemeLight />,
      onClick: () => {},
    },
    {
      name: "dark",
      svg: <ThemeDark />,
      onClick: () => {},
    },
    {
      name: "auto",
      svg: (
        <div className="relative [&>svg]:absolute [&_svg]:rounded">
          <ThemeLight className="border border-[#b1b3b6]" />
          <ThemeDark className="clip" />
        </div>
      ),
      onClick: () => {},
    },
  ];
  const [displayMode, setDisplayMode] = React.useState("");
  useEffect(() => {
    if (!user) return;
    setDisplayMode(user?.settings?.theme);
  }, [user]);
  const baseURL = useBaseURLStore((state) => state.baseURL);
  const accessToken = useAccessTokenStore((state) => state.accessToken);
  const handleDisplayMode = (theme) => {
    fetch(`${baseURL}/user/theme`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify({ theme }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.status === "success") {
          setUser({ ...user, settings: { ...user.settings, theme } });
          setDisplayMode(theme);
        } else {
          toast.error(data.message);
        }
      })
      .catch((error) => console.log(error));
  };
  const setOpenModel = useOpenModelStore((state) => state.setOpenModel);
  const outToCloseRef = React.useRef(null);
  outSideClose({ setState: setOpenModel, ref: outToCloseRef, arg: null });
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
                setOpenModel(null);
              }}
              size={36}
            />
          </div>
          {/* Title */}
          <h1
            className={`px-4 mt-2 text-[1.15rem] text-[var(--text-dark)] first-letter:uppercase font-bold`}
          >
            Theme Setting
          </h1>
          <div className="px-4 py-2">
            <p className="text-[13px] text-[var(--text-gen-color)] leading-8">
              Adjust how you'd like Quora to appear on this browser.
            </p>
          </div>

          {/* Display Mode Options */}
          <div className="max-h-[50vh] h-[201px]">
            <div className="[&>div]:w-[169.32px] [&_svg]:w-full flex justify-around">
              {displayModeList?.map((item, index) => (
                <div
                  key={item?.name}
                  onClick={() => handleDisplayMode(item?.name)}
                  className={`cursor-pointer hover:bg-[#edf1f5] ${
                    displayMode === item?.name ? "bg-[#edf1f5]" : ""
                  } p-2 [&_div+svg]:border [&_div+svg]:border-[#dee0e1] [&_div+svg]:rounded rounded`}
                >
                  {/* check */}
                  <div className="flex items-center justify-between">
                    <div
                      className={`mb-0.5 flex text-[var(--text-dark)] child-flex items-center gap-2 font-bold`}
                    >
                      <span
                        className={`rounded w-[18px] h-[18px] ${
                          displayMode === item?.name
                            ? "bg-blue-600"
                            : "border border-[#b1b3b6] bg-white"
                        }`}
                      >
                        {displayMode === item?.name && (
                          <Check className="[&>path]:stroke-white" />
                        )}
                      </span>
                      <span
                        className={`capitalize ${
                          displayMode === item?.name ? "text-blue-500" : ""
                        }`}
                      >
                        {item?.name}
                      </span>
                    </div>
                    {item?.name === "auto" && (
                      <Tippy
                        content="Select this theme to apply your system settings if supported."
                        className="text-[13px] w-[250px]"
                        interactive={true}
                        placement="top-end"
                        theme="light"
                        offset={[21, 10]}
                      >
                        <div>
                          <RxQuestionMarkCircled
                            size={14}
                            className="text-[#515254]"
                          />
                        </div>
                      </Tippy>
                    )}
                  </div>
                  {/* theme */}
                  {item?.svg}
                </div>
              ))}
            </div>
          </div>
          <hr />
          <div className=" flex items-center justify-end gap-2 px-5 py-2 text-sm [&>*]:cursor-pointer select-none">
            <Button
              onClick={() => setOpenModel(null)}
              className={` ${"active:bg-blue-700 active:text-[#acc3ff] bg-blue-600"} `}
              name="Done"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default DisplayModePopup;

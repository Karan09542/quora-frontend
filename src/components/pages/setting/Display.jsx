import React, { useEffect } from "react";
import Heading from "./Heading";
import ThemeLight from "../../../assets/display/themeLight.svg?react";
import ThemeDark from "../../../assets/display/themeDark.svg?react";
import Check from "../../../assets/display/check.svg?react";
import { RxQuestionMarkCircled } from "react-icons/rx";
import Tippy from "@tippyjs/react";
import {
  useAccessTokenStore,
  useBaseURLStore,
  useDisplayModeStore,
  useUserStore,
} from "../../../../Store/model";
import { toast } from "react-toastify";

function Display() {
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

  const baseURL = useBaseURLStore((state) => state.baseURL);
  const accessToken = useAccessTokenStore((state) => state.accessToken);
  const setUser = useUserStore((state) => state.setUser);
  const user = useUserStore((state) => state.user);
  const [displayMode, setDisplayMode] = React.useState("");

  const sliderDotRef = React.useRef(null);
  const sliderRef = React.useRef(null);
  const sliderBarRefs = React.useRef([]);

  // initialize slider
  function handleIntializeSlider(percent, indexMax) {
    sliderDotRef.current.style.left = `${percent}%`;
    sliderRef.current.style.width = `${percent}%`;
    for (let i = 0; i < sliderBarRefs.current.length; i++) {
      if (i <= indexMax) {
        sliderBarRefs.current[i].style.borderColor = `#2e69ff`;
      } else {
        sliderBarRefs.current[i].style.borderColor = `#b1b3b6`;
      }
    }
  }

  useEffect(() => {
    if (!user || sliderBarRefs.current.length < 1) return;
    switch (user?.settings?.fontSize) {
      case "small":
        handleIntializeSlider(0, 0);
        break;
      case "medium":
        handleIntializeSlider(100 / 3, 1);
        break;
      case "large":
        handleIntializeSlider((100 / 3) * 2, 2);
        break;
      case "larger":
        handleIntializeSlider(100, 3);
        break;
      default:
        return;
    }
  }, [user]);
  // end initialize slider

  useEffect(() => {
    if (!user) return;
    setDisplayMode(user?.settings?.theme);
  }, [user]);

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

  const handleFontSizeInDb = (fontSize) => {
    fetch(`${baseURL}/user/font-size`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify({ fontSize }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.status === "success") {
          setUser({ ...user, settings: { ...user.settings, fontSize } });
        } else {
          toast.error(data.message);
        }
      })
      .catch((error) => console.log(error));
  };
  function handleFontSize(e) {
    const fontSize = e.clientX - e.currentTarget.offsetLeft;
    const percent = Math.round((fontSize / e.currentTarget.clientWidth) * 100);
    const handleSlider = (index, percent) => {
      const sliderBars = sliderBarRefs.current;

      sliderDotRef.current.style.left = `${percent}%`;
      sliderRef.current.style.width = `${percent}%`;
      for (let i = 0; i < sliderBars.length; i++) {
        if (i <= index) {
          sliderBars[i].style.borderColor = "#2e69ff";
        } else {
          sliderBars[i].style.borderColor = "#b1b3b6";
        }
      }
      //
      switch (Math.floor(percent)) {
        case 0: {
          handleFontSizeInDb("small");
          setUser({
            ...user,
            settings: { ...user.settings, fontSize: "small" },
          });
          break;
        }

        case 33: {
          handleFontSizeInDb("medium");
          setUser({
            ...user,
            settings: { ...user.settings, fontSize: "medium" },
          });
          break;
        }
        case 66: {
          handleFontSizeInDb("large");
          setUser({
            ...user,
            settings: { ...user.settings, fontSize: "large" },
          });
          break;
        }
        case 100: {
          handleFontSizeInDb("larger");
          setUser({
            ...user,
            settings: { ...user.settings, fontSize: "larger" },
          });
          break;
        }
      }
    };

    if (percent <= 33 / 2) {
      handleSlider(0, 0);
    } else if (percent > 33 / 2 && percent < 50) {
      handleSlider(1, 100 / 3);
    } else if (percent >= 50 && percent <= 85) {
      handleSlider(2, (100 / 3) * 2);
    } else {
      handleSlider(3, 100);
    }
  }
  return (
    <div className="border rounded-lg">
      <Heading
        className={"px-4 py-1.5"}
        isHr={false}
        heading={"Display Setting"}
      />
      <hr />
      <div>
        {/* about theme */}
        <div className="p-4">
          <h2 className="text-[15px] text-[var(--text-dark)]">Theme</h2>
          <p className="text-[13px] text-[var(--text-gen-color)] leading-8">
            Adjust how you'd like Quora to appear on this browser.
          </p>
        </div>
        {/* theme options */}
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
        {/* font size */}
        <div className="p-4 text-[var(--text-dark)]">
          <h2 className="text-[15px] mb-1.5">Font size</h2>
          <div className="flex items-center w-full gap-3">
            <div className="text-[13px]">Aa</div>
            <div className="grow">
              <div onPointerDown={handleFontSize} className="slider-track">
                <div ref={sliderRef} className="slider"></div>
                {Array.from({ length: 4 }).map((_, index) => {
                  return (
                    <div
                      ref={(ref) => (sliderBarRefs.current[index] = ref)}
                      key={"slider-bar-" + index}
                      className="slider-bar"
                      style={{ "--index": index }}
                    ></div>
                  );
                })}

                <div ref={sliderDotRef} className="slider-dot"></div>
              </div>
            </div>
            <div className="text-[18px]">Aa</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Display;

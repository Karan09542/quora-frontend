import React, { useEffect, useState } from "react";
import { languageMap } from "../../../utils/constant";
import { stringToColor } from "../../../utils/stringToColor";
import {
  useAccessTokenStore,
  useBaseURLStore,
  useSelectedLanguageStore,
  useSettingModelStore,
  useShouldFetchUserStore,
  useUserStore,
} from "../../../../Store/model";
import ThreeDots from "../../../assets/iconPopup/threeDots.svg?react";
import Tippy from "@tippyjs/react";
import { hideAll } from "tippy.js";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import Heading from "./Heading";
import BorderButton from "../../buttons-fields/BorderButton";

function Language() {
  const user = useUserStore((state) => state.user);
  const [primaryLanguage, setPrimaryLanguage] = useState("");
  const [userActiveLanguage, setUserActiveLanguage] = useState([]);
  useEffect(() => {
    if (user?.language?.primary) {
      setPrimaryLanguage(user?.language?.primary);

      const activeSetLang = [
        user?.language?.primary,
        ...user?.language?.additional,
      ];
      setUserActiveLanguage([...new Set(activeSetLang)]);
    }
    // console.log("हरिॐ");
  }, [user?.language?.primary, user?.language?.additional]);

  const setSettingModel = useSettingModelStore(
    (state) => state.setSettingModel
  );

  const setSelectedLanguage = useSelectedLanguageStore(
    (state) => state.setSelectedLanguage
  );

  const Remove = ({ language }) => (
    <div className="text-[var(--text-dark)] bg-white rounded ">
      <div
        onClick={() => {
          hideAll();
          setSelectedLanguage(language);
          setSettingModel("remove language");
        }}
        className="px-3 py-1.5 hover:bg-gray-100 hover:underline hover:decoration-[var(--text-dark)] cursor-pointer"
      >
        Remove
      </div>
    </div>
  );

  const baseURL = useBaseURLStore((state) => state.baseURL);
  const accessToken = useAccessTokenStore((state) => state.accessToken);
  const setShouldFetchUser = useShouldFetchUserStore(
    (state) => state.setShouldFetchUser
  );
  function handlePrimaryLanguage(lang) {
    fetch(`${baseURL}/user/set-primary-language`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify({ language: lang }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.status === "success") {
          setShouldFetchUser();
          toast.success(data.message);
        } else {
          toast.error(data.message);
        }
      })
      .catch((error) => console.log(error));
  }
  const navigate = useNavigate();
  return (
    <div>
      <Heading heading={"Language Settings"} />
      {/* user active languages */}
      {userActiveLanguage?.map((lang, index) => {
        const bg = stringToColor(lang);

        return (
          <div key={lang + " ॐ"}>
            <div
              // onClick={() => setPrimaryLanguage(item)}
              className="flex items-center justify-between py-1 my-0.5 "
            >
              {/* left */}
              <div className="flex items-center gap-2 py-1 text-sm">
                <div
                  className={`w-8 h-8 text-white text-center place-content-center text-[11px] aspect-square rounded-full`}
                  style={{ backgroundColor: bg }}
                >
                  <span>{lang.substring(0, 2).toUpperCase()}</span>
                </div>
                <span className="capitalize">{languageMap[lang]}</span>
              </div>
              {/* right */}
              {primaryLanguage === lang && (
                <span className="text-[var(--text-color-93)] text-[15px]">
                  Primary
                </span>
              )}
              {primaryLanguage !== lang && (
                <div className="flex items-center gap-2 ">
                  <BorderButton
                    onClick={() => handlePrimaryLanguage(lang)}
                    name={"Set as primary"}
                  />
                  <Tippy
                    content={<Remove language={lang} />}
                    interactive={true}
                    className="bg-transparent [&>:nth-child(1)]:p-0 [&>:nth-child(2)]:text-white [&>:nth-child(2)]:drop-shadow-[0_0px_0px_rgba(0,0,0,0.5)] border"
                    trigger="click"
                  >
                    <div className="p-1.5 hover:bg-[#00000008] rounded-full cursor-pointer">
                      <ThreeDots />
                    </div>
                  </Tippy>
                </div>
              )}
            </div>
            <hr />
          </div>
        );
      })}
      {/* other all languages */}
      {Object.keys(languageMap)?.map((lang, index) => {
        const bg = stringToColor(lang);

        if (userActiveLanguage?.includes(lang)) {
          return null;
        }

        return (
          <div key={lang}>
            <div
              onClick={() => {
                navigate(`/?lang=${lang}`);
              }}
              className="flex items-center justify-between py-1 my-0.5 cursor-pointer"
            >
              {/* left */}
              <div className="flex items-center gap-2 py-1 text-sm">
                <div
                  className={`w-8 h-8 text-white text-center place-content-center text-[11px] aspect-square rounded-full`}
                  style={{ backgroundColor: bg }}
                >
                  <span>{lang.substring(0, 2).toUpperCase()}</span>
                </div>
                <span className="capitalize">{languageMap[lang]}</span>
              </div>
              {/* right */}
              {primaryLanguage === lang && (
                <span className="text-[var(--text-color-93)] text-[15px]">
                  Primary
                </span>
              )}
            </div>
            <hr />
          </div>
        );
      })}
    </div>
  );
}

export default Language;

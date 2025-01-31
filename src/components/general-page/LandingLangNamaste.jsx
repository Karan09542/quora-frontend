import React, { useEffect } from "react";
import QuoraLogo from "../../assets/quora.svg?react";
import { useNavigate, useSearchParams } from "react-router-dom";
import UserImage from "../../assets/user.png";
import { GoPlus } from "react-icons/go";
import { SlArrowLeft } from "react-icons/sl";
import {
  langTransMap,
  languageMap,
  languageNamesMap,
} from "../../utils/constant";
import {
  useAccessTokenStore,
  useBaseURLStore,
  useUserStore,
} from "../../../Store/model";
import { toast } from "react-toastify";

function LandingLangNamaste() {
  const [searchParams] = useSearchParams();
  const lang = searchParams.get("lang");
  const user = useUserStore((state) => state.user);
  const setUser = useUserStore((state) => state.setUser);

  const baseURL = useBaseURLStore((state) => state.baseURL);
  const accessToken = useAccessTokenStore((state) => state.accessToken);
  const navigate = useNavigate();
  const [loading, setLoading] = React.useState(false);
  const handleAddLanguage = () => {
    setLoading(true);
    fetch(`${baseURL}/user/add-language`, {
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
          setUser({
            ...user,
            language: {
              ...user?.language,
              additional: [...user?.language?.additional, lang],
            },
          });
          navigate("/", {
            replace: true,
            state: { toastMessage: data.message },
          });
        } else {
          toast.error(data.message);
        }
      })
      .catch((error) => console.log(error))
      .finally(() => {
        setLoading(false);
      });
  };
  return (
    <div>
      {/* top */}
      <div className="flex justify-center">
        <div className="relative">
          <QuoraLogo
            className={`[&>*]:fill-[#B92B27] p-1`}
            style={{
              width: "219.565px",
              height: "125px",
              viewBox: "0 0 24 24",
            }}
          />
          <span className="absolute right-0 bottom-3 text-[13px] text-[var(--text-dark)]">
            {languageMap[lang]}
          </span>
        </div>
      </div>
      <div className="px-[36px] text-center -mt-3.5 text-[16px] text-[#808080]">
        <p>{langTransMap[lang]?.info}</p>

        <div className="mt-8 text-[var(--text-dark)] font-bold">
          <p>{`${langTransMap[lang]?.salutation?.[0]} ${
            user?.username?.charAt(0)?.toUpperCase() + user?.username?.slice(1)
          }`}</p>
          <p>{langTransMap[lang]?.salutation?.[1]}</p>
        </div>
        <div className="mt-4">
          <div
            language={searchParams.get("lang")?.substring(0, 2)}
            className="mx-auto matra-bhasa w-fit"
          >
            <img
              src={UserImage}
              alt="user image"
              className="w-[75px] h-[75px] aspect-square rounded-full  "
            />
          </div>
          <p className="text-[14px] text-[var(--text-dark)] mt-3">
            {langTransMap[lang]?.description(
              languageNamesMap?.[user?.language?.primary]?.[lang]
            )}
          </p>
          {/* add button */}
          <div>
            <button
              onClick={handleAddLanguage}
              className="flex items-center px-3 py-1 mx-auto mt-4 text-sm text-center text-white bg-blue-600 rounded-full hover:bg-blue-700"
            >
              <GoPlus
                size={25}
                className={`${loading ? "animate-spin" : ""}`}
              />
              <span>{langTransMap[lang]?.add}</span>
            </button>
          </div>
          {/* back button */}
          <div>
            <button className="text-[14px] hover:underline text-[var(--text-gen-color)] flex items-center mx-auto my-4 gap-1">
              <SlArrowLeft size={14} strokeWidth={50} />{" "}
              <span>{langTransMap[user?.language?.primary]?.back}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LandingLangNamaste;

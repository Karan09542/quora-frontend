import React, { useEffect } from "react";
import CrossButton from "../buttons-fields/CrossButton";
import {
  useAccessTokenStore,
  useBaseURLStore,
  useOpenModelStore,
  useShouldFetchUserStore,
} from "../../../Store/model";
import Globe from "../../assets/globe.svg?react";
import InputField from "../buttons-fields/InputField";
import outSideClose from "../../hooks/outSideClose";
import { languageMap } from "../../utils/constant";
import Tippy from "@tippyjs/react";
import Button from "../buttons-fields/Button";
import { toast } from "react-toastify";
import { set } from "react-hook-form";
function OtherLanguagePopup() {
  const setOpenModel = useOpenModelStore((state) => state.setOpenModel);
  const [inputValue, setInputValue] = React.useState("");
  const [selectedLanguage, setSelectedLanguage] = React.useState(null);

  const outToCloseRef = React.useRef(null);
  outSideClose({ setState: setOpenModel, ref: outToCloseRef, arg: null });
  const [languages, setLanguages] = React.useReducer(
    (prev, next) => (/\S/.test(inputValue) ? next : []),
    []
  );
  useEffect(() => {
    let languages = Object.keys(languageMap);
    languages = languages.filter((item) =>
      item.toLowerCase().includes(inputValue.toLowerCase())
    );
    setLanguages(languages);
  }, [inputValue]);

  // disable scroll on page
  useEffect(() => {
    document.documentElement.style.overflow = "hidden";
    return () => {
      document.documentElement.style.overflow = "unset";
    };
  }, []);

  const baseURL = useBaseURLStore((state) => state.baseURL);
  const accessToken = useAccessTokenStore((state) => state.accessToken);
  const setShouldFetchUser = useShouldFetchUserStore(
    (state) => state.setShouldFetchUser
  );

  function handleAddLanguage() {
    if (!selectedLanguage) {
      toast.error("Please add a language.");
      return;
    }
    fetch(`${baseURL}/user/add-language`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify({ language: selectedLanguage }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.status === "success") {
          setShouldFetchUser();
          toast.success(data.message);
          setOpenModel(null);
          setSelectedLanguage(null);
        } else {
          toast.error(data.message);
        }
      })
      .catch((error) => console.log(error));
  }
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
          <h1
            className={`px-4 mt-2 text-[1.15rem] text-[var(--text-dark)] first-letter:uppercase font-bold`}
          >
            What other languages do you know?
          </h1>
          <div className="max-h-[70vh] overflow-y-auto">
            <div className="px-4 mt-3 overflow-y-auto min-h-[313px]">
              <div className="border rounded ">
                {/* top heading */}
                <div className="flex items-center gap-2 p-3">
                  <span className="p-1 bg-gray-100 rounded-full">
                    <Globe className="w-[1.3rem] h-[1.3rem] [&_*]:stroke-[#474747]" />
                  </span>
                  <span className="text-[var(--text-dark)] font-medium">
                    Add language credential
                  </span>
                </div>
                <hr />
                <div className="p-4">
                  <div className="relative">
                    {/* language input */}
                    <InputField
                      onChange={(e) => {
                        if (selectedLanguage) return;
                        setInputValue(e.target.value);
                      }}
                      className={"py-2.5"}
                      fieldName={
                        selectedLanguage ? "" : "Search for a language"
                      }
                      value={inputValue}
                    />
                    {/\S/.test(inputValue) && (
                      <span
                        onClick={() => setInputValue("")}
                        className="hover:bg-gray-100 px-2 py-1 rounded-full absolute text-xs font-medium cursor-pointer top-3 right-4 text-[var(--text-gen-color)]"
                      >
                        Clear
                      </span>
                    )}

                    {/* if language is selected */}
                    {selectedLanguage && (
                      <>
                        {/* left */}
                        <span className="text-[13px] text-[var(--text-gen-color)] bg-gray-100 px-2 py-1 rounded absolute top-2.5 left-2 capitalize">
                          {selectedLanguage}
                        </span>
                        {/* right */}
                        <Tippy content="Remove">
                          <p
                            className={`right-2 top-2.5 absolute w-fit text-[var(--text-gen-color)]`}
                          >
                            <CrossButton
                              onClick={() => setSelectedLanguage(null)}
                              size={30}
                            />
                          </p>
                        </Tippy>
                      </>
                    )}
                  </div>
                  {/* language option */}
                  <div className="-mt-[2px] border rounded max-h-[157px] mension-suggestion-shadow  overflow-y-auto">
                    {languages.map((lang) => (
                      <>
                        <p
                          key={lang}
                          onClick={() => {
                            setSelectedLanguage(lang);
                            setInputValue("");
                          }}
                          className="py-2 hover:bg-gray-100 cursor-pointer px-4 text-[15px] text-[var(--text-dark)]"
                        >
                          {lang}
                        </p>
                        <hr />
                      </>
                    ))}
                  </div>
                  <p className="text-[13px] text-[var(--text-color-93)] py-0.5">
                    Adding a language credential will add you to Quora in that
                    language, when supported.
                  </p>
                </div>
              </div>
            </div>
            <hr />
            <div className=" flex items-center justify-end gap-2 px-5 py-2 text-sm [&>*]:cursor-pointer select-none">
              <span
                onClick={() => {
                  setOpenModel(null);
                }}
                className="hover:bg-gray-100 active:opacity-80 px-3 py-[0.5rem] rounded-full font-semibold text-[var(--text-gen-color)]"
              >
                Cancel
              </span>{" "}
              <Button
                onClick={handleAddLanguage}
                className={` ${"active:bg-blue-700 bg-blue-600"} `}
                name="Save"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default OtherLanguagePopup;

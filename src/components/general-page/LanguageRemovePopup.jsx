import React, { useEffect } from "react";
import CrossButton from "../buttons-fields/CrossButton";
import {
  useAccessTokenStore,
  useBaseURLStore,
  useSelectedLanguageStore,
  useSettingModelStore,
  useShouldFetchUserStore,
} from "../../../Store/model";

import outSideClose from "../../hooks/outSideClose";

import Button from "../buttons-fields/Button";
import { toast } from "react-toastify";
function LanguageRemovePopup() {
  const setSettingModel = useSettingModelStore(
    (state) => state.setSettingModel
  );
  const selectedLanguage = useSelectedLanguageStore(
    (state) => state.selectedLanguage
  );
  const setSelectedLanguage = useSelectedLanguageStore(
    (state) => state.setSelectedLanguage
  );

  const outToCloseRef = React.useRef(null);
  outSideClose({ setState: setSettingModel, ref: outToCloseRef, arg: null });

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

  function handleRemoveLanguage() {
    if (!selectedLanguage) {
      toast.error("Please add a language.");
      return;
    }
    fetch(`${baseURL}/user/remove-language`, {
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
          setSettingModel(null);
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
                setSettingModel(null);
              }}
              size={36}
            />
          </div>
          <h1
            className={`px-4 mt-2 text-[1.15rem] text-[var(--text-dark)] first-letter:uppercase font-bold`}
          >
            Remove{" "}
            {selectedLanguage?.charAt(0).toUpperCase() +
              selectedLanguage?.slice(1)}
          </h1>
          <div className="max-h-[70vh] overflow-y-auto">
            <div className="px-4 mt-3 text-[var(--text-dark)] overflow-y-auto min-h-[256px] text-[15px]">
              <p className="mb-3.5">
                If you remove{" "}
                {selectedLanguage?.charAt(0).toUpperCase() +
                  selectedLanguage?.slice(1)}{" "}
                from your languages, you will not be able to receive emails and
                notifications, or interact with users on Quora in English.
              </p>
              <p>
                Are you sure you want to remove{" "}
                {selectedLanguage?.charAt(0).toUpperCase() +
                  selectedLanguage?.slice(1)}{" "}
                from your languages?
              </p>
            </div>
            <hr />
            <div className=" flex items-center justify-end gap-2 px-5 py-2 text-sm [&>*]:cursor-pointer select-none">
              <span
                onClick={() => {
                  setSettingModel(null);
                }}
                className="hover:bg-gray-100 active:opacity-80 px-3 py-[0.5rem] rounded-full font-semibold text-[var(--text-gen-color)]"
              >
                Cancel
              </span>{" "}
              <Button
                onClick={handleRemoveLanguage}
                className={` ${"active:bg-blue-700 bg-blue-600"} `}
                name="Remove"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LanguageRemovePopup;

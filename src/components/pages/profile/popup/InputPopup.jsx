import React, { useEffect } from "react";
import outSideClose from "../../../../hooks/outSideClose";
import {
  useAccessTokenStore,
  useBaseURLStore,
  useInputValueStore,
  useOpenModelStore,
  useProfileUserStore,
  useUserStore,
} from "../../../../../Store/model";
import CrossButton from "../../../buttons-fields/CrossButton";
import Button from "../../../buttons-fields/Button";
import InputField from "../../../buttons-fields/InputField";
import PeopleCredential from "../../../../assets/profile/peopleCredential.svg?react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { decorateUsername } from "../../../../utils/fn_utils";

function InputPopup() {
  const setOpenModel = useOpenModelStore((state) => state.setOpenModel);
  const openModel = useOpenModelStore((state) => state.openModel);
  const outToCloseRef = React.useRef(null);
  outSideClose({ setState: setOpenModel, ref: outToCloseRef, arg: null });
  const buttonName = () => {
    switch (openModel) {
      case "change username":
        return "Done";
      case "add profile credential":
        return "Save";
    }
  };
  const getHeadingPair = () => {
    switch (openModel) {
      case "change username":
        return {
          heading: "Edit Name",
          subheading: "You can change your name up to 10 times.",
        };
      case "add profile credential":
        return {
          heading: "Edit credentials",
          subheading: "Credentials add credibility to your content",
        };
    }
  };
  const inputPlaceholder = () => {
    switch (openModel) {
      case "change username":
        return "Name";
      case "add profile credential":
        return "librarian in New York, reads constantly";
    }
  };
  const isCancle = () => {
    switch (openModel) {
      case "change username":
        return false;
      case "add profile credential":
        return true;
    }
  };

  const params = useParams();
  const inputValue = useInputValueStore((state) => state.inputValue);
  const setInputValue = useInputValueStore((state) => state.setInputValue);

  useEffect(() => {
    switch (openModel) {
      case "change username":
        {
          const username = params?.username.split("-").join(" ");
          setInputValue(username);
        }
        break;
      case "add profile credential":
        setMaxLength(60 - inputValue?.length);
        break;
    }
  }, []);
  const [maxLength, setMaxLength] = React.useState(60);

  const user = useUserStore((state) => state.user);
  const setUser = useUserStore((state) => state.setUser);
  const profileUser = useProfileUserStore((state) => state.profileUser);
  const setProfileUser = useProfileUserStore((state) => state.setProfileUser);
  const baseURL = useBaseURLStore((state) => state.baseURL);
  const accessToken = useAccessTokenStore((state) => state.accessToken);
  const navigate = useNavigate();
  const handleUsername = (username) => {
    fetch(`${baseURL}/user/update-username`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify({ username, profileId: profileUser?._id }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.status === "success") {
          toast.success(data.message);
          setUser({ ...user, username });
          setProfileUser({ ...profileUser, username });
          navigate(`/profile/${decorateUsername(username)}`, { replace: true });
          setOpenModel(null);
        } else {
          toast.error(data.message);
        }
      })
      .catch((error) => console.log(error));
  };
  const handleProfile = (profile) => {
    fetch(`${baseURL}/user/update-profile`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify({ profile, profileId: profileUser?._id }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.status === "success") {
          toast.success(data.message);
          setUser({ ...user, credentials: { ...user.credentials, profile } });
          setProfileUser({
            ...profileUser,
            credentials: { ...user.credentials, profile },
          });
          setOpenModel(null);
        } else {
          toast.error(data.message);
        }
      })
      .catch((error) => console.log(error));
  };
  const handleProfileInput = () => {
    switch (openModel) {
      case "change username":
        {
          const username = inputValue;
          handleUsername(username);
        }
        break;
      case "add profile credential":
        {
          const profile = inputValue;
          handleProfile(profile);
        }
        break;
    }
  };
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
            {getHeadingPair()?.heading}
          </h1>
          <div className="max-h-[70vh] overflow-y-auto">
            <div className="px-4 text-[var(--text-gen-color)] overflow-y-auto min-h-[256px] text-[15px]">
              <p className="mb-3.5">{getHeadingPair()?.subheading}</p>
              {/* username input */}
              {openModel === "change username" && (
                <InputField
                  fieldName={inputPlaceholder()}
                  label={inputPlaceholder()}
                  value={inputValue}
                  onChange={(e) => {
                    setInputValue(e.target.value);
                  }}
                />
              )}
              {/* credential input */}
              {openModel === "add profile credential" && (
                <div className="border rounded [&>div:nth-of-type(2)]:p-4 [&>div:nth-of-type(1)]:px-4 [&>div:nth-of-type(1)]:py-3">
                  {/* top intro */}
                  <div className="flex items-center gap-2">
                    <div className="bg-[#F1F2F2] w-fit rounded-full p-1">
                      <PeopleCredential className="w-5 h-5 aspect-square" />
                    </div>
                    <p className="text-[var(--text-dark)] text-[15px] font-medium">
                      {openModel.charAt(0).toUpperCase() + openModel.slice(1)}
                    </p>
                  </div>
                  <hr />
                  {/* bottom input */}
                  <div className="relative ">
                    <InputField
                      fieldName={inputPlaceholder()}
                      label={
                        ["add profile credential"].includes(openModel)
                          ? ""
                          : inputPlaceholder()
                      }
                      value={inputValue}
                      onChange={(e) => {
                        if (e.target.value.length > 60) return;
                        setInputValue(e.target.value);
                        setMaxLength(60 - e.target.value.length);
                      }}
                    />
                    <span
                      className={`absolute -translate-y-1/2 right-[1.04rem]  top-1/2 text-[13px] z-20 bg-white p-2 ${
                        maxLength === 0
                          ? "text-red-500 "
                          : "text-[var(--text-color-93)]"
                      }`}
                    >
                      {maxLength}
                    </span>
                  </div>
                </div>
              )}
            </div>
            <hr />
            <div className=" flex items-center justify-end gap-2 px-5 py-2 text-sm [&>*]:cursor-pointer select-none">
              {isCancle() && (
                <span
                  onClick={() => {
                    setOpenModel(null);
                  }}
                  className="hover:bg-gray-100 active:opacity-80 px-3 py-[0.5rem] rounded-full font-semibold text-[var(--text-gen-color)]"
                >
                  Cancel
                </span>
              )}{" "}
              <Button
                className={` ${"active:bg-blue-700 bg-blue-600"} `}
                name={buttonName()}
                onClick={handleProfileInput}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default InputPopup;

import React, { useEffect } from "react";
import CrossButton from "../../../buttons-fields/CrossButton";
import {
  useOpenModelStore,
  useBaseURLStore,
  useAccessTokenStore,
  useProfileUserStore,
} from "../../../../../Store/model";
import outSideClose from "../../../../hooks/outSideClose";
// svg
import Employment from "../../../../assets/iconPopup/employment.svg?react";
import Education from "../../../../assets/subscription/scholar.svg?react";
import Location from "../../../../assets/iconPopup/location.svg?react";
import InputField from "../../../buttons-fields/InputField";
// check mark
import { IoMdCheckmark } from "react-icons/io";
import Button from "../../../buttons-fields/Button";
import DateInput from "../util/DateInput";
import { toast } from "react-toastify";

function CredentialPopup() {
  // prevent scroll

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, []);

  // out side close
  const outToCloseRef = React.useRef();
  const openModel = useOpenModelStore((state) => state.openModel);
  const setOpenModel = useOpenModelStore((state) => state.setOpenModel);
  outSideClose({ setState: setOpenModel, ref: outToCloseRef, arg: null });

  const getSvg = () => {
    switch (openModel) {
      case "employment":
        return <Employment />;
      case "education":
        return <Education />;
      case "location":
        return <Location />;
      default:
        return;
    }
  };

  // credential list
  const employmentList = [
    {
      label: "Position",
      placeholder: "Accountant",
      maxCharacter: 50,
      name: "position",
    },
    {
      label: "Company/Organization",
      placeholder: "Type to search",
      search: { type: "text" },
      name: "company",
    },
    {
      label: "Start Year",
      search: { type: "date" },
      name: "startYear",
      range: [1900, new Date().getFullYear()],
    },
    {
      label: "End Year",
      search: { type: "date" },
      name: "endYear",
      range: [1900, new Date().getFullYear()],
    },
  ];
  const educationList = [
    {
      label: "School",
      placeholder: "Select a school",
      name: "school",
    },
    {
      label: "Primary major",
      placeholder: "Type to search",
      name: "primaryMajor",
      search: { type: "text" },
    },
    {
      label: "Secondary major",
      placeholder: "Type to search",
      name: "secondaryMajor",
      search: { type: "text" },
    },
    {
      label: "Degree type",
      placeholder: "M.F.A",
      name: "degree",
      maxCharacter: 25,
    },
    {
      label: "Graduation year",
      search: { type: "date" },
      name: "graduationYear",
      range: [1900, new Date().getFullYear() + 6],
    },
  ];
  const locationList = [
    {
      label: "Location (required)",
      placeholder: "Type to search",
      search: { type: "text" },
      name: "address",
    },
    {
      label: "Start Year",
      search: { type: "date" },
      name: "startYear",
      range: [1900, new Date().getFullYear()],
    },
    {
      label: "End Year",
      search: { type: "date" },
      name: "endYear",
      range: [1900, new Date().getFullYear()],
    },
  ];

  // creadential object
  const creadentialObj = {
    employment: employmentList,
    education: educationList,
    location: locationList,
  };

  // max length
  const maxLengthObj = creadentialObj[openModel]?.reduce((acc, item) => {
    if (item.maxCharacter) {
      acc[item.name] = item.maxCharacter;
    }
    return acc;
  }, {});

  const [maxLength, setMaxLength] = React.useState(maxLengthObj);

  // options
  const optionList = (credentialList) =>
    credentialList.reduce((acc, item) => {
      acc[item.name] = "";
      return acc;
    }, {});

  // input
  const [inputValues, setInputValues] = React.useState(
    optionList(creadentialObj[openModel])
  );

  useEffect(() => {
    if (["employment", "location"].includes(openModel)) {
      setInputValues((prev) => ({ ...prev, isCurrent: false }));
    }
  }, [openModel]);

  // date height obj
  const dateHeigthObj = creadentialObj[openModel]?.reduce((acc, item) => {
    if (item.search?.type === "date") {
      acc[item.name] = 300;
    }
    return acc;
  }, {});

  useEffect(() => {
    console.log("inputValues", inputValues);
  }, [inputValues]);

  const [isHr, setIsHr] = React.useState(false);
  const [isCheckBox, setIsCheckBox] = React.useState(false);
  const [dateHeights, setDateHeights] = React.useState(dateHeigthObj);
  const dateRefs = React.useRef([]);
  // date height
  useEffect(() => {
    if (dateRefs.current.length > 0) {
      dateRefs.current.forEach((e) => {
        const offsetTop = e.offsetTop;
        const name = e.getAttribute("name");
        const diff = e.offsetTop - e.parentElement.parentElement.offsetTop;
        setDateHeights((prev) => ({ ...prev, [name]: diff }));

        // console.log(
        //   // main height
        //   e.parentElement.parentElement.clientHeight,
        //   // date element
        //   e.offsetTop,
        //   // date element parent i.e. all inputs
        //   e.parentElement
        // );
      });
    }
  }, []);

  const baseURL = useBaseURLStore((state) => state.baseURL);
  const accessToken = useAccessTokenStore((state) => state.accessToken);
  const profileUserId = useProfileUserStore((state) => state.profileUser?._id);
  const profileUser = useProfileUserStore((state) => state.profileUser);
  const setProfileUser = useProfileUserStore((state) => state.setProfileUser);
  const handleCredential = (credentialData) => {
    fetch(`${baseURL}/user/update-${openModel}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify({
        [openModel]: credentialData,
        profileId: profileUserId,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.status === "success") {
          toast.success(data.message);
          setProfileUser({
            ...profileUser,
            credentials: {
              ...profileUser?.credentials,
              [openModel]: credentialData,
            },
          });
          setOpenModel(null);
        } else {
          toast.error(data.message);
          setOpenModel(null);
        }
      });
  };

  return (
    <div className="fixed top-0 z-20 w-full h-screen bg-[#242424E6]/85">
      <div
        ref={outToCloseRef}
        className="origin-center max-h-screen animate-[fadeIn_0.3s_ease-in-out] absolute w-full max-w-[658px] mx-auto -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2 item px-5 "
      >
        <div className="bg-white rounded-lg">
          {/* Header */}
          <div className="flex items-center px-2 pt-3 text-gray-600 child-flex">
            {/* cross button */}
            <CrossButton
              onClick={() => {
                setOpenModel(null);
              }}
              size={36}
            />
          </div>
          <div className="pt-2 ">
            {/* heading */}
            <div className="px-4 mb-3.5">
              <h3 className="text-[18px] mb-0.5 font-bold text-[var(--text-dark)]">
                Edit credentials
              </h3>
              <p className="text-[15px] text-[var(--text-gen-color)]">
                Credentials add credibility to your content
              </p>
            </div>
            {isHr && <hr />}

            {/* credentials */}
            <div
              onScroll={(e) => {
                if (e.target.scrollTop > 0) {
                  setIsHr(true);
                } else {
                  setIsHr(false);
                }
              }}
              className="overflow-y-auto max-h-[72vh]  px-4 pt-2.5 pb-4"
            >
              <div className=" border rounded [&>div:nth-of-type(2)]:p-4 [&>div:nth-of-type(1)]:px-4 [&>div:nth-of-type(1)]:py-3">
                {/* credential intro */}
                <div className="flex items-center gap-2">
                  <div className="bg-[#F1F2F2] w-fit rounded-full p-1 [&>svg]:w-5 [&>svg]:h-5 [&>svg]:aspect-square">
                    {getSvg()}
                  </div>
                  <p className="text-[var(--text-dark)] text-[15px] font-medium">
                    Add {openModel} credential
                  </p>
                </div>
                <hr />
                {/* credential form */}
                <div className="p-4">
                  {creadentialObj[openModel] &&
                    creadentialObj[openModel]?.map((item, index) => {
                      // date input
                      if (item?.search?.type === "date") {
                        return (
                          <div
                            name={item?.name}
                            ref={(e) => {
                              if (e) {
                                dateRefs.current.push(e);
                              }
                            }}
                            className={`${
                              index === creadentialObj[openModel].length - 1
                                ? ""
                                : "mb-3"
                            } `}
                            key={item?.label}
                          >
                            <DateInput
                              height={dateHeights?.[item?.name]}
                              {...item}
                              setValue={setInputValues}
                            />
                          </div>
                        );
                      }
                      // text input
                      return (
                        <div key={item?.label} className="relative">
                          <InputField
                            {...item}
                            fieldName={item?.placeholder}
                            className={`${
                              index === creadentialObj[openModel].length - 1
                                ? ""
                                : "mb-3"
                            } `}
                            onChange={(e) => {
                              if (
                                item?.maxCharacter &&
                                e.target.value.length > item?.maxCharacter
                              ) {
                                return;
                              }
                              setInputValues((prev) => ({
                                ...prev,
                                [item?.name]: e.target.value,
                              }));
                            }}
                            value={inputValues[item?.name]}
                          />
                          {item?.maxCharacter && (
                            <span
                              className={`absolute -translate-y-1/4 right-0.5  top-1/2 text-[13px] z-20 bg-white p-2 ${
                                maxLength[item?.name] -
                                  inputValues[item?.name] ===
                                0
                                  ? "text-red-500 "
                                  : "text-[var(--text-color-93)]"
                              }`}
                            >
                              {item?.maxCharacter -
                                (inputValues[item?.name]
                                  ? inputValues[item?.name].length
                                  : 0)}
                            </span>
                          )}
                          {/* <DateInput height="200px" label="हर हर महादेव" /> */}
                        </div>
                      );
                    })}
                </div>

                {/* check box */}
                {!["education"].includes(openModel) && (
                  <div
                    onClick={() => {
                      setInputValues((prev) => ({
                        ...prev,
                        isCurrent: !prev["isCurrent"],
                      }));
                      setIsCheckBox(!isCheckBox);
                    }}
                    className="flex items-center gap-2 px-4 mt-2 mb-12 cursor-pointer w-fit group"
                  >
                    <div className="group-hover:ring-4 rounded-[0.15rem] group-hover:ring-[#d5e1ff]">
                      <div
                        className={`flex relative items-center justify-center w-[21px] h-[21px] border border-[#dee0e1] ${
                          isCheckBox
                            ? "bg-[#1457ff] rounded-[4px] [&>svg]:text-white"
                            : "group-hover:border-[#1457ff] rounded-[0.15rem]"
                        }`}
                      >
                        {isCheckBox && <IoMdCheckmark size={17} />}
                      </div>
                    </div>
                    <p>
                      I currently {openModel === "employment" ? "work" : "live"}{" "}
                      here
                    </p>
                  </div>
                )}
              </div>
            </div>
            <hr />
            {/* bottom buttons */}
            <div className=" flex items-center justify-end gap-2 px-5 py-2 text-sm [&>*]:cursor-pointer select-none">
              <span
                onClick={() => {
                  setOpenModel(null);
                }}
                className="hover:bg-gray-100 active:opacity-80 px-3 py-[0.5rem] rounded-full font-semibold text-[var(--text-gen-color)]"
              >
                Cancel
              </span>

              <Button
                className={` ${"active:bg-blue-700 bg-blue-600"} `}
                name="Save"
                onClick={() => handleCredential(inputValues)}
                // name={buttonName()}
                // onClick={handleProfileInput}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CredentialPopup;

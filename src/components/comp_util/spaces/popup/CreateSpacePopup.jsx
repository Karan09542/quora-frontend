import React, { useEffect } from "react";
import outSideClose from "../../../../hooks/outSideClose";
import { useOpenModelStore, useUserStore } from "../../../../../Store/model";
import CrossButton from "../../../buttons-fields/CrossButton";
import InputField from "../../../buttons-fields/InputField";
import Button from "../../../buttons-fields/Button";
import MaxLength from "../../MaxLength";

const CreateSpacePopup = () => {
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, []);

  const outToCloseRef = React.useRef(null);
  const setOpenModel = useOpenModelStore((state) => state.setOpenModel);
  outSideClose({ setState: setOpenModel, ref: outToCloseRef, arg: null });
  const username = useUserStore((state) => state.user?.username);
  const [input, setInput] = React.useState({ name: username, description: "" });

  useEffect(() => {
    console.log(input);
  }, [input]);
  // render input list
  const inputList = [
    {
      label: "Name",
      star: true,
      sublable: "This can be changed in Space settings.",
      name: "name",
    },
    {
      label: "Brief description",
      sublable:
        "Include a few keywords to show people what to expect if they join.",
      name: "description",
      isMaxLength: true,
    },
  ];
  const [maxLength, setMaxLength] = React.useState(80);
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
          <div className="px-4 mt-2 [&>h1]:text-[1.15rem] [&>h1]:mb-0.5 [&>h1]:text-[var(--text-dark)] [&>p]:text-[15px] [&>p]:text-[var(--text-gen-color)]">
            <h1 className={`first-letter:uppercase font-bold`}>
              Create a Space
            </h1>
            <p>
              Share your interests, curate content, host discussions, and more.
            </p>
          </div>

          {/* input */}
          <div>
            <div className="px-4 py-2 max-h-[75vh] min-h-[34vh]  overflow-y-auto">
              {inputList.map((item, index) => (
                <div key={item?.label} className="relative mb-4">
                  <InputField
                    {...item}
                    onChange={(e) => {
                      if (item?.isMaxLength) {
                        if (e.target.value.length > 80) {
                          return;
                        }
                        setMaxLength((prev) => 80 - e.target.value.length);
                      }
                      setInput((prev) => ({
                        ...prev,
                        [item?.name]: e.target.value,
                      }));
                    }}
                    value={input?.[item?.name]}
                  />
                  <p className="text-[#2D9655] text-[13px] my-2">
                    This name is available.
                  </p>
                  {item?.isMaxLength && (
                    <MaxLength
                      maxLength={maxLength}
                      isShow={maxLength <= 40}
                      top="56%"
                      right="1px"
                    />
                  )}
                </div>
              ))}
            </div>
          </div>
          <hr />
          <div className=" flex items-center justify-end gap-2 px-5 py-2 text-sm [&>*]:cursor-pointer select-none">
            <Button
              onClick={() => {
                setOpenModel({ isInvite: true, inviteTo: input?.name });
              }}
              className={` ${"active:bg-blue-700 active:text-[#acc3ff] bg-blue-600"} `}
              name="Create"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateSpacePopup;

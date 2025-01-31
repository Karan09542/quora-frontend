import React, { useEffect } from "react";
import {
  useAccessTokenStore,
  useBaseURLStore,
  useOpenModelStore,
} from "../../../../../Store/model";
import outSideClose from "../../../../hooks/outSideClose";
import CrossButton from "../../../buttons-fields/CrossButton";
import InputField from "../../../buttons-fields/InputField";
import { BsSearch } from "react-icons/bs";
import Attachment from "../../../../assets/formatting-svg/linkAttachment.svg?react";
import Heading from "../../../pages/setting/Heading";
import Button from "../../../buttons-fields/Button";
import BorderButton from "../../../buttons-fields/BorderButton";
import { toast } from "react-toastify";
import PostOfficeTempelate from "../../../pages/profile/util/PostOfficeTempelate";
import { formatText } from "../../../../utils/fn_utils";
import ProfileTempelate from "../../../pages/search/util/ProfileTempelate";
import CheckBox from "../../../buttons-fields/CheckBox";
import useMention from "../../../../hooks/useMention";
import { set } from "react-hook-form";
const InvitePopup = ({ isSelectAll = false }) => {
  React.useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, []);

  const outToCloseRef = React.useRef(null);
  const openModel = useOpenModelStore((state) => state.openModel);
  const setOpenModel = useOpenModelStore((state) => state.setOpenModel);
  outSideClose({ setState: setOpenModel, ref: outToCloseRef, arg: null });
  const [input, setInput] = React.useState("");
  const handleCopyInviteLink = () => {
    navigator.clipboard.writeText("राम राम राम राम");
    toast.success("Invite link copied to clipboard");
  };

  const baseURL = useBaseURLStore((state) => state.baseURL);
  const accessToken = useAccessTokenStore((state) => state.accessToken);

  // fetching mension data
  const { suggestions, setSuggestions } = useMention({
    mensionInput: input,
    baseURL,
    accessToken,
  });
  const [isChecked, setIsChecked] = React.useState({});
  const [selectedMensions, setSelectedMensions] = React.useState([]);
  // clear suggestions if input is empty
  useEffect(() => {
    if (!input) {
      setSuggestions([]);
    }
    console.log("isChecked", isChecked);
  }, [input, isChecked]);

  // handle checkbox
  const handleCheck = (id) => {
    setIsChecked((prev) => {
      const updatedCheckState = { ...prev, [id]: !prev[id] };

      if (!prev[id]) {
        // Add suggestion to `selectedMensions` when checkbox is checked
        const selectedSuggestions = suggestions.filter(
          (suggestion) => suggestion._id === id
        );

        setSelectedMensions((prevMentions) => [
          ...prevMentions,
          ...selectedSuggestions,
        ]);
      } else {
        // Remove suggestion from `selectedMensions` when checkbox is unchecked
        setSelectedMensions((prevMentions) =>
          prevMentions.filter((mention) => mention._id !== id)
        );
      }

      return updatedCheckState;
    });

    setInput(""); // Reset the input after a mention is selected or deselected
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
              Invite Contributors to {openModel?.inviteTo}
            </h1>
            <p>
              Contributors can add content to the Space. Inviting more
              contributors can encourage discussions and grow content.
            </p>
          </div>
          {/*search input for contributors */}
          <div className="relative px-4 py-2 [&_input]:py-2 text-[13px] mt-1.5">
            <InputField
              icon={<BsSearch color="var(--text-color-93)" />}
              fieldName={"Search by name"}
              onChange={(e) => setInput(e.target.value)}
              value={input}
              className={"!indent-[1.8rem]"}
              type="search"
            />
            {/* suggestions menstion */}
            <div
              ref={(el) => {
                if (!el) return;
                const width = el?.previousElementSibling?.clientWidth;
                el.style.width = width + "px";
              }}
              className="absolute z-10 w-full bg-white border-b border-x"
            >
              {suggestions?.map((item) => (
                <div
                  onClick={() => handleCheck(item?._id)}
                  key={item?._id}
                  className="flex items-center cursor-pointer px-4 [&_b]:text-[var(--text-dark)]"
                >
                  <CheckBox isChecked={isChecked?.[item?._id]} />
                  <ProfileTempelate
                    user={{
                      username: item?.name,
                      profilePicture: item?.avatar,
                    }}
                    showFollowButton={false}
                  />
                </div>
              ))}
            </div>
          </div>
          <hr />
          {/* Get invite link */}
          <div className=" [&>:first-child]:py-3 max-h-[45vh]  overflow-y-auto mension-suggestion-shadow ">
            <Heading
              heading={
                <div className="flex items-center gap-x-2">
                  <Attachment />{" "}
                  <p className="text-[15px] text-[var(--text-dark)] font-bold">
                    Get invite link
                  </p>
                </div>
              }
              isHr={false}
              component={
                <BorderButton name="Copy" onClick={handleCopyInviteLink} />
              }
              className={"px-4"}
            />
            {/*show contributors mensions */}
            {selectedMensions?.map((item) => (
              <div
                onClick={() => handleCheck(item?._id)}
                key={item?._id + "mension"}
                className="flex items-center px-4 [&_b]:text-[var(--text-dark)] bg-[#ebf0ff] border-t"
              >
                <CheckBox isChecked={isChecked?.[item?._id]} />
                <ProfileTempelate
                  user={{
                    username: item?.name,
                    profilePicture: item?.avatar,
                  }}
                  showFollowButton={false}
                />
              </div>
            ))}

            {/* selected contributors */}
            <div className="bg-[#F1F2F2] px-4 py-1.5 border  border-y-[#dee0e1">
              <Heading
                heading={
                  <p className="text-[13px] font-normal">
                    {selectedMensions?.length} selected
                  </p>
                }
                isHr={false}
                component={
                  isSelectAll && (
                    <div className="box-border">
                      <BorderButton
                        name="Select all"
                        isBorder={false}
                        className={"py-2 text-[14px] "}
                      />
                    </div>
                  )
                }
              />
            </div>
            {/* post office */}
            <div className="[&_h1]:text-[15px]  [&_p]:text-[13px] pb-8">
              <PostOfficeTempelate
                svgSize="50px"
                title={"No Suggestions"}
                message={
                  "You are out of follower suggestions. To invite someone you know, use the invite link."
                }
              />
            </div>
          </div>
          <hr />
          {/* buttons */}
          <div className=" flex items-center justify-end gap-2 px-5 py-2 text-sm [&>*]:cursor-pointer select-none">
            <Button
              onClick={() => {
                setOpenModel({ isInvite: true, inviteTo: input?.name });
              }}
              className={` ${"active:bg-blue-700 active:text-[#acc3ff] bg-blue-600"} `}
              name="Preview invite"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default InvitePopup;

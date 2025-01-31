import React, { useEffect, useRef } from "react";
import Heading from "./Heading";
import { GoChevronRight } from "react-icons/go";
import { Link } from "react-router-dom";
import PrivacyListTile from "./util/PrivacyListTile";
import Radio from "../../buttons-fields/Radio";
import {
  useAccessTokenStore,
  useBaseURLStore,
  useIsCorrectPasswordStore,
  useSettingModelStore,
  useUserStore,
} from "../../../../Store/model";
import { toast } from "react-toastify";
import { set } from "react-hook-form";

function Privacy() {
  useEffect(() => {
    document.title = "Privacy Setting";
  });

  const privacy = useUserStore((state) => state.user?.settings?.privacy);

  const setSettingModel = useSettingModelStore(
    (state) => state.setSettingModel
  );

  const diff = useRef({});
  const [isAllowed, setIsAllowed] = React.useReducer(
    (prev, next) => ({ ...prev, ...next }),
    {}
  );

  useEffect(() => {
    if (privacy) {
      setIsAllowed(privacy);
    }
  }, [privacy]);

  const baseURL = useBaseURLStore((state) => state.baseURL);
  const accessToken = useAccessTokenStore((state) => state.accessToken);

  const handleUpdatePrivacy = (key, checked) => {
    fetch(`${baseURL}/user/update-privacy`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify({
        [key]: checked,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.status !== "success") {
          toast.error(data.message);
        }
      });
  };
  const handlePolicyChange = (key, checked) => {
    handleUpdatePrivacy(key, checked);
    setIsAllowed({ [key]: checked });
  };
  const policyList = [
    {
      title: "Allow search engines to index your name",
      link: "/help/safety-and-security",
      isLearnMore: true,
      target: "_blank",
      onChange: (checked) => handlePolicyChange("isIndexable", checked),
      checked: isAllowed?.["isIndexable"],
    },
    {
      title: "Allow adult content in recommendations",
      link: "/help/privacy",
      isLearnMore: true,
      target: "_blank",
      onChange: (checked) => handlePolicyChange("isAdultContent", checked),
      checked: isAllowed?.["isAdultContent"],
    },
    {
      title: "Allow your profile to be discovered by email",
      onChange: (checked) => handlePolicyChange("isEmailDiscoverable", checked),
      checked: isAllowed?.["isEmailDiscoverable"],
    },
    {
      title: "Allow large language models to be trained on your content",
      link: "/help/llm",
      isLearnMore: true,
      target: "_blank",
      onChange: (checked) => handlePolicyChange("isLLM", checked),
      checked: isAllowed?.["isLLM"],
    },
  ];

  const whoSendMessagesList = [
    {
      title: "Anyone on Quora",
      value: "anyone",
    },
    {
      title: "People I follow and admins and moderators of Spaces I follow",
      value: "followed",
    },
    {
      title: "No one",
      value: "none",
    },
  ];
  const contentList = [
    {
      title: "Allow GIFs to play automatically",
      onChange: (checked) => handlePolicyChange("isGifAutoPlay", checked),
      checked: isAllowed?.["isGifAutoPlay"],
    },
    {
      title: "Allow advertisers on Quora to promote your answers",
      link: "/help/advertisers",
      isLearnMore: true,
      target: "_blank",
      onChange: (checked) =>
        handlePolicyChange("isAllowedToPromoteAnswers", checked),
      checked: isAllowed?.["isAllowedToPromoteAnswers"],
    },
    {
      title: "Notify your subscribers of your new questions",
      onChange: (checked) =>
        handlePolicyChange("isNotifySubscribersOfNewQuestions", checked),
      checked: isAllowed?.["isNotifySubscribersOfNewQuestions"],
    },
  ];

  const accountList = [
    {
      title: "Deactivate Account in All Languages",
      onClick: () =>
        setSettingModel(
          "deactivate account in all languages 1st check password"
        ),
    },
    {
      title: "Delete Account",
      onClick: () => setSettingModel("delete account 1st check password"),
    },
  ];

  const isCorrectPassword = useIsCorrectPasswordStore(
    (state) => state.isCorrectPassword
  );

  return (
    <div className="[&>div]:border [&>div]:rounded-lg [&>div]:mb-2">
      {/* Privacy Settings */}
      <div>
        <Heading
          className={"px-4 py-2"}
          heading={"Privacy Settings"}
          isHr={false}
        />
        <hr />
        <Link to="/about/privacy">
          <div className="text-[15px] flex items-center justify-between px-4 py-2 text-[var(--text-dark)]">
            <span>Privacy Policy</span>
            <GoChevronRight size={20} />
          </div>
        </Link>
        <hr />
        {policyList.map((item, index) => (
          <div key={item?.title}>
            <PrivacyListTile
              onChange={item?.onChange}
              checked={item?.checked}
              title={item?.title}
              isLearnMore={item?.isLearnMore}
              link={item?.link}
              target={item?.target}
            />
            <hr />
          </div>
        ))}
      </div>
      {/* Inbox Preferences */}
      <div>
        <Heading
          heading={"Inbox Preferences"}
          className={"px-4 py-2"}
          isHr={false}
        />
        <hr />
        <p className="text-[15px] px-4 pt-4 mb-1 font-medium text-[var(--text-dark)]">
          Who can send you messages?
        </p>
        {whoSendMessagesList.map((item, index) => (
          <Radio
            key={item?.title}
            name={"whoSendMessage"}
            title={item?.title}
            onChange={() => {
              handleUpdatePrivacy("whoSendMessage", item?.value);
              setIsAllowed({
                whoSendMessage: item?.value,
              });
            }}
            checked={item?.value === isAllowed?.["whoSendMessage"]}
            style={{ fontWeight: "normal" }}
            className={"py-1 px-4"}
          />
        ))}
      </div>

      {/* Comment Preferences */}
      <div>
        <Heading
          heading={"Comment Preferences"}
          className={"px-4 py-2"}
          isHr={false}
        />
        <hr />
        <PrivacyListTile
          onChange={(checked) => {
            handleUpdatePrivacy("isAllowedToComment", checked);
            setIsAllowed({ ["isAllowedToComment"]: checked });
          }}
          checked={isAllowed?.["isAllowedToComment"]}
          title={"Allow people to comment on your answers and posts"}
        />
      </div>

      {/* Content Preferences */}
      <div>
        <Heading
          heading={"Content Preferences"}
          isHr={false}
          className={"px-4 py-2"}
        />
        <hr />
        {contentList.map((item, index) => (
          <div key={item?.title}>
            <PrivacyListTile
              onChange={item?.onChange}
              checked={item?.checked}
              title={item?.title}
              isLearnMore={item?.isLearnMore}
              link={item?.link}
              target={item?.target}
            />
            <hr />
          </div>
        ))}
      </div>

      {/* Delete or Deactivate Your Account */}
      <div>
        <Heading
          heading={"Delete or Deactivate Your Account"}
          isHr={false}
          className={"px-4 py-2"}
        />
        <hr />
        {accountList.map((item, index) => (
          <div key={item?.title}>
            <p
              onClick={item?.onClick}
              className="text-[15px] text-[#B92B27] px-4 py-2 cursor-pointer"
            >
              {item?.title}
            </p>
            <hr />
          </div>
        ))}
      </div>

      <br />
    </div>
  );
}

export default Privacy;

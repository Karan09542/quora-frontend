import React, { useEffect, useReducer } from "react";
import Heading from "./Heading";
import PrivacyListTile from "./util/PrivacyListTile";
import Radio from "../../buttons-fields/Radio";
import { toast } from "react-toastify";
import {
  useAccessTokenStore,
  useBaseURLStore,
  useSettingModelStore,
} from "../../../../Store/model";

function EmailAndNotification() {
  const baseURL = useBaseURLStore((state) => state.baseURL);
  const accessToken = useAccessTokenStore((state) => state.accessToken);
  const setSettingModel = useSettingModelStore(
    (state) => state.setSettingModel
  );

  const [isAllowed, setIsAllowed] = useReducer(
    (prev, next) => ({ ...prev, ...next }),
    {}
  );

  useEffect(() => {
    if (!accessToken) return;
    fetch(`${baseURL}/preference/notification`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.status === "success") {
          console.log(data?.notification);
          setIsAllowed(data?.notification);
        } else {
          toast.error(data.message);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, [accessToken]);

  // Handle change
  const updateNotificationPreferences = (key, checked) => {
    fetch(`${baseURL}/preference/notification/update`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify({ preferences: { [key]: checked } }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.status === "success") {
          setIsAllowed({ [key]: checked });
        } else {
          toast.error(data.message);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const handleChange = (key, checked) => {
    updateNotificationPreferences(key, checked);
  };

  const generalQandAList = [
    {
      title: "New answers",
      subtitle:
        "Email me when there are new answers to questions I asked or follow.",
      onChange: (checked) => handleChange("isEmailOnNewAnswers", checked),
      checked: isAllowed.isEmailOnNewAnswers,
    },
    {
      title: "Requests",
      subtitle: "Email me when someone requests me to answer a question.",
      onChange: (checked) =>
        handleChange("isEmailOnSomeoneRequestsToAnswer", checked),
      checked: isAllowed.isEmailOnSomeoneRequestsToAnswer,
    },
  ];
  const messagesList = [
    {
      title: "Messages",
      subtitle: "Email me when someone sends me a direct message.",
      onChange: (checked) => handleChange("isMessages", checked),
      checked: isAllowed.isMessages,
    },
    {
      title: "Comments and replies",
      subtitle:
        "Email me of comments on my content and replies to my comments.",
      onChange: (checked) => handleChange("isCommentsAndReplies", checked),
      checked: isAllowed.isCommentsAndReplies,
    },
    {
      title: "Menstions",
      subtitle: "Email me when someone mentions me.",
      onChange: (checked) => handleChange("isMentions", checked),
      checked: isAllowed.isMentions,
    },
  ];
  const spacesList = [
    {
      title: "Space invites",
      subtitle:
        "Email me when someone invites me or accepts my invitation to a Space.",
      onChange: (checked) => handleChange("isSpaceInvites", checked),
      checked: isAllowed.isSpaceInvites,
    },
    {
      title: "Space updates",
      subtitle: "Email me when there are feature updates to my Space.",
      onChange: (checked) => handleChange("isSpaceUpdates", checked),
      checked: isAllowed.isSpaceUpdates,
    },
    {
      title: "Spaces for you",
      subtitle: "Email me about Spaces I might like.",
      onChange: (checked) => handleChange("isMightLike", checked),
      checked: isAllowed.isMightLike,
    },
  ];
  const digestFrequncyList = [
    {
      title: "As available",
      subtitle: "Top stories as they become available.",
      name: "digestFrequncy",
      onChange: (checked) => handleChange("digestFrequency", "asAvailable"),
      checked: isAllowed.digestFrequency === "asAvailable",
    },
    {
      title: "Daily",
      subtitle: "Up to one digest every day, based on UTC.",
      name: "digestFrequncy",
      onChange: (checked) => handleChange("digestFrequency", "daily"),
      checked: isAllowed.digestFrequency === "daily",
    },
    {
      title: "Weekly",
      subtitle: "Exactly 1 digest per week.",
      name: "digestFrequncy",
      onChange: (checked) => handleChange("digestFrequency", "weekly"),
      checked: isAllowed.digestFrequency === "weekly",
    },
  ];
  const thingsMightLikeList = [
    {
      title: "Popular answers",
      subtitle: "Email me with answers and shares upvoted by people I follow.",
      onChange: (checked) => handleChange("isEmailOnAnswersAndShares", checked),
      checked: isAllowed.isEmailOnAnswersAndShares,
    },
    {
      title: "Stories based on my activity",
      subtitle: "Email me with more stories related to things I read.",
      onChange: (checked) => handleChange("isEmailOnStories", checked),
      checked: isAllowed.isEmailOnStories,
    },
    {
      title: "Recommended questions",
      subtitle: "Email me with questions for me to answer.",
      onChange: (checked) =>
        handleChange("isEmailRecommendedQuestions", checked),
      checked: isAllowed.isEmailRecommendedQuestions,
    },
  ];
  return (
    <div>
      {/* section 1 - Content Channels */}
      <Heading heading="Content Channels" />
      <div className="[&>div]:border [&>div]:rounded-lg [&>div]:mb-2 mt-2 mb-10">
        {/* general questions & answers */}
        <div>
          <Heading
            heading="General questions & answers"
            className={"px-4 py-2"}
            isHr={false}
          />
          <hr />
          {generalQandAList.map((item, index) => (
            <div key={item?.title}>
              <PrivacyListTile {...item} />
              <hr />
            </div>
          ))}
        </div>
        {/* Messages, comments & mentions */}
        <div>
          <Heading
            heading="Messages, comments & mentions"
            className={"px-4 py-2"}
            isHr={false}
          />
          <hr />
          {messagesList.map((item, index) => (
            <div key={item?.title}>
              <PrivacyListTile {...item} />
              <hr />
            </div>
          ))}
        </div>
        {/* Spaces */}
        <div>
          <Heading
            heading="Spaces"
            subheading={"Vasuki's and For maths & science"}
            className={"px-4 py-2"}
            isHr={false}
          />
          <hr />
          {spacesList.map((item, index) => (
            <div key={item?.title}>
              <PrivacyListTile {...item} />
              <hr />
            </div>
          ))}
          {/* manage */}
          <div className="flex items-center">
            <PrivacyListTile
              title="Spaces you follow"
              subtitle="Email me with updates from spaces I follow at my preferred frequency."
              isSwitch={false}
            />
            <div className="px-4 text-right grow">
              <button
                onClick={() => setSettingModel("Spaces you follow")}
                className="px-5 py-[0.4688rem]  border rounded-full text-[#2E69FF] border-[#2E69FF] hover:bg-[#EBF0FF] font-medium text-[14px] "
              >
                Manage
              </button>
            </div>
          </div>
          <hr />
        </div>
        {/* Your network */}
        <div>
          <Heading
            heading="Your network"
            className={"px-4 py-2"}
            isHr={false}
          />
          <hr />
          <PrivacyListTile
            title={"New followers"}
            subtitle={"Email me of new followers."}
            onChange={(checked) =>
              handleChange("isEmailOnNewFollowers", checked)
            }
            checked={isAllowed.isEmailOnNewFollowers}
          />
          <hr />
          {/* manage */}
          <div className="flex items-center">
            <PrivacyListTile
              title="People you follow"
              subtitle="Manage notifications from people that I follow."
              isSwitch={false}
            />
            <div className="px-4 text-right grow">
              <button
                onClick={() => setSettingModel("People you follow")}
                className="px-5 py-[0.4688rem] border rounded-full text-[#2E69FF] border-[#2E69FF] hover:bg-[#EBF0FF] font-medium text-[14px] "
              >
                Manage
              </button>
            </div>
          </div>
          <hr />
        </div>
      </div>

      {/* section 2 - Activity on Your Content */}
      <Heading heading="Activity on Your Content" />
      <div className="[&>div]:border [&>div]:rounded-lg [&>div]:mb-2 mt-2 mb-10">
        {/* upvotes */}
        <div>
          <Heading heading="Upvotes" className={"px-4 py-2"} isHr={false} />
          <hr />
          <PrivacyListTile
            title="Upvotes"
            subtitle={"Email me when someone upvotes my content."}
            onChange={(checked) => handleChange("isEmailOnUpvotes", checked)}
            checked={isAllowed.isEmailOnUpvotes}
          />
          <hr />
        </div>
        {/* shares */}
        <div>
          <Heading heading="Shares" className={"px-4 py-2"} isHr={false} />
          <hr />
          <PrivacyListTile
            title="Shares of my content"
            subtitle={"Email me when someone shares any of my content."}
            onChange={(checked) =>
              handleChange("isEmailOnSharesMyContent", checked)
            }
            checked={isAllowed.isEmailOnSharesMyContent}
          />
          <hr />
        </div>
        {/* Moderation */}
        <div>
          <Heading heading="Moderation" className={"px-4 py-2"} isHr={false} />
          <hr />
          <PrivacyListTile
            title="My answers"
            subtitle={
              "Email me when moderation actions are taken on my answers."
            }
            onChange={(checked) =>
              handleChange("isEmailOnModerationMyAnswers", checked)
            }
            checked={isAllowed.isEmailOnModerationMyAnswers}
          />
          <hr />
        </div>
      </div>

      {/* section 3 - From Quora */}
      <Heading heading="From Quora" />
      <div className="[&>div]:border [&>div]:rounded-lg [&>div]:mb-2 mt-2 mb-10">
        {/* Quora Digest */}
        <div>
          <Heading
            heading="Quora Digest"
            className={"px-4 py-2"}
            isHr={false}
          />
          <hr />
          <PrivacyListTile
            title="Quora Digest"
            subtitle={"Email me with the top stories on Quora."}
            onChange={(checked) => handleChange("isEmailOnTopStories", checked)}
            checked={isAllowed.isEmailOnTopStories}
          />
          <hr />
          {/* Digest frequency */}
          {isAllowed.isEmailOnTopStories && (
            <div>
              <Heading
                heading={"Digest frequency:"}
                className={"px-4 mt-4 mb-1 [&>h1]:font-normal "}
                isHr={false}
              />
              <div className="mb-4">
                {digestFrequncyList.map((item) => (
                  <Radio
                    key={item.title}
                    className={
                      "px-4 [&_h3]:font-normal [&_p]:text-[12px] mb-2  "
                    }
                    {...item}
                  />
                ))}
              </div>
            </div>
          )}
          {isAllowed.isEmailOnTopStories && <hr />}
        </div>
        {/* Things you might like */}
        <div>
          <Heading
            heading="Things you might like"
            className={"px-4 py-2"}
            isHr={false}
          />
          <hr />
          {thingsMightLikeList.map((item) => (
            <div key={item.title}>
              <PrivacyListTile {...item} />
              <hr />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default EmailAndNotification;

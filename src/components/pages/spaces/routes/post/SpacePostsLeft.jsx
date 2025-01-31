import React from "react";

import Heading from "../../../setting/Heading";
import SpaceSettingTile from "../../utils/SpaceSettingTile";
import IconButton from "../../../../buttons-fields/IconButton";

// svg
import Invite from "../../../../../assets/space/invite.svg?react";
import People from "../../../../../assets/people.svg?react";
import Watch from "../../../../../assets/space/watch.svg?react";
import Setting from "../../../../../assets/space/setting.svg?react";
import Log from "../../../../../assets/log.svg?react";

import Inbox from "../../../../../assets/inbox.svg?react";
import ZigZagArrow from "../../../../../assets/space/zigZagArrow.svg?react";

import { useUserStore } from "../../../../../../Store/model";
import DownArrowButton from "../../../../buttons-fields/DownArrowButton";
import PostOfficeTempelate from "../../../profile/util/PostOfficeTempelate";
import Tippy from "@tippyjs/react";
import { hideAll } from "tippy.js";
import TippyPopup from "../../../../comp_util/tippy/TippyPopup";
import { generateColorVariations } from "../../../../../utils/fn_utils";

function SpacePostsLeft({ color, spaceName }) {
  const user = useUserStore((state) => state.user);

  const settingList = [
    {
      title: "Add your first piece of content",
      leftButtonName: "Create Post",
      rightButtonName: "View suggestions",
    },
    {
      title: "Invite people to follow your Space",
      subtitle:
        "Followers see Space content in their feeds and receive notifications from the Space.",
      leftButtonName: "Invite people",
    },
    {
      title: "Share your Space to feed",
      subtitle:
        "Post a link about your Space. People who follow you will see the link in their feed.",
      leftButtonName: "Share your Space",
    },
  ];
  const colors = generateColorVariations(color);

  const dashboardFooterList = [
    {
      icon: Invite,
      name: "Invite",
      onClick: () => {},
    },
    {
      icon: People,
      name: "People",
      onClick: () => {},
    },
    {
      icon: Watch,
      name: "Queue",
      onClick: () => {},
    },
    {
      icon: Setting,
      name: "Settings",
      onClick: () => {},
    },
    {
      icon: Log,
      name: "Admin log",
      onClick: () => {},
    },
  ];

  const [isMostRecent, setIsMostRecent] = React.useState("Top");
  const topTooltipOptions = [
    {
      name: "Top",
      isCheck: true,
      onClick: () => {
        hideAll();
      },
    },
    {
      name: "Recent",
      isCheck: true,
      onClick: () => {
        hideAll();
      },
    },
  ];
  return (
    <div className="min-h-[756px]">
      {/* dashboard */}
      <div className="[&>div]:border [&>div]:rounded-lg [&>div]:mb-2">
        {/* admin dashboard */}
        <div>
          {/* intro */}
          <Heading
            className={"px-4 py-2"}
            heading={"Admin dashboard"}
            isHr={false}
          />
          <hr />
          {/* space setting */}
          <div className="px-4">
            {/* setting heading */}
            <Heading
              className={`[&>h1]:text-[${color}] py-1.5`}
              heading={"Continue setting up your space"}
              isHr={false}
            />
            <hr />
            {/* setting list */}
            <div className=" [&>div>div:first-child]:py-2">
              {settingList?.map((item, index) => (
                <SpaceSettingTile
                  key={item?.title}
                  {...item}
                  colors={colors}
                  isHr={index !== settingList?.length - 1}
                />
              ))}
            </div>
          </div>
          <hr />
          {/* dashboard footer */}
          <div className="flex gap-1 p-1">
            {/* dashboard footer list */}
            {dashboardFooterList?.map((item, index) => (
              <IconButton
                key={item?.name}
                className={
                  "max-w-[129px] w-full hover:bg-[#00000008] rounded-lg flex justify-center py-1"
                }
                Icon={item?.icon}
                name={item?.name}
                strokeWidth={
                  index === dashboardFooterList?.length - 1 ? 0.1 : ""
                }
              />
            ))}
          </div>
        </div>
        {/* post input  */}
        <div className="px-4 py-1.5 flex items-center gap-2">
          <img
            src={user?.profilePicture}
            alt="user profile image"
            className="w-10 h-10 rounded-full"
          />
          <div className="bg-[#F7F7F8] cursor-text text-[var(--text-color-93)] text-[14px] px-4 py-2 rounded-lg grow">
            Post in {spaceName}...
          </div>
          <DownArrowButton
            hoverColor={"hover:bg-[#00000008]"}
            LeftIcon={Inbox}
            name="Inbox"
            isRight={false}
            className={"[&>span]:text-[var(--text-gen-color)]"}
            isBorder={false}
          />
        </div>
      </div>

      <Tippy
        trigger="click"
        content={
          <TippyPopup
            isMostRecent={isMostRecent}
            setIsMostRecent={setIsMostRecent}
            popupOptions={topTooltipOptions}
          />
        }
        placement="bottom"
        className={`[&>div]:p-0 [&>:nth-child(2)]:drop-shadow-[0_0px_0px_rgba(0,0,0,0.9)] [&>:nth-child(2)]:text-white} `}
        interactive={true}
      >
        <div className="w-fit">
          <DownArrowButton
            LeftIcon={ZigZagArrow}
            name={"Top"}
            letfIconSize={20}
            isBorder={false}
            hoverColor={"hover:bg-[#00000008]"}
            className={"text-[var(--text-gen-color)] [&>span]:text-[13px]"}
            style={{ padding: "0.3rem 0.5rem" }}
          />
        </div>
      </Tippy>

      <PostOfficeTempelate
        title={"No stories"}
        className={"[&>h1]:text-[18px] mt-1"}
        message={"There are no stories in this Space yet."}
      />
    </div>
  );
}
export default SpacePostsLeft;

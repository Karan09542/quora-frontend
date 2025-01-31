import React from "react";
// left
import yellow from "../../../assets/spaceImage/yellow.webp";
import red from "../../../assets/spaceImage/red.webp";
import purple from "../../../assets/spaceImage/purple.webp";
import blue from "../../../assets/spaceImage/blue.webp";
import green from "../../../assets/spaceImage/green.webp";
import black from "../../../assets/spaceImage/black.webp";
import { getColorForString } from "../../../utils/getColorFromString";
import { useParams } from "react-router-dom";

// right
import ThreeDots from "../../../assets/iconPopup/threeDots.svg?react";
import NotifyOff from "../../../assets/notifyOff.svg?react";
import Shield from "../../../assets/space/shield.svg?react";
import Invite from "../../../assets/space/invite.svg?react";
import IconCircle from "../profile/util/IconCircle";
import DownArrowButton from "../../buttons-fields/DownArrowButton";
import Tippy from "@tippyjs/react";
import { hideAll } from "tippy.js";
import "tippy.js/dist/tippy.css";

import TippyPopup from "../../comp_util/tippy/TippyPopup";
// share
import { MdOutlineFacebook } from "react-icons/md";
import { AiOutlineTwitter } from "react-icons/ai";
import Link from "../../../assets/link.svg?react";
import { toast } from "react-toastify";
import { generateGeometricIllustrationSrc } from "../../../utils/stringToImage";
function SpaceHeader() {
  const params = useParams();
  const spaceImage = {
    yellow,
    red,
    purple,
    blue,
    green,
    black,
  };

  const rightLeftList = [
    {
      svg: ThreeDots,
      tippyTitle: "More",
      isDouble: true,
      tippyContent: [
        {
          name: "Share",
          onClick: () => {
            setIsShare(true);
          },
        },
        { name: "Edit your credential" },
        { name: `Leave ${params?.spaceName}` },
      ],
      tippyContent1: [
        {
          onClick: () => {
            window.open("https://www.facebook.com/", "_blank");
          },
          name: "facebook",
          svg: <MdOutlineFacebook size={16} color="#1877f2" />,
        },
        {
          onClick: () => {
            window.open("https://twitter.com/", "_blank");
          },
          name: "twitter",
          svg: <AiOutlineTwitter size={16} color="#1da1f2" />,
        },
        {
          onClick: () => {
            toast.success("Link copied to clipboard");
            navigator.clipboard.writeText(window.location.href);
          },
          name: "Copy link",
          svg: <Link style={{ strokeWidth: 0.4 }} />,
        },
      ],
    },
    {
      svg: NotifyOff,
      tippyTitle: "Manage notifications",
    },
  ];
  const rightRightList = [
    {
      LeftIcon: Shield,
      name: "Admin",
      tippyContent: [{ name: `Leave ${params?.spaceName}` }],
    },
    {
      LeftIcon: Invite,
      name: "Invite",
      isRight: false,
      tippyContent: [
        {
          name: "Follower",
          subTitle:
            "Followers see Space content in their feeds and receive notifs from the Space",
        },
        { name: "Contributor", subTitle: "Contributors can add content" },
        {
          name: "Moderator",
          subTitle: "Moderators can manage submissions and content",
        },
        {
          name: "Admin",
          subTitle: "Admins can manage submissions, content, and settings",
        },
      ],
    },
  ];
  const [isMore, setIsMore] = React.useState(false);
  const [isShare, setIsShare] = React.useState(false);
  return (
    <div className="h-[350px] w-full relative">
      {/* background blur */}
      <div
        style={{
          backgroundImage: `url(${generateGeometricIllustrationSrc(
            params?.spaceName || ""
          )})`,
        }}
        className="h-full bg-no-repeat bg-cover blur-md"
      ></div>
      {/*  */}
      <div className="absolute top-0 flex justify-center w-full ">
        <div className="max-w-[1104px] w-full ">
          {/* background */}
          <div
            style={{
              backgroundImage: `url(${generateGeometricIllustrationSrc(
                params?.spaceName || ""
              )})`,
            }}
            className="h-[207px]  rounded-b-lg bg-red-500 bg-no-repeat bg-cover bg-[center] relative mb-9"
          >
            <img
              src={spaceImage?.[getColorForString(params?.spaceName || "")]}
              alt=""
              className="w-[120px] h-[120px] rounded-[30%] absolute -bottom-8 left-5 "
            />
          </div>
          {/* content */}
          <div className="mx-5 text-white [&>div>h1]:text-[27px] [&>div>p]:text-[13px] flex justify-between">
            {/* left */}
            <div>
              {/* Vasuki's */}
              <h1 className="font-bold ">{params?.spaceName}</h1>
              <p className="">Happy Dipawali 🪔 0rnsh</p>
              <p className="text-[#FFFFFFBF] leading-8">1 Contributor</p>
            </div>
            {/* right */}
            <div className="flex gap-1.5 mt-4 [&_svg>*]:stroke-white items-center">
              {/* three dots & notification */}
              {rightLeftList?.map((item, index) => (
                <Tippy
                  onShow={(e) => {
                    hideAll({ exclude: e });
                    setIsMore(false);
                    setIsShare(false);
                  }}
                  hideOnClick={item?.isDouble ? false : true}
                  onClickOutside={(e) => {
                    if (item?.isDouble) {
                      e.hide();
                      setIsMore(false);
                      setIsShare(false);
                    }
                  }}
                  key={item?.tippyTitle}
                  content={
                    item?.isDouble ? (
                      !isMore ? (
                        item?.tippyTitle
                      ) : (
                        <TippyPopup
                          popupOptions={
                            isShare ? item?.tippyContent1 : item?.tippyContent
                          }
                        />
                      )
                    ) : (
                      item?.tippyTitle
                    )
                  }
                  delay={[0, item?.isDouble ? (isMore ? 100000 : 0) : 0]}
                  className={`[&>div]:p-0 ${
                    isMore && item?.isDouble
                      ? "[&>:nth-child(2)]:drop-shadow-[0_0px_0px_rgba(0,0,0,0.9)] [&>:nth-child(2)]:text-white"
                      : "px-3 py-2"
                  }`}
                  interactive={item?.isDouble ? true : false}
                >
                  <div
                    onClick={() => {
                      setIsMore(!isMore);
                      if (isShare) {
                        setIsShare(false);
                      }
                    }}
                  >
                    <IconCircle
                      hoverColor={"hover:bg-[#f7f7f733]"}
                      isBorder={false}
                      Icon={item?.svg}
                      className={"!p-2"}
                      iconSize={24}
                    />
                  </div>
                </Tippy>
              ))}
              {/* Admin & Invite */}
              {rightRightList?.map((item, index) => (
                <Tippy
                  trigger="click"
                  key={item?.name}
                  content={
                    <TippyPopup
                      popupOptions={item?.tippyContent}
                      maxWidth={230}
                    />
                  }
                  interactive={true}
                  placement="left"
                  className="[&>div]:p-0 [&>:nth-child(2)]:drop-shadow-[0_0px_0px_rgba(0,0,0,0.9)] [&>:nth-child(2)]:text-white"
                >
                  <div>
                    <DownArrowButton
                      LeftIcon={item?.LeftIcon}
                      name={item?.name}
                      isRight={item?.isRight}
                    />
                  </div>
                </Tippy>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SpaceHeader;

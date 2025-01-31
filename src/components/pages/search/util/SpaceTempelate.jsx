import React from "react";
import yellow from "../../../../assets/spaceImage/yellow.webp";
import red from "../../../../assets/spaceImage/red.webp";
import purple from "../../../../assets/spaceImage/purple.webp";
import blue from "../../../../assets/spaceImage/blue.webp";
import green from "../../../../assets/spaceImage/green.webp";
import black from "../../../../assets/spaceImage/black.webp";
import { getColorForString } from "../../../../utils/getColorFromString";
import Tippy from "@tippyjs/react";
import FollowButton from "../../../buttons-fields/FollowButton";
import ThreeDots from "../../../../assets/iconPopup/threeDots.svg?react";
import SpaceShare from "../../../../assets/spaceImage/spaceShare.svg?react";
import { hideAll } from "tippy.js";

import { MdOutlineFacebook } from "react-icons/md";
import { AiOutlineTwitter } from "react-icons/ai";
import LinkSvg from "../../../../assets/link.svg?react";
import { useOpenModelStore } from "../../../../../Store/model";
function SpaceTempelate({ isHr = true, space = "हर हर महादेव" }) {
  const setOpenModel = useOpenModelStore((state) => state.setOpenModel);
  const spaceImage = {
    yellow,
    red,
    purple,
    blue,
    green,
    black,
  };

  const shearingOptions = [
    {
      svg: <MdOutlineFacebook color="#1877f2" size={16} />,
      name: "Facebook",
    },
    {
      svg: <AiOutlineTwitter color="#1da1f2" size={16} />,
      name: "Twitter",
    },
    {
      name: "WhatsApp",
    },
    {
      svg: <LinkSvg className={"w-[18px] h-[18px]"} />,
      name: "Copy Link",
    },
  ];
  const moreOptions = [
    {
      onClick: () => {},
      name: `Mute ${space}`,
    },
    {
      onClick: () => {
        setOpenModel("report");
      },
      name: "Report",
    },
  ];
  const Popup = ({ popupOptions }) => (
    <div
      className={`bg-white text-[13px] border nav-shadow rounded text-black ${`[&>div]:px-5 text-[0.8rem] text-gray-600 [&>div]:gap-1 [&>div]:leading-9 rounded child-flex [&>div>span]:cursor-pointer hover:[&>div>span]:underline [&>:first-child]:rounded-t-md [&>:last-child]:rounded-b-md hover:[&>div]:bg-gray-100`}`}
    >
      {popupOptions?.map((item, index) => (
        <div
          onClick={() => {
            setIsMore(!isMore);
            item?.onClick();
            hideAll();
          }}
          key={item?.name}
        >
          {item?.svg}
          <span>{item?.name}</span>
        </div>
      ))}
    </div>
  );
  const [isMore, setIsMore] = React.useState({ one: false, two: false });
  const SpacePopup = () => (
    <div className="max-w-[250px] min-w-[250px] bg-white rounded-lg">
      {/* banner */}
      <div
        className={`bg-[url(https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQyk3mULwdweVfn2DMQ_Bd7KoBY6WG7vfq2_w&s)] bg-no-repeat bg-cover h-6 rounded-t-lg `}
      ></div>
      {/* space logo */}
      <div className="flex px-4 -mt-1 max-h-[116px] min-h-[116px]">
        <img
          src={spaceImage?.[getColorForString("राम")]}
          alt="space logo"
          className="w-12 h-12 border-2 border-white rounded-2xl"
        />
        <div className="p-3">
          <h3 className="text-[18px] hover:underline font-bold text-[var(--text-dark)]">
            ShivRAJ
          </h3>
          <p className="text-[#636466]">राम राम सारे भाई ने</p>
        </div>
      </div>
      <hr />
      <div className="flex items-center justify-between px-2 py-1.5">
        <FollowButton
          className={
            "[&>div]:border-none hover:[&>div]:bg-[#00000008] active:[&>div]:opacity-80"
          }
        />
        <div className="[&>div]:p-1 hover:[&>div]:bg-[#00000008] [&>div]:rounded-full [&>div>svg]:w-5 [&>div>svg]:h-5 flex ">
          {/* shearing options */}
          <Tippy
            content={
              isMore.one ? (
                <Popup popupOptions={shearingOptions} />
              ) : (
                "Shearing Options"
              )
            }
            interactive={true}
            className={` ${isMore.one ? "bg-white [&>div]:p-0" : ""}`}
            offset={[isMore ? 0 : -30, 10]}
            onClickOutside={() =>
              setIsMore((prev) => ({ ...prev, one: false }))
            }
            delay={[0, isMore.one ? 10000000 : 100]}
          >
            <div
              onClick={() => setIsMore((prev) => ({ ...prev, one: !prev.one }))}
            >
              <SpaceShare />
            </div>
          </Tippy>
          {/* More */}
          <Tippy
            content={isMore.two ? <Popup popupOptions={moreOptions} /> : "More"}
            className={` ${isMore.two ? "bg-white [&>div]:p-0" : ""}`}
            offset={[-3, 10]}
            onClickOutside={() =>
              setIsMore((prev) => ({ ...prev, two: false }))
            }
            interactive={true}
            delay={[0, isMore.two ? 10000000 : 100]}
          >
            <div
              onClick={() => setIsMore((prev) => ({ ...prev, two: !prev.two }))}
            >
              <ThreeDots />
            </div>
          </Tippy>
        </div>
      </div>
    </div>
  );
  return (
    <div>
      <div className="flex gap-2 px-4 py-2 cursor-pointer">
        <Tippy
          onShow={(e) => {
            hideAll({ exclude: e });
          }}
          className="[&>:first-child]:p-0 bg-white"
          content={<SpacePopup />}
          arrow={false}
          interactive={true}
          placement="bottom"
          // delay={[0, 10000000]}
        >
          <img
            src={spaceImage?.[getColorForString(space)]}
            alt="space logo"
            className="w-10 h-10 rounded-xl"
          />
        </Tippy>

        <div>
          <h3 className="text-[15px] font-medium text-[var(--text-dark)] [&_~p]:text-[13px]">
            {space}
          </h3>
          <p className="text-[var(--text-color-93)]">1 follower</p>
          <p className="text-[var(--text-dark)]">राम राम सारे भाई ने</p>
        </div>
      </div>
      {isHr && <hr />}
    </div>
  );
}

export default SpaceTempelate;

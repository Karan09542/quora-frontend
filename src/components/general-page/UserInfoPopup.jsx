import React, { useEffect } from "react";
import ThreeDots from "../../assets/iconPopup/threeDots.svg?react";
import Employment from "../../assets/iconPopup/employment.svg?react";
import Education from "../../assets/iconPopup/education.svg?react";
import Location from "../../assets/iconPopup/location.svg?react";
import Joined from "../../assets/iconPopup/joined.svg?react";
import PeoplePlus from "../../assets/iconPopup/peoplePlus.svg?react";
import Notify from "../../assets/notify.svg?react";
import Ask from "../../assets/ask.svg?react";
import PeopleCheck from "../../assets/iconPopup/PeopleCheck.svg?react";
import Shield from "../../assets/space/shield.svg?react";
import Tippy from "@tippyjs/react";
import { hideAll } from "tippy.js";
import { formatNumber } from "../../utils/formateNumber";
import {
  useAccessTokenStore,
  useBaseURLStore,
  useOpenModelStore,
  useUnderlineToStore,
} from "../../../Store/model";
import { handleFollowing } from "../../utils/handlerFetch";
import UserDefaultImage from "../../assets/user.png";
import useHighlight from "../../hooks/useHighlight";
import { Link } from "react-router-dom";
import {
  dateDecorator,
  decorateUsername,
  getCredential,
} from "../../utils/fn_utils";

import { formatText } from "../../utils/fn_utils";
import UserInfoHand from "./UserInfoHand";
function UserInfoPopup({
  isShowUserName = false,
  user,
  isFollowing,
  setIsFollowing,
  totalFollowers,
  staticIsFollowing,
  imgSize = 40,
  query,
  // for right hand
  isRightHand,
  isOwnContent,
  isCross,
  setHide,
  isSpace = false,
}) {
  const setUnderlineTo = useUnderlineToStore((state) => state.setUnderlineTo);
  const setOpenModel = useOpenModelStore((state) => state.setOpenModel);
  const followingRef = React.useRef(null);

  const baseURL = useBaseURLStore((state) => state.baseURL);
  const accessToken = useAccessTokenStore((state) => state.accessToken);

  // const
  const userDetails = [
    {
      svg: Employment,
      title: getCredential(user?.credentials, "employment"),
    },
    {
      svg: Education,
      title: getCredential(user?.credentials, "education"),
    },
    {
      svg: Location,
      title: getCredential(user?.credentials, "location"),
    },
    {
      svg: Joined,
      title: user?.createdAt,
    },
  ];
  const threeDotMenu = [
    {
      name: "Message",
    },
    {
      name: "Mute user",
    },
    {
      name: "Block",
    },
    {
      onClick: () => setOpenModel("report"),
      name: "Report",
    },
  ];
  useEffect(() => {
    const spans = followingRef?.current?.children;
    if (isFollowing && spans?.length > 0) {
      spans[0].style.top = "-36px";
      spans[1].style.top = "0";
    } else if (!isFollowing && spans?.length > 0) {
      spans[0].style.top = "0";
      spans[1].style.top = "36px";
    }
  }, [isFollowing]);
  const [isMore, setIsMore] = React.useState(false);

  const UserDetailPopup = ({ user }) => (
    <div
      onPointerLeave={() => {
        setIsMore(false);
        hideAll();
      }}
      className="w-[420px] bg-white border nav-shadow rounded-lg [&>:not(hr)]:px-2  pt-2 text-black"
    >
      <div className="flex items-center gap-x-3">
        <Link
          to={`/profile/${decorateUsername(user?.username)}`}
          target="_blank"
        >
          <img
            src={user?.profilePicture || UserDefaultImage}
            alt="POST user profile"
            className={`object-cover rounded-full w-12 h-12 cursor-pointer hover:brightness-90`}
          />
        </Link>
        <div className="flex flex-col">
          <h1 className="text-lg font-bold leading-5 capitalize">
            {user?.username}
          </h1>
          <p className="text-[15px]">{user?.credentials?.profile}</p>
        </div>
      </div>
      {/* user details */}
      {userDetails.map(
        (detail, index) =>
          detail?.title && (
            <div
              key={detail?.title}
              className="flex items-start my-2 text-[15px] text-gray-700 cursor-pointer gap-x-2"
            >
              <detail.svg className="p-[0.2rem] [&>*]:stroke-gray-700 bg-gray-100 rounded-full" />
              <p className="w-full ">
                {index != userDetails.length - 1
                  ? detail?.title?.trim()
                  : "Joined " + dateDecorator(detail?.title)}
              </p>
            </div>
          )
      )}
      {/* buttons */}
      <hr />
      <div className="flex max-h-[44px] items-center justify-between px-1 py-1.5 child-flex [&_svg]:p-[0.15rem] [&_svg]:w-8 ram text-[13px] [&>div:not(:last-child)]:px-2">
        {/* follow */}
        <div
          className=""
          onClick={() => {
            setIsFollowing(!isFollowing);
            handleFollowing(user?._id, baseURL, accessToken);
          }}
        >
          {!isFollowing ? (
            <PeoplePlus className={` [&>*>path]:stroke-blue-600`} />
          ) : (
            <PeopleCheck className={` animate-[ubhar_0.1s_ease-in-out]`} />
          )}

          <div className="w-full overflow-hidden dot-after">
            {
              <span
                onClick={() => {
                  if (user?.isOwnProfile) return;
                  setIsFollowing(!isFollowing);
                  handleFollowing(user._id, baseURL, accessToken);
                }}
                className={`font-semibold  ${
                  isFollowing ? "text-[#636466]" : "text-blue-500"
                }`}
              >
                {isFollowing ? "Following" : "Follow"}
              </span>
            }
            {/* swaping follower number */}
            <span
              ref={followingRef}
              className={`relative h-[36px] text-center overflow-hidden ${
                !isFollowing
                  ? "text-blue-500 [&>:nth-child(2)]:top-[36px] [&>:nth-child(1)]:top-0"
                  : "text-[#636466] [&>:nth-child(2)]:top-0 [&>:nth-child(1)]:-top-[36px]"
              }  [&>span]:absolute [&>*]:transition-all`}
            >
              <span>
                {Math.max(
                  0,
                  formatNumber(
                    Number(totalFollowers) + (staticIsFollowing ? -1 : 0)
                  )
                )}
              </span>
              <span>
                {Math.max(
                  0,
                  formatNumber(
                    Number(totalFollowers) + (staticIsFollowing ? 0 : 1)
                  )
                )}
              </span>
            </span>
          </div>
        </div>
        {/* notify */}
        <div>
          <Notify className={`[&>*>path]:stroke-blue-600`} />
          <span>Notify me</span>
        </div>
        {/* ask */}
        <div
          onClick={() => {
            setOpenModel("create post");
            setUnderlineTo("add question");
          }}
        >
          <Ask />
          <span>Ask question</span>
        </div>
        {/* more */}
        <Tippy
          content={isMore ? <MorePopup /> : "More"}
          className={`${
            isMore
              ? "[&>:nth-child(1)]:p-0 bg-transparent [&>*:nth-child(2)]:text-white [&>*:nth-child(2)]:drop-shadow-[0_0px_0px_rgba(0,0,0,0.8)] [&>*:nth-child(2)]:z-10"
              : ""
          } `}
          interactive={isMore ? true : false}
          interactiveBorder={10}
          placement="top"
        >
          <div onClick={() => setIsMore(!isMore)} className="w-8 aspect-square">
            <ThreeDots />
          </div>
        </Tippy>
      </div>
    </div>
  );
  const MorePopup = () => {
    return (
      <div
        className={`bg-white border nav-shadow rounded text-black ${`[&>div]:px-5 p-0 text-[0.8rem] text-gray-600 [&>div]:gap-2 [&>div]:leading-9 rounded child-flex [&>div>span]:cursor-pointer hover:[&>div>span]:underline [&>:first-child]:rounded-t-md [&>:last-child]:rounded-b-md hover:[&>div]:bg-gray-100`}`}
      >
        {threeDotMenu?.map((item, index) => (
          <div
            onClick={() => {
              setIsMore(!isMore);
              hideAll();
              item?.onClick();
            }}
            key={item?.name}
          >
            <span>{item?.name}</span>
          </div>
        ))}
      </div>
    );
  };

  const highlightRef = React.useRef(null);

  useHighlight({ query, highlightRef });

  function getUsernameWithTippy(
    username,
    color = "#195FAA",
    isDisabled = false
  ) {
    return (
      <Tippy
        onShow={(e) => hideAll({ exclude: e })}
        className=" [&>:nth-child(1)]:p-0 bg-transparent "
        interactive={true}
        placement="auto"
        arrow={false}
        content={<UserDetailPopup user={user} />}
        delay={[100, 100000000]}
        // onShow={(e) => (e.props.delay = [0, 100000])}
        onClickOutside={() => {
          setIsMore(false);
        }}
        disabled={isDisabled}
      >
        <Link
          to={`/profile/${decorateUsername(user?.username)}`}
          target="_blank"
        >
          <b
            ref={highlightRef}
            className="text-[#195FAA] text-[15px] cursor-pointer"
            style={{ color }}
          >
            {username || user?.username}
          </b>
        </Link>
      </Tippy>
    );
  }

  return (
    <div className="flex items-center w-full gap-x-2">
      {/* {(!user?.isOwnProfile || !isOwnContent) && (
       
      )} */}
      {user?.isOwnProfile || isOwnContent ? (
        <div
          // w-10 h-10
          className="aspect-square"
          style={{ width: imgSize, height: imgSize }}
        >
          <Link
            to={`/profile/${decorateUsername(user?.username)}`}
            target="_blank"
          >
            <img
              src={user?.profilePicture || UserDefaultImage}
              alt="POST user profile"
              className="object-cover rounded-full cursor-pointer hover:brightness-90"
              style={{ aspectRatio: "1/1", width: imgSize, height: imgSize }}
            />
          </Link>
        </div>
      ) : (
        <Tippy
          onShow={(e) => hideAll({ exclude: e })}
          className=" [&>:nth-child(1)]:p-0 bg-transparent "
          interactive={true}
          placement="auto"
          arrow={false}
          content={<UserDetailPopup user={user} />}
          delay={[100, 100000000]}
          // onShow={(e) => (e.props.delay = [0, 100000])}
          onClickOutside={() => {
            setIsMore(false);
          }}
        >
          <div
            // w-10 h-10
            className="aspect-square"
            style={{ width: imgSize, height: imgSize }}
          >
            <Link
              to={`/profile/${decorateUsername(user?.username)}`}
              target="_blank"
            >
              <img
                src={user?.profilePicture || UserDefaultImage}
                alt="POST user profile"
                className="object-cover rounded-full cursor-pointer hover:brightness-90"
                style={{ aspectRatio: "1/1", width: imgSize, height: imgSize }}
              />
            </Link>
          </div>
        </Tippy>
      )}
      {isShowUserName && !isRightHand && (
        <div>
          <div className={`${isSpace ? "flex" : ""}`}>
            {getUsernameWithTippy(
              user?.username,
              "",
              user?.isOwnProfile || isOwnContent ? true : false
            )}
            {user?.credentials?.employment && !isSpace ? (
              <span className="text-[13px]">
                {` ${formatText(
                  user?.credentials?.employment?.position,
                  user?.credentials?.employment?.company,
                  ", "
                )}`}
              </span>
            ) : null}
            {isSpace && (
              <div className="flex items-center">
                {user?.isAdmin && (
                  <Tippy content="Admin">
                    <div>
                      <Shield className="w-4 h-4 [&>path]:stroke-[2px]" />
                    </div>
                  </Tippy>
                )}
                <p>, {user?.credentials?.profile}</p>
              </div>
            )}
          </div>
        </div>
      )}
      {isRightHand && (
        <UserInfoHand
          username={getUsernameWithTippy(
            user?.username,
            "var(--text-dark)",
            user?.isOwnProfile || isOwnContent ? true : false
          )}
          isOwnContent={isOwnContent}
          createdById={user?._id}
          setIsFollowing={setIsFollowing}
          isFollowing={isFollowing}
          // see further
          isCross={isCross}
          setHide={setHide}
        />
      )}
    </div>
  );
}

export default UserInfoPopup;

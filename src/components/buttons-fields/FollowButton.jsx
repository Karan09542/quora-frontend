import React, { useEffect } from "react";
import PeoplePlus from "../../assets/iconPopup/peoplePlus.svg?react";
import PeopleCheck from "../../assets/iconPopup/peopleCheck.svg?react";
import { formatNumber } from "../../utils/formateNumber";
import { useAccessTokenStore, useBaseURLStore } from "../../../Store/model";
import { handleFollowing } from "../../utils/handlerFetch";
import { toast } from "react-toastify";

function FollowButton({
  staticIsFollowing,
  isFollowing,
  setIsFollowing,
  user,
  className,
  isLogin,
}) {
  const followingContainerRef = React.useRef(null);
  const followingRef = React.useRef(null);

  useEffect(() => {
    if (followingContainerRef.current && followingRef.current) {
      const index = isFollowing ? 1 : 0;
      followingContainerRef.current.style.width =
        followingContainerRef.current.clientWidth +
        followingRef.current.children[index].clientWidth +
        7 +
        "px";
    }
    return () => {
      if (followingContainerRef.current && followingRef.current) {
        followingContainerRef.current.style.width = "auto";
      }
    };
  }, [isFollowing]);

  const baseURL = useBaseURLStore((state) => state.baseURL);
  const accessToken = useAccessTokenStore((state) => state.accessToken);

  useEffect(() => {
    const spans = followingRef?.current?.children;
    if (spans?.length < 1) return;
    if (isFollowing) {
      spans[0].style.top = "-36px";
      spans[1].style.top = "0";
    } else if (!isFollowing) {
      spans[0].style.top = "0";
      spans[1].style.top = "36px";
    }
  }, [isFollowing]);

  // const handleFollowNumAnimation

  return (
    <div
      onClick={(e) => {
        e.preventDefault();
        if (user?.isOwnProfile) return;
        setIsFollowing(!isFollowing);
        handleFollowing(user?._id, baseURL, accessToken);
      }}
      className={` flex max-h-[44px] items-center justify-between child-flex [&_svg]:p-[0.15rem] text-[13px] ${className} `}
    >
      <div
        className={`px-1.5 py-0.5 ${
          user?.isOwnProfile || !isLogin ? "opacity-50" : "cursor-pointer"
        } select-none  rounded-full ${
          !isFollowing
            ? "hover:bg-[#ebf0ff] border border-[#2e69ff]"
            : "bg-[#e0e2e3] border border-[#c7c9ca]"
        }`}
      >
        {!isFollowing ? (
          <PeoplePlus className={` [&>*>path]:stroke-blue-600`} />
        ) : (
          <PeopleCheck className={`animate-[ubhar_0.1s_ease-in-out]`} />
        )}

        <div ref={followingContainerRef} className="overflow-hidden">
          <span
            className={`font-semibold  ${
              isFollowing ? "text-[#636466]" : "text-blue-500"
            }`}
          >
            {isFollowing ? "Following" : "Follow"}
          </span>

          {/* swaping follower number */}
          <span
            ref={followingRef}
            className={`relative pl-1 pr-2 h-[36px] text-center ${
              !isFollowing ? "text-blue-500 " : "text-[#636466] "
            }  [&>span]:absolute [&>*]:transition-all`}
          >
            <span>
              {formatNumber(
                Number(user?.totalFollowers) + (staticIsFollowing ? -1 : 0)
              )}
            </span>
            <span>
              {formatNumber(
                Number(user?.totalFollowers) + (staticIsFollowing ? 0 : 1)
              )}
            </span>
          </span>
        </div>
      </div>
    </div>
  );
}

export default FollowButton;

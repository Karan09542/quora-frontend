import React from "react";
import { RxCross2 } from "react-icons/rx";
import { handleFollowing } from "../../utils/handlerFetch";
import { Link } from "react-router-dom";
import { useAccessTokenStore, useBaseURLStore } from "../../../Store/model";

function UserInfoHand({
  username,
  isOwnContent,
  createdById,

  isFollowing,
  setIsFollowing,

  isCross,
  setHide,
}) {
  const baseURL = useBaseURLStore((state) => state.baseURL);
  const accessToken = useAccessTokenStore((state) => state.accessToken);

  return (
    <div className="flex items-center justify-between grow">
      <div>
        <p className="[&>span]:text-[0.8125rem] [&>span]:cursor-pointer flex gap-x-1">
          <span
            className={`capitalize ${!isOwnContent ? "dot-after-direct" : ""}`}
          >
            {username}
          </span>
          {!isOwnContent && (
            <span
              onClick={() => {
                setIsFollowing(!isFollowing);
                handleFollowing(createdById, baseURL, accessToken);
              }}
              className={`font-semibold ${
                isFollowing ? "text-[#939598]" : "text-blue-500"
              } hover:underline`}
            >
              {isFollowing ? "Following" : "Follow"}
            </span>
          )}
        </p>
        <p className="text-gray-500 text-[0.8125rem] first-letter:capitalize">
          <span className="dot-after-direct">what you do</span>{" "}
          <Link>
            <span className="hover:underline" id="more">
              10mo
            </span>
          </Link>
        </p>
      </div>
      {isCross && (
        <div
          onClick={() => setHide(true)}
          className="self-start p-2.5 active:opacity-80 hover:bg-gray-100 rounded-full cursor-pointer"
        >
          <RxCross2 className="text-xl text-gray-500" />
        </div>
      )}
    </div>
  );
}

export default UserInfoHand;

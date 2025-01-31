import React, { useEffect } from "react";
import PeoplePlus from "../../../../assets/iconPopup/peoplePlus.svg?react";
import PeopleCheck from "../../../../assets/iconPopup/peopleCheck.svg?react";

function FollowingButton({
  staticIsFollowing,
  isFollowing = staticIsFollowing,
  onClick,
}) {
  return (
    <div
      onClick={onClick}
      role="button"
      className={`border box-border  border-[#2E69FF] rounded-full px-2.5 py-1 w-fit ${
        isFollowing ? "hover:bg-[#EBF0FF]" : "bg-[#2E69FF]"
      }`}
    >
      <div className="flex items-center gap-1 select-none">
        <div className="[&>svg]:w-5 [&>svg]:h-5">
          {isFollowing ? (
            <PeopleCheck className="[&>g>:nth-child(1)]:fill-[#2E69FF] [&>g>:nth-child(2)]:stroke-[#2E69FF]" />
          ) : (
            <PeoplePlus className={`[&>g>*]:stroke-white`} />
          )}
        </div>
        <div
          className={`${
            isFollowing ? "text-[#2E69FF]" : "text-white"
          } text-[13px] font-semibold`}
        >
          {isFollowing ? "Following" : "Follow"}
        </div>
      </div>
    </div>
  );
}

export default FollowingButton;

import React from "react";
import DefaultUserImage from "../../../../assets/user.png";
import FollowButton from "../../../buttons-fields/FollowButton";
import UserInfoPopup from "../../../general-page/UserInfoPopup";
import { Link } from "react-router-dom";
import { decorateUsername } from "../../../../utils/fn_utils";
import Heading from "../../setting/Heading";
function FollowerTempelate({
  _id,
  username,
  totalFollowers,
  profilePicture,
  isFollowing,
  credentials,
  isHr = true,
  isOwnProfile,
  createdAt,
  isLogin,
}) {
  const [isFollowingg, setIsFollowingg] = React.useState(isFollowing);
  return (
    <div>
      <div className="flex items-center justify-between px-4 py-3">
        {/* left */}
        <div className="flex items-center gap-x-2">
          {/* user image */}
          <div>
            {!isOwnProfile && (
              <UserInfoPopup
                staticIsFollowing={isFollowing}
                isFollowing={isFollowingg}
                setIsFollowing={setIsFollowingg}
                imgSize={32}
                totalFollowers={totalFollowers}
                user={{
                  isOwnProfile,
                  _id,
                  username,
                  profilePicture,
                  credentials,
                  createdAt,
                }}
              />
            )}
            {isOwnProfile && (
              <Link
                to={`/profile/${decorateUsername(username)}`}
                target="_blank"
              >
                <img
                  src={profilePicture || DefaultUserImage}
                  alt="user profile image"
                  className="object-cover w-8 h-8 rounded-full cursor-pointer hover:brightness-90"
                />
              </Link>
            )}
          </div>
          {/* user name and follower count */}
          <div className="">
            <h3 className="text-[15px] font-bold text-[var(--text-dark)] capitalize">
              {username}
            </h3>
            <p className="text-[13px] text-[var(--text-color-93)] ">
              {totalFollowers} follower
            </p>
          </div>
        </div>
        {/* right */}
        <FollowButton
          staticIsFollowing={isFollowing}
          isFollowing={isFollowingg}
          setIsFollowing={setIsFollowingg}
          user={{ isOwnProfile, totalFollowers, _id }}
          isLogin={isLogin}
        />
      </div>
      {isHr && (
        <div className="px-4 -mt-1">
          <hr />
        </div>
      )}
    </div>
  );
}

export default FollowerTempelate;

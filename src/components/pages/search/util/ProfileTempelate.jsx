import React from "react";
import FollowButton from "../../../buttons-fields/FollowButton";
import UserDefaultImage from "../../../../assets/user.png";
import UserInfoPopup from "../../../general-page/UserInfoPopup";
import useHighlight from "../../../../hooks/useHighlight";
import { useNavigate } from "react-router-dom";
import { formatText } from "../../../../utils/fn_utils";

function ProfileTempelate({ user, query, showFollowButton = true }) {
  const [isFollowing, setIsFollowing] = React.useState(user?.isFollowing);
  const highlightRef = React.useRef(null);

  useHighlight({ query, highlightRef });

  const navigate = useNavigate();
  return (
    <div>
      <div className="flex items-center justify-between px-4 gap-2 [&>div]:p-0 [&>div]:py-2">
        <div
          className={`flex items-center ${user?.isOwnProfile ? "gap-2" : ""}`}
        >
          {!user?.isOwnProfile ? (
            <UserInfoPopup
              user={user}
              isFollowing={isFollowing}
              setIsFollowing={setIsFollowing}
              staticIsFollowing={user?.isFollowing}
              totalFollowers={user?.totalFollowers}
              imgSize={32}
              query={query}
              isShowUserName={true}
            />
          ) : (
            <>
              <img
                onClick={() => navigate(`/profile/${user?.username}`)}
                src={user?.profilePicture || UserDefaultImage}
                alt="user profile image"
                className={`self-start object-cover rounded-full w-8 h-8 cursor-pointer hover:brightness-90 aspect-square`}
              />
              <div className="">
                {user?.isOwnProfile && (
                  <b
                    onClick={() => navigate(`/profile/${user?.username}`)}
                    ref={highlightRef}
                    className="text-[#195FAA] text-[15px] "
                  >
                    {user?.username}
                  </b>
                )}
                {user?.credentials?.employment &&
                  Object?.keys(user?.credentials?.employment).length > 0 && (
                    <span className="text-[13px]">
                      {` ${formatText(
                        user?.credentials?.employment?.position,
                        user?.credentials?.employment?.company,
                        ", "
                      )}`}
                    </span>
                  )}
              </div>
            </>
          )}
          {/* handle search bh type profile */}
        </div>
        {showFollowButton && (
          <FollowButton
            staticIsFollowing={user?.isFollowing}
            isFollowing={isFollowing}
            setIsFollowing={setIsFollowing}
            user={user}
            isLogin={true}
          />
        )}
      </div>
      <hr />
    </div>
  );
}

export default ProfileTempelate;

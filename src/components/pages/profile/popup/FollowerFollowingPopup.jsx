import React, { useEffect } from "react";
import outSideClose from "../../../../hooks/outSideClose";
import {
  useAccessTokenStore,
  useBaseURLStore,
  useIsFollowingStore,
  useIsLoginStore,
  useOpenModelStore,
  useProfileUserStore,
} from "../../../../../Store/model";
import CrossButton from "../../../buttons-fields/CrossButton";
import DefaultUserImage from "../../../../assets/user.png";
import { formatNumber } from "../../../../utils/formateNumber";
import FollowerTempelate from "../util/FollowerTempelate";
import FollowingTempelate from "../util/FollowingTempelate";
import UserInfoPopup from "../../../general-page/UserInfoPopup";
import { Link } from "react-router-dom";
import { decorateUsername } from "../../../../utils/fn_utils";
import PostOfficeTempelate from "../util/PostOfficeTempelate";
import Heading from "../../setting/Heading";
import useGetFollowData from "../util/useGetFollowData";

function FollowerFollowingPopup() {
  const profileUser = useProfileUserStore((state) => state.profileUser);
  const isFollowing = useIsFollowingStore((state) => state.isFollowing);
  const setIsFollowing = useIsFollowingStore((state) => state.setIsFollowing);
  const openModel = useOpenModelStore((state) => state.openModel);
  // prevent scroll
  useEffect(() => {
    setIsFollowing(profileUser?.isFollowing);
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, []);

  // out side close
  const outToCloseRef = React.useRef();
  const setOpenModel = useOpenModelStore((state) => state.setOpenModel);
  outSideClose({ setState: setOpenModel, ref: outToCloseRef, arg: null });

  // menu
  const followingMenu = [
    {
      name: `${formatNumber(profileUser?.totalFollowers)} Followers`,
      type: "followers",
    },
    {
      name: `${formatNumber(profileUser?.totalFollowing)} Following`,
      type: "followings",
    },
  ];

  // underline

  const [underlineTo, setUnderlineTo] = React.useState("followers");
  useEffect(() => {
    setUnderlineTo(openModel);
  }, []);

  // fetch
  const [followResults, setFollowResults] = React.useState([]);
  const baseURL = useBaseURLStore((state) => state.baseURL);
  const isLogin = useIsLoginStore((state) => state.isLogin);

  useGetFollowData({
    baseURL,
    profileUserId: profileUser?._id,
    underlineTo,
    setFollowResults,
  });
  // useEffect(() => {
  //   setFollowResults([]);
  //   fetch(`${baseURL}/user/${underlineTo}`, {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json",
  //       Authorization: `Bearer ${accessToken}`,
  //     },
  //     body: JSON.stringify({
  //       _id: profileUser?._id,
  //     }),
  //   })
  //     .then((res) => res.json())
  //     .then((data) => {
  //       if (data.status === "success") {
  //         setFollowResults(data?.[underlineTo]);
  //       }
  //     })
  //     .catch((error) => console.log(error));
  // }, [underlineTo]);
  console.log({ profileUser });
  return (
    <div className="fixed top-0 z-20 w-full h-screen bg-[#242424E6]/85">
      <div
        ref={outToCloseRef}
        className="origin-center animate-[fadeIn_0.3s_ease-in-out] absolute w-full max-w-[658px] mx-auto -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2 item px-5 "
      >
        <div className="bg-white rounded-lg">
          {/* Header */}
          <div className="flex items-center px-2 pt-3 text-gray-600 child-flex">
            {/* cross button */}
            <CrossButton
              onClick={() => {
                setOpenModel(null);
              }}
              size={36}
            />
            {/* image and name */}
            <div className="[&>:first-child]:w-auto">
              {!profileUser?.isOwnProfile ? (
                <UserInfoPopup
                  user={profileUser}
                  imgSize={24}
                  staticIsFollowing={profileUser?.isFollowing}
                  isFollowing={isFollowing}
                  setIsFollowing={setIsFollowing}
                  totalFollowers={profileUser?.totalFollowers}
                />
              ) : (
                <Link
                  to={`/profile/${decorateUsername(profileUser?.username)}`}
                  target="_blank"
                >
                  <img
                    src={profileUser?.profilePicture || DefaultUserImage}
                    className="w-6 h-6 rounded-full cursor-pointer aspect-square active:brightness-90"
                  />
                </Link>
              )}

              <p className="ml-1.5 capitalize text-[15px] text-[var(--text-dark)]">
                {profileUser?.username}
              </p>
            </div>
          </div>
          {/* menu - follower following  */}
          <div className={`flex gap-x-1 text-[13px] mt-2.5 px-4`}>
            {followingMenu?.map((menu) => (
              <button
                key={menu?.name}
                onClick={() => setUnderlineTo(menu?.type)}
                className={`relative font-medium  capitalize px-2 py-4 ${
                  underlineTo === menu?.type
                    ? "text-[#B92B27] bottom-border"
                    : "text-[var(--text-color-93)] hover:bg-[#00000008]"
                }`}
              >
                {menu?.name}
              </button>
            ))}
          </div>
          <hr />

          {/* follower following section */}
          <div className="min-h-[258px]">
            {underlineTo === `followers` && (
              <div>
                {followResults?.length > 0 &&
                  followResults?.map((follower) => (
                    <FollowerTempelate
                      key={follower?._id}
                      {...follower}
                      isLogin={isLogin}
                    />
                  ))}
                {followResults?.length === 0 && (
                  <div className="px-4 pt-4">
                    <Heading heading={"0 Followers"} />
                    <PostOfficeTempelate
                      message={"username isn't following anyone yet."}
                    />
                  </div>
                )}
              </div>
            )}
            {underlineTo === `followings` && (
              <div>
                {/* if have following */}
                {followResults?.length > 0 &&
                  followResults?.map((following) => (
                    <FollowingTempelate
                      key={following?._id}
                      following={following}
                      isLogin={isLogin}
                    />
                  ))}
                {/* if no following */}
                {followResults?.length === 0 && (
                  <PostOfficeTempelate
                    message={"username isn't following anyone yet."}
                  />
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default FollowerFollowingPopup;

import React, { Suspense, useEffect } from "react";
import UserDefaultImage from "../../../assets/user.png";
import EditPen from "../../../assets/profile/editPen.svg?react";
import SpaceShare from "../../../assets/spaceImage/spaceShare.svg?react";
import SmallText from "./util/SmallText";
import Heading from "../setting/Heading";
import { MdKeyboardArrowDown } from "react-icons/md";
import IconCircle from "./util/IconCircle";
import {
  useAccessTokenStore,
  useBaseURLStore,
  useInputValueStore,
  useIsFollowingStore,
  useOpenModelStore,
  useReportStore,
  useUserStore,
} from "../../../../Store/model";
import Tippy from "@tippyjs/react";
import { MdOutlineFacebook } from "react-icons/md";
import { AiOutlineTwitter } from "react-icons/ai";
import FollowingButton from "./util/FollowingButton";
import NotifyButton from "./util/NotifyButton";
import AskButton from "./util/AskButton";
import ThreeDots from "../../../assets/iconPopup/threeDots.svg?react";
import { hideAll } from "tippy.js";
import DiscriptionInput from "./util/DiscriptionInput";
import {
  decorateUsername,
  handleDraftToHtml,
  handleDraftToText,
} from "../../../utils/fn_utils";
import {
  commonMethodAndHeaders,
  handleFollowing,
} from "../../../utils/handlerFetch";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import ImageInputOption from "../../general-page/ImageInputOption";
import InputField from "../../buttons-fields/InputField";
import { toast } from "react-toastify";
import outSideClose from "../../../hooks/outSideClose";
import TippyPopup from "../../comp_util/tippy/TippyPopup";
import Menu from "../../comp_util/Menu";
import Loading from "../../comp_util/Loading";

const LazyProfileRight = React.lazy(() => import("./ProfileRight"));
function ProfileLeft({
  profileUser,
  setProfileUser,
  responsive,
  responsive_width,
}) {
  const pathMenu = [
    {
      name: `profile`,
      navigate: `/profile/${decorateUsername(profileUser?.username)}`,
    },
    {
      name: `${profileUser?.totalAnswers} answer`,
      navigate: "answers",
    },
    {
      name: `${profileUser?.totalQuestions} questions`,
      navigate: "questions",
    },
    {
      name: `${profileUser?.totalPosts} posts`,
      navigate: "posts",
    },
    {
      name: `${profileUser?.totalFollowers} followers`,
      navigate: "followers",
    },
    {
      name: `${profileUser?.totalFollowing} following`,
      navigate: "following",
    },
    {
      name: "edits",
      navigate: "log",
    },
    {
      name: "activity",
      navigate: "activity",
    },
  ];
  // for heading we take key(item.navigate) and value(item.name)
  const menu = pathMenu.reduce((acc, item) => {
    if (item.name !== "profile") {
      acc[item.navigate] = item.name;
    } else {
      acc[`/profile/${decorateUsername(profileUser?.username)}`] = item.name;
    }
    return acc;
  }, {});

  const location = useLocation();

  let currentPath = decodeURIComponent(location?.pathname?.split("/")?.pop());
  if (currentPath === decorateUsername(profileUser?.username)) {
    currentPath = `/profile/${decorateUsername(profileUser?.username)}`;
  }

  const setReport = useReportStore((state) => state.setReport);

  const sharePopupList = [
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
  ];
  const morePopupList = [
    {
      onClick: () => {},
      name: `Mute user`,
    },
    {
      onClick: () => {},
      name: `Block`,
    },
    {
      onClick: () => {
        setReport({
          reportedContent: profileUser?._id,
          contentType: "user",
        });
        setOpenModel("report");
      },
      name: `Report`,
      isMore: true,
    },
  ];
  const mostRecentList = [
    {
      onClick: () => {},
      name: "Most recent",
      isCheck: true,
    },
    {
      onClick: () => {},
      name: "All-time views",
      isCheck: true,
    },
  ];

  // for tippypopup
  const [isMore, setIsMore] = React.useState(false);
  const [isMostRecent, setIsMostRecent] = React.useState("Most recent");

  const setOpenModel = useOpenModelStore((state) => state.setOpenModel);
  const baseURL = useBaseURLStore((state) => state.baseURL);
  const accessToken = useAccessTokenStore((state) => state.accessToken);

  const isFollowing = useIsFollowingStore((state) => state.isFollowing);
  const setIsFollowing = useIsFollowingStore((state) => state.setIsFollowing);
  useEffect(() => {
    setIsFollowing(profileUser?.isFollowing);
  }, []);

  const handleFollowNumber = (totalNumber) => {
    let totalNum = Number(totalNumber);
    if (profileUser?.isFollowing) {
      totalNum =
        isFollowing ?? profileUser?.isFollowing ? totalNum : totalNum - 1;
    }
    if (!profileUser?.isFollowing) {
      totalNum =
        isFollowing ?? profileUser?.isFollowing ? totalNum + 1 : totalNum;
    }
    return totalNum;
  };

  const setInputValue = useInputValueStore((state) => state.setInputValue);

  // description
  const [isShowMore, setIsShowMore] = React.useState({});
  useEffect(() => {
    setIsShowMore(handleDraftToText(profileUser?.credentials?.description));
  }, [profileUser?.credentials?.description]);

  // editor
  const [isOpen, setIsOpen] = React.useState(false);
  const [isImageInput, setIsImageInput] = React.useState(false);
  const [isImageUrlInput, setIsImageUrlInput] = React.useState(false);
  const [imageUrl, setImageUrl] = React.useState(null);
  const imageInputRef = React.useRef(null);
  outSideClose({ setState: setIsImageInput, ref: imageInputRef, arg: false });
  outSideClose({
    setState: setIsImageUrlInput,
    ref: imageInputRef,
    arg: false,
  });
  useEffect(() => {
    if (!isImageInput || !isImageUrlInput) {
      setImageUrl(null);
    }
  }, [isImageInput, isImageUrlInput]);
  const handleImageUpload = (isUrl, e) => {
    let image;
    if (!isUrl) {
      image = e.target.files[0];
    } else {
      image = imageUrl;
    }
    if (!isUrl) return;
    if (/^\s*$/.test(image) || !image) {
      toast.error(isUrl ? "Please add an image." : "Please select an image.");
      return;
    }
    fetch(`${baseURL}/user/upload-profile-picture`, {
      ...commonMethodAndHeaders(accessToken),
      body: JSON.stringify({
        profilePicture: image,
        profileId: profileUser?._id,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.status === "fail") {
          toast.error(data.message);
        } else {
          setProfileUser({ ...profileUser, profilePicture: imageUrl });
        }
      })
      .catch((error) => console.log(error))
      .finally(() => {
        setIsImageInput(false);
        setIsImageUrlInput(false);
      });
  };

  const userId = useUserStore((state) => state.user?._id);

  if (!profileUser) return <div className="w-[572px]"></div>;
  return (
    <div
      className={`max-w-[572px] w-full ${
        responsive_width < 552 ? "mt-10" : ""
      }`}
    >
      {/* user left */}
      <div>
        {/* profile */}
        <div className="flex gap-7">
          {/* image */}
          <div className="flex flex-col items-cente gap-y-4">
            <div
              onClick={() => setIsImageInput(!isImageInput)}
              className="group relative select-none w-[120px] h-[120px] [&>div>svg>g>path]:active:stroke-[#c0d2ff] [&>div>svg>g>:last-child]:active:fill-[#c0d2ff] group"
            >
              <img
                src={profileUser?.profilePicture || UserDefaultImage}
                alt="user profile image"
                className="object-cover w-full h-full rounded-full aspect-square "
              />
              {profileUser?.isOwnProfile && (
                <>
                  <div className="group-hover:flex absolute inset-0 m-auto cursor-pointer w-[38px] h-[38px] bg-[#2E69FF] hover:bg-[#1A5AFF] rounded-full [&>svg>g>path]:stroke-white [&>svg>g>:last-child]:fill-white hidden items-center justify-center ">
                    <EditPen />
                  </div>
                  {isImageInput && (
                    <div
                      ref={imageInputRef}
                      onClick={(e) => e.stopPropagation()}
                      className={`absolute inset-0 p-1 m-auto bg-white border rounded-lg  h-fit left-1/2 transition-all ${
                        isImageUrlInput
                          ? "w-[150px] p-2 [&>:first-child]:mb-1"
                          : "w-fit"
                      }`}
                    >
                      <ImageInputOption
                        handleImage={(e) => handleImageUpload(false, e)}
                        setIsImageUrlInput={setIsImageUrlInput}
                      />
                      {isImageUrlInput && (
                        <div className="flex items-center gap-2">
                          <InputField
                            onChange={(e) => setImageUrl(e.target.value)}
                            fieldName={"image url"}
                            value={imageUrl}
                          />
                          <button
                            onClick={() => handleImageUpload(true)}
                            className="bg-[#2E69FF] rounded-sm text-white px-1 py-2 active:bg-[#1A5AFF]"
                          >
                            Ok
                          </button>
                        </div>
                      )}
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
          {/* username */}
          <div className="flex flex-col grow">
            {/* header */}
            <div className="flex items-center justify-between">
              {/* left */}
              <div className="flex items-baseline gap-1 group">
                <h3 className="text-[27px] font-bold capitalize">
                  {profileUser?.username.split("-")[0]}
                </h3>
                {profileUser?.isOwnProfile && (
                  <SmallText
                    text="Edit"
                    onClick={() => setOpenModel("change username")}
                  />
                )}
              </div>
              {/* right Share */}
              <Tippy
                content={<TippyPopup popupOptions={sharePopupList} />}
                placement="bottom"
                trigger="click"
                className="[&>:nth-child(1)]:p-0 bg-transparent [&>:nth-child(2)]:drop-shadow-[0_0px_0px_rgba(0,0,0,0.9)] [&>:nth-child(2)]:text-white [&>:nth-child(2)]:z-10"
                interactive={true}
                offset={[-35, 9]}
              >
                <div>
                  <IconCircle Icon={SpaceShare} />
                </div>
              </Tippy>
            </div>
            {/* add profile credential */}
            <div className="flex items-center gap-1 group w-fit">
              {
                <SmallText
                  onClick={() => {
                    if (profileUser?.credentials?.profile) return;
                    setOpenModel("add profile credential");
                  }}
                  text={
                    profileUser?.credentials?.profile
                      ? profileUser?.credentials?.profile
                      : "Add profile credentials"
                  }
                  isHidden={false}
                  className={`${
                    profileUser?.credentials?.profile
                      ? "text-[18px] text-[var(--text-dark)] hover:no-underline "
                      : ""
                  }`}
                />
              }
              {profileUser?.isOwnProfile &&
                profileUser?.credentials?.profile && (
                  <SmallText
                    text="Edit"
                    onClick={() => {
                      setInputValue(profileUser?.credentials?.profile);
                      setOpenModel("add profile credential");
                    }}
                  />
                )}
            </div>
            {/* follower following */}
            <div className="flex items-center gap-x-1 dot-after text-[13px] text-[var(--text-gen-color)] hover:[&>span]:underline [&>span]:cursor-pointer">
              <span onClick={() => setOpenModel("followers")}>
                {handleFollowNumber(profileUser?.totalFollowers)} follower
              </span>
              <span onClick={() => setOpenModel("followings")}>
                {profileUser?.totalFollowing} following
              </span>
            </div>
            {!profileUser?.isOwnProfile && (
              <div className="flex items-center mt-3 gap-x-2">
                <FollowingButton
                  onClick={() => {
                    handleFollowing(profileUser?._id, baseURL, accessToken);
                    setIsFollowing(!isFollowing);
                  }}
                  isFollowing={isFollowing}
                  setIsFollowing={setIsFollowing}
                  staticIsFollowing={profileUser?.isFollowing}
                />
                <NotifyButton staticIsNotify={false} />
                <AskButton />
                <Tippy
                  content={
                    !isMore ? (
                      "More"
                    ) : (
                      <TippyPopup
                        popupOptions={morePopupList}
                        placement="bottom"
                      />
                    )
                  }
                  className={`[&>:nth-child(1)]:p-0 ${
                    !isMore
                      ? "px-3 py-1.5"
                      : " bg-transparent [&>:nth-child(2)]:drop-shadow-[0_0px_0px_rgba(0,0,0,0.9)] [&>:nth-child(2)]:text-white [&>:nth-child(2)]:z-10"
                  }`}
                  interactive={true}
                  placement={!isMore ? "top" : "bottom"}
                  offset={[0, 9]}
                  delay={[0, isMore ? 100000 : 100]}
                  hideOnClick={false}
                  onClickOutside={() => {
                    hideAll();
                    setIsMore(false);
                  }}
                >
                  <div onClick={() => setIsMore(!isMore)}>
                    <IconCircle Icon={ThreeDots} />
                  </div>
                </Tippy>
              </div>
            )}
          </div>
        </div>
        {/* description */}
        <div className={`w-full group relative ${isOpen ? "mt-8" : "mt-4"}`}>
          {!isOpen && (
            <>
              {profileUser?.credentials?.description && (
                <div className="text-[15px]">
                  {/* text-[var(--text-gen-color)]  */}

                  {isShowMore?.right ? (
                    <div
                      className="mt-1 content"
                      dangerouslySetInnerHTML={{
                        __html: handleDraftToHtml(
                          profileUser?.credentials?.description
                        ),
                      }}
                    />
                  ) : (
                    <div>{isShowMore?.text}</div>
                  )}

                  {!isShowMore?.right && (
                    <span
                      onClick={() => {
                        setIsShowMore({
                          right: true,
                        });
                      }}
                      className="text-[#195FAA] text-[15px] absolute bottom-0  right-0 px-2 py-1 bg-white cursor-pointer  border-white hover:underline before-content-[' '] before:absolute before:w-2 before:h-full before:bg-white before:right-full before:blur-[3px]"
                    >{`(more)`}</span>
                  )}
                </div>
              )}
              {!profileUser?.credentials?.description &&
                profileUser?.isOwnProfile && (
                  <p
                    onClick={() => setIsOpen(true)}
                    className="text-[var(--text-color-93)] hover:underline text-[13px] cursor-pointer"
                  >
                    Write a description about yourself
                  </p>
                )}

              {profileUser?.isOwnProfile &&
                profileUser?.credentials?.description && (
                  <SmallText
                    className={"w-fit"}
                    text="Edit"
                    onClick={() => setIsOpen(true)}
                  />
                )}
            </>
          )}
          {isOpen && (
            <>
              {profileUser?.credentials?.description && (
                <DiscriptionInput
                  setIsOpen={setIsOpen}
                  rawContentState={JSON.parse(
                    profileUser?.credentials?.description
                  )}
                />
              )}
              {!profileUser?.credentials?.description && (
                <DiscriptionInput
                  setIsOpen={setIsOpen}
                  rawContentState={undefined}
                />
              )}
            </>
          )}
        </div>

        {/* responsive profile right */}
        {responsive && (
          <Suspense fallback={<Loading />}>
            <LazyProfileRight
              profileUser={profileUser}
              setProfileUser={setProfileUser}
            />
          </Suspense>
        )}
        {/* menu sections */}
        <Menu pathMenu={pathMenu} currentPath={currentPath} />
        <Heading
          heading={<span className="capitalize">{menu[currentPath]}</span>}
          isHr={false}
          className={"my-2"}
          component={
            <Tippy
              content={
                <TippyPopup
                  popupOptions={mostRecentList}
                  isMostRecent={isMostRecent}
                  setIsMostRecent={setIsMostRecent}
                />
              }
              className={`[&>:nth-child(1)]:p-0 ${" bg-transparent [&>:nth-child(2)]:drop-shadow-[0_0px_0px_rgba(0,0,0,0.9)] [&>:nth-child(2)]:text-white [&>:nth-child(2)]:z-10"}`}
              interactive={true}
              trigger="click"
              placement={"left"}
              offset={[0, 9]}
            >
              <div className="text-[var(--text-gen-color)] relative left-3.5 hover:bg-[#f7f7f7] px-2.5 py-1 rounded-full flex items-center text-[13px] font-medium cursor-pointer">
                <span>{isMostRecent}</span>
                <MdKeyboardArrowDown size={21} />
              </div>
            </Tippy>
          }
        />
        <hr />
        <div className="mt-2">
          <Outlet context={{ profileId: profileUser?._id, userId }} />
        </div>
      </div>
    </div>
  );
}

export default ProfileLeft;

import React, { useEffect, useState } from "react";
import Comment from "../../../assets/comment.svg?react";
import Share from "../../../assets/share.svg?react";
import { IoIosArrowForward } from "react-icons/io";
import { Link, useLocation } from "react-router-dom";

import "tippy.js/dist/tippy.css";
import "tippy.js/animations/scale.css";

import {
  useAccessTokenStore,
  useBaseURLStore,
  useOpenModelStore,
  useReportStore,
  useUserStore,
} from "../../../../Store/model";

import UserInfoPopup from "../../general-page/UserInfoPopup";
import {
  handleFollowing,
  handleQuestionDownvote,
  handleVote,
} from "../../../utils/handlerFetch";
import { decorateQuestion, handleDraftToText } from "../../../utils/fn_utils";
import HomeThreeDotContentPopup from "../util/HomeThreeDotContentPopup";
import ContentShow from "../../comp_util/ContentShow";
import CommentBox from "../../comp_util/comment/CommentBox";
import ArrowFollowButton from "../../buttons-fields/ArrowFollowButton";

function AnswerTile({
  post,
  isCross = true,
  isShowQuestion = true,
  query,
  isLogin,
  isCommentHeading = false,
}) {
  const [voteType, setVoteType] = useState({
    isUpvote: post?.isUpvoted,
    isDownvote: post?.isDownvoted,
  });
  const [isBookmarked, setIsBookmarked] = React.useState(post?.isBookmarked);
  const [isFollowing, setIsFollowing] = useState(post?.isFollowing);

  const [hide, setHide] = useState(false);
  const [more, setMore] = useState(false);
  const [crossItem, setCrossItem] = useState({
    clicked: false,
    title: "",
    description: "",
  });

  const handleFeed = (feed) => {
    switch (feed) {
      case "downvote":
        {
          setVoteType((prev) => ({
            ...prev,
            ["isDownvote"]: !voteType.isDownvote,
            ["isUpvote"]: false,
          }));
          handleVote(post?._id, "handle-downvote", baseURL, accessToken);
          setCrossItem({
            clicked: true,
            title: "You downvoted this item",
            description:
              "Downvoting low-quality content improves Quora for everyone.",
          });
        }
        break;
      case "report":
        {
          setReport({ reportedContent: post?._id });
          setOpenModel("report");
        }
        break;
      case "not interested question":
        {
          setCrossItem({
            clicked: true,
            title: "You've muted this question",
            description: "You won't see this question in your feed anymore.",
          });
        }
        break;
      case "not interested user":
        {
          setCrossItem({
            clicked: true,
            title: `You've muted ${post?.createdBy?.username}`,
            description: "You won't see this person in your feed.",
          });
        }
        break;

      default:
        return;
    }
  };
  const feeds = [
    {
      name: `Not interested in ${post?.createdBy?.username}`,
      onClick: () => handleFeed("not interested user"),
    },
    {
      name: "Not interested in this question",
      onClick: () => handleFeed("not interested question"),
    },
    {
      name: "Downvote answer",
      onClick: () => handleFeed("downvote"),
    },
    {
      name: "Report",
      onClick: () => handleFeed("report"),
    },
  ];

  const setOpenModel = useOpenModelStore((state) => state.setOpenModel);
  const setReport = useReportStore((state) => state.setReport);

  const baseURL = useBaseURLStore((state) => state.baseURL);
  const accessToken = useAccessTokenStore((state) => state.accessToken);

  const [toggleQuestionDownvoted, setToggleQuestionDownvoted] = useState(false);

  const theme = useUserStore((state) => state.user?.settings?.theme);
  const location = useLocation();

  useEffect(() => {
    if (!theme) return;
    if (
      theme === "auto" &&
      window.matchMedia("(prefers-color-scheme: light)").matches
    )
      return;
    if (theme === "light") return;
    const images = document.querySelectorAll("img");
    images.forEach((img) => {
      if (img.getAttribute("alt") === "ads-airbnb") return;
      img.style.filter = "invert(100%) hue-rotate(180deg)";
    });
  }, [theme, location]);

  const [isShowMore, setIsShowMore] = useState(
    handleDraftToText(post?.content)
  );

  const [isToComment, setIsToComment] = useState(false);
  const userId = useUserStore((state) => state.user?._id);
  let shyam = "राम राम";

  return (
    <div>
      {!hide && (
        <div
          onClick={() =>
            setIsShowMore({
              right: true,
            })
          }
          className="[&>:not(:last-child)]:px-3.5 pt-3.5 pb-1 [&>:not(:nth-last-of-type(3))]:cursor-pointer border rounded-lg"
        >
          {/* image + userr details */}
          <div
            onClick={(e) => {
              e.stopPropagation();
            }}
            className="flex items-center gap-x-3"
          >
            <UserInfoPopup
              user={post?.createdBy}
              isFollowing={isFollowing}
              setIsFollowing={setIsFollowing}
              handleFollowing={handleFollowing}
              totalFollowers={post?.totalFollowers}
              staticIsFollowing={post?.isFollowing}
              isRightHand={true}
              isOwnContent={post?.isOwnContent}
              isCross={isCross}
              setHide={setHide}
            />
          </div>
          {/* Content */}
          <div className="px-1 mt-3">
            {isShowQuestion && (
              <Link
                to={
                  isShowMore?.right
                    ? `/${decorateQuestion(post?.questionData?.question)}`
                    : "#"
                }
                target="_blank"
              >
                <h1
                  className={`text-[16px] font-bold ${
                    isShowMore?.right ? "hover:underline" : ""
                  }`}
                >
                  {post?.questionData?.question}
                </h1>
              </Link>
            )}
            <ContentShow
              content={post?.content}
              isShowMore={isShowMore}
              setIsShowMore={setIsShowMore}
              query={query}
            />

            <p className="flex items-center justify-between mt-2 text-[13px] text-[#939598] gap-x-2">
              <span>11 views</span>
              <span>
                {post?.totalAnswers > 1
                  ? `1 of ${post?.totalAnswers}`
                  : post?.totalAnswers}{" "}
                answer
              </span>
            </p>
          </div>
          {/* Votting commenting and sharing System */}

          <div
            onClick={(e) => e.stopPropagation()}
            className="flex items-center mt-3 gap-x-2 [&_svg]:w-[21px]"
          >
            {/* Votting System */}
            <ArrowFollowButton
              post={post}
              isLogin={isLogin}
              voteType={voteType}
              setVoteType={setVoteType}
            />
            {/* Comment share */}
            <div className="flex items-center justify-between grow">
              <div className="flex items-center gap-x-1 child-flex [&>div]:cursor-pointer text-gray-500 hover:[&>div]:bg-gray-100/70 [&>div]:rounded-full [&>div]:px-1.5 text-sm [&>div]:py-1.5 [&>div]:active:opacity-80">
                <div
                  onClick={() => {
                    setIsToComment(!isToComment);
                  }}
                >
                  <Comment className={`p-[0.05rem]`} />{" "}
                  <span>
                    {post?.totalComments === 0 ? "" : post?.totalComments}
                  </span>
                </div>
                <div>
                  <Share className={`p-[0.05rem]`} /> <span>61</span>
                </div>
              </div>
              {/* More */}
              {isLogin && (
                <HomeThreeDotContentPopup
                  answerId={post?._id}
                  questionId={post?.questionId}
                  isBookmarked={isBookmarked}
                  setIsBookmarked={setIsBookmarked}
                  itsOwnQuestion={post?.itsOwnQuestion}
                  isOwnContent={post?.isOwnContent}
                  more={more}
                  setMore={setMore}
                  setHide={setHide}
                  setToggleQuestionDownvoted={setToggleQuestionDownvoted}
                />
              )}
            </div>
          </div>
          <div></div>
          <div>
            <CommentBox
              isToComment={isToComment}
              postId={post?._id}
              baseURL={baseURL}
              userId={userId}
              isHeading={isCommentHeading}
              isInputRounded={true}
              isLogin={isLogin}
            />
          </div>
        </div>
      )}
      {hide && (
        <div className="pt-2 pb-1 [&>div]:px-3.5  bg-white border rounded-lg">
          <div className="flex justify-between items-center first:text-[1.05rem] text-gray-700 first:font-medium">
            {/* Title */}
            <p className="text-[15px] text-[var(--text-dark)]">
              {!crossItem.clicked
                ? "You will see less content like this in your feed."
                : crossItem.title}
            </p>
            {/* Undo */}
            <div
              onClick={() => {
                setHide(false);
                if (toggleQuestionDownvoted) {
                  setToggleQuestionDownvoted(false);
                  handleQuestionDownvote(
                    post?.questionId,
                    baseURL,
                    accessToken
                  );
                }
                if (voteType?.isDownvote) {
                  setVoteType((prev) => ({
                    ...prev,
                    ["isDownvote"]: !voteType.isDownvote,
                    ["isUpvote"]: false,
                  }));
                  handleVote(
                    "post",
                    "postId",
                    post?._id,
                    "handle-downvote",
                    baseURL,
                    accessToken
                  );
                }
                setCrossItem({
                  clicked: false,
                  title: "",
                  description: "",
                });
              }}
              className="self-start px-3.5 py-1 text-[13px] text-gray-500 border rounded-full cursor-pointer hover:bg-gray-100 active:opacity-80"
            >
              Undo
            </div>
          </div>
          {/* Description */}
          {crossItem.clicked ? (
            <div className="text-[13px] pb-3 text-[#636466]">
              {crossItem.description}
            </div>
          ) : (
            ""
          )}

          {/* Options */}
          {!crossItem.clicked && (
            <div className="py-2 [&>div:first-child]:rounded-t [&>div:last-child]:rounded-b [&>div]:-mt-px [&>div]:py-2">
              {feeds.map((feed) => {
                if (feed?.name === "Downvote answer" && post?.isOwnContent)
                  return;
                return (
                  <div
                    onClick={feed?.onClick}
                    key={feed?.name}
                    className="p-[8px] flex items-center justify-between text-[13px] text-gray-500 border font-semibold cursor-pointer hover:bg-gray-100 active:opacity-80"
                  >
                    <span>{feed?.name}</span>
                    <IoIosArrowForward size={18} />
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default AnswerTile;

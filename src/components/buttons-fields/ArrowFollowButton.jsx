import React, { forwardRef, useEffect, useRef } from "react";
import Upvote from "../../assets/upvote.svg?react";
import Downvote from "../../assets/downvote.svg?react";

import { handleVote } from "../../utils/handlerFetch";
import { formatNumber } from "../../utils/formateNumber";
import { useAccessTokenStore, useBaseURLStore } from "../../../Store/model";

const ArrowFollowButton = ({ isLogin, post, voteType, setVoteType }) => {
  const upvoteRef = useRef(null);
  useEffect(() => {
    const spans = upvoteRef?.current?.children;
    if (voteType?.isUpvote && spans?.length > 0) {
      spans[0].style.top = "-1.25rem";
      spans[1].style.top = "0.125rem";
    } else if (!voteType?.isUpvote && spans?.length > 0) {
      spans[0].style.top = "0.125rem";
      spans[1].style.top = "1.25rem";
    }
  }, [voteType?.isDownvote, voteType?.isUpvote]);

  const baseURL = useBaseURLStore((state) => state.baseURL);
  const accessToken = useAccessTokenStore((state) => state.accessToken);
  return (
    <div
      className={` ${
        post?.isOwnContent
          ? "opacity-50"
          : "[&>div]:cursor-pointer [&>div]:active:opacity-80"
      } flex items-center bg-gray-100 border rounded-full w-fit [&>:not(div:empty)]:px-2.5    text-gray-500 select-none`}
    >
      <div
        className={`flex items-center py-0.5 rounded-l-full gap-x-1 ${
          !post?.isOwnContent ? "hover:bg-gray-200" : ""
        }`}
        onClick={() => {
          if (post?.isOwnContent || !isLogin) return;
          setVoteType((prev) => ({
            ...prev,
            ["isDownvote"]: false,
            ["isUpvote"]: !prev?.isUpvote,
          }));

          handleVote(
            "post",
            "postId",
            post?._id,
            "handle-upvote",
            baseURL,
            accessToken
          );
        }}
      >
        <Upvote
          className={`${
            voteType?.isUpvote
              ? "[&>path]:fill-[#2E69FF] animate-[ubhar_0.1s_ease-in] [&>path]:stroke-[#2E69FF]"
              : "[&>path]:stroke-[#2E69FF]"
          }`}
        />
        <p className="flex text-sm dot-after ">
          <span className="font-medium">Upvote</span>{" "}
          <span
            ref={upvoteRef}
            className={`relative h-5 w-4 text-center overflow-hidden ${``}  [&>span]:absolute  [&>span]:transition-all [&>:nth-child(2)]:top-5`}
          >
            <span>
              {Math.max(
                0,
                formatNumber(
                  Number(post?.totalUpvotes || 0) + (post?.isUpvoted ? -1 : 0)
                )
              )}
            </span>
            <span>
              {Math.max(
                0,
                formatNumber(
                  Number(post?.totalUpvotes) + (post?.isUpvoted ? 0 : 1)
                )
              )}
            </span>
          </span>
        </p>
      </div>
      <div className="w-px h-7 !p-0 m-0 bg-gray-300"></div>
      <div
        onClick={() => {
          if (post?.isOwnContent || !isLogin) return;
          setVoteType((prev) => ({
            ...prev,
            ["isDownvote"]: !voteType?.isDownvote,
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
        }}
        className={`rounded-r-full py-0.5 ${
          !post?.isOwnContent ? "hover:bg-gray-200" : ""
        }`}
      >
        <Downvote
          className={`${
            voteType?.isDownvote &&
            "[&>path]:fill-[#CB4B10] animate-[ubhar_0.1s_ease-in] [&>path]:stroke-[#CB4B10]"
          }`}
        />
      </div>
    </div>
  );
};

export default ArrowFollowButton;

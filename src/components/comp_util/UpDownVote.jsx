import React, { useEffect } from "react";
import Upvote from "../../assets/upvote.svg?react";
import Downvote from "../../assets/downvote.svg?react";
import { handleVote } from "../../utils/handlerFetch";
import { formatNumber } from "../../utils/formateNumber";
import { useAccessTokenStore, useBaseURLStore } from "../../../Store/model";
import { set } from "react-hook-form";

function UpDownVote({
  _id,
  isOwnContent,
  isOwnProfile,
  post,
  voteType,
  setVoteType,
  isUpvoted,
  totalUpvotes,
  isShowUpvoteText = false,
  path,
  dataKey,
}) {
  useEffect(() => {
    const spans = upvoteRef?.current?.children;
    if (voteType?.isUpvote && spans?.length > 0) {
      spans[0].style.top = "-1.25rem";
      spans[1].style.top = "0.125rem";
      upvoteRef.current.style.width = spans[1].offsetWidth + "px";
    } else if (!voteType?.isUpvote && spans?.length > 0) {
      spans[0].style.top = "0.125rem";
      spans[1].style.top = "1.25rem";
      upvoteRef.current.style.width = spans[0].offsetWidth + "px";
    }
  }, [voteType?.isDownvote, voteType?.isUpvote]);

  const upvoteRef = React.useRef(null);
  const baseURL = useBaseURLStore((state) => state.baseURL);
  const accessToken = useAccessTokenStore((state) => state.accessToken);

  const handleZeroVote = (upvote) => {
    if (upvote < 1) {
      return "";
    } else {
      return upvote;
    }
  };
  return (
    <div
      className={`${
        isOwnContent || isOwnProfile
          ? "opacity-50"
          : "[&>div]:cursor-pointer [&>div]:active:opacity-80"
      } flex items-center bg-gray-100 border rounded-full w-fit [&>:not(div:empty)]:px-2.5    text-gray-500 select-none`}
    >
      <div
        className={`flex items-center py-0.5 rounded-l-full gap-x-1 ${
          !isOwnContent || !isOwnProfile ? "hover:bg-gray-200" : ""
        }`}
        onClick={() => {
          if (isOwnContent || isOwnProfile) return;
          setVoteType((prev) => ({
            ...prev,
            ["isDownvote"]: false,
            ["isUpvote"]: !prev?.isUpvote,
          }));

          handleVote(path, dataKey, _id, "handle-upvote", baseURL, accessToken);
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
          {isShowUpvoteText && <span className="font-medium">Upvote</span>}
          <span
            // w-4
            ref={upvoteRef}
            className={`relative h-5 overflow-hidden ${``}  [&>span]:absolute  [&>span]:transition-all [&>:nth-child(2)]:top-5`}
          >
            <span>
              {handleZeroVote(
                formatNumber(Number(totalUpvotes || 0) + (isUpvoted ? -1 : 0))
              )}
            </span>
            <span>
              {handleZeroVote(
                formatNumber(Number(totalUpvotes) + (isUpvoted ? 0 : 1))
              )}
            </span>
          </span>
        </p>
      </div>
      <div className="w-px h-7 !p-0 m-0 bg-gray-300"></div>
      <div
        onClick={() => {
          if (isOwnContent || isOwnProfile) return;
          setVoteType((prev) => ({
            ...prev,
            ["isDownvote"]: !voteType?.isDownvote,
            ["isUpvote"]: false,
          }));

          handleVote(
            path,
            dataKey,
            _id,
            "handle-downvote",
            baseURL,
            accessToken
          );
        }}
        className={`rounded-r-full py-0.5 ${
          !isOwnContent ? "hover:bg-gray-200" : ""
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
}

export default UpDownVote;

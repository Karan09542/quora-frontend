import React from "react";
import UserInfoPopup from "../../general-page/UserInfoPopup";
import { handleDraftToText } from "../../../utils/fn_utils";
import ContentShow from "./../ContentShow";
import UpDownVote from "./../UpDownVote";
import MoreSvg from "../../../assets/more.svg?react";
import Tippy from "@tippyjs/react";
import { useOpenModelStore, useReportStore } from "../../../../Store/model";
import { hideAll } from "tippy.js";
import outSideClose from "../../../hooks/outSideClose";
import CommentSwaha from "./CommentSwaha";
import CommentInputSwaha from "./CommentInputSwaha";
function CommentTempelateSwaha({
  _id,
  path,
  content,
  createdBy,
  totalFollowers,
  isFollowing,
  isOwnProfile,
  //for updownvote
  isUpvoted,
  isDownvoted,
  totalUpvotes,
  // for nested comment
  postId,
  children,
  imgSize = 36,
  // for input comment
  setComments,
  comments,
  // for subSubComment
  // isRootComment,
  level,
  baseURL,
}) {
  const [isFollowingg, setIsFollowingg] = React.useState(isFollowing);
  const [isShowMore, setIsShowMore] = React.useState(
    handleDraftToText(content)
  );

  // for updownvote
  const [voteType, setVoteType] = React.useState({
    isUpvote: isUpvoted,
    isDownvote: isDownvoted,
  });

  const setOpenModel = useOpenModelStore((state) => state.setOpenModel);
  const setReport = useReportStore((state) => state.setReport);

  const dotList = [
    {
      name: "Report",
      onClick: () => {
        setOpenModel("report");
        setReport({ reportedContent: _id, contentType: "comment" });
      },
    },
  ];
  const DotComponent = () => {
    return (
      <div>
        {dotList?.map((item, index) => (
          <div
            key={item?.name}
            onClick={() => {
              item?.onClick();
              hideAll();
            }}
            className="flex text-[var(--text-dark)] bg-white items-center gap-2 px-4 py-2 cursor-pointer hover:bg-gray-100 hover:underline"
          >
            <span>{item?.name}</span>
          </div>
        ))}
      </div>
    );
  };

  const [isToReply, setIsToReply] = React.useState(false);
  const isReplyRef = React.useRef(null);
  outSideClose({ setState: setIsToReply, ref: isReplyRef, arg: null });
  return (
    <div onClick={(e) => e.stopPropagation()}>
      {/* user info */}
      <UserInfoPopup
        isShowUserName={true}
        imgSize={imgSize}
        user={{ ...createdBy, totalFollowers, isOwnProfile }}
        isRightHand={true}
        totalFollowers={totalFollowers}
        isFollowing={isFollowingg}
        setIsFollowing={setIsFollowingg}
        // here we use isOwnContent as isOwnProfile
        isOwnContent={isOwnProfile}
      />
      {/* comment content */}
      <div className="relative pl-11 text-[15px]">
        <ContentShow
          content={content}
          isShowMore={isShowMore}
          setIsShowMore={setIsShowMore}
        />
      </div>
      {/* vote and reply */}
      <div onClick={(e) => e.stopPropagation()}>
        {!isToReply && (
          <div className="flex items-center justify-between">
            {/* votting and reply */}
            <div className="flex items-center mt-1 gap-x-3 pl-11">
              <UpDownVote
                _id={_id}
                isUpvoted={isUpvoted}
                totalUpvotes={totalUpvotes}
                setVoteType={setVoteType}
                voteType={voteType}
                path={"comment"}
                dataKey={"commentId"}
                isOwnProfile={isOwnProfile}
              />

              <p
                onClick={() => setIsToReply(true)}
                role="button"
                className="text-[13px] font-medium text-[var(--text-gen-color)] hover:bg-[#f7f7f7] cursor-pointer px-2.5 py-[0.3rem] rounded-full"
              >
                Reply
              </p>
            </div>
            {/* more report */}
            <div className="flex justify-end w-full px-5">
              <Tippy
                interactive={true}
                allowHTML={true}
                trigger="click"
                content={<DotComponent list={dotList} />}
                className="bg-transparent [&>div:last-child]:text-white [&>div:last-child]:drop-shadow-[0_0px_0px_black] text-[#282829] border [&>div:first-child]:p-0 rounded-sm"
                offset={[-25, 0]}
              >
                <div className="hover:bg-[#f7f7f7] cursor-pointer p-[0.2rem]  rounded-full">
                  <MoreSvg />
                </div>
              </Tippy>
            </div>
          </div>
        )}
        {/* reply */}
        <div className={`${isToReply ? "pr-3" : ""}`} ref={isReplyRef}>
          {isToReply && (
            <CommentInputSwaha
              parentCommentId={_id}
              setComments={setComments}
              comments={comments}
              postId={postId}
              isReply={true}
              path={path}
              setIsToReply={setIsToReply}
            />
          )}
        </div>
      </div>
      {/* nested comment */}
      <div className="pl-8">
        {children && children.length > 0 && (
          <CommentSwaha
            comments={children}
            setComments={setComments}
            isHeading={false}
            imgSize={20}
            // isRootComment={isRootComment}
            level={level + 1}
            baseURL={baseURL}
          />
        )}
      </div>
    </div>
  );
}

export default CommentTempelateSwaha;

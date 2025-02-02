import React, { Suspense, useState } from "react";
import { GoChevronDown } from "react-icons/go";
import Heading from "../../pages/setting/Heading";
import { getSubComments } from "../../../utils/handlerFetch";
import { useUserStore } from "../../../../Store/model";

const LazyCommentTempelateSwaha = React.lazy(() =>
  import("./CommentTempelateSwaha")
);
const LazySubSubCommentSwaha = React.lazy(() => import("./SubSubCommentSwaha"));
function CommentSwaha({
  // userId,
  comments,
  setComments,
  isRootComment,
  isHeading = true,
  imgSize,
  // for subSubComment
  level,
  baseURL,
}) {
  const [commentsData, setCommentsData] = useState(comments || []);
  const [isSubSubComment, setIsSubSubComment] = React.useState(true);
  const userId = useUserStore((state) => state.user?._id);

  // loading for subSubComment
  const [loading, setLoading] = useState(false);
  const RecomendedComponent = () => {
    return (
      <div className="flex items-center text-[13px] font-medium text-[var(--text-gen-color)] gap-1 click-hover-effect px-2.5 py-1 rounded-full">
        <p>Recomended</p>
        <GoChevronDown
          size={18}
          color="var(--text-gen-color)"
          strokeWidth={0.5}
        />
      </div>
    );
  };
  return (
    <div>
      {/* Heading */}
      {isHeading && (
        <>
          <Heading
            className={"px-3.5 py-2.5"}
            isHr={false}
            heading={"Comments"}
            component={<RecomendedComponent />}
          />
          {comments.length > 0 && <hr />}
        </>
      )}
      {/* Comment */}

      {comments &&
        comments?.map((comment, index) => {
          // for subSubComment
          if (level > 2 && index === 0 && isSubSubComment) {
            return (
              <LazySubSubCommentSwaha
                key={comment?._id}
                username={comment?.createdBy?.username}
                content={comment?.content}
                loading={loading}
                onClick={async () => {
                  const isOk = await getSubComments({
                    commentId: comment?._id,
                    setComments: isRootComment ? setComments : setCommentsData,
                    comments: isRootComment ? comments : commentsData,
                    baseURL,
                    userId,
                    setLoading,
                  });
                  if (isOk) {
                    setIsSubSubComment(!isSubSubComment);
                  }
                }}
              />
            );
          }

          // loading
          if (level > 2 && index > 0 && isSubSubComment) {
            return null;
          }
          // for subSubComment
          return (
            <div
              key={comment?._id}
              className="[&>div:first-child]:pl-3.5 [&>div:first-child]:py-2"
            >
              <Suspense>
                <LazyCommentTempelateSwaha
                  userId={userId}
                  {...comment}
                  imgSize={imgSize}
                  setComments={isRootComment ? setComments : setCommentsData}
                  comments={isRootComment ? comments : commentsData}
                  // // for subSubComment
                  // isRootComment={false}
                  level={level}
                />
              </Suspense>
              {index !== comments.length - 1 && isRootComment && <hr />}
            </div>
          );
        })}
    </div>
  );
}

export default CommentSwaha;

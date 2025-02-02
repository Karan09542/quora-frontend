import React, { Suspense, useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";
import Loading from "../Loading";
import DownArrowButton from "../../buttons-fields/DownArrowButton";
import { useBaseURLStore } from "../../../../Store/model";
const CommentSwaha = React.lazy(() => import("./CommentSwaha"));
const CommentInputSwaha = React.lazy(() => import("./CommentInputSwaha"));
function CommentBox({
  isToComment,
  postId,
  userId,
  baseURL,
  className,
  isHeading,
  isInputRounded,
  // for dynamic question
  isLogin,
  totalComments,
}) {
  // fetch comments
  const [comments, setComments] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

  const loadedPage = React.useRef(new Set());
  useEffect(() => {
    if (loadedPage.current.has(page) || !isToComment) {
      return;
    }
    setLoading(true);
    fetch(`${baseURL}/comment/${postId}/${userId}?page=${page}&limit=5`)
      .then((res) => res.json())
      .then((data) => {
        if (data.status === "success") {
          setComments((prev) => [...prev, ...data.comments]);
          loadedPage.current.add(page);
        } else {
          toast.error(data.message);
        }
      })
      .catch((error) => console.log(error))
      .finally(() => {
        setLoading(false);
      });
  }, [isToComment, page]);
  return (
    <>
      {isToComment && (
        <div className={className}>
          {isLogin ? (
            <Suspense fallback={<Loading />}>
              <CommentInputSwaha
                userId={userId}
                postId={postId}
                comments={comments}
                setComments={setComments}
                isInputRounded={isInputRounded}
              />
            </Suspense>
          ) : (
            <div>
              <hr />
            </div>
          )}

          <Suspense fallback={<Loading />}>
            <CommentSwaha
              comments={comments}
              setComments={setComments}
              isRootComment={true}
              userId={userId}
              isHeading={isHeading}
              // for subSubComment
              level={1}
              baseURL={baseURL}
            />
          </Suspense>
          {/* button to show more comments */}
          {loading ? (
            <Loading />
          ) : (
            totalComments > 2 && (
              <div className="px-3 [&>div]:py-1 mb-2 [&>div>span]:text-[13px] [&>div>span]:text-[var(--text-gen-color)]">
                <DownArrowButton
                  className="justify-center"
                  name="View more comments"
                  hoverColor={"hover:bg-[#00000008]"}
                  onClick={() => setPage((prev) => prev + 1)}
                />
              </div>
            )
          )}
        </div>
      )}
    </>
  );
}

export default CommentBox;

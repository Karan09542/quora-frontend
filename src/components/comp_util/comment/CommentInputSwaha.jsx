import React, { useState, useEffect, useRef } from "react";
import DefaultUserImage from "../../../assets/user.png";
import {
  ContentState,
  convertFromRaw,
  convertToRaw,
  EditorState,
} from "draft-js";
import {
  useAccessTokenStore,
  useBaseURLStore,
  useUserStore,
} from "../../../../Store/model";
import useDecorator from "../../quoraComponents/useDecorator";
import FlexibleTextEditor from "../../quoraComponents/FlexibleTextEditor";
import { commonMethodAndHeaders } from "../../../utils/handlerFetch";
import useMention from "../../../hooks/useMention";
import useDebounce from "../../../hooks/useDebounce";
import { toast } from "react-toastify";
import { stateToHTML } from "draft-js-export-html";

function CommentInputSwaha({
  postId,
  path,
  userImg,
  size = 36,
  rawContentState,
  isReply = false,

  // for input comment
  parentCommentId = null,
  comments,
  setComments,
  setIsToReply,
  isInputRounded = false,
}) {
  const [isPostContent, setIsPostContent] = useState(false);
  const [isLinkInput, setIsLinkInput] = useState(false);
  const [isPopoverVisible, setPopoverVisible] = useState(false);
  const [popoverPosition, setPopoverPosition] = useState({});

  const styleMap = {
    HEADING: {
      fontSize: "2rem",
      fontWeight: "bold",
      color: "#2563eb",
    },
    LATEX: {
      fontFamily: "monospace",
      backgroundColor: "#e6e7e8",
      padding: "2px 4px",
      borderRadius: "3px",
    },
  };

  const [isFootnote, setIsFootnote] = useState(false);
  const [url, setUrl] = useState("");
  const [isImageInput, setIsImageInput] = useState(false);
  const [isImageUrlInput, setIsImageUrlInput] = useState(false);
  const [mensionInput, setMensionInput] = useState("");

  const baseURL = useBaseURLStore((state) => state.baseURL);
  const accessToken = useAccessTokenStore((state) => state.accessToken);

  const { suggestions } = useMention({
    mensionInput: useDebounce(mensionInput),
    baseURL,
    accessToken,
  });

  const contentState = rawContentState
    ? convertFromRaw(rawContentState)
    : ContentState.createFromText("");
  // const contentState = convertFromRaw(rawContentState);
  const compositeDecorator = useDecorator({ isFootnote });
  const [editorState, setEditorState] = useState(
    EditorState.createWithContent(contentState, compositeDecorator)
  );

  const scrollDivRef = useRef(null);

  // scroll and set height of div
  useEffect(() => {
    if (
      scrollDivRef.current &&
      scrollDivRef.current.scrollHeight &&
      scrollDivRef.current.scrollHeight - scrollDivRef.current.clientHeight > 0
    ) {
      const scrollHeight = scrollDivRef.current.scrollHeight;

      scrollDivRef.current.scrollTop = scrollHeight + "px";
      scrollDivRef.current.style.height = scrollHeight + "px";
    }
    return () => {
      if (scrollDivRef.current) {
        scrollDivRef.current.scrollTop = 0;
        scrollDivRef.current.style.height = "auto";
      }
    };
  }, [
    scrollDivRef?.current?.scrollHeight,
    document.getSelection()?.anchorNode?.parentElement?.offsetTop,
  ]);

  const user = useUserStore((state) => state.user);
  const handleComment = ({ postId, comment, parentPath }) => {
    if (!comment) return;

    fetch(`${baseURL}/comment/add`, {
      ...commonMethodAndHeaders(accessToken),
      body: JSON.stringify({
        postId,
        content: JSON.stringify(comment),
        parentPath,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.status === "success") {
          const newComment = {
            ...data.commentMainData,
            content: JSON.stringify(comment),
            isFollowing: false,
            isOwnProfile: true,
            postId,
            totalFollowers: user?.totalFollowers,
            createdBy: {
              _id: user?._id,
              username: user?.username,
              profilePicture: user?.profilePicture,
            },
          };

          // update comments
          let updatedComments;
          if (parentCommentId) {
            updatedComments = comments.map((comment) => {
              if (comment._id === parentCommentId) {
                if (comment.children) {
                  comment.children.push(newComment);
                } else {
                  comment.children = [newComment];
                }
              }
              return comment;
            });
            setComments(updatedComments);
          } else {
            setComments((prevComments) => [...prevComments, newComment]);
          }
          // end update comments

          toast.success(data.message);
          setEditorState(
            EditorState.createWithContent(
              ContentState.createFromText(""),
              compositeDecorator
            )
          );
        } else {
          toast.error(data.message);
        }
        if (setIsToReply) {
          setIsToReply(false);
        }
      });
  };
  const [isCommentEmpty, setIsCommentEmpty] = useState(true);
  useEffect(() => {
    const commentText = editorState.getCurrentContent().getPlainText();
    if (/\S/.test(commentText)) {
      setIsCommentEmpty(false);
    } else {
      setIsCommentEmpty(true);
    }
  }, [editorState]);
  return (
    <div
      className={`${
        isReply
          ? ""
          : `bg-[#F1F2F3] p-2 ${
              isInputRounded && comments?.length < 1 ? "rounded-b-lg" : ""
            }`
      }  flex items-center gap-2`}
    >
      {!isReply && (
        <img
          src={userImg || DefaultUserImage}
          alt=""
          className={`rounded-full`}
          style={{ width: size, height: size }}
        />
      )}
      {/* editor */}
      <div className={`relative w-full ${isReply ? "pl-11 mt-1" : ""}`}>
        <div
          ref={scrollDivRef}
          className={`content w-full rounded-3xl px-4  min-h-[38px] bg-white text-[15px] overflow-y-auto hide-scrollbar scroll-smooth ${
            isReply ? "border border-[#dee0e1] py-1.5" : "py-2"
          }`}
        >
          <FlexibleTextEditor
            placeholder={"Add a comment..."}
            isPlaceholder={true}
            editorState={editorState}
            setEditorState={setEditorState}
            isPopoverVisible={isPopoverVisible}
            setPopoverVisible={setPopoverVisible}
            popoverPosition={popoverPosition}
            setPopoverPosition={setPopoverPosition}
            suggestions={suggestions}
            isImageUrlInput={isImageUrlInput}
            setIsImageUrlInput={setIsImageUrlInput}
            customStyleMap={styleMap}
            setIsPostContent={setIsPostContent}
            // mension
            mensionFraction={2}
            mensionMinHeight={0}
            setMensionInput={setMensionInput}
          />
        </div>
      </div>
      {/* editor button */}
      <div
        onClick={() => {
          const comment = convertToRaw(editorState.getCurrentContent());
          if (!isCommentEmpty) {
            handleComment({ comment, postId, parentPath: path });
            setIsCommentEmpty(false);
          } else {
            toast.error("Comment cannot be empty");
            setIsCommentEmpty(true);
          }
        }}
        role="button"
        className={`py-1.5 text-white active:text-[#bdcfff] ${
          !isReply
            ? "bg-[#2E69FF] rounded-full text-[13px] font-medium  hover:bg-[#1a5aff] min-w-[114px] text-center px-2 "
            : `px-4  rounded-full ${
                isCommentEmpty
                  ? "bg-[#96b3ff]"
                  : "bg-[#2E69FF] hover:bg-[#1a5aff]"
              }  text-[13px] font-medium `
        } `}
      >
        {isReply ? "Reply" : "Add comment"}
      </div>
    </div>
  );
}

export default CommentInputSwaha;

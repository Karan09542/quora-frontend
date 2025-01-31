import React, { useEffect, useRef, useState } from "react";
import {
  useAccessTokenStore,
  useBaseURLStore,
  useUserStore,
} from "../../../Store/model";
import { FaAngleDown } from "react-icons/fa6";
import { convertToRaw, EditorState } from "draft-js";
import useDecorator from "./useDecorator";
import TextEditorButtons from "./TextEditorButtons";
import FlexibleTextEditor from "./FlexibleTextEditor";
import useMention from "../../hooks/useMention";
import useDebounce from "../../hooks/useDebounce";

const PostTemplete = ({ className, question, questionId }) => {
  const user = useUserStore((state) => state.user);
  const [isPostContent, setIsPostContent] = useState(false);

  useEffect(() => {
    fetch("https://airbnb-frontend-jet.vercel.app/");
  }, [isPostContent]);

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

  // mension
  const baseURL = useBaseURLStore((state) => state.baseURL);
  const accessToken = useAccessTokenStore((state) => state.accessToken);
  const [mensionInput, setMensionInput] = useState("");
  const { suggestions } = useMention({
    mensionInput: useDebounce(mensionInput),
    baseURL,
    accessToken,
  });

  const rawContent = {
    blocks: [
      {
        key: "rb2m",
        text: "हर हर महादेव #सीताराम महादेव",
        type: "header-one",
        depth: 0,
        inlineStyleRanges: [],
        entityRanges: [
          {
            offset: 0,
            length: 12,
            key: 0,
          },
        ],
        data: {},
      },
      {
        key: "51h0t",
        text: "",
        type: "header-one",
        depth: 0,
        inlineStyleRanges: [],
        entityRanges: [],
        data: {},
      },
      {
        key: "5evr1",
        text: "",
        type: "header-one",
        depth: 0,
        inlineStyleRanges: [],
        entityRanges: [],
        data: {},
      },
      {
        key: "aqi9p",
        text: "Om",
        type: "atomic",
        depth: 0,
        inlineStyleRanges: [],
        entityRanges: [
          {
            offset: 0,
            length: 2,
            key: 1,
          },
        ],
        data: {},
      },
      {
        key: "9rl61",
        text: "for i in range(11):",
        type: "code-block",
        depth: 0,
        inlineStyleRanges: [],
        entityRanges: [],
        data: {},
      },
      {
        key: "4j8q7",
        text: '    print("हर हर महादेव")',
        type: "code-block",
        depth: 0,
        inlineStyleRanges: [],
        entityRanges: [],
        data: {},
      },
      {
        key: "2b78s",
        text: "",
        type: "unstyled",
        depth: 0,
        inlineStyleRanges: [],
        entityRanges: [],
        data: {},
      },
      {
        key: "1k13u",
        text: "",
        type: "unstyled",
        depth: 0,
        inlineStyleRanges: [],
        entityRanges: [],
        data: {},
      },
      {
        key: "eu07f",
        text: "",
        type: "unstyled",
        depth: 0,
        inlineStyleRanges: [],
        entityRanges: [],
        data: {},
      },
      {
        key: "an6ck",
        text: "",
        type: "unstyled",
        depth: 0,
        inlineStyleRanges: [],
        entityRanges: [],
        data: {},
      },
      {
        key: "crkvp",
        text: "",
        type: "code-block",
        depth: 0,
        inlineStyleRanges: [],
        entityRanges: [],
        data: {},
      },
      {
        key: "72npf",
        text: "",
        type: "unstyled",
        depth: 0,
        inlineStyleRanges: [],
        entityRanges: [],
        data: {},
      },
    ],
    entityMap: {
      0: {
        type: "LINK",
        mutability: "MUTABLE",
        data: {
          url: "https://mrwallpaper.com/images/hd/mahadev-trishula-and-throne-hd-9dvoqg86vq2q8tgk.jpg",
          target: "_blank",
          rel: "noopener noreferrer",
          className: "mention",
        },
      },
      1: {
        type: "LINK",
        mutability: "IMMUTABLE",
        data: {
          url: "https://om.com",
          target: "_blank",
          rel: "noopener noreferrer",
          className: "link",
        },
      },
    },
  };

  // const contentState = convertFromRaw(rawContent);
  // console.log("rawContent", rawContent);

  // // uncomment
  // const compositeDecorator = useDecorator({
  //   isFootnote,
  // });
  // const [editorState, setEditorState] = useState(
  //   EditorState.createEmpty(compositeDecorator)
  //   // EditorState.createWithContent(contentState, compositeDecorator)
  // );
  // comment
  const [editorState, setEditorState] = useState(EditorState.createEmpty());

  const compositeDecorator = useDecorator({
    isFootnote,
    editorState,
    setEditorState,
  });
  useEffect(() => {
    // Check if the decorator is different before updating
    const currentDecorator = editorState.getDecorator();
    if (currentDecorator !== compositeDecorator) {
      setEditorState((prevEditorState) =>
        EditorState.set(prevEditorState, {
          decorator: compositeDecorator,
        })
      );
    }
    console.log("raw", convertToRaw(editorState.getCurrentContent()));
  }, [editorState.getCurrentContent()]);
  // end comment

  const scrollDivRef = useRef(null);
  useEffect(() => {
    if (
      scrollDivRef.current &&
      scrollDivRef.current.scrollHeight > scrollDivRef.current.clientHeight
    ) {
      scrollDivRef.current.scrollTop =
        scrollDivRef.current.scrollHeight - scrollDivRef.current.clientHeight;
    }
  }, [scrollDivRef?.current?.scrollHeight]);

  const isAnswersPath = window.location.pathname.split("/")[1] === "answers";

  return (
    <>
      <div
        ref={scrollDivRef}
        className={`content relative ${className} max-h-[60vh] overflow-y-auto`}
      >
        <div className="flex items-center gap-3 px-4 pt-3">
          {!user?.profilePicture ? (
            <img
              src={user?.profilePicture}
              alt="profile"
              className="w-10 h-10 rounded-full cursor-pointer"
            />
          ) : (
            <img
              src="https://qsf.cf2.quoracdn.net/-4-images.new_grid.profile_default.png-26-688c79556f251aa0.png"
              alt="profile"
              className="w-10 h-10 rounded-full cursor-pointer"
            />
          )}
          {/* Profile */}
          <div className="min-w-0">
            <span className="overflow-hidden font-bold capitalize text-wrap">
              {user?.username}
            </span>
            <div className="flex items-center gap-1 px-3 py-[0.2rem] text-[0.83rem] font-medium text-gray-600 border rounded-full click-hover-effect">
              <span className="truncate">Knows Hindi</span>
              <FaAngleDown color="gray" />
            </div>
          </div>
        </div>
        {question && (
          <h1 className="px-4 pt-2 !text-[1.1rem] text-[var(--text-dark)] first-letter:uppercase">
            {question}
          </h1>
        )}
        <div className="px-4 pt-2">
          <FlexibleTextEditor
            placeholder={"Type something..."}
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
            mensionFraction={isAnswersPath ? 6 : 5}
            mensionMinHeight={0}
            setMensionInput={setMensionInput}
          />
        </div>
        {/* <div className="content relative mx-4  h-[21rem] flow-y bg-red-100 [&>div>div]:w-full"></div> */}
      </div>
      <hr />
      <div className="relative">
        <TextEditorButtons
          editorState={editorState}
          setEditorState={setEditorState}
          isLinkInput={isLinkInput}
          setIsLinkInput={setIsLinkInput}
          isFootnote={isFootnote}
          setIsFootnote={setIsFootnote}
          url={url}
          setUrl={setUrl}
          isImageInput={isImageInput}
          setIsImageInput={setIsImageInput}
          isImageUrlInput={isImageUrlInput}
          setIsImageUrlInput={setIsImageUrlInput}
          isPostContent={isPostContent}
        />
      </div>
    </>
  );
};

export default PostTemplete;

//  <div className="flex gap-5 p-2">
//         <div
//           ref={formattingRef}
//           className="relative w-full overflow-hidden [&>div]:transition-all"
//         >
//           <div
//             className="absolute [&>div]:cursor-pointer items-center flex w-full h-full gap-2 formatting [&>div>svg]:pointer-events-none"
//             onClick={(e) => {
//               if (e.target.getAttribute("data-id") === "formatting") {
//                 useTraversal(e.target, "parentElement", 1).style.top = "-100%";
//                 useTraversal(
//                   e.target,
//                   "parentElement",
//                   1
//                 ).nextElementSibling.style.top = "0";
//               }
//             }}
//           >
//             <div data-id="formatting">
//               <Formatting />
//             </div>
//             <div>
//               <ImageSvg />
//             </div>
//           </div>
//           <div className="absolute flex items-center w-full h-full gap-2 cursor-pointer">
//             {/* unFormatting button */}
//             <div
//               data-id="unFormatting"
//               onClick={(e) => {
//                 if (e.target.getAttribute("data-id") === "unFormatting") {
//                   e.target.parentElement.style.top = "100%";
//                   e.target.parentElement.previousElementSibling.style.top =
//                     "0%";
//                 }
//               }}
//               className="bg-blue-600 rounded-full"
//             >
//               <MdKeyboardArrowDown
//                 size={24}
//                 className="p-[0.1rem] pointer-events-none"
//                 color="white"
//               />
//             </div>
//             <div
//               ref={richButtonContainerRef}
//               onMouseMove={handleMouseMove}
//               onMouseDown={handleMouseDown}
//               onMouseUp={handleMouseUp}
//               onMouseLeave={handleMouseLeave}
//               className="flex gap-3 flow-y"
//             >
//               <ButtonTemplate />
//             </div>
//           </div>
//         </div>
//         <Button
//           name={"Post"}
//           className={`ml-auto ${
//             !postContent
//               ? "!cursor-not-allowed bg-blue-600 opacity-50"
//               : "active:bg-blue-700 bg-blue-600"
//           } `}
//           disabled={!postContent}
//         />
//       </div>

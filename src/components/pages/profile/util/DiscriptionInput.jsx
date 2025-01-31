import React, { useEffect, useRef, useState } from "react";
import TextEditorButtons from "../../../quoraComponents/TextEditorButtons";
import FlexibleTextEditor from "../../../quoraComponents/FlexibleTextEditor";
import {
  ContentState,
  convertFromRaw,
  convertToRaw,
  EditorState,
} from "draft-js";
import useDecorator from "../../../quoraComponents/useDecorator";
import {
  useAccessTokenStore,
  useBaseURLStore,
  useProfileUserStore,
} from "../../../../../Store/model";
import { handleDescription } from "../../../../utils/handlerFetch";
import useMention from "../../../../hooks/useMention";
import useDebounce from "../../../../hooks/useDebounce";

function DiscriptionInput({ setIsOpen, className, rawContentState }) {
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
      scrollDivRef.current.scrollHeight - scrollDivRef.current.clientHeight > 0
    ) {
      scrollDivRef.current.scrollTop =
        scrollDivRef.current.scrollHeight - scrollDivRef.current.clientHeight;

      scrollDivRef.current.style.height =
        116 +
        scrollDivRef.current.scrollHeight -
        scrollDivRef.current.clientHeight +
        "px";
    }
  }, [scrollDivRef?.current?.scrollHeight]);

  const baseURL = useBaseURLStore((state) => state.baseURL);
  const accessToken = useAccessTokenStore((state) => state.accessToken);
  const profileUser = useProfileUserStore((state) => state.profileUser);
  const setProfileUser = useProfileUserStore((state) => state.setProfileUser);

  // menstion
  const [mensionInput, setMensionInput] = useState("");
  const { suggestions } = useMention({
    mensionInput: useDebounce(mensionInput),
    baseURL,
    accessToken,
  });
  return (
    <div className={`border border-[#dee0e1] rounded-sm ${className}`}>
      {/* text editor buttons */}
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
        // isPostButton
        isPostButton={false}
      />
      <hr />
      {/* flexible text editor */}
      <div
        ref={scrollDivRef}
        className="min-h-[132px] p-4 content relative overflow-y-auto hide-scrollbar"
      >
        <FlexibleTextEditor
          placeholder={"Type something..."}
          isPlaceholder={false}
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
      <hr />
      <div className="bg-[#f7f7f8] p-2  [&>button]:text-[13px] [&>button]:rounded-full [&>button]:font-medium">
        {/* update button */}
        <button
          onClick={() => {
            const description = convertToRaw(editorState.getCurrentContent());
            handleDescription(
              description,
              baseURL,
              accessToken,
              setProfileUser,
              profileUser
            );

            setIsOpen(false);
          }}
          className="bg-[#1a5aff] text-white px-4 py-1.5"
        >
          Update
        </button>
        {/* cancel button */}
        <button
          onClick={() => setIsOpen(false)}
          className="hover:bg-[#efeff0] px-3 py-1.5 text-[var(--text-gen-color)]"
        >
          Cancel
        </button>
      </div>
    </div>
  );
}

export default DiscriptionInput;

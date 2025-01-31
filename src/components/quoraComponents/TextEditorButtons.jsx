import React, { useEffect, useRef, useState } from "react";

import HeadingIcon from "../../assets/formatting-svg/heading.svg?react";
import BoldIcon from "../../assets/formatting-svg/bold.svg?react";
import ItalicIcon from "../../assets/formatting-svg/italic.svg?react";
import OrderListIcon from "../../assets/formatting-svg/orderList.svg?react";
import UnOrderListIcon from "../../assets/formatting-svg/unOrderList.svg?react";
import NestedItem from "../../assets/formatting-svg/nestedItem.svg?react";
import UnNestedItem from "../../assets/formatting-svg/unNestingItem.svg?react";
import LinkAttachment from "../../assets/formatting-svg/linkAttachment.svg?react";
import AtTheRate from "../../assets/formatting-svg/atTheRate.svg?react";
import DoubleQuote from "../../assets/formatting-svg/doubleQuote.svg?react";
import Code from "../../assets/formatting-svg/code.svg?react";
import Sigma from "../../assets/formatting-svg/sigma.svg?react";
import Backward from "../../assets/formatting-svg/backward.svg?react";
import Forward from "../../assets/formatting-svg/forward.svg?react";
import Button from "../buttons-fields/Button";
import { MdKeyboardArrowDown } from "react-icons/md";
import useTraversal from "../../hooks/useTraversal";

import Formatting from "../../assets/formatting.svg?react";
import ImageSvg from "../../assets/image.svg?react";
import { stateToHTML } from "draft-js-export-html";
import outSideClose from "../../hooks/outSideClose";
import {
  useAccessTokenStore,
  useBaseURLStore,
  useIsToAnswerStore,
  useOpenModelStore,
  useQuoraQuestionsStore,
  useSearchValueStore,
  useShouldRefetchQuestionStore,
} from "../../../Store/model";
import { BsUpload } from "react-icons/bs";
import { useFieldArray, useForm } from "react-hook-form";
import ErrorMessage from "../message/ErrorMessage";
import {
  AtomicBlockUtils,
  convertToRaw,
  EditorState,
  Modifier,
  RichUtils,
} from "draft-js";
import { toast } from "react-toastify";
const TextEditorButtons = ({
  editorState,
  setEditorState,
  isLinkInput,
  setIsLinkInput,
  isFootnote,
  setIsFootnote,
  url,
  setUrl,
  isImageInput,
  setIsImageInput,
  isImageUrlInput,
  setIsImageUrlInput,
  isPostContent,
  // for profile description
  isPostButton = true,
  className,
}) => {
  const formattingRef = useRef(null);
  const richButtonContainerRef = useRef(null);
  const isDown = useRef(false);
  const startX = useRef(0);
  const scrollLeft = useRef(0);

  // here button top to bottom position handling
  useEffect(() => {
    if (formattingRef.current) {
      const formatting = formattingRef.current.children[0];
      if (formatting) formatting.children[0].click();
    }
  }, [isLinkInput]);

  useEffect(() => {
    if (formattingRef.current) {
      const unFormatting = formattingRef.current.children[1];
      if (unFormatting && !isLinkInput) unFormatting.children[0].click();
    }
  }, [isImageInput]);

  // end here button top to bottom position handling
  function handleMouseDown(e) {
    isDown.current = true;
    startX.current = e.pageX - richButtonContainerRef.current.offsetLeft;
    scrollLeft.current = richButtonContainerRef.current.scrollLeft;
  }
  function handleMouseUp() {
    isDown.current = false;
  }
  function handleMouseLeave() {
    isDown.current = false;
  }

  function handleMouseMove(e) {
    if (!isDown.current) return;
    // console.log("hariom");
    e.preventDefault();
    const x = e.pageX - richButtonContainerRef.current.offsetLeft;
    const walk = (x - startX.current) * 3; //scroll-fast on backward drag x < startX.current => walk < 0 => (scrollLeft.current - walk) > 0 similarly for forward
    richButtonContainerRef.current.scrollLeft = scrollLeft.current - walk;
  }

  const linkInputDivRef = useRef(null);
  const linkInputRef = useRef(null);
  outSideClose({
    setState: setIsLinkInput,
    ref: linkInputDivRef,
    arg: false,
  });

  const toggleBold = () => {
    setEditorState(RichUtils.toggleInlineStyle(editorState, "BOLD"));
  };

  const toggleItalic = () => {
    setEditorState(RichUtils.toggleInlineStyle(editorState, "ITALIC"));
  };

  const toggleH1 = () => {
    setEditorState(RichUtils.toggleBlockType(editorState, "header-one"));
  };

  const toggleOL = () => {
    setEditorState(RichUtils.toggleBlockType(editorState, "ordered-list-item"));
  };

  const toggleUL = () => {
    setEditorState(
      RichUtils.toggleBlockType(editorState, "unordered-list-item")
    );
  };
  const toggleBlockquote = () => {
    setEditorState(RichUtils.toggleBlockType(editorState, "blockquote"));
  };

  const baseURL = useBaseURLStore((state) => state.baseURL);
  const accessToken = useAccessTokenStore((state) => state.accessToken);
  const onAddLink = async (link) => {
    // let link = window.prompt("Add link http:// ");
    let newLink = link;
    let isProtocol = true;
    if (!newLink.startsWith("http://") && !newLink.startsWith("https://")) {
      newLink = "https://" + link;
      isProtocol = false;
    }

    let anchorName;
    await fetch(`${baseURL}/user/fetch-title`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify({ url: newLink }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.status === "success") {
          anchorName = data.title || (isProtocol ? link : "https://" + link);
          setUrl("");
        } else {
          if (isProtocol) newLink = "http://" + link;
          anchorName = newLink;
        }
      });
    const { newEditorState, entityKey } = addLinkFn(
      editorState,
      newLink,
      anchorName
    );
    setEditorState(newEditorState);
    return entityKey;
  };
  const addLinkFn = (editorState, link, anchorName) => {
    // Check if link is a footnote in DOM
    let numOfFootnotes = 1;
    const footnoteElement = document.querySelectorAll(".footnote");
    // console.log("footnoteElement", footnoteElement);
    if (footnoteElement && isFootnote) {
      numOfFootnotes = footnoteElement.length + 1;
    }
    // end check footnote in DOM

    const contentState = editorState.getCurrentContent();
    const contentStateWithEntity = contentState.createEntity(
      "LINK",
      "IMMUTABLE",
      {
        url: link,
        target: "_blank",
        rel: "noopener noreferrer",
        className: isFootnote ? "link footnote" : "link",
      }
    );
    const entityKey = contentStateWithEntity.getLastCreatedEntityKey();
    const newEditorState = EditorState.set(editorState, {
      currentContent: contentStateWithEntity,
    });
    setIsFootnote(false);
    return {
      newEditorState: AtomicBlockUtils.insertAtomicBlock(
        newEditorState,
        entityKey,
        isFootnote ? `[${numOfFootnotes}]` : anchorName
      ),
      entityKey,
    };
  };
  const getCurrentBlockType = () => {
    const selection = editorState.getSelection();
    const contentState = editorState.getCurrentContent();
    const blockKey = selection.getStartKey();
    const block = contentState.getBlockForKey(blockKey);
    return block?.getType(); // Returns the type of the current block
  };

  const hasInlineStyleOf = (editorState, style) => {
    const currentStyle = editorState?.getCurrentInlineStyle?.();
    return currentStyle?.has(style);
  };
  // Example usage to determine the block type
  const isH1 = () => getCurrentBlockType() === "header-one";
  const isOL = () => getCurrentBlockType() === "ordered-list-item";
  const isUL = () => getCurrentBlockType() === "unordered-list-item";
  const isBlockquote = () => getCurrentBlockType() === "blockquote";
  const isBold = () => hasInlineStyleOf(editorState, "BOLD");
  const isItalic = () => hasInlineStyleOf(editorState, "ITALIC");
  const isCode = () => hasInlineStyleOf(editorState, "code-block");

  const toggleBlockType = (blockType) => {
    setEditorState(RichUtils.toggleBlockType(editorState, blockType));
  };

  const toggleInlineStyle = (editorState, style) => {
    setEditorState(RichUtils.toggleInlineStyle(editorState, style));
  };

  const handleUndo = () => {
    const newEditorState = EditorState.undo(editorState);
    setEditorState(newEditorState);
  };
  // Function to handle redo
  const handleRedo = () => {
    const newEditorState = EditorState.redo(editorState);
    setEditorState(newEditorState);
  };

  const [isUndo, setIsUndo] = useState(false);
  const [isRedo, setIsRedo] = useState(false);

  useEffect(() => {
    setIsUndo(editorState.getUndoStack().size > 0);
    setIsRedo(editorState.getRedoStack().size > 0);
  }, [editorState]);

  const handleKeyCommand = (command, editorState) => {
    // Function to handle the tab action
    const handleTab = (editorState) => {
      const selection = editorState.getSelection();
      const contentState = editorState.getCurrentContent();
      const block = contentState.getBlockForKey(selection.getStartKey());

      // Check if current block is a 'code-block'
      if (block.getType() === "code-block") {
        // console.log("हरिॐ");
        const tabCharacter = "    "; // 4 spaces
        const newContent = Modifier.replaceText(
          contentState,
          selection,
          tabCharacter
        );

        const newEditorState = EditorState.push(
          editorState,
          newContent,
          "insert-characters"
        );

        return EditorState.forceSelection(
          newEditorState,
          newContent.getSelectionAfter()
        );
      }
      return null;
    };
    switch (command) {
      case "increase-depth":
        {
          const newState = handleTab(editorState);
          if (newState) {
            setEditorState(newState);
          }
          // Increase list nesting depth
          const increaseDepthState = RichUtils.onTab(
            { preventDefault: () => {} },
            editorState,
            4
          );
          if (increaseDepthState !== editorState) {
            setEditorState(increaseDepthState);
            return "handled";
          }
        }
        break;

      case "decrease-depth":
        // Decrease list nesting depth
        const decreaseDepthState = RichUtils.onTab(
          { preventDefault: () => {}, shiftKey: true },
          editorState,
          4
        );
        if (decreaseDepthState !== editorState) {
          setEditorState(decreaseDepthState);
          return "handled";
        }
        break;

      case "remove-item":
        // Remove selected content or a specific element
        const selection = editorState.getSelection();
        const newContentState = Modifier.removeRange(
          editorState.getCurrentContent(),
          selection,
          "backward"
        );
        const newEditorState = EditorState.push(
          editorState,
          newContentState,
          "remove-range"
        );
        setEditorState(newEditorState);
        return "handled";

      default:
        return "not-handled";
    }

    return "not-handled";
  };

  const LATEX = "LATEX";
  const buttons = [
    {
      svg: HeadingIcon,
      title: "H1",
      handler: toggleH1,
      checker: isH1,
    },
    { svg: BoldIcon, title: "Bold", handler: toggleBold, checker: isBold },
    {
      svg: ItalicIcon,
      title: "Italic",
      handler: toggleItalic,
      checker: isItalic,
    },
    {
      svg: OrderListIcon,
      title: "Order List",
      handler: toggleOL,
      checker: isOL,
    },
    {
      svg: UnOrderListIcon,
      title: "UnOrder List",
      handler: toggleUL,
      checker: isUL,
    },
    { svg: NestedItem, title: "Nested Item", checker: isOL || isUL },

    {
      svg: UnNestedItem,
      title: "UnNested Item",
      checker: isOL || isUL,
    },
    {
      svg: LinkAttachment,
      title: "Link",
      handler: (editorState, stateHandler) => {
        setIsLinkInput(true);
      },
      checker: (editorState) => hasInlineStyleOf(editorState, "LINK"),
    },
    {
      svg: AtTheRate,
      title: "AtTheRate",

      handler: (editorState, stateHandler) => {
        handleToggleAtSymbol();
      },
      checker: (editorState) => {},
    },
    {
      title: "Quotation",
      handler: toggleBlockquote,
      checker: isBlockquote,
      svg: DoubleQuote,
    },
    {
      svg: Code,
      title: "Code",
      handler: (editorState, stateHandler) => {
        toggleInlineStyle(editorState, "code-block");
        toggleBlockType("code-block");
      },

      checker: (editorState) => hasInlineStyleOf(editorState, "code-block"),
    },

    {
      svg: Sigma,
      title: "Sigma",
      handler: (editorState, stateHandler) => {
        toggleInlineStyle(editorState, LATEX);
      },
      checker: (editorState) => hasInlineStyleOf(editorState, LATEX),
    },
    {
      svg: Backward,
      title: "Backward",
      handler: (editorState, stateHandler) => handleUndo(),
    },
    {
      svg: Forward,
      title: "Forward",
      handler: (editorState, stateHandler) => handleRedo(),
    },
  ];
  const ButtonTemplate = (className) => {
    return buttons?.map((button) => {
      if (button.svg) {
        const ButtonSvg = button.svg;
        return (
          <span
            key={button.title}
            className={`p-[0.2rem] rounded cursor-pointer hover:border hover:border-[#2563eb] ${className} ${
              button?.checker?.(editorState) &&
              !["Nested Item", "UnNested Item"].includes(button.title)
                ? "border"
                : "border-transparent border"
            } ${
              ["Nested Item", "UnNested Item"].includes(button.title) &&
              !(isOL(editorState) || isUL(editorState))
                ? "hidden"
                : ""
            } 
                ${button.title === "Backward" && !isUndo ? "opacity-30" : ""} 
                ${button.title === "Forward" && !isRedo ? "opacity-30" : ""} 
                `}
            onMouseDown={(e) => {
              e.preventDefault();
              button?.handler?.(editorState, setEditorState);
              if (button.title === "Nested Item") {
                handleKeyCommand("increase-depth", editorState);
                return;
              }
              if (button.title === "UnNested Item") {
                handleKeyCommand("decrease-depth", editorState);
                return;
              }
            }}
          >
            <ButtonSvg
              className={`${
                button?.checker?.(editorState) &&
                !["Nested Item", "UnNested Item"].includes(button.title)
                  ? "[&>path]:fill-[#2563eb]"
                  : ""
              }`}
            />
          </span>
        );
      } else {
        return (
          <button
            key={button.title}
            className={`p-[0.2rem] rounded cursor-pointer hover:border hover:border-[#2563eb] ${className} ${
              button.checker(editorState)
                ? "border"
                : "border-transparent border"
            }`}
            onMouseDown={(e) => {
              e.preventDefault();
              button.handler(editorState, setEditorState);
            }}
          >
            {button.title}
          </button>
        );
      }
    });
  };

  let options = {
    inlineStyles: {
      LATEX: { attributes: { class: "latex" } },
      HASHTAG: { attributes: { class: "hashtag" } },
    },
    // blockRenderers: {
    //   atomic: (block) => {
    //     let data = block.getData();
    //     // if (data.get("foo") === "bar") {
    //     //   return "<div>" + block.getText() + "</div>";
    //     // }
    //   },
    // },
    // entityStyleFn: (entity) => {
    //   const entityType = entity.get("type").toLowerCase();
    //   if (entityType === "image") {
    //     const data = entity.getData();
    //     return {
    //       element: "img",
    //       attributes: {
    //         src: data.src,
    //       },
    //       style: {
    //         // Put styles here...
    //       },
    //     };
    //   }
    // },
  };

  const questionId = useIsToAnswerStore((state) => state.questionId);
  const setQuestionId = useIsToAnswerStore((state) => state.setQuestionId);

  const quoraQuestions = useQuoraQuestionsStore(
    (state) => state.quoraQuestions
  );
  const setQuoraQuestions = useQuoraQuestionsStore(
    (state) => state.setQuoraQuestions
  );
  useEffect(() => {
    setQuestionId(questionId);
  }, [questionId]);

  const setShouldRefetchQuestion = useShouldRefetchQuestionStore(
    (state) => state.setShouldRefetchQuestion
  );
  // if (questionId) console.log("questionId", questionId);
  const setIsToAnswer = useIsToAnswerStore((state) => state.setIsToAnswer);
  const setQuestion = useIsToAnswerStore((state) => state.setQuestion);
  const searchResults = useSearchValueStore((state) => state.searchResults);
  const setSearchResults = useSearchValueStore(
    (state) => state.setSearchResults
  );

  const setOpenModel = useOpenModelStore((state) => state.setOpenModel);
  const handlePost = () => {
    const rawContentState = convertToRaw(editorState.getCurrentContent());
    const searchText = editorState.getCurrentContent().getPlainText();
    // return;
    fetch(`${baseURL}/post/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify({
        content: rawContentState,
        questionId,
        searchText,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.status === "success") {
          toast.success(data.message);
          console.log("data", data);
          if (quoraQuestions) {
            const filterQuestions = quoraQuestions.filter(
              (question) => question._id !== questionId
            );
            setQuoraQuestions(filterQuestions);
          }
          if (searchResults) {
            const filterSearchResults = searchResults.filter(
              (question) => question._id !== questionId
            );
            setSearchResults(filterSearchResults);
          }
          setQuestion("");
          setQuestionId("");
          setIsToAnswer(false);
          setOpenModel(null);
        } else {
          toast.error(data.message);
        }
      });
  };

  const handleDraftToHtml = () => {
    const rawContentState = convertToRaw(editorState.getCurrentContent());
    console.log("rawContentState", rawContentState);
    let html = stateToHTML(editorState.getCurrentContent(), options);
    html = html
      .replace(/<figure>/g, "")
      .replace(/<\/figure>/g, "")
      .replace(/<.*>(.*#.*)?<\/.*>/g, (match) => {
        match = match
          .trim()
          .replace(/#\S+/g, "<span class='hashtag'>$&</span>");
        // .replace(/<p>/g, "")
        // .replace(/<\/p>/g, "");
        return match;
      });

    const htmlDocs = html.replace(
      /(<pre><code>.*?<\/code><\/pre>\s*){1,}/g,
      (match) => {
        match = match.trim();
        match = match
          .replace(/<pre><code>/g, "<code>")
          .replace(/<\/code><\/pre>/g, "</code>");

        return `<div class="code">${match}</div>`;
      }
    );
    console.log("htmlDocs", htmlDocs);
  };
  const {
    register,
    handleSubmit,
    control,
    watch,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      images: [],
    },
  });
  const { fields, append, remove } = useFieldArray({
    control,
    name: "images",
  });

  const imgUrls = watch("images");
  const imageUploadRef = useRef(null);

  function handleImage(e, isUrl = false) {
    // e.preventDefault();
    let updatedEditorState = editorState;
    if (!isUrl) {
      const files = e.target.files;
      for (let i = 0; i < files.length; i++) {
        const reader = new FileReader();
        const file = files[i];
        reader.onload = () => {
          const url = reader.result;
          const { newEditorState, entityKey } = insertImage(
            updatedEditorState,
            url
          );
          updatedEditorState = newEditorState;
          setEditorState(updatedEditorState);
        };
        reader.readAsDataURL(file);
      }
    } else {
      imgUrls?.forEach((url) => {
        if (url) {
          const { newEditorState, entityKey } = insertImage(
            updatedEditorState,
            url
          );
          updatedEditorState = newEditorState;
          setEditorState(updatedEditorState);
        }
      });
      reset();
    }
    setIsImageInput(false);
    setIsImageUrlInput(false);
  }
  const insertImage = (editorState, url) => {
    const contentState = editorState.getCurrentContent();
    const contentStateWithEntity = contentState.createEntity(
      "IMAGE",
      "IMMUTABLE",
      { src: url }
    );
    const entityKey = contentStateWithEntity.getLastCreatedEntityKey();
    const newEditorState = EditorState.set(editorState, {
      currentContent: contentStateWithEntity,
    });
    return {
      newEditorState: AtomicBlockUtils.insertAtomicBlock(
        newEditorState,
        entityKey,
        " "
      ),
      entityKey,
    };
  };

  const handleToggleAtSymbol = () => {
    const selection = editorState.getSelection();
    const contentState = editorState.getCurrentContent();

    // Get the block where the selection is (this is where we need to modify the text)
    const selectedBlockKey = selection.getStartKey();
    const selectedBlock = contentState.getBlockForKey(selectedBlockKey);

    // Get the text from the selected block
    const blockText = selectedBlock.getText();

    // Check if the text at the cursor position starts with "@"
    const startOffset = selection.getStartOffset();
    const endOffset = selection.getEndOffset();

    // Check if the "@" is at the correct position

    // console.log("blockText", blockText);
    // console.log("lastIndex", blockText.lastIndexOf("@"));

    // blockText[startOffset - 1] === "@"
    if (blockText[blockText.lastIndexOf("@")] === "@") {
      // Create a selection that targets only the "@" symbol
      // console.log("selection", startOffset, endOffset);

      const newSelection = selection.merge({
        // anchorOffset: startOffset - 1,
        anchorOffset: blockText.lastIndexOf("@"),
        focusOffset: endOffset,
      });

      // Remove the "@" by replacing it with an empty string
      const newContentState = Modifier.replaceText(
        contentState,
        newSelection,
        "" // Replace with an empty string to remove the "@"
      );

      // Update the editor state with the modified content state
      const newEditorState = EditorState.push(
        editorState,
        newContentState,
        "remove-range"
      );
      const newState = EditorState.forceSelection(newEditorState, newSelection);
      setEditorState(newState);
    } else {
      // console.log("blockText", blockText);

      const newContentState = Modifier.replaceText(
        contentState,
        selection.merge({
          anchorOffset: startOffset,
          focusOffset: endOffset,
        }),
        "@" // Replace with an empty string to remove the "@"
      );

      // Update the editor state with the modified content state
      const newEditorState = EditorState.push(
        editorState,
        newContentState,
        "remove-range"
      );

      const newState = EditorState.forceSelection(
        newEditorState,
        newEditorState.getCurrentContent().getSelectionAfter()
      );
      setEditorState(newState);
    }
  };

  return (
    <div>
      {/* absolute bottom-0 w-full px-2 py-3 bg-gray-100  */}
      <div
        className={`flex ${isLinkInput ? "items-center" : ""} gap-x-5 ${
          isPostButton ? "p-2" : "px-2 h-10"
        } ${className} `}
      >
        {isLinkInput && (
          <div
            ref={linkInputDivRef}
            className="flex items-center justify-between w-full gap-4 text-sm child-flex"
          >
            <div className="grow">
              <LinkAttachment
                style={{ width: "28px", height: "28px" }}
                className="[&>path]:fill-blue-600 g"
              />
              <input
                ref={linkInputRef}
                type="text"
                placeholder="Enter URL"
                className="w-full text-[0.97rem] outline-none bg-transparent placeholder:text-gray-500 text-gray-700 "
                value={url}
                onChange={(e) => setUrl(e.target.value)}
              />
            </div>
            <div>
              <span className="flex items-center gap-1 ">
                <input
                  onClick={(e) => setIsFootnote(e.target.checked)}
                  type="checkbox"
                  id="footnote"
                />
                <label className="text-xs text-gray-400" htmlFor="footnote">
                  Footnote
                </label>
              </span>
              &nbsp;
              <span
                aria-label="cancel"
                role="button"
                className={`${
                  url
                    ? "border-blue-500 text-blue-500 hover:bg-blue-200/40 "
                    : "text-gray-500 hover:bg-gray-200/40"
                } border  px-3.5 py-1 rounded-full  font-semibold  active:opacity-80 cursor-pointer select-none `}
                onClick={() => {
                  setIsLinkInput(false);
                  if (url) {
                    const entityKey = onAddLink(url);
                    // console.log("entityKey", entityKey);
                  }
                }}
              >
                {url ? "Add" : "Cancel"}
              </span>
            </div>
            <span className="w-px py-2 bg-gray-300 h-[1.8rem]"></span>
          </div>
        )}
        {!isLinkInput && (
          <div
            id="formattingContainer"
            ref={formattingRef}
            className="relative w-full overflow-hidden [&>div]:transition-all"
          >
            <div
              className="absolute [&>div]:cursor-pointer items-center flex w-full h-full gap-2 formatting [&>div>svg:nth-of-type(1)]:pointer-events-none"
              onClick={(e) => {
                if (e.target.getAttribute("data-id") === "formatting") {
                  setIsImageInput(false);
                  useTraversal(e.target, "parentElement", 1).style.top =
                    "-100%";
                  useTraversal(
                    e.target,
                    "parentElement",
                    1
                  ).nextElementSibling.style.top = "0";
                }
              }}
            >
              <div
                // onClick={() => (isFirstRender.current = false)}
                data-id="formatting"
              >
                <Formatting />
              </div>
              <div
                className="relative"
                onClick={() => {
                  // const url =
                  //   "https://images.unsplash.com/photo-1687735514499-93e65d39e137?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8aGFyJTIwaGFyJTIwbWFoYWRldnxlbnwwfHwwfHx8MA%3D%3D";
                  // addImage(editorState, url);
                  setIsImageInput(!isImageInput);
                }}
              >
                <div>
                  <ImageSvg />
                </div>
              </div>
            </div>
            <div className="absolute flex items-center w-full h-full gap-2 cursor-pointer">
              {/* unFormatting button */}
              <div
                data-id="unFormatting"
                onClick={(e) => {
                  if (e.target.getAttribute("data-id") === "unFormatting") {
                    e.target.parentElement.style.top = "100%";
                    e.target.parentElement.previousElementSibling.style.top =
                      "0%";
                  }
                }}
                className="bg-blue-600 rounded-full"
              >
                <MdKeyboardArrowDown
                  size={24}
                  className="p-[0.1rem] pointer-events-none"
                  color="white"
                />
              </div>
              <div
                ref={richButtonContainerRef}
                onMouseMove={handleMouseMove}
                onMouseDown={handleMouseDown}
                onMouseUp={handleMouseUp}
                onMouseLeave={handleMouseLeave}
                className="flex gap-3 flow-y"
              >
                <ButtonTemplate />
              </div>
            </div>
          </div>
        )}
        {isImageInput && (
          <div
            key={imageUploadRef}
            className={`absolute z-10  px-2 py-1 bg-white border border-[#e0e0e0] rounded ${
              isImageUrlInput ? "bottom-1  right-1 " : "-top-4 left-20"
            }  `}
          >
            {!isImageUrlInput && (
              <div ref={imageUploadRef} className="flex items-center gap-2 ">
                <label
                  htmlFor="imageInput"
                  className="p-1 border border-transparent rounded active:border-blue-500 hover:border-inherit"
                >
                  <BsUpload cursor={"pointer"} />
                  <input
                    onChange={handleImage}
                    id="imageInput"
                    className="hidden"
                    type="file"
                    accept="image/*"
                    multiple
                  />
                </label>

                <button
                  className="box-border px-1 border border-transparent rounded active:border-blue-500 hover:border-inherit"
                  onClick={() => {
                    setIsImageUrlInput(true);
                  }}
                >
                  Links
                </button>
              </div>
            )}
            {isImageUrlInput && (
              <div>
                <p>Image URL</p>
                <p className="text-[#E4A11B] text-sm mt-1 ">
                  dont't upload copyright image otherwise you will be banned
                </p>
                <form
                  onSubmit={handleSubmit((data) => {
                    handleImage(data, true);
                  })}
                  className="[&>*]:mb-2 mt-5 focus:[&_input[type='text']]:ring-blue-500 [&_input[type='text']]:ring-2 "
                >
                  {fields.map((field, index) => {
                    // if (index === 0) return;
                    return (
                      <div key={field.id} className="flex items-center gap-2 ">
                        <input
                          className="p-1 border border-blue-500 rounded outline-none"
                          type="text"
                          {...register(
                            `images.${index}`,
                            index === 0
                              ? {
                                  required: {
                                    value: true,
                                    message: "At least one image is required",
                                  },
                                }
                              : {}
                          )}
                        />
                        <button
                          className="px-2 py-1 text-white bg-red-500 rounded "
                          type="button"
                          onClick={() => {
                            remove(index);
                          }}
                        >
                          Remove
                        </button>
                      </div>
                    );
                  })}
                  {errors.images?.[0]?.message && (
                    <ErrorMessage message={errors.images?.[0]?.message} />
                  )}

                  <div className="flex gap-2 px-3 py-2 rounded bg-[#F0F0F0]">
                    <button
                      className="block px-2 py-1 text-white bg-green-500 rounded"
                      type="button"
                      onClick={() => {
                        append("");
                      }}
                    >
                      Add
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setIsImageInput(false);
                        setIsImageUrlInput(false);
                      }}
                      className="px-2 py-1 text-white bg-yellow-500 rounded"
                    >
                      Cancel
                    </button>
                    <input
                      className="px-2 py-1 text-white bg-blue-500 rounded"
                      type="submit"
                      value="ok"
                    />
                  </div>
                </form>
              </div>
            )}
          </div>
        )}

        {isPostButton && (
          <Button
            onClick={handlePost}
            name={"Post"}
            className={`ml-auto ${
              !isPostContent
                ? "!cursor-not-allowed pointer-events-none bg-blue-600 opacity-50"
                : "active:bg-blue-700 bg-blue-600"
            } `}
            disabled={!isPostContent}
          />
        )}
      </div>
    </div>
  );
};

export default TextEditorButtons;

import {
  AtomicBlockUtils,
  CompositeDecorator,
  DefaultDraftBlockRenderMap,
  Editor,
  EditorState,
  getDefaultKeyBinding,
  Modifier,
  RichUtils,
} from "draft-js";
import "draft-js/dist/Draft.css";
import immutable, { is } from "immutable";
import { RxCross2 } from "react-icons/rx";
import { decorateUsername } from "../../utils/fn_utils";
import DefaultUserImage from "../../assets/user.png";
import {
  insertImage,
  insertMedia,
  removeAtomicBlock,
} from "../../utils/draft_utils";
import MediaComponent from "../comp_util/MediaComponent";

const FlexibleTextEditor = ({
  placeholder,
  isPlaceholder = true,
  editorState,
  setEditorState,
  isPopoverVisible,
  setPopoverVisible,
  popoverPosition,
  setPopoverPosition,
  suggestions,
  customStyleMap,
  setIsPostContent,
  // mention
  mensionFraction = 4.5,
  mensionMinHeight = 60,
  mensionMaxHeight = 150,
  setMensionInput,
}) => {
  const toggleOL = () => {
    setEditorState(RichUtils.toggleBlockType(editorState, "ordered-list-item"));
  };

  const toggleUL = () => {
    setEditorState(
      RichUtils.toggleBlockType(editorState, "unordered-list-item")
    );
  };

  const toggleInlineStyle = (type) => {
    setEditorState(RichUtils.toggleInlineStyle(editorState, type));
  };
  const toggleBlockType = (type) => {
    setEditorState(RichUtils.toggleBlockType(editorState, type));
  };
  const keyBindingFn = (e) => {
    if (e.shiftKey && e.key === "C") {
      // getCurrentContent(), getSelection(), getBlockForKey, getStartKey, getText

      const contentState = editorState.getCurrentContent();

      // Step 2: Get the current selection (cursor position or highlighted text) in the editor
      const selection = editorState.getSelection();

      // Step 3: Get the block where the current selection is
      // (This will be the block that we’re currently working within in the editor)
      const currentBlock = contentState.getBlockForKey(selection.getStartKey());
    }
    if (e.key === "Tab") {
      return e.shiftKey ? "decrease-depth" : "increase-depth";
    }
    if (e.key === "Backspace" && (isOL(editorState) || isUL(editorState)))
      isOL
        ? toggleOL(editorState, setEditorState)
        : toggleUL(editorState, setEditorState);

    if (e.key === "Backspace") {
      e.preventDefault();
      return "backspace";
    }

    if (e.message === "remove-atomic-block") {
      e.preventDefault();
      return "remove-atomic-block";
    }

    // keyboard shortcuts
    if (e.ctrlKey && e.key === "b") {
      e.preventDefault();
      return "bold";
    }
    if (e.ctrlKey && e.key === "i") {
      e.preventDefault();
      return "italic";
    }
    if (e.ctrlKey && e.shiftKey && e.code === "Digit7") {
      e.preventDefault();
      return "ol";
    }
    if (e.ctrlKey && e.shiftKey && e.code === "Digit8") {
      e.preventDefault();
      return "ul";
    }
    if (e.ctrlKey && e.shiftKey && e.code === "Digit9") {
      e.preventDefault();
      return "blockquote";
    }
    if (e.ctrlKey && e.shiftKey && e.key === "K") {
      e.preventDefault();
      return "code";
    }
    if (e.ctrlKey && e.shiftKey && e.key === "L") {
      e.preventDefault();
      return "latex";
    }

    return getDefaultKeyBinding(e);
  };
  // Handle custom commands in handleKeyCommand
  const getCurrentBlockType = () => {
    const selection = editorState.getSelection();
    const contentState = editorState.getCurrentContent();
    const blockKey = selection.getStartKey();
    const block = contentState.getBlockForKey(blockKey);
    return block?.getType(); // Returns the type of the current block
  };

  const hasInlineStyleOf = (editorState, style) => {
    const currentStyle = editorState.getCurrentInlineStyle();
    return currentStyle.has(style);
  };
  const isH1 = () => getCurrentBlockType() === "header-one";
  const isOL = () => getCurrentBlockType() === "ordered-list-item";
  const isUL = () => getCurrentBlockType() === "unordered-list-item";
  const isBlockquote = () => getCurrentBlockType() === "blockquote";
  const isBold = () => hasInlineStyleOf(editorState, "BOLD");
  const isItalic = () => hasInlineStyleOf(editorState, "ITALIC");
  const isCode = () => hasInlineStyleOf(editorState, "code-block");

  const handleKeyCommand = (command, editorState) => {
    // Function to handle the tab action
    const handleTab = (editorState) => {
      const selection = editorState.getSelection();
      const contentState = editorState.getCurrentContent();
      const block = contentState.getBlockForKey(selection.getStartKey());

      // Check if current block is a 'code-block'
      if (block.getType() === "code-block") {
        console.log("हरिॐ");
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

      case "bold": {
        toggleInlineStyle("BOLD");
        return "handled";
      }

      case "italic": {
        toggleInlineStyle("ITALIC");
        return "handled";
      }

      case "ol": {
        toggleOL();
        return "handled";
      }
      case "ul": {
        toggleUL();
        return "handled";
      }

      case "blockquote": {
        toggleBlockType("blockquote");
        return "handled";
      }

      case "code": {
        toggleInlineStyle("code-block");
        toggleBlockType("code-block");
        return "handled";
      }

      case "latex": {
        toggleInlineStyle("LATEX");
        return "handled";
      }

      case "backspace": {
        // return "handled";
      }

      default:
        return "not-handled";
    }

    return "not-handled";
  };

  const getElementAtCursor = () => {
    const selectionWindow = window.getSelection();

    // Make sure there is a valid selection
    let element;
    let range;
    if (selectionWindow.rangeCount > 0) {
      // Get the first range of the selection (caret position)
      range = selectionWindow.getRangeAt(0);

      // Check the node at the cursor position

      element = range.commonAncestorContainer.parentElement;
    }

    if (!element) return;
    setPopoverPosition({
      element,
      offsetTop: range?.endContainer?.parentElement?.offsetParent?.offsetTop,
      offsetLeft: range?.endContainer?.parentElement?.offsetParent?.offsetLeft,
    });
  };
  const handleEditorChange = (newEditorState) => {
    setEditorState(newEditorState);
    const plainText = newEditorState.getCurrentContent().getPlainText();

    if (/\S/.test(plainText)) {
      setIsPostContent(true);
    } else {
      setIsPostContent(false);
    }

    const selection = newEditorState.getSelection();
    const anchorKey = selection.getAnchorKey();
    const block = newEditorState.getCurrentContent().getBlockForKey(anchorKey);
    const blockText = block.getText();
    const cursorPosition = selection.getStartOffset();

    if (
      blockText.includes("@") &&
      cursorPosition > blockText.indexOf("@") + 1
    ) {
      // console.log("at the rate index", blockText.indexOf("@"));

      // mensionInput
      const mensionInput = blockText.slice(blockText.indexOf("@") + 1);
      setMensionInput(mensionInput);

      setPopoverVisible(true);

      const elementAtCursor = getElementAtCursor();
    } else setPopoverVisible(false);
  };
  const handleSelectSuggestion = (suggestion) => {
    const selection = editorState.getSelection();
    const contentState = editorState.getCurrentContent();

    const selectedBlockKey = selection.getStartKey();
    const selectedBlock = contentState.getBlockForKey(selectedBlockKey);

    // Get the text from the selected block
    const blockText = selectedBlock.getText();
    const cursorPosition = selection.getStartOffset();

    const contentStateWithEntity = contentState.createEntity(
      "LINK",
      "MUTABLE",
      {
        url: decorateUsername(`/profile/${suggestion.name}`),
        target: "_blank",
        rel: "noopener noreferrer",
        className: "mention",
      } // Use the link from the suggestion
    );
    const entityKey = contentStateWithEntity.getLastCreatedEntityKey();

    const newContentState = Modifier.replaceText(
      contentStateWithEntity,
      selection.merge({
        // anchorOffset: selection.getStartOffset() - 2,
        anchorOffset: blockText.lastIndexOf("@", cursorPosition),
      }),
      suggestion.name, // Replace the text with the mention's name
      null,
      entityKey // Associate the entity (link) with the text
    );

    setEditorState(
      EditorState.push(editorState, newContentState, "insert-characters")
    );
    setPopoverVisible(false); // Hide the popover after selection
  };
  const MentionPopover = ({ position, suggestions, onSelectSuggestion }) => {
    if (!suggestions?.length === 0) return null;
    return (
      <div
        onMouseDown={(e) => e.preventDefault()}
        style={{
          position: "absolute",
          top:
            position.offsetTop +
            mensionFraction * position.element?.offsetHeight,
          left: position.element?.offsetLeft + position.element?.offsetWidth,
          minHeight: mensionMinHeight,
          maxHeight: mensionMaxHeight,
          height: 60 * suggestions.length,
          // height: "auto",
        }}
        className="z-10 max-w-[250px] w-full h-full overflow-y-auto bg-white border-x border-x-[#dee0e1] border-gray-300 rounded-sm mension-suggestion-shadow box-border"
      >
        {suggestions?.map((suggestion, index) => (
          <div
            tabIndex={index}
            className="flex items-center p-2 space-x-2 border-b cursor-pointer hover:bg-gray-100/70"
            key={suggestion?._id + index}
            onClick={() => onSelectSuggestion(suggestion)}
          >
            <img
              src={suggestion?.avatar || DefaultUserImage}
              alt={suggestion?.name}
              style={{ width: 26, height: 26, borderRadius: "50%" }}
            />
            <div className="flex flex-col last:text-sm">
              <span>{suggestion?.name}</span>
              <span>({suggestion?.role || "user"})</span>
            </div>
          </div>
        ))}
      </div>
    );
  };
  const blockRendererFn = (block) => {
    const contentState = editorState.getCurrentContent();
    let entityType;

    const selectionState = editorState.getSelection();
    const startOffset = selectionState.getStartOffset();
    const stylesAtOffset = block.getInlineStyleAt(startOffset);
    block.findEntityRanges((character) => {
      if (character.getEntity()) {
        entityType = contentState.getEntity(character.getEntity()).getType();
      }
    });

    // block.getType() i.e. "atomic"
    switch (entityType) {
      case "IMAGE":
        return {
          component: MediaComponent,
          editable: true,
          props: {
            onRemove: (blockKey) => {
              const newEditorState = removeAtomicBlock(editorState, blockKey);
              setEditorState(newEditorState);
            },
          },
        };
      case "IFRAME":
        return {
          component: MediaComponent,
          editable: true,
          props: {
            onRemove: (blockKey) => {
              const newEditorState = removeAtomicBlock(editorState, blockKey);
              setEditorState(newEditorState);
            },
          },
        };
      case "VIDEO": {
        return {
          component: MediaComponent,
          editable: true,
          props: {
            onRemove: (blockKey) => {
              const newEditorState = removeAtomicBlock(editorState, blockKey);
              setEditorState(newEditorState);
            },
          },
        };
      }
      case "AUDIO": {
        return {
          component: MediaComponent,
          editable: true,
          props: {
            onRemove: (blockKey) => {
              const newEditorState = removeAtomicBlock(editorState, blockKey);
              setEditorState(newEditorState);
            },
          },
        };
      }
      // case "LATEX":
      //   return {
      //     component: LatexComponent,
      //     editable: true,
      //     props: {
      //       onRemove: removeAtomicBlock,
      //     },
      //   };
      default:
        return null;
    }
  };

  const blockRenderMap = immutable.Map({
    "code-block": {
      element: "code",
      wrapper: <div className="code"></div>, // Adds a custom class for styling
    },
  });

  const extendedBlockRenderMap =
    DefaultDraftBlockRenderMap.merge(blockRenderMap);

  const ImageComponent = (props) => {
    const { src } = props.contentState
      ?.getEntity(props.block?.getEntityAt(0))
      .getData();
    const blockKey = props.block?.getKey();
    return (
      <div className="relative transition-all w-fit">
        <img
          src={
            src ||
            "https://m.media-amazon.com/images/I/6164bYTG-QL._AC_UF1000,1000_QL80_.jpg"
          }
          alt={props.alt ?? "image"}
          style={{ width: "100%", height: "100%" }}
        />
        <RxCross2
          onMouseDown={(e) => {
            e.stopPropagation();
            props.blockProps.onRemove(blockKey);
          }}
          cursor={"pointer"}
          size={24}
          className="absolute top-0 right-0 text-white bg-black rounded-full"
        />
      </div>
    );
  };
  const IframeComponent = ({ blockProps, contentState, block }) => {
    const entity = contentState?.getEntity(block.getEntityAt(0));
    const { src } = entity.getData();
    console.log({ src });
    const blockKey = block.getKey();

    return (
      <div
        className="relative transition-all iframe-container"
        style={{ position: "relative", paddingBottom: "56.25%", height: 0 }}
      >
        <iframe
          src={src}
          title="Embedded Video"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
          }}
        />
        <RxCross2
          onMouseDown={(e) => {
            e.stopPropagation();
            blockProps.onRemove(blockKey);
          }}
          cursor={"pointer"}
          size={24}
          className="absolute top-0 right-0 text-white bg-black rounded-full"
        />
      </div>
    );
  };
  const VideoComponent = ({ blockProps, contentState, block }) => {
    const entity = contentState?.getEntity(block.getEntityAt(0));
    const { src } = entity.getData();
    const blockKey = block.getKey();
    console.log("video", entity);

    return (
      <div
        className="relative transition-all iframe-container"
        style={{ position: "relative", paddingBottom: "56.25%", height: 0 }}
      >
        <video
          src={src}
          title="Embedded Video"
          controls
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
          }}
        />
        <RxCross2
          onMouseDown={(e) => {
            e.stopPropagation();
            blockProps.onRemove(blockKey);
          }}
          cursor={"pointer"}
          size={24}
          className="absolute top-0 right-0 text-white bg-black rounded-full"
        />
      </div>
    );
  };
  const AudioComponent = ({ blockProps, contentState, block }) => {};

  const Image_REGEX = /(https?:\/\/.*\.(?:png|jpg|jpeg|gif|svg|webp))/gi;
  const Youtube_REGEX =
    /^(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/;

  const Audio_REGEX =
    /https?:\/\/[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}(?:\/[^\s]*)?\.(mp3|wav|ogg|flac|aac|m4a|webm)$/;
  const handlePastedFiles = (files) => {
    const file = files[0];
    console.log(file);
    // for image
    if (file && file.type.startsWith("image/")) {
      const reader = new FileReader();

      reader.onload = () => {
        const imageSrc = reader.result; // Base64 image data
        const { newEditorState } = insertImage(editorState, imageSrc);

        setEditorState(newEditorState);
      };

      reader.readAsDataURL(file);
      return "handled"; // Prevent default handling
    }
    // for video
    if (file && file.type.startsWith("video/")) {
      const reader = new FileReader();
      reader.onload = () => {
        const videoSrc = reader.result;

        const { newEditorState } = insertMedia(editorState, "VIDEO", videoSrc);
        setEditorState(newEditorState);
      };
      reader.readAsDataURL(file);
      return "handled";
    }
    // for audio
    if (file && file.type.startsWith("audio/")) {
      const reader = new FileReader();
      reader.onload = () => {
        const audioSrc = reader.result;
        const { newEditorState } = insertMedia(editorState, "AUDIO", audioSrc);
        setEditorState(newEditorState);
      };
      reader.readAsDataURL(file);
      return "handled";
    }
    return "not-handled";
  };
  const handlePastedText = (text, html, editorState) => {
    console.log(text);
    if (Image_REGEX.test(text)) {
      const { newEditorState } = insertMedia(editorState, "IMAGE", text);
      setEditorState(newEditorState);
      return "handled"; // Prevent the default pasting behavior
    }
    if (Youtube_REGEX.test(text)) {
      const videoURL = text.replace("youtu.be", "youtube.com/embed");
      const { newEditorState } = insertMedia(editorState, "IFRAME", videoURL);

      setEditorState(newEditorState);
      return "handled";
    }
    if (Audio_REGEX.test(text)) {
      const { newEditorState } = insertMedia(editorState, "AUDIO", text);
      setEditorState(newEditorState);
      return "handled";
    }

    return "not-handled"; // Let other pasted content proceed as normal
  };

  return (
    <>
      <Editor
        placeholder={isPlaceholder ? placeholder || "Type something..." : ""}
        handleKeyCommand={handleKeyCommand}
        keyBindingFn={keyBindingFn}
        editorState={editorState}
        onChange={handleEditorChange}
        blockRenderMap={extendedBlockRenderMap}
        blockRendererFn={blockRendererFn}
        customStyleMap={customStyleMap}
        handlePastedText={handlePastedText}
        handlePastedFiles={handlePastedFiles}
      />
      {isPopoverVisible && (
        <MentionPopover
          position={popoverPosition}
          suggestions={suggestions}
          onSelectSuggestion={handleSelectSuggestion}
        />
      )}
    </>
  );
};

export default FlexibleTextEditor;

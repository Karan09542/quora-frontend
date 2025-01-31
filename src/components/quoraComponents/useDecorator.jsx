import {
  CompositeDecorator,
  ContentBlock,
  EditorState,
  genKey,
  Modifier,
} from "draft-js";
import React from "react";
import { RxCross2 } from "react-icons/rx";

function useDecorator({ isFootnote, editorState, setEditorState }) {
  const AtTheRate_REGEX = /@[\p{L}\p{M}]+/gu;
  const HASHTAG_REGEX = /#[\p{L}\p{M}]+/gu;
  const Image_REGEX = /(https?:\/\/.*\.(?:png|jpg|jpeg|gif|svg|webp))/gi;
  function hashtagStrategy(contentBlock, callback, contentState) {
    findWithRegex(HASHTAG_REGEX, contentBlock, callback);
  }

  async function findWithRegex(regex, contentBlock, callback) {
    const text = contentBlock.getText();
    let matchArr, start;
    while ((matchArr = regex.exec(text)) !== null) {
      start = matchArr.index;
      callback(start, start + matchArr[0].length);
    }
  }
  const HashtagSpan = (props) => {
    // {...props}
    return (
      <span {...props} className="hashtag">
        {props.children}
      </span>
    );
  };
  function linkStrategy(contentBlock, callback, contentState) {
    contentBlock.findEntityRanges(
      (character) => {
        const entityKey = character.getEntity();
        return (
          entityKey !== null &&
          contentState.getEntity(entityKey).getType() === "LINK"
        );
      },

      (start, end) => callback(start, end)
    );
  }
  const LinkComponent = (props) => {
    const { url, rel, target, className } = props.contentState
      .getEntity(props.entityKey)
      .getData();
    // console.log("props", props.contentState.getEntity(props.entityKey));
    return (
      <a
        onClick={(e) => {
          const link = e.target.parentElement.parentElement;
          const url = link.href;
          window.open(url, "_blank");
        }}
        target={target}
        rel={rel}
        href={url}
        className={`${className} ${isFootnote ? "footnote" : ""}`}
      >
        {props.children}
      </a>
    );
  };
  const LatexComponent = (props) => {
    const { className } = props.contentState
      .getEntity(props.entityKey)
      .getData();
    return <span className={className}>{props.children}</span>;
  };
  function insertNewBlockBelowImage(editorState, blockKey) {
    const contentState = editorState.getCurrentContent();
    const blockMap = contentState.getBlockMap();

    // Get the block where the image is detected
    const currentBlock = blockMap.get(blockKey);

    // Safely access the block
    if (!currentBlock) return editorState; // Ensure block exists

    // Create a new empty block
    const newBlock = new ContentBlock({
      key: genKey(),
      type: "unstyled", // Normal paragraph block
      text: "",
    });

    // Insert the new block below the current block
    const blocksBefore = blockMap
      .toSeq()
      .takeUntil((block) => block === currentBlock);
    const blocksAfter = blockMap
      .toSeq()
      .skipUntil((block) => block === currentBlock)
      .rest();

    const newBlockMap = blocksBefore
      .concat(
        [[blockKey, currentBlock]],
        [[newBlock.getKey(), newBlock]],
        blocksAfter
      )
      .toOrderedMap();

    const newContentState = contentState.merge({
      blockMap: newBlockMap,
      selectionAfter: contentState
        .getSelectionAfter()
        .set("anchorKey", newBlock.getKey()),
    });

    return EditorState.push(editorState, newContentState, "insert-fragment");
  }

  function imageStrategy(contentBlock, callback, contentState) {
    // Find image URLs in the block text
    findWithRegex(Image_REGEX, contentBlock, (start, end) => {
      callback(start, end);

      // // Safely get the block key and insert a new block below
      // const blockKey = contentBlock.getKey();
      // const updatedEditorState = insertNewBlockBelowImage(
      //   editorState,
      //   blockKey
      // );

      // // Ensure editorState exists and is set properly
      // if (updatedEditorState) {
      //   setEditorState(updatedEditorState);
      // }
    });
  }
  const removeImage = (start, end) => {
    const contentState = editorState.getCurrentContent();
    const selectionState = editorState.getSelection();

    // Create a selection around the image URL
    const imageSelection = selectionState.merge({
      anchorKey: selectionState.getAnchorKey(),
      anchorOffset: start,
      focusKey: selectionState.getFocusKey(),
      focusOffset: end,
    });

    // Remove the image URL by replacing it with an empty string
    const newContentState = Modifier.replaceText(
      contentState,
      imageSelection,
      "", // Replace with an empty string
      null
    );

    // Update the editor state
    const newEditorState = EditorState.push(
      editorState,
      newContentState,
      "remove-range"
    );

    // Force selection to a valid state
    setEditorState(
      EditorState.forceSelection(
        newEditorState,
        newContentState.getSelectionAfter()
      )
    );
  };
  const ImageComponent = (props) => {
    const { start, end, decoratedText } = props;

    return (
      <div className="relative transition-all w-fit">
        <img
          src={decoratedText}
          alt="Embedded"
          style={{ width: "100%", height: "100%" }}
        />
        <RxCross2
          onMouseDown={(e) => {
            e.stopPropagation();
            removeImage(start, end);
          }}
          cursor={"pointer"}
          size={24}
          className="absolute top-0 right-0 text-white bg-black rounded-full"
        />
      </div>
    );
  };
  const compositeDecorator = new CompositeDecorator([
    {
      strategy: hashtagStrategy,
      component: HashtagSpan,
    },
    {
      strategy: linkStrategy,
      component: LinkComponent,
    },
    {
      strategy: (contentBlock, callback, contentState) => {
        contentBlock.findEntityRanges((character) => {
          const entityKey = character.getEntity();
          return (
            entityKey !== null &&
            contentState.getEntity(entityKey).getType() === "LATEX"
          );
        }, callback);
      },
      component: LatexComponent, // Render with your LatexComponent
    },
    // {
    //   strategy: imageStrategy,
    //   component: ImageComponent,
    // },
  ]);

  return compositeDecorator;
}

export default useDecorator;

// innaino se dharsan hariom hariom
// pilena harinaam ka pyala sare rog mitjaeinge hariom hariom

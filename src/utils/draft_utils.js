import { AtomicBlockUtils, EditorState } from "draft-js";

export const insertImage = (editorState, url) => {
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
export const insertMedia = (editorState, mediaType, src) => {
  const contentState = editorState.getCurrentContent();
  const contentStateWithEntity = contentState.createEntity(
    mediaType,
    "IMMUTABLE",
    { src }
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

export const removeAtomicBlock = (editorState, blockKey) => {
  const contentState = editorState.getCurrentContent();
  const blockMap = contentState.getBlockMap().delete(blockKey);
  const newContentState = contentState.merge({
    blockMap,
  });
  const newEditorState = EditorState.push(
    editorState,
    newContentState,
    "remove-range"
  );
  return newEditorState;
};

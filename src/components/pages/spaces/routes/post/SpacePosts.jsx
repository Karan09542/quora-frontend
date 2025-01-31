import React from "react";
import SpacePostsLeft from "./SpacePostsLeft";
import useResize from "../../../../../hooks/useResize";
import SpacePostsRight from "./SpacePostsRight";
function SpacePosts({ color, spaceName }) {
  // don't use div as parent
  return (
    <>
      <SpacePostsLeft color={color} spaceName={spaceName} />
      <SpacePostsRight color={color} />
    </>
  );
}
export default SpacePosts;

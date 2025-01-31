import React, { useEffect } from "react";
import PostOffice from "../../../../assets/postOffice.webp";
import FollowerTempelate from "./FollowerTempelate";

function FollowingTempelate({ following, isLogin }) {
  return <FollowerTempelate {...following} isLogin={isLogin} />;
}

export default FollowingTempelate;

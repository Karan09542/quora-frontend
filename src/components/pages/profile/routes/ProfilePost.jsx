import React from "react";
import useFetch from "../../../../hooks/useFetch";
import { useBaseURLStore, useIsLoginStore } from "../../../../../Store/model";
import { useOutletContext } from "react-router-dom";
import Loading from "../../../comp_util/Loading";
import PostOfficeTempelate from "../util/PostOfficeTempelate";
import AnswerTile from "../../../quoraComponents/util/AnswerTile";

function ProfilePost() {
  const baseURL = useBaseURLStore((state) => state.baseURL);
  const { profileId, userId } = useOutletContext();
  const isLogin = useIsLoginStore((state) => state.isLogin);

  // fetch posts
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ profileId, userId }),
  };
  const { data, loading } = useFetch({
    url: `${baseURL}/user/post`,
    options,
    dataKey: "posts",
    dependencies: [profileId, userId],
  });

  if (loading) return <Loading />;
  if (data?.length === 0) {
    return <PostOfficeTempelate />;
  }
  return data?.map((post) => (
    <div key={post._id} className="mb-3 [&>div>div]:border-none">
      <AnswerTile
        post={post}
        isShowQuestion={true}
        isCross={false}
        isLogin={isLogin}
      />
      <hr />
    </div>
  ));
}

export default ProfilePost;

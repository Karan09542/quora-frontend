import React from "react";
import { useOutletContext } from "react-router-dom";
import { useBaseURLStore, useIsLoginStore } from "../../../../../Store/model";
import AnswerTile from "../../../quoraComponents/util/AnswerTile";
import PostOfficeTempelate from "../util/PostOfficeTempelate";
import useFetch from "../../../../hooks/useFetch";
import Loading from "../../../comp_util/Loading";

function ProfileAnswer() {
  const { profileId, userId } = useOutletContext();
  const baseURL = useBaseURLStore((state) => state.baseURL);
  const isLogin = useIsLoginStore((state) => state.isLogin);

  // fetch answers
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ profileId, userId }),
  };
  const { data, loading } = useFetch({
    url: `${baseURL}/user/answer`,
    options,
    dataKey: "answers",
    dependencies: [profileId, userId],
  });
  if (loading) return <Loading />;
  if (data?.length === 0) {
    return <PostOfficeTempelate />;
  }

  return data?.map((answer) => (
    <div key={answer._id} className="mb-3 [&>div>div]:border-none">
      <AnswerTile
        post={answer}
        isShowQuestion={true}
        isCross={false}
        isLogin={isLogin}
      />
      <hr />
    </div>
  ));
}

export default ProfileAnswer;

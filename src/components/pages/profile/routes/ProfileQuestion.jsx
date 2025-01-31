import React from "react";
import { useBaseURLStore } from "../../../../../Store/model";
import { useOutletContext } from "react-router-dom";
import Loading from "../../../comp_util/Loading";
import useFetch from "../../../../hooks/useFetch";
import QuestionTemplate from "../../search/util/QuestionTemplate";
import PostOfficeTempelate from "../util/PostOfficeTempelate";

function ProfileQuestion() {
  const baseURL = useBaseURLStore((state) => state.baseURL);
  const { profileId, userId } = useOutletContext();

  const [isFollow, setIsFollow] = React.useState(false);

  // fetch posts
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ profileId, userId }),
  };
  const { data, loading } = useFetch({
    url: `${baseURL}/user/questions`,
    options,
    dataKey: "questions",
    dependencies: [profileId, userId],
  });

  if (loading) return <Loading />;
  if (data?.length === 0) {
    return <PostOfficeTempelate />;
  }
  return data?.map((question) => (
    <QuestionTemplate
      isMore={false}
      isFollow={isFollow}
      setIsFollow={setIsFollow}
      key={question._id}
      {...question}
      showIsFollow={false}
      showIsRequest={false}
    />
  ));
}

export default ProfileQuestion;

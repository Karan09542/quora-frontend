import { toast } from "react-toastify";

export const commonMethodAndHeaders = (accessToken, method = "POST") => {
  return {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
  };
};
export const handleFollowing = (followingTo, baseURL, accessToken) => {
  fetch(`${baseURL}/user/handle-following`, {
    ...commonMethodAndHeaders(accessToken),
    body: JSON.stringify({ followingTo }),
  })
    .then((res) => res.json())
    .then((data) => {
      if (data.status === "success") toast.success(data.message);
    })
    .catch((error) => console.log(error));
};
export const handleQuestionDownvote = (questionId, baseURL, accessToken) => {
  fetch(`${baseURL}/question/handle-downvote`, {
    ...commonMethodAndHeaders(accessToken),
    body: JSON.stringify({ questionId }),
  })
    .then((res) => res.json())
    .then((data) => {
      if (data.status === "success") {
        toast.success(data.message);
      } else {
        toast.error(data.message);
      }
    })
    .catch((error) => console.log(error));
};

export const handleVote = (
  path = "post",
  dataKey = "postId",
  _id,
  handle_vote_type,
  baseURL,
  accessToken
) => {
  fetch(`${baseURL}/${path}/${handle_vote_type}`, {
    ...commonMethodAndHeaders(accessToken),
    body: JSON.stringify({
      [dataKey]: _id,
    }),
  })
    .then((res) => res.json())
    .then((data) => {
      if (data.status === "success") {
        toast.success(data.message);
      } else {
        toast.error(data.message);
      }
    });
};
export function handleBookmark(postId, baseURL, accessToken) {
  fetch(`${baseURL}/user/handle-bookmarks`, {
    ...commonMethodAndHeaders(accessToken),
    body: JSON.stringify({ postId }),
  })
    .then((res) => res.json())
    .then((data) => {
      if (data.status === "success" && data.message !== "")
        toast.success(data.message);
    })
    .catch((error) => console.log(error));
}

// profile
export const handleDescription = (
  description,
  baseURL,
  accessToken,
  setProfileUser,
  profileUser
) => {
  fetch(`${baseURL}/user/update-description`, {
    ...commonMethodAndHeaders(accessToken),
    body: JSON.stringify({
      description,
      profileId: profileUser?._id,
    }),
  })
    .then((res) => res.json())
    .then((data) => {
      if (data.status === "success") {
        setProfileUser({
          ...profileUser,
          credentials: {
            ...profileUser.credentials,
            description: JSON.stringify(description),
          },
        });
      } else {
        toast.error(data.message);
      }
    })
    .catch((error) => console.log(error));
};
export const handleDeleteAnswers = async (answerId, baseURL, accessToken) => {
  let isOk = false;
  try {
    const res = await fetch(`${baseURL}/post/delete-answer`, {
      ...commonMethodAndHeaders(accessToken),
      body: JSON.stringify({
        answerId,
      }),
    });
    const data = await res.json();
    if (data.status === "success") {
      isOk = true;
      toast.success(data.message);
    } else {
      toast.error(data.message);
    }
  } catch (error) {
    console.log(`error occurred on handleDeleteAnswers: ${error}`);
  }
  return isOk;
};

export const getSubComments = async ({
  commentId,
  setComments,
  comments,
  baseURL = "",
  userId,
}) => {
  console.log("getSubComments", baseURL);
  if (!commentId) return;
  try {
    // fetching sub sub comments
    const res = await fetch(`${baseURL}/comment/${commentId}`, {
      headers: {
        "X-UserId": userId,
      },
    });

    const data = await res.json();
    if (data.status === "success") {
      let updatedComments = comments?.map((comment) => {
        if (comment._id === commentId && Array.isArray(data?.children)) {
          if (comment?.children) {
            const existingChildIds = comment.children.map((child) => child._id);
            const newChildren = data.children.filter(
              (child) => !existingChildIds.includes(child._id)
            );
            comment?.children?.push(...newChildren);
          } else {
            comment.children = data?.children;
          }
        }
        return comment;
      });
      setComments(updatedComments);
      return true;
    }
    return false;
  } catch (error) {
    console.log(`error occurred on getSubSubComments: ${error}`);
    return false;
  }
};

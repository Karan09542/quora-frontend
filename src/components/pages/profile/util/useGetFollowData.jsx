import React, { useEffect } from "react";

function useGetFollowData({
  baseURL,
  profileUserId,
  underlineTo,
  setFollowResults,
}) {
  return useEffect(() => {
    setFollowResults([]);
    fetch(`${baseURL}/user/${underlineTo}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        _id: profileUserId,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.status === "success") {
          setFollowResults(data?.[underlineTo]);
        }
      })
      .catch((error) => console.log(error));
  }, [underlineTo]);
}

export default useGetFollowData;

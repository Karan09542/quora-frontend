import React, { useEffect, useState } from "react";
import { commonMethodAndHeaders } from "../utils/handlerFetch";

function useMention({ mensionInput, baseURL, accessToken }) {
  const [suggestions, setSuggestions] = useState([]);
  useEffect(() => {
    if (!mensionInput) return;
    fetch(`${baseURL}/user/mension?username=${mensionInput}`, {
      ...commonMethodAndHeaders(accessToken),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.status === "success") {
          setSuggestions(data?.mensions);
        }
      })
      .catch((error) => console.log(error));
  }, [mensionInput]);
  return { suggestions, setSuggestions };
}

export default useMention;

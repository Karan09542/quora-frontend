import React, { useEffect } from "react";

const useHighlight = ({ query, highlightRef }) => {
  return useEffect(() => {
    if (!highlightRef.current || !query) return;
    const content = highlightRef.current.innerHTML;
    const word = query?.split(/\s+/)?.filter(Boolean);
    const regex = new RegExp(`(${word?.join("|")})`, "gi");

    if (query) {
      highlightRef.current.innerHTML = content.replaceAll(
        regex,
        (ram) => `<span class="highlight">${ram}</span>`
      );
    }

    return () => {
      if (highlightRef.current) {
        highlightRef.current.innerHTML = content;
      }
    };
  }, [query, highlightRef.current]);
};

export default useHighlight;

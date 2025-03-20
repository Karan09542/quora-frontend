import React, { useCallback, useMemo } from "react";
import { handleDraftToHtml } from "../../utils/fn_utils";
import useHighlight from "../../hooks/useHighlight";

const ContentShow = ({ content, isShowMore, setIsShowMore, query }) => {
  const highlightRef = React.useRef(null);
  useHighlight({ query, highlightRef });

  const handleClick = useCallback(() => {
    if (!isShowMore?.right) {
      setIsShowMore((prev) => ({ ...prev, right: true }));
    }
  }, [isShowMore, setIsShowMore]);
  const convertedHtml = useMemo(() => handleDraftToHtml(content), [content]);
  return (
    <div
      onClick={handleClick}
      className={`relative ${!isShowMore?.right ? "cursor-pointer" : ""}`}
    >
      {isShowMore?.right ? (
        <div
          className="mt-1 [&_img]:block [&_img]:mx-auto w-full [&_img]:w-full content"
          ref={highlightRef}
          dangerouslySetInnerHTML={{
            __html: convertedHtml,
          }}
        />
      ) : (
        <div
          className="w-full mt-1 [&_iframe]:w-full [&_iframe]:h-[300px] content"
          ref={highlightRef}
          dangerouslySetInnerHTML={{ __html: isShowMore?.text }}
        />
      )}
      {!isShowMore?.right && (
        <span className="text-[#195FAA] text-[15px] absolute bottom-0  right-0 px-2 py-1 bg-white cursor-pointer  border-white hover:underline before-content-[' '] before:absolute before:w-2 before:h-full before:bg-white before:right-full before:blur-[3px]">{`(more)`}</span>
      )}
    </div>
  );
};

export default ContentShow;

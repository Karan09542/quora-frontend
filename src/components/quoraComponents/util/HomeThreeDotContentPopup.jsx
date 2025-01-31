import QuoraLink from "../../../assets/link.svg?react";
import Bookmark from "../../../assets/bookmark.svg?react";
import Dil from "../../../assets/dil.svg?react";
import Log from "../../../assets/log.svg?react";
import Report from "../../../assets/report.svg?react";
import NotInterested from "../../../assets/notInterested.svg?react";
import Downvote from "../../../assets/downvote.svg?react";
import More from "../../../assets/more.svg?react";

// for profile
import MrDustbin from "../../../assets/answer/mrDustbin.svg?react";
import EditPen from "../../../assets/profile/editPen.svg?react";

import {
  useAccessTokenStore,
  useBaseURLStore,
  useBookmarksStore,
  useDataStore,
  useOpenModelStore,
  useReportStore,
} from "../../../../Store/model";
import {
  handleBookmark,
  handleDeleteAnswers,
  handleQuestionDownvote,
} from "../../../utils/handlerFetch";
import Tippy from "@tippyjs/react";

const HomeThreeDotContentPopup = ({
  answerId,
  questionId,
  isBookmarked,
  setIsBookmarked,
  itsOwnQuestion,
  isOwnContent,
  more,
  setMore,
  setHide,
  setToggleQuestionDownvoted,
  isDownvoted,
}) => {
  {
    const setReport = useReportStore((state) => state.setReport);
    const baseURL = useBaseURLStore((state) => state.baseURL);
    const accessToken = useAccessTokenStore((state) => state.accessToken);
    const setOpenModel = useOpenModelStore((state) => state.setOpenModel);

    const path = window.location.pathname;
    const setBookmarks = useBookmarksStore((state) => state.setBookmarks);
    const bookmarks = useBookmarksStore((state) => state.bookmarks);

    // if is he in profile
    const data = useDataStore((state) => state.data);
    const setData = useDataStore((state) => state.setData);

    const ThreeDotContent = () => (
      <div
        onClick={() => setMore(false)}
        className="[&>div]:px-3 bg-white p-0 text-[0.8rem] text-gray-600 [&>div]:gap-2 [&>div]:leading-9 child-flex [&>div>span]:cursor-pointer hover:[&>div>span]:underline [&>:first-child]:rounded-t-md [&>:last-child]:rounded-b-md hover:[&>div]:bg-gray-100 [&>div>svg]:w-[18px] [&>div>svg]:contrast-200"
      >
        <div>
          <QuoraLink /> <span>Copy link</span>
        </div>
        <div onClick={() => setHide(true)}>
          <NotInterested /> <span>Not interested in this</span>
        </div>
        <div
          onClick={() => {
            if (path === "/bookmarks") {
              const updatedBookmarks = bookmarks.filter(
                (bookmark) => bookmark._id !== answerId
              );
              setBookmarks(updatedBookmarks);
            }
            handleBookmark(answerId, baseURL, accessToken);
            setIsBookmarked(!isBookmarked);
          }}
        >
          <Bookmark
            className={` ${
              isBookmarked ? "[&>*]:fill-gray-500 [&>*]:stroke-gray-500" : ""
            }  `}
          />{" "}
          <span>{path === "/bookmarks" ? "Remove bookmark" : "Bookmark"}</span>
        </div>
        {!itsOwnQuestion && (
          <div
            onClick={() => {
              setHide(true);
              setToggleQuestionDownvoted(true);
              handleQuestionDownvote(questionId, baseURL, accessToken);
            }}
          >
            <Downvote
              className={` ${
                isDownvoted ? "[&>*]:fill-gray-500 [&>*]:stroke-gray-500" : ""
              }  `}
            />
            <span>Downvote question</span>
          </div>
        )}
        <div>
          <Dil /> <span>Thank</span>
        </div>
        <div>
          <Log /> <span>Log</span>
        </div>
        {!isOwnContent && (
          <div
            onClick={() => {
              setReport({
                reportedContent: answerId,
                contentType: "answer",
              });
              setOpenModel("report");
            }}
          >
            <Report /> <span>Report</span>
          </div>
        )}

        {/* profile */}
        {isOwnContent && (
          <div
            onClick={async () => {
              const isOk = await handleDeleteAnswers(
                answerId,
                baseURL,
                accessToken
              );
              if (isOk) {
                setData(data.filter((item) => item._id !== answerId));
              }
            }}
            className="text-[var(--text-color)]"
          >
            <MrDustbin className="[&>*]:stroke-[#b92c27] brightness-[0.8] [&>*]:stroke-2" />{" "}
            <span>Delete answer</span>
          </div>
        )}
      </div>
    );

    return (
      <div className="p-1 rounded-full cursor-pointer hover:bg-gray-100/70">
        <Tippy
          content={
            more ? <ThreeDotContent /> : <div className="px-3.5 py-2">More</div>
          }
          placement="top"
          arrow={true}
          className={`[&>:first-child]:p-0 ${
            more
              ? "nav-shadow rounded-md [&>:nth-child(2)]:text-white [&>:nth-child(2)]:drop-shadow-lg border"
              : ""
          }`}
          // theme="light"
          hideOnClick={false}
          animation="scale"
          onClickOutside={(e) => {
            setMore(false);
            if (more) e.hide();
          }}
          interactive={true}
          delay={[0, more ? 100000 : 100]}
        >
          <span>
            <More onClick={() => setMore(!more)} />
          </span>
        </Tippy>
      </div>
    );
  }
};

export default HomeThreeDotContentPopup;

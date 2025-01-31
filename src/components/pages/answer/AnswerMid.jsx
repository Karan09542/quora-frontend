import React, { useEffect } from "react";
import QuoraBox from "../../../assets/answer/quoraBox.svg?react";
import { IoIosArrowDown } from "react-icons/io";
import {
  useAccessTokenStore,
  useBaseURLStore,
  useQuoraQuestionsStore,
  useSelectedMenuStore,
} from "../../../../Store/model";
import DiscoverNewTopic from "./DiscoverNewTopic";
import { Outlet } from "react-router-dom";
import { BeatLoader } from "react-spinners";
import AnswerQuestionTempelate from "./util/AnswerQuestionTempelate";

function AnswerMid() {
  const feeds = ["Unfollow Internet Security", "Downvote question", "Report"];

  // Fetch Questions
  const baseURL = useBaseURLStore((state) => state.baseURL);
  const accessToken = useAccessTokenStore((state) => state.accessToken);

  const [loading, setLoading] = React.useState(false);
  const quoraQuestions = useQuoraQuestionsStore(
    (state) => state.quoraQuestions
  );
  const setQuoraQuestions = useQuoraQuestionsStore(
    (state) => state.setQuoraQuestions
  );
  const [page, setPage] = React.useState(1);
  const loadedPages = React.useRef(new Set());
  useEffect(() => {
    if (loadedPages.current.has(page)) {
      return;
    }
    setLoading(true);
    if (!accessToken) return;
    fetch(`${baseURL}/question/quora-questions?limit=4&page${page}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data?.status === "success") {
          setQuoraQuestions([...quoraQuestions, ...data?.questions]);
          loadedPages.current.add(page);
        }
      })
      .catch((error) => console.log(error))
      .finally(() => setLoading(false));
  }, [accessToken, page]);

  const selectedMenu = useSelectedMenuStore((state) => state.selectedMenu);
  if (selectedMenu === "Answer requests") {
    return (
      <div>
        <Outlet />
      </div>
    );
  }
  return (
    <div>
      <div className="border rounded-lg">
        {/* first */}
        <div className="flex items-center gap-2 px-4 py-2">
          <span className="bg-[var(--text-color)]  rounded aspect-square ">
            <QuoraBox className="[&>path]:fill-white p-1" />
          </span>
          <span>Requests from Quora</span>
        </div>
        <hr />
        {/* second */}
        {/* quora questions */}
        <div>
          {quoraQuestions?.map((item, index) => {
            return (
              <AnswerQuestionTempelate
                {...item}
                key={item?._id}
                baseURL={baseURL}
                accessToken={accessToken}
                feeds={feeds}
              />
            );
          })}
        </div>
        {loading && <BeatLoader color="#B92B27" size={7} className="px-2" />}
        {/* third */}
        <div className="px-4 py-1">
          <p
            onClick={() => setPage((prev) => prev + 1)}
            className="flex hover:bg-gray-100 w-fit items-center px-2.5 py-1.5 rounded-full cursor-pointer mx-auto gap-1  text-[0.8rem] font-semibold text-gray-500"
          >
            <span>More</span> <IoIosArrowDown size={16} />
          </p>
        </div>
      </div>

      <DiscoverNewTopic />
    </div>
  );
}

export default AnswerMid;

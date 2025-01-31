import React, { Suspense, useEffect } from "react";
import {
  useAccessTokenStore,
  useBaseURLStore,
  useOpenModelStore,
  useUnderlineToStore,
  useUserStore,
} from "../../../Store/model";
import QuoraAsk from "../../assets/ask.svg?react";
import QuoraAnswer from "../../assets/answer.svg?react";
import QuoraPost from "../../assets/post.svg?react";
import Loading from "../comp_util/Loading";
import useThrottle from "../../hooks/useThrottle";
import { toast } from "react-toastify";
import { use } from "react";

const LazyPost = React.lazy(() => import("../quoraComponents/Post"));
function HomeMid() {
  const user = useUserStore((state) => state.user);
  const setOpenModel = useOpenModelStore((state) => state.setOpenModel);
  const setUnderlineTo = useUnderlineToStore((state) => state.setUnderlineTo);

  const baseURL = useBaseURLStore((state) => state.baseURL);
  const accessToken = useAccessTokenStore((state) => state.accessToken);
  const [questions, setQuestions] = React.useState([]);

  const [loading, setLoading] = React.useState(false);
  const [page, setPage] = React.useState(1);
  const loadedPages = React.useRef(new Set());
  useEffect(() => {
    if (loadedPages.current.has(page) || loading) {
      return;
    }
    setLoading(true);
    fetch(`${baseURL}/question/?page=${page}&limit=10`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    })
      .then((res) => {
        if (!res.ok)
          throw new Error("Network response of get question was not ok");
        return res.json();
      })
      .then((data) => {
        if (data.status === "success" && data?.questions?.length > 0) {
          loadedPages.current.add(page);
          setQuestions((prevQuestions) => [
            ...prevQuestions,
            ...data?.questions,
          ]);
        }
      })
      .catch((error) => console.log(error))
      .finally(() => {
        setLoading(false);
      });
  }, [page]);

  // handle pagination
  const handleScroll = () => {
    const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
    // Margin बढ़ा दिया ताकि event trigger हो सके
    if (scrollTop + clientHeight >= scrollHeight - 100) {
      setPage((prev) => prev + 1);
    }
  };
  const handleScrollEvent = () => {
    requestAnimationFrame(handleScroll);
  };
  useEffect(() => {
    window.addEventListener("scroll", handleScrollEvent);
    return () => window.removeEventListener("scroll", handleScrollEvent);
  }, []);
  return (
    <>
      <div
        className={`[&>*]:mb-2 scroll-smooth`}
        style={{ height: questions?.length < 4 ? "100vh" : "100%" }}
      >
        <div className="px-3 pt-3.5 bg-white border rounded-lg">
          <div className="flex items-center gap-x-3">
            {user?.profilePicture ? (
              <img
                src={user?.profilePicture}
                alt="profile"
                className="w-8 h-8 rounded-full cursor-pointer aspect-square"
              />
            ) : (
              <img
                className="text-xl font-bold leading-8 text-center text-white bg-green-800 rounded-full cursor-pointer w-9 h-9 aspect-square"
                src="https://qsf.cf2.quoracdn.net/-4-images.new_grid.profile_default.png-26-688c79556f251aa0.png"
              />
            )}
            <div
              onClick={() => {
                setOpenModel("create post");
                setUnderlineTo("add question");
              }}
              className="w-full text-[15px] cursor-pointer text-gray-500 hover:bg-[#f2f2f3] px-3 py-1 bg-[#F7F7F8] border rounded-full"
            >
              What do you want to ask or share?
            </div>
          </div>
          {/* vertical bar line-13 */}
          <div className="flex gap-1 items-center justify-evenly [&>div]:flex [&>div]:items-center [&>div]:gap-x-1 [&>:not(:empty)]:w-full [&>div]:justify-center py-[0.3rem] text-gray-500 font-medium text-[13px] [&>div]:cursor-pointer hover:[&>div]:bg-gray-100 [&>div]:p-1 [&>div]:rounded-full vertical-bar [&_svg]:w-[20px]">
            <div
              onClick={() => {
                setOpenModel("create post");
                setUnderlineTo("add question");
              }}
            >
              <QuoraAsk /> <span>Ask</span>
            </div>
            <div></div>
            <div
              onClick={() => {
                window.open("/answers", "_blank");
              }}
            >
              <QuoraAnswer className="w-[24px] h-[24px]" /> <span>Answer</span>
            </div>
            <div></div>
            <div
              onClick={() => {
                setOpenModel("create post");
                setUnderlineTo("create post");
              }}
              className="border-none"
            >
              <QuoraPost /> <span>Post</span>
            </div>
          </div>
        </div>

        <Suspense fallback={<Loading />}>
          {questions?.map((question) => (
            <LazyPost key={question?._id} post={question} />
          ))}
        </Suspense>
        <div className="h-[100px]">{loading && <Loading />}</div>
        {/* <div className="w-full h-screen bg-red-500"></div> */}
      </div>
    </>
  );
}

export default HomeMid;

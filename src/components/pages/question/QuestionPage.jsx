import React, { Suspense, useEffect } from "react";
import QuestionPageLeft from "./QuestionPageLeft";
import QuestionPageRight from "./QuestionPageRight";
import Navbar from "../../header/Navbar";
import useResize from "../../../hooks/useResize";
import { ToastContainer } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";
import Loading from "../../comp_util/Loading";
import {
  useBaseURLStore,
  useHasQuestionStore,
  useIsLoginStore,
  useIsToAnswerStore,
  useOpenModelStore,
  useUserStore,
} from "../../../../Store/model";
import Reports from "../../general-page/Reports";
import DisplayModePopup from "../../general-page/DisplayModePopup";

const LazyPostAnswer = React.lazy(() =>
  import("../../quoraComponents/PostAnswer")
);

function QuestionPage() {
  const { width } = useResize();
  const user = useUserStore((state) => state.user);
  const isLogin = useIsLoginStore((state) => state.isLogin);
  const params = useParams();

  const navigate = useNavigate();
  useEffect(() => {
    const question = `${params?.question?.split(" ").join("-")}`;
    navigate(`/${question}`, { replace: true });
    document.title = params?.question?.split("-")?.join(" ");
  }, [params?.question]);
  const setHasQuestion = useHasQuestionStore((state) => state.setHasQuestion);
  const [data, setData] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const baseURL = useBaseURLStore((state) => state.baseURL);

  useEffect(() => {
    if (user === null) return;
    setLoading(true);
    fetch(`${baseURL}/question/${params?.question}`, {
      headers: {
        "Content-Type": "application/json",
        "X-UserId": user?._id,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.status === "success") {
          if (data?.question?.totalAnswers < 1) {
            setHasQuestion(false);
          } else {
            setHasQuestion(true);
            setData(data.question);
          }
        }
      })
      .catch((error) => console.log(error))
      .finally(() => setLoading(false));
  }, [user]);
  const openModel = useOpenModelStore((state) => state.openModel);
  const isToAnswer = useIsToAnswerStore((state) => state.isToAnswer);
  if (loading) return <Loading />;
  return (
    <div className="bg-[#f7f7f8] h-screen">
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={true}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <Navbar />
      {openModel === "report" && <Reports />}
      {openModel === "display mode" && <DisplayModePopup />}
      {isToAnswer && (
        <Suspense fallback={<Loading />}>
          <LazyPostAnswer />
        </Suspense>
      )}
      <div
        // grid-cols-[656px_minmax(100px,354px)] max-w-[1200px]
        className={` grid question-grid mx-auto [&>div]:w-full gap-x-4 ${
          width <= 552 ? "mt-16 px-3" : "mt-5 px-7"
        } `}
      >
        <QuestionPageLeft {...data} isLogin={isLogin} />
        {width > 1000 && (
          <QuestionPageRight
            totalAnswers={data?.totalAnswers}
            questionId={data?._id}
            question={data?.question}
            isAlreadyAnswered={data?.isAlreadyAnswered}
            createdBy={data?.createdBy}
            isFollowing={data?.isFollowing}
            isDownvoted={data?.isDownvoted}
            itsOwnQuestion={data?.itsOwnQuestion}
            data={data}
            setData={setData}
            responsiveShow={true}
          />
        )}
      </div>
    </div>
  );
}

export default QuestionPage;

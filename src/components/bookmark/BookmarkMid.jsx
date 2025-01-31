import React, { useEffect } from "react";
import {
  useAccessTokenStore,
  useBaseURLStore,
  useBookmarksStore,
  useIsLoginStore,
} from "../../../Store/model";
import PostOffice from "../../assets/postOffice.webp";
import Heading from "../pages/setting/Heading";
import AnswerTempelate from "../pages/search/util/AnswerTempelate";
import { PulseLoader } from "react-spinners";
import Loading from "../comp_util/Loading";

function BookmarkMid() {
  const baseURL = useBaseURLStore((state) => state.baseURL);
  const accessToken = useAccessTokenStore((state) => state.accessToken);

  const bookmarks = useBookmarksStore((state) => state.bookmarks);
  const setBookmarks = useBookmarksStore((state) => state.setBookmarks);
  const [loading, setLoading] = React.useState(false);
  const isLogin = useIsLoginStore((state) => state.isLogin);
  useEffect(() => {
    setLoading(true);
    if (accessToken)
      fetch(`${baseURL}/book-mark`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.status === "success") {
            setBookmarks(data.bookmarks);
          }
        })
        .catch((error) => console.log(error))
        .finally(() => setLoading(false));
  }, [accessToken]);
  if (loading) return <Loading />;
  if (bookmarks.length <= 0) {
    return (
      <div className="text-center bg-[#E6E7E8] place-content-center text-[#636465]">
        <div className="h-[100px] w-[100px] mx-auto">
          <img src={PostOffice} alt="" />
        </div>
        <h3 className="text-[1.125rem] font-bold mb-1">No Bookmarks</h3>
        <p className="text-[#636465] text-[0.9375rem]">
          You can bookmark answers, posts and shares from their "..." menu.
        </p>
      </div>
    );
  } else
    return (
      <div>
        <Heading heading={"Bookmarks"} />
        <div className="[&>div]:border [&>div]:border-[#dee0e1] rounded-lg shadow-sm [&>div]:rounded-lg [&>div]:mb-2 mt-2 mb-10 [&>div]:bg-white">
          {bookmarks?.map((bookmark) => (
            <AnswerTempelate
              result={bookmark}
              key={bookmark._id}
              isHr={false}
              isShowQuestion={true}
              isLogin={isLogin}
            />
          ))}
        </div>
      </div>
    );
}

export default BookmarkMid;

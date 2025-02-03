import React, { useEffect } from "react";
import Heading from "../setting/Heading";
import { useNavigate, useSearchParams } from "react-router-dom";

import {
  useAccessTokenStore,
  useBaseURLStore,
  useIsLoginStore,
  useOpenModelStore,
  useSearchValueStore,
} from "../../../../Store/model";
import QuestionTemplate from "./util/QuestionTemplate";
import AnswerTempelate from "./util/AnswerTempelate";
import ProfileTempelate from "./util/ProfileTempelate";
import TopicTempelate from "./util/TopicTempelate";
import NotFoundAddQuestion from "./util/NotFoundAddQuestion";
import SpaceTempelate from "./util/SpaceTempelate";
import Loading from "../../comp_util/Loading";
import SearchLeft from "./SearchLeft";
function SearchMid({ responsive_width, threshold_width }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const baseURL = useBaseURLStore((state) => state.baseURL);
  const accessToken = useAccessTokenStore((state) => state.accessToken);
  const navigate = useNavigate();

  const searchResults = useSearchValueStore((state) => state.searchResults);
  const setSearchResults = useSearchValueStore(
    (state) => state.setSearchResults
  );

  const [loading, setLoading] = React.useState(false);
  const [isFollow, setIsFollow] = React.useState({});

  useEffect(() => {
    if (!accessToken) return;
    setLoading(true);
    let { q, type, author, time } = Object.fromEntries(searchParams.entries());
    if (!q) {
      navigate("/");
    }
    (type ||= ""), (author ||= ""), (time ||= "");

    fetch(
      `${baseURL}/search-result?q=${q}&type=${type}&author=${author}&time=${time}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      }
    )
      .then((res) => res.json())
      .then((data) => {
        if (data.status === "success") {
          setSearchResults(data.results);
          const idsObj = Object.fromEntries(
            data?.results.map((item) => [item?._id, false])
          );
          setIsFollow(idsObj);
        }
      })
      .catch((error) => console.log(error))
      .finally(() => setLoading(false));
  }, [searchParams, accessToken]);

  const hasSearchParamsFilters = ["type", "author", "time"].some((item) =>
    searchParams.get(item)
  );

  const isLogin = useIsLoginStore((state) => state.isLogin);
  const setOpenModel = useOpenModelStore((state) => state.setOpenModel);
  return (
    <div>
      <div className="[&>div]:border rounded-lg shadow-sm bg-white [&>div]:rounded-lg [&>div]:mb-2 mt-2 mb-10">
        <div>
          {/* Results for */}
          <Heading
            isHr={false}
            heading={
              <span>
                Results for <b>{searchParams.get("q")}</b>
              </span>
            }
            className={"px-4 py-2"}
            component={
              hasSearchParamsFilters && (
                <p className="dot-after">
                  {responsive_width <= threshold_width && (
                    <span
                      onClick={() => setOpenModel("filter")}
                      className="text-[15px] text-[var(--text-color-93)] hover:underline cursor-pointer"
                    >
                      Views filters
                    </span>
                  )}
                  <span
                    onClick={() =>
                      setSearchParams((params) => {
                        ["type", "author", "time"].forEach((item) =>
                          params.delete(item)
                        );
                        return params;
                      })
                    }
                    className="text-[15px] text-[var(--text-color-93)] hover:underline cursor-pointer"
                  >
                    &nbsp;Clear Filters
                  </span>
                </p>
              )
            }
          />
          <hr />
          {/* results */}
          <div>
            {searchResults?.map((result, index) => {
              switch (result.type) {
                case "question":
                  return (
                    <QuestionTemplate
                      isMore={false}
                      isFollow={isFollow}
                      setIsFollow={setIsFollow}
                      key={result._id + index}
                      {...result}
                      query={searchParams.get("q")}
                    />
                  );
                case "answer":
                  return (
                    <AnswerTempelate
                      result={result}
                      key={result._id}
                      query={searchParams.get("q")}
                      isLogin={isLogin}
                    />
                  );
                case "post":
                  return (
                    <AnswerTempelate
                      result={result}
                      key={result._id}
                      query={searchParams.get("q")}
                      isLogin={isLogin}
                    />
                  );
                case "profile":
                  return (
                    <ProfileTempelate
                      key={result?._id}
                      user={result}
                      query={searchParams.get("q")}
                    />
                  );
                // add props below two
                case "topic":
                  return <TopicTempelate />;
                case "spaces":
                  return <SpaceTempelate />;
                default:
                  return;
              }
            })}
          </div>
          <SpaceTempelate />
          <SpaceTempelate />

          {(searchResults.length === 0 || searchResults.length < 10) && (
            <NotFoundAddQuestion
              isLessResults={
                searchResults.length > 0 && searchResults.length < 10
                  ? true
                  : false
              }
              lookingFor={searchParams.get("q")}
            />
          )}
          {loading && <Loading size={7} className={`py-2`} color="#636466" />}
          <hr />
        </div>
      </div>
    </div>
  );
}

export default SearchMid;

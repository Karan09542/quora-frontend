import React, { useEffect, useRef } from "react";
import { useSearchParams } from "react-router-dom";
import QuoraSearch from "../../../assets/search.svg?react";
import CrossButton from "../../buttons-fields/CrossButton";
import Button from "../../buttons-fields/Button";
import { useOpenModelStore } from "../../../../Store/model";

function SearchLeft({
  isFixed = false,
  className,
  responsive_width,
  threshold_width,
}) {
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    if (isFixed) {
      document.documentElement.style.overflowY = "hidden";
    }
    return () => {
      document.documentElement.style.overflowY = "auto";
    };
  }, [isFixed]);

  useEffect(() => {
    if (responsive_width > threshold_width) {
      setOpenModel(null);
    }
  }, [responsive_width]);

  const searchRef = useRef(null);
  const handleSetSearchParams = (name, type) => {
    setSearchParams((params) => {
      params.set(name, type);
      return params;
    });
  };
  const deleteSearchParams = (name) => {
    setSearchParams((params) => {
      params.delete(name);
      return params;
    });
  };

  // for Responsive
  const currentFilter = useRef(new Set());
  // end Responsive

  const byTypeMenu = [
    {
      name: "All types",
      onClick: () => deleteSearchParams("type"),
      type: null,
    },
    {
      name: "Questions",
      onClick: () => {
        handleSetSearchParams("type", "question");
        currentFilter.current.add("question");
      },
      type: "question",
    },
    {
      name: "Answers",
      onClick: () => {
        handleSetSearchParams("type", "answer");
        currentFilter.current.add("answer");
      },
      type: "answer",
    },
    {
      name: "Posts",
      onClick: () => {
        handleSetSearchParams("type", "post");
        currentFilter.current.add("post");
      },
      type: "post",
    },
    {
      name: "Profiles",
      onClick: () => {
        handleSetSearchParams("type", "profile");
        currentFilter.current.add("profile");
      },
      type: "profile",
    },
    {
      name: "Topics",
      onClick: () => {
        handleSetSearchParams("type", "topic");
        currentFilter.current.add("topic");
      },
      type: "topic",
    },
    {
      name: "Spaces",
      onClick: () => {
        handleSetSearchParams("type", "tribe");
        currentFilter.current.add("tribe");
      },
      type: "tribe",
    },
  ];
  const byAuthorMenu = [
    {
      name: "All people",
      onClick: () => deleteSearchParams("author"),
      author: null,
    },
    {
      name: "People you follow",
      onClick: () => {
        handleSetSearchParams("author", "followed");
        currentFilter.current.add("followed");
      },
      author: "followed",
    },
  ];
  const byTimeMenu = [
    {
      name: "All time",
      onClick: () => deleteSearchParams("time"),
      time: null,
    },
    {
      name: "Past hour",
      onClick: () => {
        handleSetSearchParams("time", "hour");
        currentFilter.current.add("hour");
      },
      time: "hour",
    },
    {
      name: "Past day",
      onClick: () => {
        handleSetSearchParams("time", "day");
        currentFilter.current.add("day");
      },
      time: "day",
    },
    {
      name: "Past week",
      onClick: () => {
        handleSetSearchParams("time", "week");
        currentFilter.current.add("week");
      },
      time: "week",
    },
    {
      name: "Past month",
      onClick: () => {
        handleSetSearchParams("time", "month");
        currentFilter.current.add("month");
      },
      time: "month",
    },
    {
      name: "Past year",
      onClick: () => {
        handleSetSearchParams("time", "year");
        currentFilter.current.add("year");
      },
      time: "year",
    },
  ];
  const setOpenModel = useOpenModelStore((state) => state.setOpenModel);
  return (
    <div
      // left-0 [&>div]:mx-0 [&>div]:max-w-full [&>div]:px-10
      className={`${
        isFixed ? "fixed w-screen z-20 h-full bg-[#242424E6]/85 " : "relative"
      } ${className}`}
    >
      <div
        className={`${
          isFixed
            ? "origin-center bottom-0 h-full flow-y bg-white animate-[fadeIn_0.3s_ease-in-out] absolute w-full  mx-auto -translate-x-1/2 left-1/2 item px-5 top-3"
            : "max-w-[160px] max-h-[80vh] overflow-y-auto mx-auto first:text-[#282829] w-full sticky top-20 scroll-hover-effect"
        } `}
      >
        {/* isFixed */}
        {isFixed && (
          <div className="sticky top-0 flex items-center justify-between pt-2 pb-2 bg-white child-flex">
            <div className="text-[15px] text-[var(--text-dark)]">
              <CrossButton
                onClick={() => {
                  // currentFilter?.current?.forEach((value) => {
                  //   // console.log("value", value);
                  //   deleteSearchParams(value);
                  // });

                  setOpenModel(null);
                }}
                size={34}
              />
              <span>Search filters</span>
            </div>
            <Button
              onClick={() => setOpenModel(null)}
              className={"bg-blue-500"}
              name={"Done"}
              style={{ padding: "0.3rem 1rem" }}
            />
          </div>
        )}
        {isFixed && <hr />}
        {/* end - isFixed */}
        {/* By type */}
        <p className="px-3 pb-1.5 font-semibold">By type</p>
        <hr />
        <div className="mt-1 mb-2">
          {byTypeMenu.map((item, index) => {
            const type = searchParams.get("type");

            return (
              <p
                onClick={() => {
                  item.onClick();
                }}
                key={item.name}
                className={`text-[0.815rem] flex items-center justify-between px-3 mb-1 rounded cursor-pointer py-1 ${
                  type === item.type
                    ? "text-[var(--text-color)] font-semibold bg-[var(--bg-color)]"
                    : "text-gray-500 hover:bg-gray-100"
                }`}
              >
                {item.name}
              </p>
            );
          })}
        </div>
        {/* By author */}
        <p className="px-3 font-semibold pb-1.5">By author</p>
        <hr />
        <div className="mt-1 mb-2">
          {byAuthorMenu.map((item, index) => {
            const type = searchParams.get("author");
            return (
              <p
                onClick={() => {
                  item.onClick();
                }}
                key={item.name}
                className={`text-[0.815rem] flex items-center justify-between px-3 mb-1 rounded cursor-pointer py-1 ${
                  type === item.author
                    ? "text-[var(--text-color)] font-semibold bg-[var(--bg-color)]"
                    : "text-gray-500 hover:bg-gray-100"
                }`}
              >
                {item.name}
              </p>
            );
          })}
        </div>
        {/* Author input */}
        <div className="px-2 mb-3">
          <div
            className={`flex items-center px-1 py-1.5  text-[13px] border gap-x-1 bg-white  rounded 
                          hover:border-blue-500 hover:border transition-border`}
          >
            <QuoraSearch
              onClick={() => searchRef.current.focus()}
              className="p-0.5 hover:cursor-pointer eleminate"
            />{" "}
            <input
              type="search"
              ref={searchRef}
              onFocus={() => setPlusHide(true)}
              onBlur={() => setPlusHide(false)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  if (/\S/.test(e.target.value))
                    navigate(`/search?q=${e.target.value.trim()}`);
                }
              }}
              placeholder="Author"
              className="w-full outline-none"
            />
          </div>
        </div>
        {/* By time */}
        <p className="px-3 font-semibold pb-1.5">By time</p>
        <hr />
        <div className="mt-1 mb-2">
          {byTimeMenu.map((item, index) => {
            const type = searchParams.get("time");
            return (
              <p
                onClick={() => {
                  item.onClick();
                }}
                key={item.name}
                className={`text-[0.815rem] flex items-center justify-between px-3 mb-1 rounded cursor-pointer py-1 ${
                  type === item.time
                    ? "text-[var(--text-color)] font-semibold bg-[var(--bg-color)]"
                    : "text-gray-500 hover:bg-gray-100"
                }`}
              >
                {item.name}
              </p>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default SearchLeft;

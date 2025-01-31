import React, { useRef } from "react";
import { useSearchParams } from "react-router-dom";
import QuoraSearch from "../../../assets/search.svg?react";

function SearchLeft() {
  const [searchParams, setSearchParams] = useSearchParams();

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
  const byTypeMenu = [
    {
      name: "All types",
      onClick: () => deleteSearchParams("type"),
      type: null,
    },
    {
      name: "Questions",
      onClick: () => handleSetSearchParams("type", "question"),
      type: "question",
    },
    {
      name: "Answers",
      onClick: () => handleSetSearchParams("type", "answer"),
      type: "answer",
    },
    {
      name: "Posts",
      onClick: () => handleSetSearchParams("type", "post"),
      type: "post",
    },
    {
      name: "Profiles",
      onClick: () => handleSetSearchParams("type", "profile"),
      type: "profile",
    },
    {
      name: "Topics",
      onClick: () => handleSetSearchParams("type", "topic"),
      type: "topic",
    },
    {
      name: "Spaces",
      onClick: () => handleSetSearchParams("type", "tribe"),
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
      onClick: () => handleSetSearchParams("author", "followed"),
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
      onClick: () => handleSetSearchParams("time", "hour"),
      time: "hour",
    },
    {
      name: "Past day",
      onClick: () => handleSetSearchParams("time", "day"),
      time: "day",
    },
    {
      name: "Past week",
      onClick: () => handleSetSearchParams("time", "week"),
      time: "week",
    },
    {
      name: "Past month",
      onClick: () => handleSetSearchParams("time", "month"),
      time: "month",
    },
    {
      name: "Past year",
      onClick: () => handleSetSearchParams("time", "year"),
      time: "year",
    },
  ];
  return (
    <div className="relative">
      <div
        className={` max-w-[160px] max-h-[80vh] overflow-y-auto mx-auto first:text-[#282829] w-full fixed scroll-hover-effect`}
      >
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

import React from "react";
import QuoraSearch from "../../assets/search.svg?react";
import { useNavigate } from "react-router-dom";

const SearchInput = ({
  plusHide,
  searchValue,
  setSearchValue,
  searchParams,
  handleFocus,
  isHover = true,
  className,
  setIsToSearch,
}) => {
  const navigate = useNavigate();
  return (
    <div
      className={`flex items-center px-1 py-2 -mr-5 text-sm ${
        isHover ? "border" : ""
      } -ml-7 gap-x-1 bg-white w-full max-[1234px]:-mx-3  max-[1085px]:px-3 rounded 
                    ${
                      plusHide
                        ? `max-w-full border-blue-500`
                        : "w-[250px] overflow-hidden"
                    } ${
        isHover ? "hover:border-blue-500 hover:border" : ""
      } transition-border ${className}`}
    >
      <QuoraSearch className="p-0.5 hover:cursor-pointer eleminate" />{" "}
      <input
        type="search"
        onChange={(e) => {
          setSearchValue(e.target.value);
        }}
        value={searchValue}
        onFocus={() => handleFocus(true, true)}
        onBlur={() => {
          handleFocus(false, false);
          setIsToSearch(false);
        }}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            if (/\S/.test(e.target.value)) {
              const queryAndFilter = [...searchParams]
                .map(([key, value]) => {
                  if (key === "q") return;
                  return `${key}=${value?.trim()}`;
                })
                .join("&");

              navigate(
                `/search?q=${e.target.value}${
                  queryAndFilter ? `&${queryAndFilter}` : ""
                }`
              );
              e.target.blur();
              handleFocus(false, false);
            }
          }
        }}
        placeholder="Search Quora"
        className={`w-full outline-none`}
      />
    </div>
  );
};

export default SearchInput;

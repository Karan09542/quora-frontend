import Tippy from "@tippyjs/react";
import { useState } from "react";
import { GoChevronDown } from "react-icons/go";
import { IoMdCheckmark } from "react-icons/io";
import { hideAll } from "tippy.js";

const RecommendedComponent = ({ className }) => {
  const [selectedRecommend, setSelectedRecommend] = useState("recommended");

  const recomendList = [
    {
      onClick: () => {},
      name: "recommended",
      isCheck: true,
    },
    {
      onClick: () => {},
      name: "upvotes",
      isCheck: true,
    },
    {
      onClick: () => {},
      name: "recent",
      isCheck: true,
    },
  ];

  const Popup = ({ popupOptions, className }) => (
    <div
      className={`bg-white  text-[13px] border  rounded text-black ${`[&>div]:px-5 text-[0.8rem] text-gray-600 [&>div]:gap-1 [&>div]:leading-9 rounded child-flex [&>div]:cursor-pointer hover:[&>div]:underline [&>:first-child]:rounded-t-md [&>:last-child]:rounded-b-md hover:[&>div]:bg-gray-100`}`}
    >
      {popupOptions?.map((item, index) => (
        <div
          onClick={() => {
            // setIsMore(!isMore);
            if (item?.isCheck) {
              setSelectedRecommend(item?.name);
              alert("सीताराम");
            }
            item?.onClick();
            hideAll();
          }}
          key={item?.name}
        >
          {item?.svg}
          <div className="flex items-center gap-1 capitalize">
            <span>{item?.name}</span>
            {item?.isCheck && selectedRecommend === item?.name && (
              <IoMdCheckmark size={16} color="#2e69ff" />
            )}
          </div>
        </div>
      ))}
    </div>
  );

  return (
    <Tippy
      trigger="click"
      placement="bottom"
      className="[&>div]:p-0 text-[0.8rem] [&>:nth-child(2)]:text-white [&>:nth-child(2)]:drop-shadow-[0_0px_0px_rgba(0,0,0,0.6)] [&>:nth-child(2)]:-z-10"
      content={<Popup popupOptions={recomendList} />}
    >
      <div
        className={`flex items-center text-[13px] font-medium text-[var(--text-gen-color)] gap-1 click-hover-effect px-2.5 py-1 rounded-full ${className}`}
      >
        <p className="capitalize">{selectedRecommend}</p>
        {/* <MdKeyboardArrowDown
          size={24}
          className="p-[0.1rem] pointer-events-none"
          //   color="white"
        />
        <FaAngleDown />
        <MdOutlineKeyboardArrowDown /> */}
        <GoChevronDown
          size={18}
          color="var(--text-gen-color)"
          strokeWidth={0.5}
        />
      </div>
    </Tippy>
  );
};

export default RecommendedComponent;

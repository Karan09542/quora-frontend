import React, { useEffect } from "react";

import TopicBigTile from "./util/TopicBigTile";
import { useParams } from "react-router-dom";
import PostOffice from "../../../assets/postOffice.webp";

function TopicMid() {
  const params = useParams();
  const topic = params?.topic?.split("-")?.join(" ");
  const [isActive, setIsActive] = React.useState("read");
  const pathMenu = [
    {
      name: "read",
    },
    {
      name: "answer",
    },
  ];
  return (
    <div>
      <TopicBigTile topic={topic} topicPath={params?.topic} />

      <div className={`flex gap-x-1 text-[13px] mt-2`}>
        {pathMenu?.map((menu) => (
          <button
            key={menu?.name}
            onClick={() => setIsActive(menu?.name)}
            className={`relative font-medium  capitalize px-2 py-4 ${
              isActive === menu?.name
                ? "text-[#B92B27] bottom-border"
                : "text-[var(--text-color-93)] hover:bg-[#00000008]"
            }`}
          >
            {menu?.name}
          </button>
        ))}
      </div>
      <hr />
      {isActive === "answer" && (
        <div className="text-center  place-content-center mt-12 text-[#636465]">
          <div className="h-[100px] w-[100px] mx-auto">
            <img src={PostOffice} alt="" />
          </div>
          <h3 className="text-[1.125rem] font-bold mb-1">No Stories</h3>
          <p className="text-[#636465] text-[0.9375rem]">
            We aren't able to find any stories for you right now.
          </p>
        </div>
      )}
    </div>
  );
}

export default TopicMid;

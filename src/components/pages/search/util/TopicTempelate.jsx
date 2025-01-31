import React from "react";
import TopicImage from "../../../../assets/topic.webp";
import FollowButton from "../../../buttons-fields/FollowButton";
import { Link, useNavigate } from "react-router-dom";

function TopicTempelate({ isHr = true, topic = "हर हर महादेव" }) {
  const navigate = useNavigate();
  const topicPath = topic
    .split(" ")
    .map((word) => word.trim())
    .join("-");
  return (
    <div>
      <Link to={`/topic/${topicPath}`} target="_blank">
        <div className="flex items-center justify-between px-4 py-2 cursor-pointer">
          <div className="flex items-center gap-2">
            <img className="w-8 h-8 aspect-square" src={TopicImage} alt="" />
            <span className="text-[#195FAA] text-[13px]">{topic}</span>
          </div>
          <FollowButton />
        </div>
        {isHr && <hr />}
      </Link>
    </div>
  );
}

export default TopicTempelate;

import React from "react";
import PostOffice from "../../../../assets/postOffice.webp";

function PostOfficeTempelate({ message, title, svgSize = "100px", className }) {
  return (
    <div
      className={`text-center place-content-center mt-12 text-[#636465] ${className}`}
    >
      <div className="mx-auto" style={{ height: svgSize, width: svgSize }}>
        <img src={PostOffice} alt="post off" />
      </div>
      {title && <h1 className="font-bold">{title}</h1>}
      <p className="text-[#636465] text-[0.9375rem]">{message}</p>
    </div>
  );
}

export default PostOfficeTempelate;

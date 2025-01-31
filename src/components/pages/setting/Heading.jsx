import React from "react";
import { Link } from "react-router-dom";

function Heading({
  heading,
  subheading,
  isLearnMore = false,
  link = "",
  target = "_blank",
  isHr = true,
  className,
  component,
  onClick,
}) {
  return (
    <>
      <div
        onClick={onClick}
        className={`${
          subheading ? "" : "flex items-center justify-between"
        } ${className}`}
      >
        <h1
          className={`text-[var(--text-dark)] font-medium ${
            isHr ? "mb-2" : ""
          } text-[15px]`}
        >
          {heading}
        </h1>
        {isLearnMore && (
          <Link to={link} target={target}>
            <span className="text-[var(--text-color-93)] text-[13px] hover:underline mt-1 cursor-pointer">
              Learn more
            </span>
          </Link>
        )}
        {subheading && (
          <p className="text-[var(--text-color-93)] text-[12px] leading-3">
            {subheading}
          </p>
        )}
        {component && <div>{component}</div>}
      </div>
      {isHr ? <hr /> : null}
    </>
  );
}

export default Heading;

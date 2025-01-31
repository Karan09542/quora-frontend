import React from "react";
import { PulseLoader } from "react-spinners";

function Loading({ size = 8, className, color = "#aeafb0" }) {
  return (
    <div className={`text-center ${className}`}>
      <PulseLoader size={size} color={color} />
    </div>
  );
}

export default Loading;

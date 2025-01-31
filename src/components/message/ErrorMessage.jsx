import React from "react";

function ErrorMessage({ message }) {
  return <div className="px-2 text-xs leading-3 text-red-500 ">{message}</div>;
}

export default ErrorMessage;

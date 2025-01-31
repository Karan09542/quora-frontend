import React from "react";
import Qmark from "../../assets/qmark.svg?react";
function ErrorMessage({ message }) {
  return (
    <div className="flex items-center gap-1 text-[0.75rem] -mt-2 text-red-500">
      <Qmark className="w-5" />
      {message}
    </div>
  );
}

export default ErrorMessage;

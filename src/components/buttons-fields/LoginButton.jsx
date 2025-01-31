import React from "react";

const LoginButton = ({ icon, title, className }) => {
  return (
    <div
      className={`${className} hover:bg-gray-100 flex items-center gap-2 border rounded px-3 py-2.5`}
    >
      {icon} <span>{title}</span>
    </div>
  );
};

export default LoginButton;

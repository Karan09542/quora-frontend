import React from "react";

function Switch({ onChange, checked = false }) {
  return (
    <label className="inline-flex items-center scale-75 cursor-pointer">
      <input
        onChange={onChange}
        type="checkbox"
        checked={checked}
        className="sr-only peer"
      />
      <div
        className={`relative w-11 h-6 bg-gray-200 peer-focus:outline-none  rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600`}
      ></div>
      {/* <span className="text-sm font-medium text-gray-900 ms-3 dark:text-gray-300">
        Toggle me
      </span> */}
    </label>
  );
}

export default Switch;

import React, { useState } from "react";

function InputField({
  fieldName,
  className,
  onChange,
  type = "text",
  register,
  label,
  value,
  sublable,
  star = false,
  icon,
  isRelative = true,
}) {
  const [inputType, setInputType] = useState(type);

  return (
    <div>
      <label
        className={`text-[0.8rem] text-[var(--text-dark)] font-bold ${
          sublable ? "" : "leading-7"
        }`}
        htmlFor={fieldName}
      >
        {label}
        {star && <span className="text-[#B92B27]">*</span>}
      </label>
      {sublable && (
        <p
          className={`text-[12px] text-[var(--text-gen-color)] leading-[0.5rem] mb-3`}
        >
          {sublable}
        </p>
      )}
      <div className={`${isRelative ? "relative" : ""}`}>
        <div className="absolute top-1/2 -translate-y-1/2 left-3 text-[var(--text-color-93)]">
          {icon}
        </div>
        <input
          id={fieldName}
          type={inputType}
          className={`w-full rounded py-2 duration-300 border outline-none ${
            inputType === "date" ? "px-3" : "indent-3"
          } hover:border-blue-500 hover:border transition-border focus:border-blue-500 focus:border ${className} ${
            icon ? "indent-9" : ""
          }`}
          placeholder={fieldName}
          onChange={onChange}
          {...register}
          onFocus={(e) => {
            type === "date" ? setInputType("date") : setInputType(type);
          }}
          onBlur={(e) => {
            type === "date" ? setInputType("text") : setInputType(type);
          }}
          value={value}
        />
      </div>
    </div>
  );
}

export default InputField;

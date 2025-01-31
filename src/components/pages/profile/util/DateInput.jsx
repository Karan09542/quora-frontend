import React, { useEffect } from "react";
import { GoChevronDown } from "react-icons/go";
function DateInput({
  name,
  height,
  className,
  setValue,
  label,
  range = [1900, 2031],
}) {
  const [dateInput, setDateInput] = React.useState({ has: false, date: "" });

  return (
    <div>
      <p className="text-[0.8rem] font-bold leading-7">{label}</p>
      <div
        onClick={() =>
          setDateInput((prev) => ({ ...prev, has: !dateInput.has }))
        }
        className={`relative text-[var(--text-dark)] cursor-pointer h-11 w-full rounded py-2 duration-300 border outline-none  hover:border-blue-500 hover:border transition-border ${
          dateInput.has ? "border-blue-500" : ""
        } focus:border ${className}`}
      >
        {dateInput.date && <p className="px-2">{dateInput.date}</p>}
        <GoChevronDown
          className={`absolute -translate-y-1/2 right-2 top-1/2 transition-all ${
            dateInput.has ? "rotate-180" : ""
          }`}
          size={18}
          color="var(--text-color-93)"
        />
        {/* Date Picker */}
        {dateInput.has && (
          <div
            style={{ maxHeight: height }}
            className="absolute bottom-[101%] bg-white rounded-sm z-20 w-full border border-[#dee0e1] overflow-y-auto mension-suggestion-shadow"
          >
            {Array.from({ length: range[1] - range[0] + 1 }).map((_, i) => (
              <div
                onClick={() => {
                  setDateInput((prev) => ({ ...prev, date: range[1] - i }));
                  setValue((prev) => ({ ...prev, [name]: range[1] - i }));
                }}
                key={i}
              >
                <p className="px-4 py-2 text-[var(--text-dark)] text-[15px]">
                  {range[1] - i}
                </p>
                {!(range[0] === range[1] - i) && <hr />}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default DateInput;

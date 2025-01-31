import React, { useId } from "react";

function Radio({
  title,
  subtitle,
  onChange,
  checked = false,
  name,
  style,
  subCss = "leading-3",
  className,
}) {
  // const randomId = useId();
  return (
    <div className={`text text-[var(--text-dark)] ${className}`}>
      <input
        onChange={onChange}
        name={name}
        type="radio"
        checked={checked}
        id={title}
        className="general-radio"
      />
      <label className="before:scale-90" htmlFor={title}>
        <div className="report">
          <h3 style={style}>{title}</h3>
          {subtitle && <p className={subCss}>{subtitle}</p>}
        </div>
      </label>
    </div>
  );
}

export default Radio;

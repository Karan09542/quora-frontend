import React from "react";
import { Link } from "react-router-dom";
import Switch from "../../../buttons-fields/Switch";

function PrivacyListTile({
  onChange,
  checked,
  title,
  isLearnMore = false,
  link,
  target = "_self",
  subtitle,
  isSwitch = true,
}) {
  return (
    <div className="flex gap-1 p-4 ">
      {isSwitch && (
        <Switch
          onChange={(e) => onChange(e.target.checked)}
          checked={checked}
        />
      )}
      <div>
        <p className="text-[15px] text-[var(--text-dark)]">{title}</p>
        {isLearnMore && (
          <Link to={link} target={target}>
            <p className="text-[var(--text-color-93)] text-[13px] leading-3 hover:underline cursor-pointer">
              Learn more
            </p>
          </Link>
        )}
        {subtitle && (
          <p className="text-[var(--text-color-93)] text-[13px] leading-3">
            {subtitle}
          </p>
        )}
      </div>
    </div>
  );
}

export default PrivacyListTile;

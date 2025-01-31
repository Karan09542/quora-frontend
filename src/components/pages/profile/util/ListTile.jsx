import React from "react";
import Blue from "../../../../assets/spaceImage/blue.webp";

function ListTile({ imgSrc, title, subtitle }) {
  return (
    <div className="flex items-center gap-2">
      {/* space icon */}
      <div>
        <img
          src={imgSrc || Blue}
          alt="space icon"
          className="w-8 h-8 rounded-lg aspect-square"
        />
      </div>
      {/* space name & role */}
      <div>
        {title && (
          <h3 className="text-[13px] font-bold text-[var(--text-dark)] capitalize">
            {title}
          </h3>
        )}
        {subtitle && (
          <p className="text-[13px] text-[var(--text-color-93)]">{subtitle}</p>
        )}
      </div>
    </div>
  );
}

export default ListTile;

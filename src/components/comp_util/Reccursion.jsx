import React from "react";

function Reccursion({ level, maxLevel }) {
  if (level === 0) return <h1>हर हर महादेव</h1>;
  const count = level - 1;
  return (
    <div>
      <h1
        style={{ marginLeft: "2rem", fontSize: `${level * 2}px` }}
        className="text-red-500 "
      >
        हर हर महादेव
      </h1>
      <div>
        <Reccursion level={count} />
      </div>
    </div>
  );
}

export default Reccursion;

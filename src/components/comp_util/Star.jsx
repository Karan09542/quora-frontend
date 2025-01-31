import React from "react";

function Star() {
  function genStar(level, space = " \u00A0\u00A0 \u00A0") {
    const star = [];
    for (let i = 0; i < level; i++) {
      star.push(
        <p>
          {space.repeat(level - i) +
            "🕉".repeat(i) +
            " ".repeat(i === 0 ? 0 : i - 1)}
        </p>
      );
    }
    return star;
  }
  return (
    <div className="relative flex flex-col items-center [&>div]:absolute">
      {/* left top */}
      <div className="-rotate-180 left-32 bottom-20">
        <div className="text-orange-500 animate-bounce">{genStar(7)}</div>
      </div>
      <div className="rotate-180 right-32 bottom-24">
        <div className="text-orange-500  !duration-[0.001s] animate-bounce">
          {genStar(7, "")}
        </div>
      </div>
      {/* left bottom */}
      <div className="left-32 top-20">
        <div className="text-orange-500  !duration-[0.001s] animate-bounce">
          {genStar(7, "")}
        </div>
      </div>
      <div className="right-32 top-14 text-orange-500 !duration-[0.001s] animate-bounce">
        {genStar(7, " \u00A0\u00A0 \u00A0")}
      </div>
      <h1 className="text-3xl first-letter:text-red-500">बम बम भोले</h1>
    </div>
  );
}

export default Star;

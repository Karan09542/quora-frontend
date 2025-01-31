import React from "react";
import CrossButton from "../buttons-fields/CrossButton";

const AnywhereLoginSystem = () => {
  return (
    <div className="fixed w-full h-screen bg-black/70">
      <div className="absolute pt-4 mx-auto -translate-x-1/2 -translate-y-1/2 bg-white top-1/2 left-1/2 item max-w-[618px] w-full rounded-lg">
        <div className="px-2">
          <CrossButton size={36} onClick={() => setOpenModel(null)} />
        </div>
      </div>
    </div>
  );
};

export default AnywhereLoginSystem;

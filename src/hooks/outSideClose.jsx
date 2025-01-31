import React, { useEffect } from "react";

function outSideClose({ setState, ref, arg }) {
  return useEffect(() => {
    function handleClick(e) {
      if (ref.current && !ref.current.contains(e.target)) {
        setState(arg);
      }
    }
    window.addEventListener("pointerdown", handleClick);
    return () => window.removeEventListener("pointerdown", handleClick);
  }, [setState, ref, arg]);
}

export default outSideClose;

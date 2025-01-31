import React, { useRef } from "react";

function useThrottle(func, delay = 1000) {
  const isThrottle = useRef(true);
  return (...arg) => {
    if (isThrottle.current) {
      func();
      isThrottle.current = false;
      setTimeout(() => (isThrottle.current = true), delay);
    }
  };
}

export default useThrottle;

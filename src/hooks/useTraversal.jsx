import React from "react";

function useTraversal(element, traverse, levels = 1) {
  let currentElement = element;
  for (let i = 0; i < levels; i++) {
    if (currentElement[traverse]) {
      currentElement = currentElement[traverse];
    } else {
      break;
    }
  }
  return currentElement;
}

export default useTraversal;

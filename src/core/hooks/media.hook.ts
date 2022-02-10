import React from "react";
import { useWindowSize } from "./window-size.hook";

const useMedia = (exact = false) => {
  const { width } = useWindowSize();
  let tablet = width >= 768;
  const desktop = width >= 1210;
  if (exact) {
    tablet = tablet && !desktop;
  }

  return {
    tablet,
    desktop,
    mobile: !tablet && !desktop,
  };
};

export { useMedia };

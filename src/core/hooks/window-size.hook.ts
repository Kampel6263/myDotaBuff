import { useLayoutEffect, useRef, useState } from "react";

/**
 * Get sizes
 */
const get = () => ({
  width: window.innerWidth,
  height: window.innerHeight,
});

/**
 * Use window sizes
 */
const useWindowSize = () => {
  const [{ width, height }, set] = useState(get());
  const listener = () => {
    set(get());
  };

  useLayoutEffect(() => {
    window.addEventListener("resize", listener);

    return () => {
      window.removeEventListener("resize", listener);
    };
  }, []);

  return {
    width,
    height,
    refresh: listener,
  };
};

export { useWindowSize };

import { useLayoutEffect, useState } from "react";

export function useWindowSize(options, deps) {
  const [size, setSize] = useState([0, 0]);
  useLayoutEffect(() => {
    if (window) {
      function updateSize() {
        setSize([window.innerWidth, window.innerHeight]);
        options?.onChange?.(window.innerWidth, window.innerHeight);
      }
      if (!options?.oneTime) {
        window.addEventListener("resize", updateSize);
      }
      updateSize();
    }
    return () => {
      if (!options?.oneTime && typeof updateSize === "function") {
        window.removeEventListener("resize", updateSize);
      }
    };
  }, [JSON.stringify(deps)]);
  return size;
}

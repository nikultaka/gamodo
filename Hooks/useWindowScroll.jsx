import { checkWindow } from "@/lib/functions/_helpers.lib";
import { debounce } from "@mui/material";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { usePrevious } from "./usePrevious";

export default function useWindowScroll({
  onScroll,
  onScrollStop,
  onScrollDown,
  onScrollUp,
  enabled,
}) {
  const [scrollPosition, setScrollPosition] = useState(undefined);
  const prevPosition = usePrevious(scrollPosition);

  const scrollStopDetector = useRef(
    debounce((position, scrollingDirection) => {
      if (typeof onScrollStop === "function") {
        onScrollStop(position, scrollingDirection);
      }
    }, 1000)
  ).current;

  const onScrollCallback = useCallback((event) => {
    const position = {
      positionX: window.scrollX,
      positionY: window.scrollY,
    };
    if (typeof onScroll === "function") {
      onScroll(event, position);
    }
    setScrollPosition(position);
  }, []);

  useEffect(() => {
    if (
      (typeof enabled === "boolean" && enabled) ||
      typeof enabled === "undefined"
    ) {
      if (checkWindow()) {
        window.addEventListener("scroll", onScrollCallback);
      }
    }
    return () => {
      if (
        (typeof enabled === "boolean" && enabled) ||
        typeof enabled === "undefined"
      ) {
        if (checkWindow()) {
          window.removeEventListener("scroll", onScrollCallback);
        }
      }
    };
  }, [enabled]);

  useEffect(() => {
    if (scrollPosition) {
      let scrollingDirection = null;
      if (prevPosition?.positionY > scrollPosition?.positionY) {
        if (typeof onScrollUp === "function") {
          onScrollUp(scrollPosition);
        }
        scrollingDirection = "up";
      }
      if (prevPosition?.positionY < scrollPosition?.positionY) {
        if (typeof onScrollDown === "function") {
          onScrollDown(scrollPosition);
        }
        scrollingDirection = "down";
      }
      scrollStopDetector(scrollPosition, scrollingDirection);
    }
  }, [prevPosition, scrollPosition]);

  return { scrollPosition, prevPosition };
}

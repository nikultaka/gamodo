import { Fade } from "@mui/material";
import React from "react";

export default function SwipeableView({ active, children }) {
  return (
    <Fade in={active} unmountOnExit mountOnEnter>
      <div>{children}</div>
    </Fade>
  );
}

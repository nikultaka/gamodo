import { checkWindow } from "@/lib/functions/_helpers.lib";
import BackButton from "@/ui/Buttons/BackButton/BackButton";
import { Box, CircularProgress, Fade, styled } from "@mui/material";
import React, { forwardRef, useEffect, useRef, useState } from "react";
const StyledGameDisplayContainer = styled(Box, {
  shouldForwardProp: (propName) => propName !== "offsetHeight",
})`
  height: calc(100vh - ${({ offsetHeight }) => offsetHeight || "0px"});
  width: 100%;
  z-index: 99;
  position: relative;
  iframe {
    border: 0;
    width: 100%;
    height: 100%;
  }
`;

const LoadingScene = styled(Box)`
  height: 100vh;
  position: fixed;
  background: var(--bodyBackground);
  z-index: 99999;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const StyledBackButton = styled(BackButton)`
  button {
    position: absolute;
    padding: 5px 8px;
  }
`;
const GameDisplay = forwardRef(function GameDisplay(
  { gameDetails, offsetHeight, onBack },
  ref
) {
  const [gameLoaded, setGameLoaded] = useState(false);
  useEffect(() => {
    let html = null;
    if (checkWindow()) {
      html = document.getElementsByTagName("html")?.[0];
      if (html) {
        html.style.overflow = "hidden";
      }
    }
    return () => {
      if (html) {
        html.style.overflow = "auto";
      }
    };
  }, []);
  return (
    <>
      <Fade in={!gameLoaded} unmountOnExit mountOnEnter>
        <LoadingScene>
          <CircularProgress />
        </LoadingScene>
      </Fade>
      <StyledGameDisplayContainer ref={ref} offsetHeight={offsetHeight}>
        <StyledBackButton onClick={onBack} />
        <iframe
          src={gameDetails?.game_url}
          height={"100%"}
          width={"100%"}
          onLoad={() => {
            setGameLoaded(true);
          }}
        />
      </StyledGameDisplayContainer>
    </>
  );
});

export default GameDisplay;

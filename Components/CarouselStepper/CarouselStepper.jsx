import React, { useCallback, useEffect, useMemo, useState } from "react";
import styles from "@/styles/components/carouselstepper.module.scss";
import MyButton from "@/ui/Buttons/MyButton/MyButton";
import ArrowForroword from "@/ui/icons/ArrowForroword";
import { Box, Fade, Slide, styled } from "@mui/material";
import eventEmitter from "@/eventEmitter/eventemitter";
import { events } from "@/eventEmitter/events";
const StyledCarouselStepperContainer = styled(Box)`
  &.stepGlobal {
    position: inherit;
    background-color: transparent;
  }
  span {
    transition: all 0.25s ease-in-out;
    cursor: pointer;
  }
  .active {
    background-color: var(--activeColor) !important;
  }
`;
function CarouselStepper({
  steps,
  active,
  disableFixPosition,
  onBarClick,
  hideSteps,
}) {

  const onBarsClick = useCallback(
    (clickedIndex) => () => {
      if (onBarClick) {
        onBarClick(clickedIndex);
      }
    },
    [active, onBarClick]
  );

  const bars = useMemo(() => {
    if (hideSteps) {
      return null;
    }
    return Array.from(Array(steps).keys()).map((_, index) => {
      const barIndex = index;
      return (
        <span
          onClick={onBarsClick(barIndex)}
          className={`${barIndex === active ? "active" : ""}`}
          key={barIndex}
        ></span>
      );
    });
  }, [steps, active, hideSteps]);

  const onContinueClick = useCallback(() => {
    let nextStep = active + 1;
    eventEmitter.emit(events.stepper.forward, { active, nextStep });
  }, [active]);

  return (
    <Slide in={true} direction={"up"} unmountOnExit mountOnEnter>
      <StyledCarouselStepperContainer
        component={"div"}
        className={`${styles.stepper} ${
          disableFixPosition ? "stepGlobal" : ""
        }`}
      >
        {!hideSteps && <div className={`${styles.stepperControl}`}>{bars}</div>}
        <div className="primaryBtn" id="primaryBtn">
          <MyButton onClick={onContinueClick}>
            Continue <ArrowForroword />
          </MyButton>
        </div>
      </StyledCarouselStepperContainer>
    </Slide>
  );
}

export default CarouselStepper;

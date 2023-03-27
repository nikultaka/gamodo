import CarouselStepper from "@/components/CarouselStepper/CarouselStepper";
import DailyRewards from "@/components/GetStarted/DailyRewards";
import SelectProductCategories from "@/components/GetStarted/SelectProductCategories";
import SelectStores from "@/components/GetStarted/SelectStores";
import CreatePassword from "@/components/GetStarted/CreatePassword";
import SwipeableView from "@/components/GetStarted/SwipeableView";
import BackButton from "@/ui/Buttons/BackButton/BackButton";
import { Box, Fade } from "@mui/material";
import { useRouter } from "next/router";
import React, { useCallback, useEffect, useRef, useState } from "react";
import SwipeableViews from "react-swipeable-views";
import eventEmitter from "@/eventEmitter/eventemitter";
import { events } from "@/eventEmitter/events";

const steps = [
  DailyRewards,
  CreatePassword,
  SelectStores,
  SelectProductCategories,
];

const StepsLength = steps.length;

export default function Stepper() {
  const mainBoxRef = useRef(null);
  const [currentStep, setCurrentStep] = useState(0);
  const router = useRouter();
  useEffect(() => {
    mainBoxRef?.current?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  }, [currentStep]);

  //
  const handleStepChange = useCallback((active, nextStep) => {
    if (active === StepsLength - 1) {
      router.replace("/home");
    } else {
      setCurrentStep(nextStep);
    }
  }, []);

  const onBackButtonClick = useCallback(() => {
    if (currentStep !== 0) {
      setCurrentStep(currentStep - 1);
    }
  }, [currentStep]);

  useEffect(() => {
    eventEmitter.on(events.stepper.back, onBackButtonClick);
    return () => {
      eventEmitter.off(events.stepper.back, onBackButtonClick);
    };
  }, [onBackButtonClick]);

  const onSwiperChangeIndex = useCallback(
    (index) => {
      const newIndex = index + 1;
      //this is to prevent swiper jump +2 slides on holding
      if (newIndex > currentStep) {
      } else {
        handleStepChange(currentStep - 2);
      }
    },
    [handleStepChange, currentStep]
  );

  return (
    <Box
      sx={{
        position: "relative",
      }}
      ref={mainBoxRef}
    >
      {currentStep !== 0 && currentStep !== 2 && currentStep !== 3 && (
        <BackButton onClick={onBackButtonClick} />
      )}
      <SwipeableViews
        resistance
        // onChangeIndex={onSwiperChangeIndex}
        index={currentStep}
        autoPlay={false}
      >
        {steps?.map((Step, index) => {
          return (
            <SwipeableView active={currentStep === index}>
              <Step onNext={handleStepChange} index={index} />
            </SwipeableView>
          );
        })}
      </SwipeableViews>
      <CarouselStepper
        active={currentStep}
        steps={StepsLength}
        disableFixPosition={currentStep === 2 || currentStep === 3}
        hideSteps={currentStep === 2 || currentStep === 3}
        // onBarClick={setCurrentStep}
      />
    </Box>
  );
}

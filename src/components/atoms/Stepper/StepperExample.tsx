import React from "react";
import { Stepper, Step } from "./index";
import Button from "../Button";

export function StepperExample() {
  const [activeStep, setActiveStep] = React.useState(0);
  const [isLastStep, setIsLastStep] = React.useState(false);
  const [isFirstStep, setIsFirstStep] = React.useState(false);
  
  const handleNext = () => !isLastStep && setActiveStep((cur) => cur + 1);
  const handlePrev = () => !isFirstStep && setActiveStep((cur) => cur - 1);
  
  return (
    <div className="w-full py-4 px-8 max-w-2xl">
      <Stepper
        activeStep={activeStep}
        isLastStep={(value) => setIsLastStep(value)}
        isFirstStep={(value) => setIsFirstStep(value)}
      >
        <Step id={0} onClick={() => setActiveStep(0)}>1</Step>
        <Step id={1} onClick={() => setActiveStep(1)}>2</Step>
        <Step id={2} onClick={() => setActiveStep(2)}>3</Step>
      </Stepper>
      
      <div className="mt-16 flex justify-between">
        <Button onClick={handlePrev} disabled={isFirstStep}>
          Prev
        </Button>
        <Button onClick={handleNext} disabled={isLastStep}>
          Next
        </Button>
      </div>
    </div>
  );
}
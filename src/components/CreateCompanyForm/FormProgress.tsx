import { Dispatch, SetStateAction } from "react";
import { Step, Stepper } from "../atoms/Stepper";

export interface FormProgressProps {
  steps: number[];
  activeStep: number;
  setActiveStep: Dispatch<SetStateAction<number>>;
  setIsLastStep: Dispatch<SetStateAction<boolean>>;
  setIsFirstStep: Dispatch<SetStateAction<boolean>>;
}

export function FormProgress({ steps, activeStep, setActiveStep, setIsLastStep, setIsFirstStep }: FormProgressProps) {
  // const steps = ["Company Info", "Address", "Contact", "Upload Logo"];

  return (
    <div className="w-full py-4">
      <Stepper
        activeStep={activeStep}
        isLastStep={(value) => setIsLastStep(value)}
        isFirstStep={(value) => setIsFirstStep(value)}
      >
        {steps.map((label, index) => (
          <Step key={label} id={label} onClick={() => setActiveStep(0)}>
            {index + 1}
          </Step>
        ))}
      </Stepper>
    </div>
  );
}

import { createContext, useContext } from "react";

export interface StepperContextType {
  activeStep: number;
  stepsCount: number;
  isFirstStep: boolean;
  isLastStep: boolean;
  registerStep: (id: number) => void;
}

export const StepperContext = createContext<StepperContextType | undefined>(undefined);

export const useStepper = () => {
  const context = useContext(StepperContext);
  if (!context) {
    throw new Error("useStepper must be used within a Stepper root Component");
  }
  return context;
};

import { Step, StepProps } from "./Step";
import { StepperProps, StepperRoot } from "./StepperRoot";

export { useStepper, type StepperContextType } from "./StepperContext";

const Stepper = Object.assign(StepperRoot, {
  Step,
});

export default Stepper;

export { Step, StepperRoot as Stepper };

export type { StepperProps, StepProps };

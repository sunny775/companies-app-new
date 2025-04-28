import React, { useEffect, useState } from "react";
import { tv } from "tailwind-variants";
import { StepperContext, StepperContextType } from "./StepperContext";
import useMergedRefs from "@/lib/hooks/useMergeRefs";

const stepperStyles = tv({
  slots: {
    stepper: "w-full relative flex items-center justify-between",
    line: "absolute left-0 top-2/4 h-0.5 w-full -translate-y-2/4 bg-gray-200 dark:bg-surface-2",
  },
  variants: {
    active: {
      true: {
        line: "bg-green-700 dark:bg-green-700 transition-all duration-500",
      },
    },
  },
});

export interface StepperProps extends React.ComponentProps<"div"> {
  activeStep: number;
  isFirstStep?: (arg: boolean) => void;
  isLastStep?: (arg: boolean) => void;
  className?: string;
  children: React.ReactNode;
}

export const StepperRoot = ({
  ref,
  activeStep,
  isFirstStep: isFirstStepCallback,
  isLastStep: isLastStepCallback,
  className,
  children,
  ...rest
}: StepperProps) => {
  const containerRef = React.useRef<HTMLDivElement>(null);
  const styles = stepperStyles();

  const [, setRegisteredSteps] = useState<number[]>([]);
  const [stepsCount, setStepsCount] = useState(0);
  const [widthPerStep, setWidthPerStep] = useState(0);

  const isFirstStep = activeStep === 0;
  const isLastStep = stepsCount > 0 && activeStep === stepsCount - 1;
  const isReachEnd = stepsCount > 0 && activeStep > stepsCount - 1;

  useEffect(() => {
    if (typeof isFirstStepCallback === "function") {
      isFirstStepCallback(isFirstStep);
    }
    if (typeof isLastStepCallback === "function") {
      isLastStepCallback(isLastStep);
    }
  }, [isFirstStep, isLastStep, isFirstStepCallback, isLastStepCallback]);

  useEffect(() => {
    if (containerRef.current) {
      const { width } = containerRef.current.getBoundingClientRect();
      const widthPerStepCalc = width / (stepsCount - 1 || 1);
      setWidthPerStep(widthPerStepCalc);
    }
  }, [stepsCount, children]);

  const width = React.useMemo(() => {
    if (!isReachEnd && stepsCount > 1) {
      return widthPerStep * activeStep;
    }
    return 0;
  }, [activeStep, isReachEnd, widthPerStep, stepsCount]);

  const registerStep = (id: number) => {
    setRegisteredSteps((prev) => {
      if (!prev.includes(id)) {
        const newSteps = [...prev, id].sort((a, b) => a - b);
        setStepsCount(newSteps.length);
        return newSteps;
      }
      return prev;
    });
  };

  const contextValue: StepperContextType = {
    activeStep,
    stepsCount,
    isFirstStep,
    isLastStep,
    registerStep,
  };

  const mergedRef = useMergedRefs(ref, containerRef);
  const stepperClasses = styles.stepper({ className });

  return (
    <StepperContext.Provider value={contextValue}>
      <div {...rest} ref={mergedRef} className={stepperClasses}>
        <div className={styles.line()} />
        <div
          className={styles.line({ active: true })}
          style={{
            width: `${width}px`,
          }}
        />
        {children}
      </div>
    </StepperContext.Provider>
  );
};

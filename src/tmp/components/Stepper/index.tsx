import React, { ReactNode } from "react";
import { useMergeRefs } from "@floating-ui/react";
import Step from "./Step";
import { tv } from "tailwind-variants";

export interface StepperProps extends React.ComponentProps<"div"> {
  activeStep: number;
  isFirstStep?: (arg: boolean) => void;
  isLastStep?: (arg: boolean) => void;
  className?: string;
  children: ReactNode;
}

const stepperStyles = tv({
  slots: {
    stepper: "w-full relative flex items-center justify-between",
    line: "absolute left-0 top-2/4 h-0.5 w-full -translate-y-2/4 bg-gray-300",
    step: "",
  },
  variants: {
    active: {
      true: {
        step: "bg-gray-900 text-white",
        line: "bg-gray-900 transition-all duration-500",
      },
    },
    completed: {
      true: {
        step: "bg-gray-900 text-white",
      },
    },
  },
});

const Stepper = ({ ref, activeStep, isFirstStep, isLastStep, className, children, ...rest }: StepperProps) => {
  const styles = stepperStyles();
  const containerRef = React.useRef<HTMLDivElement>(null);

  const [widthPerStep, setWidthPerStep] = React.useState(0);
  const isFirstStepValue = activeStep === 0;
  const isLastStepValue = Array.isArray(children) && activeStep === children.length - 1;
  const isReachEnd = Array.isArray(children) && activeStep > children.length - 1;

  React.useEffect(() => {
    if (containerRef.current) {
      const childrenInstance = React.Children.toArray(children);
      const { width } = containerRef.current.getBoundingClientRect();
      const widthPerStepCalc = width / (childrenInstance?.length - 1);

      setWidthPerStep(widthPerStepCalc);
    }
  }, [children]);

  const width = React.useMemo(() => {
    if (!isReachEnd) {
      return widthPerStep * activeStep;
    }
  }, [activeStep, isReachEnd, widthPerStep]);

  const mergedRef = useMergeRefs([ref, containerRef]);

  const stepperClasses = styles.stepper({ className });

  React.useEffect(() => {
    if (isLastStep && typeof isLastStep === "function") isLastStep(isLastStepValue);
    if (isFirstStep && typeof isFirstStep === "function") isFirstStep(isFirstStepValue);
  }, [isFirstStep, isFirstStepValue, isLastStep, isLastStepValue]);

  return (
    <div {...rest} ref={mergedRef} className={stepperClasses}>
      <div className={styles.line()} />
      <div
        className={styles.line({ active: true })}
        style={{
          width: `${width}px`,
        }}
      />
      {Array.isArray(children)
        ? children.map((child, index) => {
            return React.cloneElement(child, {
              key: index,
              ...child.props,
              className: styles.step({
                className: child.props.className,
                active: index === activeStep,
                completed: index < activeStep,
              }),
            });
          })
        : children}
    </div>
  );
};

export { Stepper, Step };
export default Object.assign(Stepper, {
  Step,
});

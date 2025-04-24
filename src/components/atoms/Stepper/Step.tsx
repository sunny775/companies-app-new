import React, { useEffect } from "react";
import { tv } from "tailwind-variants";
import { useStepper } from "./StepperContext";

const stepStyles = tv({
  base: "relative z-10 grid place-items-center w-10 h-10 rounded-full bg-gray-200 dark:bg-surface-2 font-bold transition-all duration-300",
  variants: {
    active: {
      true: "bg-green-700 dark:bg-green-700 text-white transition-all duration-800",
    },
    completed: {
      true: "bg-green-700 dark:bg-green-700 text-white",
    },
  },
});

export interface StepProps extends Omit<React.ComponentProps<"div">, "id"> {
  id: number;
  className?: string;
  activeClassName?: string;
  completedClassName?: string;
}

export const Step = ({ id, className, children, ...rest }: StepProps) => {
  const { activeStep, registerStep } = useStepper();

  useEffect(() => {
    registerStep(id);
  }, [id, registerStep]);

  const isActive = id === activeStep;
  const isCompleted = id !== undefined && id < activeStep;

  const styles = stepStyles({
    className,
    active: isActive,
    completed: isCompleted,
  });

  return (
    <div {...rest} className={styles}>
      {children}
    </div>
  );
};

import React from "react";
import { tv } from "tailwind-variants";

export interface StepProps extends React.ComponentProps<"div"> {
  activeClassName?: string;
  completedClassName?: string;
}

const stepStyles = tv({
  base: "relative z-10 grid place-items-center w-10 h-10 rounded-full bg-gray-300 text-gray-900 font-bold transition-all duration-300",
});

export const Step = ({ className, children, ...rest }: StepProps) => {
  const styles = stepStyles({ className });

  return (
    <div {...rest} className={styles}>
      {children}
    </div>
  );
};

export default Step;

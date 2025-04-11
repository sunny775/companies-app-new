import React from "react";
import { motion } from "framer-motion";
import { useTabs, setActive, setIsInitial } from "./TabsContext";
import { tv } from "tailwind-variants";
import cn from "@/lib/cn";

export interface TabProps extends React.ComponentProps<"li"> {
  value: string | number;
  activeClassName?: string;
  disabled?: boolean;
}

const tabStyles = tv({
  slots: {
    base: "flex items-center justify-center text-center w-full h-full relative bg-transparent py-1 px-2 text-blue-gray-900 antialiased font-sans text-base font-normal leading-relaxed select-none cursor-pointer",
    indicator: "absolute inset-0 z-10 h-full bg-white rounded-md shadow",
  },
  variants: {
    disabled: {
      true: "opacity-50 cursor-not-allowed pointer-events-none select-none",
    },
  },
});

export const Tab = ({ value, className, activeClassName, disabled, children, ...rest }: TabProps) => {
  const { state, dispatch } = useTabs();
  const { id, active, indicatorProps } = state;

  const styles = tabStyles({ className, disabled });

  const tabClasses = cn(styles.base(), { [activeClassName || ""]: active === value });

  const indicatorClasses = styles.indicator({ className: (indicatorProps?.className || "") as string });

  return (
    <li
      {...rest}
      role="tab"
      className={tabClasses}
      onClick={(e) => {
        const onClick = rest?.onClick;

        if (typeof onClick === "function") {
          setActive(dispatch, value);
          setIsInitial(dispatch, false);
          onClick(e);
        }

        setIsInitial(dispatch, false);
        setActive(dispatch, value);
      }}
      data-value={value}
    >
      <div className="z-20 text-inherit">{children}</div>
      {active === value && (
        <motion.div {...indicatorProps} transition={{ duration: 0.5 }} className={indicatorClasses} layoutId={id} />
      )}
    </li>
  );
};

export default Tab;

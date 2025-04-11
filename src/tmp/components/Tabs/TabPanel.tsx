import React, { ReactNode } from "react";
import { AnimatePresence, m, MotionProps, LazyMotion, domAnimation } from "framer-motion";
import { useTabs } from "./TabsContext";
import { tv } from "tailwind-variants";

export interface TabPanelProps extends MotionProps {
  value: string | number;
  className?: string;
  children: ReactNode;
}

const tabsPanelStyles = tv({
  base: "w-full h-max text-gray-700 p-4 antialiased font-sans text-base font-light leading-relaxed",
});

export const TabPanel = ({ value, className, children, ...rest }: TabPanelProps) => {
  const { state } = useTabs();
  const { active, appliedAnimation, isInitial } = state;

  const styles = tabsPanelStyles({ className });

  return (
    <LazyMotion features={domAnimation}>
      <AnimatePresence mode="wait">
        <m.div
          {...rest}
          role="tabpanel"
          className={styles}
          initial="unmount"
          exit="unmount"
          animate={active === value ? "mount" : isInitial ? "initial" : "unmount"}
          variants={appliedAnimation}
          data-value={value}
        >
          {children}
        </m.div>
      </AnimatePresence>
    </LazyMotion>
  );
};

export default TabPanel;

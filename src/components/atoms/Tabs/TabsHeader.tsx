import { ReactNode, useLayoutEffect, useRef, useState } from "react";
import { tv } from "tailwind-variants";
import { useTabs } from "./TabsContext";

export interface IndicatorStyle {
  left: string;
  width: string;
  top: string;
  height: string;
}

export interface TabsHeaderProps {
  children: ReactNode;
  className?: string;
  indicatorClassName?: string;
}

const tabsHeaderStyles = tv({
  slots: {
    base: "flex relative p-1.5 bg-gray-100 dark:bg-gray-600/5",
    indicator: "absolute bg-surface backdrop-blur-2xl transition-all duration-300 ease-in-out rounded-md",
  },
  variants: {
    orientation: {
      vertical: "flex-col",
      horizontal: "flex-row rounded-md",
    },
  },
});

export const TabsHeader = ({ children, className, indicatorClassName }: TabsHeaderProps) => {
  const { activeTab, orientation } = useTabs();
  const tabsRef = useRef<HTMLDivElement>(null);
  const [indicatorStyle, setIndicatorStyle] = useState<IndicatorStyle>({
    left: "0px",
    width: "0px",
    top: "0px",
    height: "0px",
  });

  useLayoutEffect(() => {
    if (!tabsRef.current) return;

    const activeTabElement = tabsRef.current.querySelector(`[data-value="${activeTab}"]`) as HTMLElement;
    if (!activeTabElement) return;

    setIndicatorStyle({
      left: `${activeTabElement.offsetLeft}px`,
      width: `${activeTabElement.offsetWidth}px`,
      top: `${activeTabElement.offsetTop}px`,
      height: `${activeTabElement.offsetHeight}px`,
    });
  }, [activeTab]);

  const styles = tabsHeaderStyles({ orientation });

  return (
    <div ref={tabsRef} className={styles.base({ className })}>
      {children}
      <span
        className={styles.indicator({ className: indicatorClassName })}
        style={{
          left: indicatorStyle.left,
          width: indicatorStyle.width,
          top: indicatorStyle.top,
          height: indicatorStyle.height,
        }}
      />
    </div>
  );
};

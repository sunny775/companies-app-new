import React from "react";
import { useTabs, setIndicator } from "./TabsContext";
import { tv } from "tailwind-variants";

export interface TabsHeaderProps extends React.ComponentProps<"ul"> {
  indicatorProps?: Record<string, unknown>;
}

const tabsHeaderStyles = tv({
  base: "flex relative bg-gray-50 rounded-lg p-1",
  variants: {
    orientation: {
      horizontal: "block",
      vertical: "flex",
    },
  },
  defaultVariants: {
    orientation: "horizontal",
  },
});

export const TabsHeader = ({ indicatorProps, className, children, ...rest }: TabsHeaderProps) => {
  const { state, dispatch } = useTabs();
  const { orientation } = state;

  React.useEffect(() => {
    if (indicatorProps) setIndicator(dispatch, indicatorProps);
  }, [dispatch, indicatorProps]);

  const styles = tabsHeaderStyles({ className, orientation });

  return (
    <nav>
      <ul {...rest} role="tablist" className={styles}>
        {children}
      </ul>
    </nav>
  );
};

export default TabsHeader;

import React from "react";
import { TabsContextProvider, useTabs } from "./TabsContext";
import { Tab, TabProps } from "./Tab";
import { TabsBody, TabsBodyProps } from "./TabsBody";
import { TabsHeader, TabsHeaderProps } from "./TabsHeader";
import { TabPanel, TabPanelProps } from "./TabPanel";
import { tv, VariantProps } from "tailwind-variants";

export interface TabsProps extends React.ComponentProps<"div">, VariantProps<typeof tabsStyles> {
  value: string | number;
}

const tabsStyles = tv({
  base: "overflow-hidden",
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

const Tabs = ({ value, className, orientation, children, ...rest }: TabsProps) => {
  const tabsId = React.useId();

  const styles = tabsStyles({ className, orientation });

  return (
    <TabsContextProvider id={tabsId} value={value} orientation={orientation}>
      <div {...rest} className={styles}>
        {children}
      </div>
    </TabsContextProvider>
  );
};

export type { TabProps, TabsBodyProps, TabsHeaderProps, TabPanelProps };
export { Tabs, Tab, TabsBody, TabsHeader, TabPanel, useTabs };
export default Object.assign(Tabs, { Tab, Body: TabsBody, Header: TabsHeader, Panel: TabPanel });

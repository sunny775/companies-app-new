import { ReactNode } from "react";
import { tv } from "tailwind-variants";
import { useTabs } from "./TabsContext";

export interface TabPanelProps {
  children: ReactNode;
  value: string;
}

const tabPanelStyles = tv({
  base: "transition-all duration-500 ease-in-out transform",
  variants: {
    active: {
      true: "opacity-100 translate-x-0 ",
      false: "opacity-0 absolute top-0 left-0 -translate-x-10",
    },
  },
});

export const TabPanel = ({ children, value }: TabPanelProps) => {
  const { activeTab } = useTabs();
  const active = value === activeTab;

  return (
    <div className={tabPanelStyles({ active })} role="tabpanel" id={`panel-${value}`}>
      {children}
    </div>
  );
};

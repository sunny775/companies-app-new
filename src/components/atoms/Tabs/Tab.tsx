import { ReactNode } from "react";
import { tv } from "tailwind-variants";
import Button from "../Button";
import { useTabs } from "./TabsContext";

export interface TabProps {
  children: ReactNode;
  className?: string;
  value: string;
}

const tabStyles = tv({
  base: "w-full bg-transparent active:scale-100 border-0 shadow-none relative transition-all duration-300 z-10 hover:text-green-600 py-0 h-9",
  variants: {
    active: {
      true: "text-green-600 dark:text-green-600",
    },
  },
});

export const Tab = ({ children, className , value }: TabProps) => {
  const { activeTab, handleTabChange } = useTabs();
  const active = activeTab === value;

  return (
    <Button className={tabStyles({ className, active })} onClick={() => handleTabChange(value)} data-value={value}>
      {children}
    </Button>
  );
};

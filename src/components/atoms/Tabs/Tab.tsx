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
  base: "active:scale-100 bg-transparent border-0 shadow-none relative transition-all duration-300 z-10 hover:text-green-600 py-0 h-9",
  variants: {
    active: {
      true: "text-green-600 dark:text-green-600",
    },
    isHorizontal:{
        true:  "md:w-[300px]"
    }
  },
});

export const Tab = ({ children, className , value }: TabProps) => {
  const { activeTab, handleTabChange, orientation } = useTabs();
  const active = activeTab === value;
  const isHorizontal = orientation === "horizontal"

  return (
    <Button className={tabStyles({ className, active, isHorizontal })} onClick={() => handleTabChange(value)} data-value={value}>
      {children}
    </Button>
  );
};

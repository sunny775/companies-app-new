import cn from "@/lib/utils/cn";
import { ReactNode, useEffect, useState } from "react";
import { TabsContext, TabsContextType } from "./TabsContext";

export interface TabsProps {
  children: ReactNode;
  defaultValue?: string;
  value?: string;
  onChange?: (value: string) => void;
  orientation?: "horizontal" | "vertical";
  className?: string;
}

export const TabsRoot = ({
  children,
  defaultValue = "",
  value,
  onChange,
  orientation = "horizontal",
  className,
}: TabsProps) => {
  const [internalValue, setInternalValue] = useState<string>(defaultValue);

  useEffect(() => {
    if (value !== undefined) {
      setInternalValue(value);
    }
  }, [value]);

  // const isControlled = value !== undefined;

  const handleTabChange = (newValue: string): void => {
    setInternalValue(newValue);

    if (onChange) {
      onChange(newValue);
    }
  };

  const contextValue: TabsContextType = {
    activeTab: internalValue,
    handleTabChange,
    orientation,
  };

  return (
    <TabsContext.Provider value={contextValue}>
      <div className={cn("w-full", className)} data-orientation={orientation}>
        {children}
      </div>
    </TabsContext.Provider>
  );
};

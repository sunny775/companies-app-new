"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import cn from "@/lib/cn";

// Create context for the Collapse component
interface CollapseContextType {
  isExpanded: boolean;
  toggleExpanded: () => void;
}

const CollapseContext = createContext<CollapseContextType | undefined>(undefined);

// Hook to use the collapse context
function useCollapseContext() {
  const context = useContext(CollapseContext);
  if (context === undefined) {
    throw new Error("useCollapseContext must be used within a Collapse provider");
  }
  return context;
}

// Root component props
interface CollapseProps {
  defaultExpanded?: boolean;
  children: ReactNode;
  className?: string;
}

// Trigger component props
interface TriggerProps {
  title: string;
  icon?: ReactNode;
  className?: string;
}

// Content component props
interface ContentProps {
  children: ReactNode;
  className?: string;
}

// Main Collapse component
function Collapse({ defaultExpanded, children, className }: CollapseProps) {
  const [isExpanded, setIsExpanded] = useState<boolean>(!!defaultExpanded);

  const toggleExpanded = (): void => {
    setIsExpanded((prev) => !prev);
  };

  const value = { isExpanded, toggleExpanded };

  return (
    <CollapseContext.Provider value={value}>
      <div className={cn("bg-surface rounded-lg shadow-md overflow-hidden", className)}>
        {children}
      </div>
    </CollapseContext.Provider>
  );
}

// Trigger component for the header
function Trigger({ title, icon, className}: TriggerProps) {
  const { isExpanded, toggleExpanded } = useCollapseContext();

  return (
    <div
      className={cn("flex justify-between items-center p-4 cursor-pointer bg-blue-600/5", className)}
      onClick={toggleExpanded}
    >
      <div className="flex items-center">
        {icon && <span className={"mr-3"}>{icon}</span>}
        <h2 className="text-xl font-semibold">{title}</h2>
      </div>
      {isExpanded ? <ChevronUp /> : <ChevronDown  />}
    </div>
  );
}

// Content component for the collapsible content
function Content({ children, className }: ContentProps) {
  const { isExpanded } = useCollapseContext();

  if (!isExpanded) return null;

  return <div className={cn("p-4", className)}>{children}</div>;
}

// Attach subcomponents to the main component
Collapse.Trigger = Trigger;
Collapse.Content = Content;

export default Collapse;
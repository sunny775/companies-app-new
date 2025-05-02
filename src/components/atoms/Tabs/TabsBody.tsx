import cn from "@/lib/cn";
import React, { ReactNode } from "react";

export interface TabsBodyProps {
  children: ReactNode;
  className?: string;
}

export const TabsBody = ({ children, className }: TabsBodyProps) => {

  return <div className={cn("relative", className)}>{children}</div>;
};

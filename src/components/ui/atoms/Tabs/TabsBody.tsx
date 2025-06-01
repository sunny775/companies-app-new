import cn from "@/lib/utils/cn";
import { ReactNode } from "react";

export interface TabsBodyProps {
  children: ReactNode;
  className?: string;
}

export const TabsBody = ({ children, className }: TabsBodyProps) => {
  return <div className={cn("relative", className)}>{children}</div>;
};

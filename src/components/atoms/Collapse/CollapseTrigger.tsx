"use client";

import { ChevronDown } from "lucide-react";
import { ReactNode } from "react";
import { tv } from "tailwind-variants";
import { useCollapse } from "./CollapseContext";

export const collapseTriggerStyles = tv({
  base: "w-full flex justify-between items-center p-4 cursor-pointer bg-blue-600/5 transition-all rounded-lg",
  slots: {
    arrow: "rotate-0 transition-all",
  },

  variants: {
    isExpanded: {
      true: {
        arrow: "rotate-180 mt-2",
        base: "rounded-b-none"
      },
    },
  },
});

export interface CollapseTriggerProps {
  title: string;
  icon?: ReactNode;
  className?: string;
}

export function CollapseTrigger({ title, icon, className }: CollapseTriggerProps) {
  const { isExpanded, toggleExpanded } = useCollapse();

  const styles = collapseTriggerStyles({
    isExpanded,
  });

  return (
    <button className={styles.base({ className })} onClick={toggleExpanded}>
      <div className="flex items-center">
        {icon && <span className={"mr-3"}>{icon}</span>}
        <h2 className="text-xl font-semibold">{title}</h2>
      </div>
      <ChevronDown className={styles.arrow()} />
    </button>
  );
}

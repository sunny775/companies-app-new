"use client";

import cn from "@/lib/utils/cn";
import { ChevronDown } from "lucide-react";
import React, { ComponentProps, ElementType, ReactNode } from "react";
import { tv } from "tailwind-variants";
import { useCollapse } from "./CollapseContext";

export const collapseTriggerStyles = tv({
  base: "w-full flex justify-between items-center h-12 px-4 cursor-pointer bg-blue-600/5 transition-all",
  slots: {
    arrow: "rotate-0 transition-all",
  },

  variants: {
    isExpanded: {
      true: {
        arrow: "rotate-180 mt-2",
      },
      false: {
        base: "rounded-lg shadow-md",
      },
    },
  },
});

export interface CollapseTriggerProps {
  arrow?: ReactNode;
  className?: string;
  asChild?: boolean;
  children: ReactNode;
}

export function CollapseTrigger({ arrow, className, asChild, children }: CollapseTriggerProps) {
  const { isExpanded, toggleExpanded, contentId, triggerId } = useCollapse();

  const styles = collapseTriggerStyles({ isExpanded });

  const triggerProps: ComponentProps<"button"> = {
    onClick: toggleExpanded,
    "aria-expanded": isExpanded,
    "aria-controls": contentId,
    id: triggerId,
  };

  if (asChild && React.isValidElement(children)) {
    const child = children as React.ReactElement<ComponentProps<ElementType>>;
    return React.cloneElement(child, {
      ...child.props,
      className: cn(child.props.className, className),
      ...triggerProps,
    });
  }

  return (
    <button type="button" className={styles.base({ className })} {...triggerProps}>
      {children}
      <span className={styles.arrow()} aria-hidden="true">
        {arrow ?? <ChevronDown strokeWidth={1} />}
      </span>
    </button>
  );
}

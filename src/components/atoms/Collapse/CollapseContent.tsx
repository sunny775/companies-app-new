"use client";

import cn from "@/lib/cn";
import { ReactNode, useEffect, useRef, useState } from "react";
import { useCollapse } from "./CollapseContext";

export interface CollapseContentProps {
  children: ReactNode;
  className?: string;
  transitionDuration?: number;
}

export function CollapseContent({ children, className, transitionDuration = 300 }: CollapseContentProps) {
  const { isExpanded, contentId, triggerId } = useCollapse();
  const contentRef = useRef<HTMLDivElement>(null);

  const [height, setHeight] = useState<number | string>(isExpanded ? "auto" : 0);

  useEffect(() => {
    const contentHeight = contentRef.current?.scrollHeight;

    if (isExpanded) {
      setHeight(contentHeight || "auto");
      const timer = setTimeout(() => {
        setHeight("auto");
      }, transitionDuration);

      return () => clearTimeout(timer);
    } else {
      if (height === "auto") {
        setHeight(contentRef.current?.scrollHeight || 0);
      }

      setTimeout(() => {
        setHeight(0);
      }, 50);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isExpanded, transitionDuration]);

  return (
    <div
      ref={contentRef}
      id={contentId}
      role="region"
      aria-labelledby={triggerId}
      className={cn("transition-all  ease-in-out", className)}
      style={{ height, transitionDuration: `${transitionDuration}ms` }}
    >
      {children}
    </div>
  );
}

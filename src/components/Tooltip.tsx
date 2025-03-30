import { useState } from "react";
import cn from "@/lib/cn";

interface TooltipProps {
  text: string;
  direction?: "top" | "bottom" | "left" | "right";
  children: React.ReactNode;
  className?: string;
}

const Tooltip = ({
  text,
  direction = "top",
  children,
  className,
}: TooltipProps) => {
  const [isVisible, setIsVisible] = useState(false);

  const directionClasses = {
    top: cn(
      "bottom-full left-1/2 transform -translate-x-1/2 mb-6 opacity-0 translate-y-5",
      { "opacity-100 translate-y-0": isVisible }
    ),
    bottom: cn(
      "top-full left-1/2 transform -translate-x-1/2 mt-6 opacity-0 -translate-y-5",
      { "opacity-100 translate-y-0": isVisible }
    ),
    left: cn(
      "right-full top-1/2 transform -translate-y-1/2 mr-6 opacity-0 translate-x-5",
      { "opacity-100 translate-x-0": isVisible }
    ),
    right: cn(
      "left-full top-1/2 transform -translate-y-1/2 ml-6 opacity-0 -translate-x-5",
      { "opacity-100 translate-x-0": isVisible }
    ),
  };

  const arrowClasses = {
    top: "absolute left-1/2 bottom-0 transform -translate-x-1/2 translate-y-full border-8 border-transparent border-t-gray-800 dark:border-t-[rgb(25,25,25)]",
    bottom:
      "absolute left-1/2 top-0 transform -translate-x-1/2 -translate-y-full border-8 border-transparent border-b-gray-800 dark:border-b-[rgb(25,25,25)]",
    left: "absolute right-0 top-1/2 transform translate-x-full -translate-y-1/2 border-8 border-transparent border-l-gray-800 dark:border-l-[rgb(25,25,25)]",
    right:
      "absolute left-0 top-1/2 transform -translate-x-full -translate-y-1/2 border-8 border-transparent border-r-gray-800 dark:border-r-[rgb(25,25,25)]",
  };

  return (
    <div
      className={cn("group relative", className)}
      onMouseEnter={() => setIsVisible(true)}
      onMouseLeave={() => setIsVisible(false)}
    >
      {children}

      <div
        className={cn(
          "invisible group-hover:visible absolute bg-gray-800 dark:bg-[rgb(25,25,25)] text-gray-300 dark:text-gray-400 text-xs rounded p-2 whitespace-nowrap shadow-lg z-50 transition-all",
          directionClasses[direction]
        )}
      >
        {text}
        <div className={arrowClasses[direction]} />
      </div>
    </div>
  );
};

export default Tooltip;
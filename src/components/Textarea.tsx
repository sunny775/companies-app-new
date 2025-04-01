import React from "react";
import cn from "@/lib/cn";

const Textarea = ({ className, ...props }: React.ComponentProps<"textarea">) => {
  return (
    <textarea
      className={cn(
        "w-full rounded bg-white dark:bg-transparent text-gray-700 dark:text-gray-300 border border-black/10 dark:border-white/10 sm:text-sm pl-3 focus:outline-none focus:border focus:border-green-500/50 dark:focus:border-green-500/30 placeholder:text-gray-300 dark:placeholder:text-gray-700 placeholder:text-xs placeholder:italic",
        className
      )}
      {...props}
    />
  );
};

export default Textarea;

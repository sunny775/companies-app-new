import { tv } from "tailwind-variants";

export const tooltipStyles = tv({
  slots: {
    base: "bg-gray-100 dark:bg-surface-2 text-sm rounded py-1 px-2 shadow-lg",
    arrow: "absolute w-0 h-0 border-4",
  },
  variants: {
    placement: {
      top: {
        arrow:
          "bottom-0 left-1/2 -translate-x-1/2 translate-y-full border-t-gray-100 dark:border-t-surface-2 border-x-transparent border-b-transparent",
      },
      bottom: {
        arrow:
          "top-0 left-1/2 -translate-x-1/2 -translate-y-full border-b-gray-100 dark:border-b-surface-2 border-x-transparent border-t-transparent",
      },
      left: {
        arrow:
          "right-0 top-1/2 translate-x-full -translate-y-1/2 border-l-gray-100 dark:border-l-surface-2 border-y-transparent border-r-transparent",
      },
      right: {
        arrow:
          "left-0 top-1/2 -translate-x-full -translate-y-1/2 border-r-gray-100 dark:border-r-surface-2 border-y-transparent border-l-transparent",
      },
    },
  },

  defaultVariants: {
    placement: "top",
  },
});

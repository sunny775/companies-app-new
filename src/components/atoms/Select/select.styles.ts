import { tv } from "tailwind-variants";

export const selectStyles = tv({
  slots: {
    container: "relative w-full",
    select:
      "peer w-full h-full bg-transparent font-sans font-normal rounded-md focus:outline-0 disabled:bg-gray-50 disabled:border-0 disabled:cursor-not-allowed transition-all border",
    arrow:
      "grid place-items-center absolute top-2/4 right-2 pt-px w-5 h-5 text-blue-gray-400 rotate-0 -translate-y-2/4 transition-all text-gray-500",
    menu: "w-full max-h-96 bg-surface p-3 border border-gray-50 dark:border-white/5 rounded-md shadow-lg shadow-gray-500/10 dark:shadow-gray-500/2 font-sans text-sm font-normal text-gray-500 dark:text-gray-400 overflow-auto focus:outline-none grid gap-2",
    buttonContent: "absolute top-2/4 -translate-y-2/4 left-0 right-0 text-left p-3",
    placeholder: "text-gray-400 dark:text-gray-600",
  },

  variants: {
    open: {
      true: {
        arrow: "rotate-180 mt-px",
      },
    },
    size: {
      md: {
        container: "h-10",
        select: "text-sm pt-4 pb-1.5",
        label: "leading-[4.25]",
      },
      lg: {
        container: "h-12",
        select: "text-sm px-px pt-5 pb-2",
        label: "leading-[4.875]",
      },
    },
    color: {
      default: {
        select: "border-black/10 dark:border-white/10 focus:border-green-500/50 dark:focus:border-green-500/30",
      },
      error: {
        select: "border-red-600/30 dark:border-red-500/20  focus:border-red-500/50 dark:focus:border-red-500/30",
      },
      success: {
        select: "border-green-500/30",
      },
    },
  },
  defaultVariants: {
    color: "default",
    size: "md",
  },
});
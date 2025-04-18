import { tv } from "tailwind-variants";

export const alertStyles = tv({
  base: "flex relative w-full font-sans text-base font-regular px-4 py-4 rounded-lg border",
  slots: {
    action: "!absolute top-2 right-3",
  },
  variants: {
    variant: {
      default: "bg-gray-50 dark:bg-surface border-0",
      success: "bg-green-500/5 border-green-500/15 text-green-700 dark:text-green-400 shadow-green-500/10",
      error: "bg-red-500/5 border-red-500/15 text-red-700 dark:text-red-400 shadow-red-500/10",
      info: "bg-blue-500/5 border-blue-500/15 text-blue-700 dark:text-blue-400 shadow-blue-500/10",
    },
  },

  defaultVariants: {
    variant: "default",
  },
});

import { tv } from "tailwind-variants";

export const alertStyles = tv({
  slots: {
    root: "relative block w-full font-sans text-base font-regular px-4 py-4 rounded-lg",
    action: "!absolute top-2 right-3",
    default: "bg-surface",
    success: "",
    error: "",
    info: "",
  },
  variants: {
    variant: {
      outlined: "border bg-transparent",
      filled: "text-white",
      gradient: "text-white bg-gradient-to-tr",
      ghost: "",
    },
  },
  compoundVariants: [
    {
      variant: "outlined",
      class: {
        default:
          "border-black/5 dark:border-white/10 dark:text-green-300 dark:shadow-white/2",
        success: "border-green-500 text-green-700",
        error: "border-red-500 text-red-700",
        info: "border-blue-500 text-blue-700",
      },
    },
    {
      variant: "gradient",
      class: {
        default: "from-surface to-neon",
        success: "from-green-600 to-green-400",
        error: "from-red-600 to-red-400",
        info: "from-blue-600 to-blue-400",
      },
    },
    {
      variant: "filled",
      class: {
        success: "bg-green-500",
        error: "bg-red-500",
        info: "bg-blue-500",
      },
    },
    {
      variant: "ghost",
      class: {
        default: "bg-green-500/20 text-green-900",
        success: "bg-green-500/20 text-green-900",
        info: "bg-blue-500/20 text-blue-900",
        error: "bg-red-500/20 text-red-900",
      },
    },
  ],
  defaultVariants: {
    variant: "filled",
  },
});

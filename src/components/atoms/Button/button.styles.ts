import { tv } from "tailwind-variants";

export const buttonStyles = tv({
  slots: {
    base: "align-middle select-none font-sans font-bold text-center uppercase transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none rounded-lg shadow-md",
    spinner: "w-4 h-4",
    default: "bg-surface",
    success: "",
    error: "",
    info: "",
    gray: "",
  },
  variants: {
    variant: {
      outlined: {
        default: "border-black/5 dark:border-white/10 dark:text-green-300 dark:shadow-white/2",
        success: "border-green-500 text-green-500 focus:ring-green-200",
        error: "border-red-500 text-red-700 focus:ring-red-200",
        info: "border-blue-500 text-blue-700 focus:ring-blue-200",
        gray: "border-gray-500 text-gray-700 focus:ring-gray-200",
      },
      filled: {
        default: "border-black/5 dark:border-white/10 dark:text-green-300 dark:shadow-white/2",
        success: "text-white bg-green-500",
        error: "text-white bg-red-500",
        info: "text-white bg-blue-500",
        gray: "text-white bg-gray-500",
      },
      gradient: {
        default: "from-surface to-neon",
        success: "from-green-600 to-green-400",
        error: "from-red-600 to-red-400",
        info: "from-blue-600 to-blue-400",
        gray: "from-gray-600 to-gray-400",
      },
      text: {
        default: "hover:bg-green-500/10 active:bg-green-500/10 text-green-700",
        success: "hover:bg-green-500/10 active:bg-green-500/10 text-green-700",
        error: "hover:bg-red-500/10 active:bg-red-500/10 text-red-900",
        info: "hover:bg-blue-500/10 active:bg-blue-500/10 text-blue-900",
        gray: "hover:bg-gray-500/10 active:bg-gray-500/10 text-gray-900",
      },
      ghost: {
        default:
          "bg-gray-100 dark:bg-green-600/10 border-black/5 dark:border-white/10 dark:text-green-300 dark:shadow-white/2",
        success: "border-green-500 text-green-500 focus:ring-green-200",
        error: "border-red-500 text-red-700 focus:ring-red-200",
        info: "border-blue-500 text-blue-700 focus:ring-blue-200",
        gray: "border-gray-500 text-gray-700 focus:ring-gray-200",
      },
    },
    size: {
      sm: "py-2 px-4 text-xs",
      md: "py-3 px-6 text-xs",
      lg: "py-3.5 px-7 text-sm",
    },
    fullWidth: {
      true: "block w-full",
    },
    loading: {
      true: "flex items-center gap-2",
    },
  },
  compoundSlots: [
    {
      variant: ["outlined"],
      slots: ["default", "success", "error", "info", "gray"],
      class: "bg-transparent border hover:opacity-75 focus:ring active:opacity-[0.85]",
    },
    {
      variant: ["gradient"],
      slots: ["default", "success", "error", "info", "gray"],
      class: "text-white bg-gradient-to-tr hover:shadow-lg active:opacity-[0.85]",
    },
  ],
  compoundVariants: [
    {
      size: "lg",
      class: {
        base: "gap-3",
        spinner: "w-5 h-5",
      },
    },
  ],
  defaultVariants: {
    variant: "filled",
  },
});

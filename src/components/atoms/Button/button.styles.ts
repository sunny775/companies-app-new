import { tv } from "tailwind-variants";

export const buttonStyles = tv({
  slots: {
    base: "align-middle select-none font-sans font-bold text-center uppercase transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none rounded-md shadow cursor-pointer active:scale-105 active:opacity-[0.85] text-gray-700 dark:text-gray-300",
    spinner: "w-4 h-4",
    default: "",
    success: "",
    error: "",
    info: "",
    gray: "",
  },
  variants: {
    variant: {
      outlined: {
        default: "border-gray-600/20 dark:border-white/5",
        success: "border-green-600/20 text-green-700 dark:text-green-400",
        error: "border-red-600/20 text-red-700 dark:text-red-400",
        info: "border-blue-600/20 text-blue-700 dark:text-blue-400",
        gray: "border-gray-600/20",
      },
      filled: {
        default: "bg-gray-900",
        success: "bg-green-600 shadow-green-600/50",
        error: "bg-red-600 shadow-red-600/50",
        info: "bg-blue-600 shadow-blue-600/50",
        gray: "bg-gray-600 shadow-gray-600/50",
      },
      gradient: {
        default: "from-green-600 to-neon shadow-green-600/50",
        success: "from-green-600 to-green-400 shadow-green-600/50",
        error: "from-red-600 to-red-400 shadow-red-600/50",
        info: "from-blue-600 to-blue-400 shadow-blue-600/50",
        gray: "from-gray-600 to-gray-400 shadow-gray-600/50",
      },
      text: {
        default: "hover:bg-gray-500/5 active:bg-green-500/5",
        success: "hover:bg-green-500/5 active:bg-green-500/5 text-green-600 dark:text-green-400",
        error: "hover:bg-red-500/5 active:bg-red-500/5 text-red-600 dark:text-red-400",
        info: "hover:bg-blue-500/5 active:bg-blue-500/5 text-blue-600 dark:text-blue-400",
        gray: "hover:bg-gray-500/5 active:bg-gray-500/5",
      },
      ghost: {
        default: "bg-green-500/5 border-green-600/10",
        success: "bg-green-500/5 border-green-500/10 text-green-700 dark:text-green-400 shadow-green-500/10",
        error: "bg-red-500/5 border-red-500/10 text-red-700 dark:text-red-400 shadow-red-500/10",
        info: "bg-blue-500/5 border-blue-500/10 text-blue-700 dark:text-blue-400 shadow-blue-500/10",
        gray: "bg-gray-500/5 border-gray-500/10 shadow-gray-500/10",
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
      variant: ["ghost"],
      slots: ["default", "success", "error", "info", "gray"],
      class: "border",
    },
    {
      variant: ["outlined", "text"],
      slots: ["default", "success", "error", "info", "gray"],
      class: "hover:opacity-85",
    },
    {
      variant: ["outlined"],
      slots: ["default", "success", "error", "info", "gray"],
      class: "bg-surface border shadow-none",
    },
    {
      variant: ["filled", "gradient"],
      slots: ["default", "success", "error", "info", "gray"],
      class: "text-white hover:shadow-md",
    },
    {
      variant: ["gradient"],
      slots: ["default", "success", "error", "info", "gray"],
      class: "bg-gradient-to-tr",
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
    variant: "outlined",
    size: "md",
  },
});

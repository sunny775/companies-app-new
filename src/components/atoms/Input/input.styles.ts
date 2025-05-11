import { tv } from "tailwind-variants";

export const inputStyles = tv({
    slots: {
      base: "relative flex justify-center items-center w-full min-w-[200px] text-gray-700 dark:text-gray-300",
      input:
        "peer h-full w-full rounded bg-transparent border text-sm font-light focus:outline-none focus:border placeholder-gray-500 focus:placeholder-gray-300 dark:focus:placeholder-gray-700 placeholder:text-xs placeholder:italic",
      iconLeft: "grid place-items-center absolute text-gray-500 left-2",
      iconRight: "grid place-items-center absolute text-gray-500 right-2",
    },
    variants: {
      size: {
        md: "",
        lg: "",
      },
      iconLeft: {
        true: "",
      },
      iconRight: {
        true: "",
      },
      disabled: {
        true: {
          input: "opacity-80",
        },
      },
      color: {
        default: {
          input: "border-gray-600/20 focus:border-green-500/40",
        },
        error: {
          input: "border-red-600/20 focus:border-red-500/40",
        },
        success: {
          input: "border-green-600/20 focus:border-green-500/40",
        },
      },
    },
    compoundVariants: [
      {
        size: "md",
        class: {
          input: "px-3 py-2.5 rounded-[7px]",
          icon: "size-5",
        },
      },
      {
        sizes: "lg",
        class: {
          input: "p-3 rounded-md",
          icon: "size-6",
        },
      },
      {
        iconLeft: true,
        class: {
          input: "pl-8",
        },
      },
      {
        iconRight: true,
        class: {
          input: "pr-8",
        },
      },
      
    ],
    defaultVariants: {
      color: "default",
      size: "md",
    },
  });
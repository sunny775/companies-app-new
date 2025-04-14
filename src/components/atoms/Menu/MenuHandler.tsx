import React from "react";
import { useMergeRefs } from "@floating-ui/react";
import { useMenu } from "./MenuContext";

export type MenuHandlerProps = React.ComponentProps<"button">;

export const MenuHandler = ({ children, ref, ...rest }: MenuHandlerProps) => {
  const { getReferenceProps, reference, nested } = useMenu();

  const mergedRef = useMergeRefs([ref, reference]);

  if (!React.isValidElement(children)) {
    throw new Error("MenuHandler children must be a valid React element");
  }

  return React.cloneElement(children, {
    ...getReferenceProps({
      ...rest,
      ref: mergedRef,
      onClick(event) {
        event.stopPropagation();
      },
      ...(nested && {
        role: "menuitem",
      }),
    }),
  });
};

export default MenuHandler;

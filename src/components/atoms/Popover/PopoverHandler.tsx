import React from "react";
import { useMergeRefs } from "@floating-ui/react";
import { usePopover } from "./PopoverContext";

export type PopoverHandlerProps = React.ComponentProps<"button">;

export const PopoverHandler = ({ children, ref, ...rest }: PopoverHandlerProps) => {
  const { getReferenceProps, reference } = usePopover();

  const mergedRef = useMergeRefs([ref, reference]);

  if (!React.isValidElement(children)) {
    throw new Error("PopoverHandler children must be a valid React element");
  }

  return React.cloneElement(children, {
    ...getReferenceProps({
      ...rest,
      ref: mergedRef,
    }),
  });
};

export default PopoverHandler;

import React, { ReactNode } from "react";
import {
  offset as fuiOffset,
  flip,
  shift,
  autoUpdate,
  useFloating,
  useInteractions,
  useRole,
  useDismiss,
  useId,
  useClick,
  UseDismissProps,
  Placement,
} from "@floating-ui/react";
import merge from "deepmerge";
import { PopoverContextProvider, usePopover } from "./PopoverContext";
import { PopoverHandler, PopoverHandlerProps } from "./PopoverHandler";
import { PopoverContent, PopoverContentProps } from "./PopoverContent";
import { Animation, OffsetType } from "../sharedTypes";

export interface PopoverProps {
  open?: boolean;
  handler: React.Dispatch<React.SetStateAction<boolean>>;
  placement?: Placement;
  offset?: OffsetType;
  dismiss?: UseDismissProps;
  animate?: Animation;
  children: ReactNode;
}

const Popover = ({
  open,
  handler,
  placement = "top",
  offset = 5,
  children,
  dismiss = {},
  animate = {
    unmount: {},
    mount: {},
  },
}: PopoverProps) => {
  const [internalOpen, setInternalOpen] = React.useState(false);

  open = open ?? internalOpen;
  handler = handler ?? setInternalOpen;

  const animation = {
    unmount: {
      opacity: 0,
    },
    mount: {
      opacity: 1,
    },
  };
  const appliedAnimation = merge(animation, animate);

  const { x, y, strategy, refs, update, context } = useFloating({
    open,
    onOpenChange: handler,
    middleware: [fuiOffset(offset), flip(), shift()],
    placement,
  });

  const { reference, floating } = refs;

  const id = useId();
  const labelId = `${id}-label`;
  const descriptionId = `${id}-description`;

  const { getReferenceProps, getFloatingProps, getItemProps } = useInteractions([
    useClick(context),
    useRole(context),
    useDismiss(context, dismiss),
  ]);

  React.useEffect(() => {
    if (refs.reference.current && refs.floating.current && open) {
      return autoUpdate(refs.reference.current, refs.floating.current, update);
    }
  }, [open, update, refs.reference, refs.floating]);

  const contextValue = React.useMemo(
    () => ({
      open,
      strategy,
      x,
      y,
      context,
      reference,
      floating,
      getReferenceProps,
      getFloatingProps,
      getItemProps,
      appliedAnimation,
      labelId,
      descriptionId,
    }),
    [
      open,
      strategy,
      x,
      y,
      context,
      reference,
      floating,
      getFloatingProps,
      getReferenceProps,
      getItemProps,
      appliedAnimation,
      labelId,
      descriptionId,
    ]
  );

  return <PopoverContextProvider value={contextValue}>{children}</PopoverContextProvider>;
};

export type { PopoverHandlerProps, PopoverContentProps };
export { Popover, PopoverHandler, PopoverContent, usePopover };
export default Object.assign(Popover, { Handler: PopoverHandler, Content: PopoverContent });

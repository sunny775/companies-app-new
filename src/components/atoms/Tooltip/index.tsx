import React, { ComponentProps, Dispatch, ReactNode } from "react";
import {
  offset as fuiOffset,
  flip,
  shift,
  autoUpdate,
  useFloating,
  useInteractions,
  useRole,
  useDismiss,
  useClick,
  useHover,
  useFocus,
  FloatingPortal,
  useMergeRefs,
  UseDismissProps,
  Placement,
} from "@floating-ui/react";
import { AnimatePresence, m, LazyMotion, domAnimation } from "framer-motion";
import merge from "deepmerge";
import { tv } from "tailwind-variants";
import { Animation, OffsetType } from "../sharedTypes";

export interface TooltipProps extends Omit<ComponentProps<"div">, "content"> {
  open?: boolean;
  handler?: Dispatch<React.SetStateAction<boolean>>;
  content?: ReactNode;
  interactive?: boolean;
  placement?: Placement;
  offset?: OffsetType;
  dismiss?: UseDismissProps;
  animate?: Animation;
  className?: string;
  children: ReactNode;
}

const tooltipStyles = tv({
  base: "bg-black py-1.5 px-3 rounded-lg font-sans text-sm font-normal text-white focus:outline-none break-words z-[999] whitespace-normal",
});

export const Tooltip = ({
  ref,
  open,
  handler,
  content,
  className,
  children,
  offset = 5,
  dismiss = {},
  placement = "top",
  interactive = false,
  animate = {
    unmount: {},
    mount: {},
  },
  ...rest
}: TooltipProps) => {
  const [internalOpen, setInternalOpen] = React.useState(false);

  const styles = tooltipStyles({ className });

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

  const { getReferenceProps, getFloatingProps } = useInteractions([
    useClick(context, {
      enabled: interactive,
    }),
    useFocus(context),
    useHover(context),
    useRole(context, { role: "tooltip" }),
    useDismiss(context, dismiss),
  ]);

  React.useEffect(() => {
    if (refs.reference.current && refs.floating.current && open) {
      return autoUpdate(refs.reference.current, refs.floating.current, update);
    }
  }, [open, update, refs.reference, refs.floating]);

  const mergedRef = useMergeRefs([ref, floating]);
  const childMergedRef = useMergeRefs([ref, reference]);

  return (
    <>
      {typeof children === "string" ? (
        <span
          {...getReferenceProps({
            ref: childMergedRef,
          })}
        >
          {children}
        </span>
      ) : React.isValidElement(children) ? (
        React.cloneElement(children, {
          ...getReferenceProps({
            ...(children.props || {}),
            ref: childMergedRef,
          }),
        })
      ) : null}
      <LazyMotion features={domAnimation}>
        <FloatingPortal>
          <AnimatePresence>
            {open && (
              <m.div
                {...getFloatingProps({
                  ...rest,
                  ref: mergedRef,
                  className: styles,
                  style: {
                    position: strategy,
                    top: y ?? "",
                    left: x ?? "",
                  },
                })}
                initial="unmount"
                exit="unmount"
                animate={open ? "mount" : "unmount"}
                variants={appliedAnimation}
              >
                {content}
              </m.div>
            )}
          </AnimatePresence>
        </FloatingPortal>
      </LazyMotion>
    </>
  );
};

export default Tooltip;

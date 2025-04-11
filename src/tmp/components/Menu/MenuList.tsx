import React, { ReactNode } from "react";
import { FloatingPortal, FloatingOverlay, FloatingFocusManager, useMergeRefs } from "@floating-ui/react";
import { AnimatePresence, m, LazyMotion, domAnimation, HTMLMotionProps } from "framer-motion";
import { useMenu } from "./MenuContext";
import { tv } from "tailwind-variants";

export interface MenuListProps extends HTMLMotionProps<"ul"> {
  children: ReactNode;
}

export const menuStyles = tv({
  base: "bg-background min-w-[180px] p-3 border border-blue-gray-50 rounded-md shadow-lg shadow-blue-gray-500/10 font-sans text-sm font-normal text-blue-gray-500 overflow-auto focus:outline-none z-[999]",
});

export const MenuList = ({ children, className, ref, ...rest }: MenuListProps) => {
  const styles = menuStyles({ className });
  const {
    open,
    handler,
    strategy,
    x,
    y,
    floating,
    listItemsRef,
    getFloatingProps,
    getItemProps,
    appliedAnimation,
    lockScroll,
    context,
    activeIndex,
    tree,
    allowHover,
    internalAllowHover,
    setActiveIndex,
    nested,
  } = useMenu();
  const mergedRef = useMergeRefs([ref, floating]);

  const menuComponent = (
    <m.ul
      {...rest}
      ref={mergedRef}
      style={{
        position: strategy,
        top: y ?? 0,
        left: x ?? 0,
      }}
      className={styles}
      {...getFloatingProps({
        onKeyDown(event) {
          if (event.key === "Tab") {
            handler(false);

            if (event.shiftKey) {
              event.preventDefault();
            }
          }
        },
      })}
      initial="unmount"
      exit="unmount"
      animate={open ? "mount" : "unmount"}
      variants={appliedAnimation}
    >
      {React.Children.map(children, (child, index) => {
        if (!React.isValidElement(child)) return null;

        const el = child as React.ReactElement<{ className?: string; onClick?: (e: React.MouseEvent) => void }>;

        return React.cloneElement(
          el,
          getItemProps({
            tabIndex: activeIndex === index ? 0 : -1,
            role: "menuitem",
            className: el.props.className,
            ref(node: HTMLButtonElement) {
              listItemsRef.current[index] = node;
            },
            onClick(event) {
              el.props.onClick?.(event);
              tree?.events.emit("click");
            },
            onMouseEnter() {
              if ((allowHover && open) || (internalAllowHover && open)) {
                setActiveIndex(index);
              }
            },
          })
        );
      })}
    </m.ul>
  );

  return (
    <LazyMotion features={domAnimation}>
      <FloatingPortal>
        <AnimatePresence>
          {open && (
            <>
              {lockScroll ? (
                <FloatingOverlay lockScroll>
                  <FloatingFocusManager
                    context={context}
                    modal={!nested}
                    initialFocus={nested ? -1 : 0}
                    returnFocus={!nested}
                    visuallyHiddenDismiss
                  >
                    {menuComponent}
                  </FloatingFocusManager>
                </FloatingOverlay>
              ) : (
                <FloatingFocusManager
                  context={context}
                  modal={!nested}
                  initialFocus={nested ? -1 : 0}
                  returnFocus={!nested}
                  visuallyHiddenDismiss
                >
                  {menuComponent}
                </FloatingFocusManager>
              )}
            </>
          )}
        </AnimatePresence>
      </FloatingPortal>
    </LazyMotion>
  );
};

export default MenuList;

"use client";

import cn from "@/lib/cn";
import {
  autoUpdate,
  flip,
  FloatingFocusManager,
  FloatingPortal,
  offset as fuiOffset,
  size as fuiSize,
  useClick,
  useDismiss,
  useFloating,
  useInteractions,
  useListNavigation,
  useRole,
  useTypeahead,
} from "@floating-ui/react";
import merge from "deepmerge";
import { AnimatePresence, domAnimation, HTMLMotionProps, LazyMotion, m, Variants } from "framer-motion";
import { ChevronDown } from "lucide-react";
import React, { ComponentProps, ReactNode } from "react";
import { VariantProps } from "tailwind-variants";
import { Animation } from "../sharedTypes";
import { SelectContextProvider, useSelect } from "./SelectContext";
import { SelectOption, SelectOptionProps } from "./SelectOption";
import { selectStyles } from "./select.styles";

export interface SelectProps
  extends Omit<React.ComponentProps<"button">, "value" | "color" | "onSelect">,
    VariantProps<typeof selectStyles> {
  placeholder?: string;
  error?: boolean;
  success?: boolean;
  arrow?: ReactNode;
  value: string | null;
  onSelect: (value: string | null) => void;
  animate?: Animation;
  menuProps?: HTMLMotionProps<"ul">;
  className?: string;
  disabled?: boolean;
  name?: string;
  children: ReactNode;
  containerProps?: ComponentProps<"div">;
  placeholderClasses?: string;
}

const Select = ({
  color,
  size,
  error,
  success,
  arrow,
  value,
  onSelect,
  className,
  children,
  placeholder,
  containerProps,
  placeholderClasses,
  menuProps = {},
  animate = {
    unmount: {},
    mount: {},
  },
  ...rest
}: SelectProps) => {
  const childrenArray = React.Children.toArray(children);

  const listRef = React.useRef<Array<HTMLLIElement | null>>([]);

  const [open, setOpen] = React.useState(false);
  const [activeIndex, setActiveIndex] = React.useState<number | null>(null);
  const [selectedIndex, setSelectedIndex] = React.useState<number | null>(null);

  const isTypingRef = React.useRef(false);

  const styles = selectStyles({
    open,
    size,
    color: success ? "success" : error ? "error" : color,
  });

  const containerClasses = styles.container({ className: containerProps?.className });
  const selectClasses = styles.select({ className });
  const menuClasses = styles.menu({ className: menuProps?.className });

  const { x, y, floatingStyles, strategy, refs, context } = useFloating({
    placement: "bottom-start",
    open,
    onOpenChange: setOpen,
    whileElementsMounted: autoUpdate,
    middleware: [
      fuiOffset(5),
      flip({ padding: 10 }),
      fuiSize({
        apply({ rects, elements }) {
          Object.assign(elements?.floating?.style, {
            width: `${rects?.reference?.width}px`,
            zIndex: 99,
          });
        },
        padding: 20,
      }),
    ],
  });

  const listItems = React.useMemo(
    () =>
      React.Children.map(children, (child) => {
        const el = child as React.ReactElement<{ value?: string }>;

        const { props } = el;
        return props?.value;
      }) ?? [],
    [children]
  );

  const listContentRef = React.useRef(listItems);

  React.useEffect(() => {
    if (value) {
      setSelectedIndex(Math.max(0, listItems.indexOf(value)));
    }
  }, [value, listItems]);

  const click = useClick(context, { event: "mousedown" });
  const dismiss = useDismiss(context);
  const role = useRole(context, { role: "listbox" });
  const listNav = useListNavigation(context, {
    listRef,
    activeIndex,
    selectedIndex,
    onNavigate: setActiveIndex,
    loop: true,
  });
  const typeahead = useTypeahead(context, {
    listRef: listContentRef,
    activeIndex,
    selectedIndex,
    onMatch: open ? setActiveIndex : setSelectedIndex,
    onTypingChange(isTyping) {
      isTypingRef.current = isTyping;
    },
  });

  const { getReferenceProps, getFloatingProps, getItemProps } = useInteractions([
    click,
    role,
    dismiss,
    listNav,
    typeahead,
  ]);

  const contextValue = React.useMemo(
    () => ({
      selectedIndex,
      setSelectedIndex,
      listRef,
      setOpen,
      onSelect: onSelect || (() => {}),
      activeIndex,
      setActiveIndex,
      getItemProps,
      isTypingRef,
      dataRef: context.dataRef,
    }),
    [selectedIndex, onSelect, activeIndex, getItemProps, context.dataRef]
  );

  function handleSelect(index: number) {
    setSelectedIndex(index);
    onSelect(value);
    setOpen(false);
    setActiveIndex(null);
  }

  const animation: Variants = {
    unmount: {
      opacity: [1, 0.8, 0.5, 0],
      scale: [1, 0.98, 0.96, 0.95],
      transformOrigin: "top",
      transition: {
        duration: 0.2,
        times: [0, 0.4, 0.6, 1],
      },
    },
    mount: {
      opacity: [0, 0.5, 0.8, 1],
      scale: [0.95, 0.96, 0.98, 1],
      transformOrigin: "top",
      transition: {
        duration: 0.2,
        times: [0, 0.4, 0.6, 1],
      },
    },
  };

  const appliedAnimation = merge(animation, animate);

  return (
    <SelectContextProvider value={contextValue}>
      <div {...containerProps} className={containerClasses}>
        <button
          type="button"
          {...rest}
          tabIndex={0}
          ref={refs.setReference}
          className={selectClasses}
          {...getReferenceProps()}
        >
          {selectedIndex ? (
            <span
              {...((childrenArray[selectedIndex] as React.ReactElement)?.props as Record<string, unknown>)}
              className={styles.buttonContent()}
            />
          ) : (
            <span className={cn(styles.buttonContent(), styles.placeholder(), placeholderClasses)}>{placeholder}</span>
          )}
          <div className={styles.arrow()}>{arrow ?? <ChevronDown strokeWidth={1} />}</div>
        </button>

        {open && (
          <LazyMotion features={domAnimation}>
            <AnimatePresence>
              <FloatingPortal>
                <FloatingFocusManager context={context} modal={false}>
                  <m.ul
                    {...menuProps}
                    role="listbox"
                    ref={refs.setFloating}
                    className={menuClasses}
                    style={{
                      ...floatingStyles,
                      position: strategy,
                      top: y ?? 0,
                      left: x ?? 0,
                      overflow: "auto",
                    }}
                    {...getFloatingProps()}
                    initial="unmount"
                    exit="unmount"
                    animate={open ? "mount" : "unmount"}
                    variants={appliedAnimation}
                  >
                    {React.Children.map(children, (child, idx) => {
                      if (!React.isValidElement(child)) return null;

                      const el = child as React.ReactElement<SelectOptionProps>;
                      const { onClick, onKeyDown, ...rest } = el.props;

                      return React.cloneElement(el, {
                        key: value,
                        active: activeIndex === idx,
                        selected: selectedIndex === idx,
                        ...rest,
                        ...getItemProps({
                          ref: (node: HTMLLIElement | null) => {
                            listRef.current[idx] = node;
                          },
                          onClick: (e: React.MouseEvent<HTMLLIElement>) => {
                            handleSelect(idx);
                            onClick?.(e);
                          },
                          onKeyDown: (event: React.KeyboardEvent<HTMLLIElement>) => {
                            if (event.key === "Enter" || (event.key === " " && !isTypingRef.current)) {
                              event.preventDefault();
                              handleSelect(idx);
                            }
                            onKeyDown?.(event);
                          },
                        }),
                      });
                    })}
                  </m.ul>
                </FloatingFocusManager>
              </FloatingPortal>
            </AnimatePresence>
          </LazyMotion>
        )}
      </div>
    </SelectContextProvider>
  );
};

export default Object.assign(Select, { Option: SelectOption });
export { SelectOption as Option, Select, useSelect };
export type { SelectOptionProps };

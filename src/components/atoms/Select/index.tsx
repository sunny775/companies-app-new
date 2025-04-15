"use client";

import cn from "@/lib/cn";
import {
  autoUpdate,
  flip,
  FloatingFocusManager,
  FloatingOverlay,
  offset as fuiOffset,
  size as fuiSize,
  useClick,
  useDismiss,
  UseDismissProps,
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
  extends Omit<React.ComponentProps<"div">, "value" | "color" | "onChange">,
    VariantProps<typeof selectStyles> {
  placeholder?: string;
  error?: boolean;
  success?: boolean;
  arrow?: ReactNode;
  value: string | null;
  onChange: (value: string | null) => void;
  dismiss?: UseDismissProps;
  animate?: Animation;
  lockScroll?: boolean;
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
  onChange,
  dismiss,
  lockScroll,
  className,
  disabled,
  name,
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

  const listItemsRef = React.useRef<Array<HTMLLIElement | null>>([]);
  const listContentRef = React.useRef([
    ...(React.Children.map(children, (child) => {
      const el = child as React.ReactElement<{ value?: string }>;

      const { props } = el;
      return props?.value;
    }) ?? []),
  ]);
  const [open, setOpen] = React.useState(false);
  const [activeIndex, setActiveIndex] = React.useState<number | null>(null);
  const [selectedIndex, setSelectedIndex] = React.useState(0);

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

  React.useEffect(() => {
    if (value) {
      setSelectedIndex(Math.max(0, listContentRef.current.indexOf(value)));
    }
  }, [value]);

  const { getReferenceProps, getFloatingProps, getItemProps } = useInteractions([
    useClick(context),
    useRole(context, { role: "listbox" }),
    useDismiss(context, { ...dismiss }),
    useListNavigation(context, {
      listRef: listItemsRef,
      activeIndex,
      selectedIndex,
      onNavigate: setActiveIndex,
      loop: true,
    }),
    useTypeahead(context, {
      listRef: listContentRef,
      activeIndex,
      selectedIndex,
      onMatch: open ? setActiveIndex : setSelectedIndex,
      onTypingChange(isTyping) {
        isTypingRef.current = isTyping;
      },
    }),
  ]);

  const contextValue = React.useMemo(
    () => ({
      selectedIndex,
      setSelectedIndex,
      listRef: listItemsRef,
      setOpen,
      onChange: onChange || (() => {}),
      activeIndex,
      setActiveIndex,
      getItemProps,
      isTypingRef,
      dataRef: context.dataRef,
    }),
    [selectedIndex, onChange, activeIndex, getItemProps, context.dataRef]
  );

  function handleSelect(index: number) {
    setSelectedIndex(index);
    onChange(value);
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

  const selectMenu = (
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
                listItemsRef.current[idx] = node;
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
  );

  return (
    <SelectContextProvider value={contextValue}>
      <div {...containerProps} className={containerClasses}>
        <button
          type="button"
          {...getReferenceProps({
            ...rest,
            ref: refs.setReference,
            className: selectClasses,
            disabled: disabled,
            name: name,
          })}
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
        <LazyMotion features={domAnimation}>
          <AnimatePresence>
            {open && <>{lockScroll ? <FloatingOverlay lockScroll>{selectMenu}</FloatingOverlay> : selectMenu}</>}
          </AnimatePresence>
        </LazyMotion>
      </div>
    </SelectContextProvider>
  );
};

export default Object.assign(Select, { Option: SelectOption });
export { SelectOption as Option, Select, useSelect };
export type { SelectOptionProps };

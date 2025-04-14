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
import { AnimatePresence, domAnimation, LazyMotion, m, useIsomorphicLayoutEffect, Variants } from "framer-motion";
import { ChevronDown } from "lucide-react";
import React, { ComponentProps, ReactNode } from "react";
import { tv, VariantProps } from "tailwind-variants";
import { Animation } from "../sharedTypes";
import { SelectContextProvider, usePrevious, useSelect } from "./ComboboxContext";
import { SelectOption, SelectOptionProps } from "./ComboboxItem";

export interface SelectProps
  extends Omit<React.ComponentProps<"div">, "value" | "color" | "onChange">,
    VariantProps<typeof selectStyles> {
  label?: string;
  error?: boolean;
  success?: boolean;
  arrow?: ReactNode;
  value: string | null;
  onChange: (value: string | null) => void;
  dismiss?: UseDismissProps;
  animate?: Animation;
  lockScroll?: boolean;
  menuProps?: ComponentProps<"ul">;
  className?: string;
  disabled?: boolean;
  name?: string;
  children: ReactNode;
  containerProps?: ComponentProps<"div">;
  placeholderClasses?: string;
}

const selectStyles = tv({
  slots: {
    container: "relative w-full",
    select:
      "peer w-full h-full bg-transparent font-sans font-normal rounded-md focus:outline-0 disabled:bg-gray-50 disabled:border-0 disabled:cursor-not-allowed transition-all border",
    arrow:
      "grid place-items-center absolute top-2/4 right-2 pt-px w-5 h-5 text-blue-gray-400 rotate-0 -translate-y-2/4 transition-all text-gray-300 dark:text-white/30",
    label: "flex w-full h-full select-none pointer-events-none absolute left-0 font-normal transition-all",
    menu: "w-full max-h-96 bg-surface p-3 border border-gray-50 dark:border-white/5 rounded-md shadow-lg shadow-gray-500/10 dark:shadow-gray-500/2 font-sans text-sm font-normal text-gray-500 dark:text-gray-400 overflow-auto focus:outline-none grid gap-2",
    buttonContent: "absolute top-2/4 -translate-y-2/4 left-0 right-0",
    placeholder: "text-gray-400 dark:text-gray-600",
  },

  variants: {
    open: {
      true: {
        arrow: "rotate-180 mt-px",
      },
    },
    size: {
      md: {
        container: "h-11",
        select: "text-sm pt-4 pb-1.5",
        label: "leading-[4.25]",
      },
      lg: {
        container: "h-12",
        select: "text-sm px-px pt-5 pb-2",
        label: "leading-[4.875]",
      },
    },
    color: {
      default: {
        select: "border-black/10 dark:border-white/10 focus:border-green-500/50 dark:focus:border-green-500/30",
      },
      error: {
        select: "border-red-600/30 dark:border-red-500/20  focus:border-red-500/50 dark:focus:border-red-500/30",
      },
      success: {
        select: "border-green-500/30",
      },
    },
  },
  defaultVariants: {
    color: "default",
    size: "md",
  },
});

const Select = ({
  color,
  size,
  label,
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
  const [controlledScrolling, setControlledScrolling] = React.useState(false);
  const prevActiveIndex = usePrevious<number | null>(activeIndex);

  const styles = selectStyles({
    open,
    size,
    color: success ? "success" : error ? "error" : color,
  });

  const containerClasses = styles.container({ className: containerProps?.className });
  const selectClasses = styles.select({ className });
  const menuClasses = styles.menu({ className: menuProps?.className });

  const { x, y, strategy, refs, context } = useFloating({
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
      setSelectedIndex(Math.max(0, listContentRef.current.indexOf(value) + 1));
    }
  }, [value]);

  const floatingRef = refs.floating;

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
    }),
  ]);

  useIsomorphicLayoutEffect(() => {
    const floating = floatingRef.current;

    if (open && controlledScrolling && floating) {
      const item =
        activeIndex != null
          ? listItemsRef.current[activeIndex]
          : selectedIndex != null
          ? listItemsRef.current[selectedIndex]
          : null;

      if (item && prevActiveIndex != null) {
        const itemHeight = listItemsRef.current[prevActiveIndex]?.offsetHeight ?? 0;
        const floatingHeight = floating.offsetHeight;
        const top = item.offsetTop;
        const bottom = top + itemHeight;

        if (top < floating.scrollTop) {
          floating.scrollTop -= floating.scrollTop - top + 5;
        } else if (bottom > floatingHeight + floating.scrollTop) {
          floating.scrollTop += bottom - floatingHeight - floating.scrollTop + 5;
        }
      }
    }
  }, [open, controlledScrolling, prevActiveIndex, activeIndex]);

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
      dataRef: context.dataRef,
    }),
    [selectedIndex, onChange, activeIndex, getItemProps, context.dataRef]
  );

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

  React.useEffect(() => {
    if (value && !onChange) {
      console.error(
        "Warning: You provided a `value` prop to a select component without an `onChange` handler. This will render a read-only select. If the field should be mutable use `onChange` handler with `value` together."
      );
    }
  }, [value, onChange]);

  const selectMenu = (
    <FloatingFocusManager context={context} modal={false}>
      <m.ul
        {...getFloatingProps({
          ...menuProps,
          ref: refs.setFloating,
          role: "listbox",
          className: menuClasses,
          style: {
            position: strategy,
            top: y ?? 0,
            left: x ?? 0,
            overflow: "auto",
          },
          onPointerEnter(e: React.PointerEvent<HTMLUListElement>) {
            const onPointerEnter = menuProps?.onPointerEnter;
            if (typeof onPointerEnter === "function") {
              onPointerEnter(e);
              setControlledScrolling(false);
            }
            setControlledScrolling(false);
          },
          onPointerMove(e: React.PointerEvent<HTMLUListElement>) {
            const onPointerMove = menuProps?.onPointerMove;
            if (typeof onPointerMove === "function") {
              onPointerMove(e);
              setControlledScrolling(false);
            }
            setControlledScrolling(false);
          },
          onKeyDown(e: React.KeyboardEvent<HTMLUListElement>) {
            const onKeyDown = menuProps?.onKeyDown;
            if (typeof onKeyDown === "function") {
              onKeyDown(e);
              setControlledScrolling(true);
            }
            setControlledScrolling(true);
          },
        })}
        initial="unmount"
        exit="unmount"
        animate={open ? "mount" : "unmount"}
        variants={appliedAnimation}
      >
        {React.Children.map(children, (child, idx) => {
          if (!React.isValidElement(child)) return null;

          const el = child as React.ReactElement<SelectOptionProps>;

          const { index, ...rest } = el.props;

          return React.cloneElement(el, {
            key: idx,
            index: index || idx + 1,
            ...getItemProps({
              ...rest,
              tabIndex: activeIndex === idx ? 0 : -1,
              role: "option",
              ref(node: HTMLLIElement) {
                listItemsRef.current[idx] = node;
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
        <input
          ref={inputRef}
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setOpen(true);
          }}
        />

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
              {...((childrenArray[selectedIndex - 1] as React.ReactElement)?.props as Record<string, unknown>)}
              className={styles.buttonContent()}
            />
          ) : (
            <span className={cn(styles.buttonContent(), styles.placeholder(), placeholderClasses)}>{label}</span>
          )}
          <div className={styles.arrow()}>{arrow ?? <ChevronDown strokeWidth={0.5} />}</div>
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

export { SelectOption as Option, Select, usePrevious, useSelect };
export type { SelectOptionProps };

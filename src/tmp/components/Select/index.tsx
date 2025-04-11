import React, { ComponentProps, ReactNode } from "react";
import {
  useFloating,
  offset as fuiOffset,
  flip,
  useListNavigation,
  useTypeahead,
  useInteractions,
  useRole,
  useClick,
  useDismiss,
  FloatingFocusManager,
  autoUpdate,
  size as fuiSize,
  FloatingOverlay,
  UseDismissProps,
} from "@floating-ui/react";
import { AnimatePresence, m, useIsomorphicLayoutEffect, LazyMotion, domAnimation } from "framer-motion";
import merge from "deepmerge";
import { SelectContextProvider, usePrevious, useSelect } from "./SelectContext";
import { SelectOption, SelectOptionProps } from "./SelectOption";
import { tv, VariantProps } from "tailwind-variants";
import { Animation } from "../sharedTypes";

export interface SelectProps
  extends Omit<React.ComponentProps<"div">, "value" | "color" | "onChange">,
    VariantProps<typeof selectStyles> {
  label?: string;
  error?: boolean;
  success?: boolean;
  arrow?: ReactNode;
  value?: string;
  onChange?: (value?: string) => void;
  selected?: (element?: React.ReactElement, index?: number) => React.ReactNode;
  dismiss?: UseDismissProps;
  animate?: Animation;
  lockScroll?: boolean;
  labelProps?: ComponentProps<"label">;
  menuProps?: ComponentProps<"ul">;
  className?: string;
  disabled?: boolean;
  name?: string;
  children: ReactNode;
  containerProps?: ComponentProps<"div">;
}

const selectStyles = tv({
  slots: {
    container: "relative w-full min-w-[200px]",
    select:
      "peer w-full h-full bg-transparent text-blue-gray-700 font-sans font-normal text-left outline focus:outline-0 disabled:bg-blue-gray-50 disabled:border-0 disabled:cursor-not-allowed transition-all",
    arrow:
      "grid place-items-center absolute top-2/4 right-2 pt-px w-5 h-5 text-blue-gray-400 rotate-0 -translate-y-2/4 transition-all",
    label: "flex w-full h-full select-none pointer-events-none absolute left-0 font-normal transition-all",
    menu: "w-full max-h-96 bg-white p-3 border border-blue-gray-50 rounded-md shadow-lg shadow-blue-gray-500/10 font-sans text-sm font-normal text-blue-gray-500 overflow-auto focus:outline-none",
    option:
      "pt-[9px] pb-2 px-3 rounded-md leading-tight cursor-pointer select-none hover:bg-blue-gray-50 focus:bg-blue-gray-50 hover:bg-opacity-80 focus:bg-opacity-80 hover:text-blue-gray-900 focus:text-blue-gray-900 outline transition-all",
    buttonContent: "absolute top-2/4 -translate-y-2/4 left-0 pt-3",
  },

  variants: {
    open: {
      true: {
        arrow: "rotate-180 mt-px",
        option: "bg-blue-gray-50 bg-opacity-80 text-blue-gray-900",
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
        select: "border-black/10 dark:border-white/10  focus:border-green-500/50 dark:focus:border-green-500/30",
      },
      error: {
        select: "border-red-600/30 dark:border-red-500/20  focus:border-red-500/50 dark:focus:border-red-500/30",
      },
      success: {
        select: "border-green-500 dark:border-green-400  focus:border-green-500/50 dark:focus:border-green-500/30",
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
  label = "",
  error,
  success,
  arrow,
  value,
  onChange,
  selected,
  dismiss,
  lockScroll,
  className,
  disabled,
  name,
  children,
  containerProps,
  labelProps = {},
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
  const labelClasses = styles.label({ className: labelProps?.className });
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

  const animation = {
    unmount: {
      opacity: 0,
      transformOrigin: "top",
      transform: "scale(0.95)",
      transition: { duration: 0.2, times: [0.4, 0, 0.2, 1] },
    },
    mount: {
      opacity: 1,
      transformOrigin: "top",
      transform: "scale(1)",
      transition: { duration: 0.2, times: [0.4, 0, 0.2, 1] },
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
        {React.Children.map(children, (child, index) => {
          if (!React.isValidElement(child)) return null;

          const el = child as React.ReactElement<{ index: number }>;

          return React.cloneElement(child, {
            ...getItemProps({
              ...el?.props,
              tabIndex: activeIndex === index ? 0 : -1,
              role: "option",
              ref(node: HTMLLIElement) {
                listItemsRef.current[index] = node;
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
          {typeof selected === "function" ? (
            <span className={styles.buttonContent()}>
              {selected(childrenArray[selectedIndex - 1] as React.ReactElement, selectedIndex - 1)}
            </span>
          ) : value && !onChange ? (
            <span className={styles.buttonContent()}>{value}</span>
          ) : (
            <span
              {...((childrenArray[selectedIndex - 1] as React.ReactElement)?.props as Record<string, unknown>)}
              className={styles.buttonContent()}
            />
          )}
          <div className={styles.arrow()}>
            {arrow ?? (
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                <path
                  fillRule="evenodd"
                  d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            )}
          </div>
        </button>
        <label {...labelProps} className={labelClasses}>
          {label}
        </label>
        <LazyMotion features={domAnimation}>
          <AnimatePresence>
            {open && <>{lockScroll ? <FloatingOverlay lockScroll>{selectMenu}</FloatingOverlay> : selectMenu}</>}
          </AnimatePresence>
        </LazyMotion>
      </div>
    </SelectContextProvider>
  );
};

export type { SelectOptionProps };
export { Select, SelectOption as Option, useSelect, usePrevious };
export default Object.assign(Select, { Option: SelectOption });

import { Input, InputProps } from "@/components/atoms/Input";
import { Animation } from "@/components/atoms/sharedTypes";
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
} from "@floating-ui/react";
import merge from "deepmerge";
import { AnimatePresence, domAnimation, HTMLMotionProps, LazyMotion, m, Variants } from "framer-motion";
import { ChevronDown } from "lucide-react";
import React, { ReactNode, useRef, useState } from "react";
import { tv, VariantProps } from "tailwind-variants";
import { Item, ItemProps } from "./Item";

interface ComboboxProps extends Omit<InputProps, "onSelect" | "value">, VariantProps<typeof selectStyles> {
  onSelect?: (value: string | null) => void;
  value: string | null;
  query: string;
  setQuery: (value: string) => void;
  animate?: Animation;
  menuProps?: HTMLMotionProps<"ul">;
  children: ReactNode;
  placeholder?: string;
}

const selectStyles = tv({
  slots: {
    icon: "transition-all rotate-0",
    menu: "bg-surface p-3 border border-gray-50 dark:border-white/5 rounded-md shadow-lg shadow-gray-500/10 dark:shadow-gray-500/2 font-sans text-sm font-normal text-gray-500 dark:text-gray-400 overflow-auto grid gap-2",
  },

  variants: {
    open: {
      true: {
        icon: "rotate-180 mt-px",
      },
    },
  },
});

function Combobox({
  id,
  icon,
  placeholder,
  onSelect,
  onKeyDown,
  name,
  value,
  query,
  setQuery,
  onChange,
  children,
  menuProps = {},
  animate = {
    unmount: {},
    mount: {},
  },
  ...rest
}: ComboboxProps) {
  const [open, setOpen] = useState(false);

  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const listRef = useRef<Array<HTMLElement | null>>([]);

  const styles = selectStyles({
    open,
  });

  const menuClasses = styles.menu({ className: menuProps?.className });

  const listItems = React.useMemo(
    () =>
      React.Children.map(children, (child) => {
        const el = child as React.ReactElement<{ value?: string }>;

        const { props } = el;
        return props?.value;
      }) ?? [],
    [children]
  );

  React.useEffect(() => {
    if (value) {
      setActiveIndex(Math.max(0, listItems.indexOf(value)));
    }
  }, [value, listItems]);

  const { refs, floatingStyles, context, x, y, strategy } = useFloating<HTMLInputElement>({
    whileElementsMounted: autoUpdate,
    open,
    onOpenChange: setOpen,
    middleware: [
      fuiOffset(5),
      flip({ padding: 10 }),
      fuiSize({
        apply({ rects, availableHeight, elements }) {
          Object.assign(elements.floating.style, {
            width: `${rects.reference.width}px`,
            maxHeight: `${availableHeight}px`,
          });
        },
        padding: 10,
      }),
    ],
  });

  const role = useRole(context, { role: "listbox" });
  const dismiss = useDismiss(context);
  const click = useClick(context);
  const listNav = useListNavigation(context, {
    listRef,
    activeIndex,
    onNavigate: setActiveIndex,
    virtual: true,
    loop: true,
  });

  const { getReferenceProps, getFloatingProps, getItemProps } = useInteractions([role, dismiss, click, listNav]);

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    const value = event.target.value;
    setQuery(value);
    setOpen(true);
    setActiveIndex(0);
    onChange?.(event);
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
    <>
      <Input
        id={id}
        name={name}
        {...rest}
        {...getReferenceProps({
          ref: refs.setReference,
          onChange: handleChange,
          value: query,
          placeholder: placeholder || name,
          "aria-autocomplete": "list",
          onKeyDown(event: React.KeyboardEvent<HTMLInputElement>) {
            if (event.key === "Enter" && activeIndex != null && listItems[activeIndex]) {
              setQuery(listItems[activeIndex]);
              onSelect?.(listItems[activeIndex]);
              setActiveIndex(null);
              setOpen(false);
            }
            onKeyDown?.(event);
          },
        })}
        icon={<div className={styles.icon()}>{icon || <ChevronDown strokeWidth={1} />}</div>}
      />
      {open && (
        <LazyMotion features={domAnimation}>
          <AnimatePresence>
            <FloatingPortal>
              <FloatingFocusManager context={context} initialFocus={-1} visuallyHiddenDismiss>
                <m.div
                  {...getFloatingProps({
                    ref: refs.setFloating,
                    style: {
                      ...floatingStyles,
                      position: strategy,
                      top: y ?? 0,
                      left: x ?? 0,
                      overflow: "auto",
                    },
                    className: menuClasses,
                  })}
                  initial="unmount"
                  exit="unmount"
                  animate={open ? "mount" : "unmount"}
                  variants={appliedAnimation}
                >
                  {React.Children.map(children, (child, index) => {
                    if (!React.isValidElement(child)) return null;

                    const el = child as React.ReactElement<ItemProps>;
                    const { value, onClick, ...rest } = el.props;

                    return React.cloneElement(el, {
                      key: value,
                      active: activeIndex === index,
                      ...rest,
                      ...getItemProps({
                        ref(node) {
                          listRef.current[index] = node;
                        },
                        onClick(e: React.MouseEvent<HTMLDivElement>) {
                          setQuery(value);
                          onSelect?.(value);
                          setOpen(false);
                          refs.domReference.current?.focus();
                          onClick?.(e);
                        },
                      }),
                    });
                  })}
                </m.div>
              </FloatingFocusManager>
            </FloatingPortal>
          </AnimatePresence>
        </LazyMotion>
      )}
    </>
  );
}

export default Object.assign(Combobox, { Item });
export { Combobox, Item, type ComboboxProps, type ItemProps };

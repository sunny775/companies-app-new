"use client";

import {
  autoUpdate,
  flip,
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
import React from "react";
import { tv, VariantProps } from "tailwind-variants";
import { SelectContextProvider } from "./Context";

export const selectStyles = tv({
  base: "relative w-full",
  variants: {
    size: {
      md: "h-10",
      lg: "h-12",
    },
  },
  defaultVariants: {
    size: "md",
  },
});

export interface SelectProps extends Omit<React.ComponentProps<"div">, "onSelect">, VariantProps<typeof selectStyles> {
  listItems: string[];
  value: string | null;
  onSelect: (value: string | null) => void;
}

export const Root = ({ size, value, listItems, onSelect, className, children, ...rest }: SelectProps) => {
  const listRef = React.useRef<Array<HTMLLIElement | null>>([]);

  const [open, setOpen] = React.useState(false);
  const [activeIndex, setActiveIndex] = React.useState<number | null>(null);
  const [selectedIndex, setSelectedIndex] = React.useState<number | null>(null);

  const isTypingRef = React.useRef(false);

  const styles = selectStyles({
    size,
    className,
  });

  const { context, ...floatingData } = useFloating({
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

  const interactionGetters = useInteractions([click, role, dismiss, listNav, typeahead]);

  const handleSelect = React.useMemo(
    () =>
      function (index: number) {
        setSelectedIndex(index);
        onSelect(listItems[index]);
        setOpen(false);
        setActiveIndex(null);
      },
    [onSelect, listItems]
  );

  const contextValue = React.useMemo(
    () => ({
      open,
      selectedIndex,
      setSelectedIndex,
      listRef,
      setOpen,
      onSelect: onSelect || (() => {}),
      activeIndex,
      setActiveIndex,
      isTypingRef,
      ...interactionGetters,
      ...floatingData,
      context,
      handleSelect,
      listItems,
    }),
    [open, selectedIndex, onSelect, activeIndex, interactionGetters, floatingData, context, handleSelect, listItems]
  );

  return (
    <SelectContextProvider value={contextValue}>
      <div {...rest} className={styles}>
        {children}
      </div>
    </SelectContextProvider>
  );
};

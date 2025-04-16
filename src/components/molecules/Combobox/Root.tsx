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
} from "@floating-ui/react";
import React, { ReactNode, useRef, useState } from "react";
import { ComboboxContextProvider } from "./Context";

export interface ComboboxProps {
  listItems: string[];
  value: string | null;
  children: ReactNode;
  onSelect: (value: string | null) => void;
  query: string;
  setQuery: (value: string) => void;
}

export function Root({ onSelect, value, listItems, children, query, setQuery }: ComboboxProps) {
  const [open, setOpen] = useState(false);

  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const listRef = useRef<Array<HTMLElement | null>>([]);

  React.useEffect(() => {
    if (value) {
      setActiveIndex(Math.max(0, listItems.indexOf(value)));
    }
  }, [value, listItems]);

  const { context, ...floatingData } = useFloating<HTMLInputElement>({
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

  const interactionGetters = useInteractions([role, dismiss, click, listNav]);

  const contextValue = React.useMemo(
    () => ({
      open,
      listRef,
      setOpen,
      onSelect: onSelect || (() => {}),
      activeIndex,
      setActiveIndex,
      ...interactionGetters,
      ...floatingData,
      context,
      listItems,
      query,
      setQuery,
    }),
    [open, onSelect, activeIndex, interactionGetters, floatingData, context, listItems, query, setQuery]
  );

  return <ComboboxContextProvider value={contextValue}>{children}</ComboboxContextProvider>;
}

import {
  Children,
  ComponentProps,
  Dispatch,
  isValidElement,
  ReactNode,
  SetStateAction,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import {
  useFloating,
  useFloatingTree,
  useFloatingNodeId,
  useFloatingParentNodeId,
  FloatingNode,
  useInteractions,
  offset as fuiOffset,
  flip,
  shift,
  useHover,
  useClick,
  useRole,
  useDismiss,
  safePolygon,
  useListNavigation,
  useMergeRefs,
  autoUpdate,
  UseDismissProps,
  Placement,
  useTypeahead,
} from "@floating-ui/react";

import merge from "deepmerge";
import { MenuContextProvider } from "./MenuContext";
import { Variant } from "framer-motion";
import { OffsetType } from "../sharedTypes";

export type Animation = {
  initial?: Variant;
  mount?: Variant;
  unmount?: Variant;
};

type ReferenceType = (instance: HTMLButtonElement | null) => void;

export interface MenuProps extends ComponentProps<"button"> {
  open?: boolean;
  handler?: Dispatch<SetStateAction<boolean>>;
  placement?: Placement;
  offset?: OffsetType;
  dismiss?: UseDismissProps;
  animate?: Animation;
  lockScroll?: boolean;
  children: ReactNode;
  allowHover?: boolean;
}

export const MenuCore = ({
  ref,
  open,
  handler,
  lockScroll,
  allowHover,
  children,
  offset = 5,
  placement = "bottom",
  dismiss = {
    referencePress: true,
  },
  animate = {
    unmount: {},
    mount: {},
  },
}: MenuProps) => {
  const [internalOpen, setInternalOpen] = useState(false);
  const [internalAllowHover, setInternalAllowHover] = useState(false);

  open = open ?? internalOpen;
  handler = handler ?? setInternalOpen;

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

  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const listItemsRef = useRef<Array<HTMLLIElement | null>>([]);

  const listContentRef = useRef(
    Children.map(children, (child) => {
      if (!isValidElement(child)) return null;
      const el = child as React.ReactElement<{ label?: string }>;
      return el.props?.label || null;
    }) as Array<string | null>
  );

  const tree = useFloatingTree();
  const nodeId = useFloatingNodeId();
  const parentId = useFloatingParentNodeId();
  const nested = parentId != null;

  const { x, y, strategy, refs, context } = useFloating<HTMLButtonElement>({
    open,
    nodeId,
    placement,
    onOpenChange: handler,
    middleware: [fuiOffset(offset), flip(), shift()],
    whileElementsMounted: autoUpdate,
  });

  const { getReferenceProps, getFloatingProps, getItemProps } = useInteractions([
    useHover(context, {
      handleClose: safePolygon({
        blockPointerEvents: true,
      }),
      enabled: allowHover || (nested && internalAllowHover),
      delay: { open: 75 },
    }),
    useClick(context, {
      toggle: !nested || !internalAllowHover,
      event: "mousedown",
      ignoreMouse: nested,
    }),
    useRole(context, { role: "menu" }),
    useDismiss(context, dismiss),
    useListNavigation(context, {
      listRef: listItemsRef,
      activeIndex,
      nested,
      onNavigate: setActiveIndex,
    }),
    useTypeahead(context, {
      listRef: listContentRef,
      onMatch: open ? setActiveIndex : undefined,
      activeIndex,
    }),
  ]);

  useEffect(() => {
    function handleTreeClick() {
      if (dismiss.referencePress) handler?.(false);
    }

    function onSubMenuOpen(event: { nodeId: string; parentId: string }) {
      if (event.nodeId !== nodeId && event.parentId === parentId) {
        handler?.(false);
      }
    }

    tree?.events.on("click", handleTreeClick);
    tree?.events.on("menuopen", onSubMenuOpen);

    return () => {
      tree?.events.off("click", handleTreeClick);
      tree?.events.off("menuopen", onSubMenuOpen);
    };
  }, [tree, nodeId, parentId, handler, dismiss]);

  useEffect(() => {
    if (open) {
      tree?.events.emit("menuopen", {
        parentId,
        nodeId,
      });
    }
  }, [tree, open, nodeId, parentId]);

  useEffect(() => {
    function onPointerMove({ pointerType }: PointerEvent) {
      if (pointerType !== "touch") {
        setInternalAllowHover(true);
      }
    }

    function onKeyDown() {
      setInternalAllowHover(false);
    }

    window.addEventListener("pointermove", onPointerMove, {
      once: true,
      capture: true,
    });

    window.addEventListener("keydown", onKeyDown, true);
    return () => {
      window.removeEventListener("pointermove", onPointerMove, {
        capture: true,
      });

      window.removeEventListener("keydown", onKeyDown, true);
    };
  }, [internalAllowHover]);

  const referenceRef = useMergeRefs([refs.setReference, ref]) as ReferenceType;

  const contextValue = useMemo(
    () => ({
      open,
      handler,
      setInternalOpen,
      strategy,
      x,
      y,
      reference: referenceRef,
      floating: refs.setFloating,
      listItemsRef,
      getReferenceProps,
      getFloatingProps,
      getItemProps,
      appliedAnimation,
      lockScroll,
      context,
      activeIndex,
      tree,
      allowHover,
      internalAllowHover,
      nested,
      setActiveIndex,
    }),
    [
      open,
      handler,
      setInternalOpen,
      strategy,
      x,
      y,
      referenceRef,
      refs,
      getReferenceProps,
      getFloatingProps,
      getItemProps,
      appliedAnimation,
      lockScroll,
      context,
      activeIndex,
      tree,
      allowHover,
      internalAllowHover,
      nested,
      setActiveIndex,
    ]
  );

  return (
    <MenuContextProvider value={contextValue}>
      <FloatingNode id={nodeId}>{children}</FloatingNode>
    </MenuContextProvider>
  );
};

export default MenuCore;

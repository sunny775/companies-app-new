import type { Variant } from "framer-motion";
import type { UseDismissProps } from "@floating-ui/react";

export type Animation = {
  initial?: Variant;
  mount?: Variant;
  unmount?: Variant;
};

export type DismissType = UseDismissProps;

export type OffsetType =
  | number
  | {
      mainAxis?: number;
      crossAxis?: number;
      alignmentAxis?: number | null;
    };

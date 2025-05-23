import { useMemo } from "react";

type Ref<T> = React.RefObject<T | null> | ((ref: T | null) => void) | null | undefined;

export type UseMergeRefsProps<T> = Array<Ref<T>>

export function mergeRefs<T>(...refs: UseMergeRefsProps<T>): React.RefCallback<T> {
  return (node) => {
    refs.forEach((ref) => {
      if (typeof ref === "function") {
        ref(node);
      } else if (ref != null) {
        ref.current = node;
      }
    });
  };
}

function useMergedRefs<T>(...refs: Array<Ref<T>>) {
  return useMemo(() => mergeRefs(...refs), [refs]);
}

export default useMergedRefs;

import React from "react";
import { useIsomorphicLayoutEffect } from "framer-motion";
import merge from "deepmerge";
import { useTabs, setAnimation } from "./TabsContext";
import { tv } from "tailwind-variants";
import { Animation } from "../sharedTypes";

export interface TabsBodyProps extends React.ComponentProps<"div"> {
  animate?: Animation;
}

const tabsBodyStyles = tv({
  base: "block w-full relative bg-transparent overflow-hidden",
});

export const TabsBody = ({
  className,
  children,
  animate = {
    unmount: {},
    mount: {},
  },
  ...rest
}: TabsBodyProps) => {
  const { dispatch } = useTabs();

  const styles = tabsBodyStyles({ className });

  const mainAnimation: Animation = React.useMemo(
    () => ({
      initial: {
        opacity: 0,
        position: "absolute",
        top: "0",
        left: "0",
        zIndex: 1,
        transition: { duration: 0 },
      },
      unmount: {
        opacity: 0,
        position: "absolute",
        top: "0",
        left: "0",
        zIndex: 1,
        transition: { duration: 0.5, times: [0.4, 0, 0.2, 1] },
      },
      mount: {
        opacity: 1,
        position: "relative",
        zIndex: 2,
        transition: { duration: 0.5, times: [0.4, 0, 0.2, 1] },
      },
    }),
    []
  );

  const appliedAnimation = React.useMemo(() => merge(mainAnimation, animate), [animate, mainAnimation]);

  useIsomorphicLayoutEffect(() => {
    setAnimation(dispatch, appliedAnimation);
  }, [appliedAnimation, dispatch]);

  return (
    <div {...rest} className={styles}>
      {children}
    </div>
  );
};

export default TabsBody;

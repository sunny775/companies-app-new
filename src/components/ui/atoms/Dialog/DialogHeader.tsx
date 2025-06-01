import React from "react";
import { tv } from "tailwind-variants";
import { useDialog } from "./DialogContext";

export const dialogHeaderStyles = tv({
  base: "flex items-center shrink-0 p-4  antialiased font-sans text-2xl font-semibold leading-snug",
});

export const dialogFooterStyles = tv({
  base: "flex items-center justify-end shrink-0 flex-wrap p-4",
});

export type DialogHeaderProps = React.ComponentProps<"div">;

export const DialogHeader = ({ className, children, ...rest }: DialogHeaderProps) => {
  const { titleId } = useDialog();
  return (
    <div {...rest} className={dialogHeaderStyles({ className })} id={titleId}>
      {children}
    </div>
  );
};

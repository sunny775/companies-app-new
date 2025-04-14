import React from "react";
import { tv } from "tailwind-variants";

const cardFooterStyles = tv({
  base: "p-6",
  variants: {
    divider: {
      true: "border-t border-blue-gray-50",
    },
  },
});

export interface CardFooterProps extends React.ComponentProps<"div"> {
  divider?: boolean;
}

export const CardFooter = ({ divider, className, children, ...rest }: CardFooterProps) => {
  return (
    <div {...rest} className={cardFooterStyles({ className, divider })}>
      {children}
    </div>
  );
};

export default CardFooter;

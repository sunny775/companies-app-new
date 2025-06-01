import cn from "@/lib/utils/cn";
import React from "react";

export type CardBodyProps = React.ComponentProps<"div">;

export const CardBody = ({ className, children, ...rest }: CardBodyProps) => {
  return (
    <div {...rest} className={cn("p-6", className)}>
      {children}
    </div>
  );
};

export default CardBody;

import { useId } from "@floating-ui/react";
import { ComponentProps } from "react";
import { tv } from "tailwind-variants";

export interface ItemProps extends ComponentProps<"div"> {
  children: React.ReactNode;
  active?: boolean;
  value: string;
}

const itemStyles = tv({
  base: "py-2 px-3 rounded-md data-[active=true]:bg-green-600/10 data-[active=true]:text-green-500",
});

export const Item = ({ children, active, className, ...rest }: ItemProps) => {
  const id = useId();

  return (
    <div
      role="option"
      id={id}
      aria-selected={active}
      data-active={active}
      className={itemStyles({ className })}
      {...rest}
    >
      {children}
    </div>
  );
};

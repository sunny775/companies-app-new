import { useId } from "@floating-ui/react";
import { ComponentProps } from "react";

export interface ItemProps extends ComponentProps<"div"> {
  children: React.ReactNode;
  active?: boolean;
  value: string;
}

export const Item = ({ children, active, ...rest }: ItemProps) => {
  const id = useId();

  return (
    <div
      role="option"
      id={id}
      aria-selected={active}
      {...rest}
      style={{
        background: active ? "rgba(0, 163, 158, 0.1)" : "",
        color: active ? "#00ccbb" : "",
        padding: "8px 12px",
        borderRadius: 6,
      }}
    >
      {children}
    </div>
  );
};

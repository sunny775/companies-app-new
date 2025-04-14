import React from "react";
import { tv, VariantProps } from "tailwind-variants";
import Image, { ImageProps } from "next/image";

const avatarStyles = tv({
  base: "relative inline-block object-cover object-center",
  variants: {
    bordered: {
      true: "border-2",
    },
    shadow: {
      true: "shadow-md",
    },
    variant: {
      circular: "rounded-full",
      square: "rounded-none",
    },
    size: {
      xs: "size-6",
      sm: "size-9",
      md: "size-12",
      lg: "size-[58px]",
      xl: "size-[74px]",
      xxl: "size-[110px]",
    },
    boderColor: {
      default: "border-black/5 dark:border-white/10",
      success: "border-green-500",
      error: "border-red-500",
      info: "border-blue-500",
    },
  },
  compoundVariants: [
    {
      size: ["xs", "sm"],
      class: "rounded-md",
    },
    {
      size: ["md", "lg"],
      class: "rounded-lg",
    },
    {
      size: ["xl", "xxl"],
      class: "rounded-xl",
    },
  ],
  defaultVariants: {
    shadow: true,
    variant: "circular",
    boderColor: "default"
  },
});

export interface AvatarProps
  extends ImageProps,
    VariantProps<typeof avatarStyles> {}

export const Avatar = ({
  variant,
  size,
  className,
  boderColor,
  bordered,
  shadow,

  ...rest
}: AvatarProps) => {
  const styles = avatarStyles({
    variant,
    size,
    className,
    bordered,
    boderColor,
    shadow,
  });

  return <Image {...rest} alt={rest.alt} className={styles} />;
};

export default Avatar;

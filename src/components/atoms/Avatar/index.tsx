import React from "react";
import { tv, VariantProps } from "tailwind-variants";
import Image, { ImageProps } from "next/image";

const avatarStyles = tv({
  base: "relative inline-block object-cover object-center rounded-lg",
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
      sm: "size-8",
      md: "size-10",
      lg: "size-12",
      xl: "size-[58px]",
      xxl: "size-[110px]",
    },
    boderColor: {
      default: "border-gray-600/20",
      success: "border-green-600/20",
      error: "border-red-600/20",
      info: "border-blue-600/20",
    },
  },
  defaultVariants: {
    shadow: true,
    size: "md",
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

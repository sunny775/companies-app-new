import cn from "@/lib/cn";
import React from "react";
import { tv, VariantProps } from "tailwind-variants";

export type Color = "default" | "success" | "info";

export type AsType =
  | "article"
  | "blockquote"
  | "dd"
  | "div"
  | "dt"
  | "figcaption"
  | "figure"
  | "li"
  | "p"
  | "pre"
  | "a"
  | "abbr"
  | "b"
  | "bdi"
  | "bdo"
  | "cite"
  | "code"
  | "data"
  | "dfn"
  | "em"
  | "i"
  | "kbd"
  | "mark"
  | "q"
  | "rp"
  | "rt"
  | "ruby"
  | "s"
  | "samp"
  | "small"
  | "span"
  | "strong"
  | "sub"
  | "sup"
  | "time"
  | "u"
  | "h1"
  | "h2"
  | "h3"
  | "h4"
  | "h5"
  | "h6"
  | "caption"
  | "td"
  | "th"
  | "tr"
  | "button"
  | "label"
  | "legend"
  | "option"
  | "details"
  | "summary";

type Props<T extends AsType> = React.ComponentProps<T>;

export type TextProps<T extends AsType> = Props<T> &
  VariantProps<typeof textStyles> & {
    color?: Color;
    as?: T;
  };

const textStyles = tv({
  base: "",
  slots: {
    default: "",
    success: "",
    info: "",
  },
  variants: {
    variant: {
      h1: "block antialiased tracking-normal font-sans text-5xl font-semibold leading-tight",
      h2: "block antialiased tracking-normal font-sans text-4xl font-semibold leading-[1.3]",
      h3: "block antialiased tracking-normal font-sans text-3xl font-semibold leading-snug",
      h4: "block antialiased tracking-normal font-sans text-2xl font-semibold leading-snug",
      h5: "block antialiased tracking-normal font-sans text-xl font-semibold leading-snug",
      h6: "block antialiased tracking-normal font-sans text-base font-semibold leading-relaxed",
      lead: "block antialiased font-sans text-xl font-normal leading-relaxed",
      paragraph: "block antialiased font-sans text-base font-light leading-relaxed",
      small: "block antialiased font-sans text-sm font-light leading-normal",
    },
    textGradient: {
      true: "bg-clip-text text-transparent",
    },
  },
  compoundVariants: [
    {
      textGradient: true,
      class: {
        default: "bg-gradient-to-t from-blue-600 via-green-600 to-green-600",
        success: "bg-gradient-to-t from-green-600 to-neon",
        info: "bg-gradient-to-t from-blue-600 to-indigo-600",
      },
    },
    {
      textGradient: false,
      class: {
        // default already set in global.css
        success: "text-green-600",
        info: "text-blue-500",
      },
    },
  ],
});

export function Text<T extends AsType>({
  variant = "paragraph",
  color = "default",
  textGradient,
  as,
  className,
  children,
  ...rest
}: TextProps<T>) {
  const styles = textStyles({ textGradient, variant });

  const classes = cn(styles.base({ className }), styles[color]());

  let template;

  switch (variant) {
    case "lead":
    case "small":
    case "paragraph":
      template = React.createElement(
        as || "p",
        {
          ...rest,
          className: classes,
        },
        children
      );
      break;
    default:
      template = React.createElement(
        as || variant,
        {
          ...rest,
          className: classes,
        },
        children
      );
      break;
  }

  return template;
}

export default Text;


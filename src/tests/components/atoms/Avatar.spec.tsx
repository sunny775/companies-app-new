import Avatar, { AvatarProps } from "@/components/ui/atoms/Avatar";
import { render, screen } from "@/tests/test-utils";
import { ClassValue } from "clsx";
import { ComponentProps } from "react";

jest.mock("next/image", () => {
  return {
    __esModule: true,
    default: ({ alt, className, ...props }: ComponentProps<"img">) => (
      // eslint-disable-next-line @next/next/no-img-element
      <img alt={alt} className={className} {...props} />
    ),
  };
});

jest.mock("@/lib/utils/cn", () => ({
  __esModule: true,
  default: (...classes: ClassValue[]) => classes.filter(Boolean).join(" "),
}));

describe("Avatar Component", () => {
  const defaultProps: AvatarProps = {
    src: "/test-avatar.jpg",
    alt: "Test Avatar",
    width: 100,
    height: 100,
  };

  const renderAvatar = (props: Partial<AvatarProps> = defaultProps) => {
    return render(<Avatar {...defaultProps} {...props} />);
  };

  describe("Rendering", () => {
    it("should render avatar image", () => {
      renderAvatar();
      const avatar = screen.getByRole("img");
      expect(avatar).toBeInTheDocument();
      expect(avatar).toHaveAttribute("src", "/test-avatar.jpg");
      expect(avatar).toHaveAttribute("alt", "Test Avatar");
    });

    it("should render with default styles", () => {
      renderAvatar();
      const avatar = screen.getByRole("img");
      expect(avatar).toHaveClass(
        "relative",
        "inline-block",
        "object-cover",
        "object-center",
        "rounded-full",
        "size-10",
        "border-gray-600/20"
      );
    });

    it("should apply custom className", () => {
      renderAvatar({ className: "custom-avatar-class" });
      expect(screen.getByRole("img")).toHaveClass("custom-avatar-class");
    });
  });

  describe("Variants", () => {
    it("should render circular variant (default)", () => {
      renderAvatar();
      expect(screen.getByRole("img")).toHaveClass("rounded-full");
    });

    it("should render square variant", () => {
      renderAvatar({ variant: "square" });
      expect(screen.getByRole("img")).toHaveClass("rounded-none");
    });
  });

  describe("Sizes", () => {
    it("should render medium size (default)", () => {
      renderAvatar();
      expect(screen.getByRole("img")).toHaveClass("size-10");
    });

    it("should render extra small size", () => {
      renderAvatar({ size: "xs" });
      expect(screen.getByRole("img")).toHaveClass("size-6");
    });

    it("should render small size", () => {
      renderAvatar({ size: "sm" });
      expect(screen.getByRole("img")).toHaveClass("size-8");
    });

    it("should render large size", () => {
      renderAvatar({ size: "lg" });
      expect(screen.getByRole("img")).toHaveClass("size-12");
    });

    it("should render extra large size", () => {
      renderAvatar({ size: "xl" });
      expect(screen.getByRole("img")).toHaveClass("size-[58px]");
    });

    it("should render extra extra large size", () => {
      renderAvatar({ size: "xxl" });
      expect(screen.getByRole("img")).toHaveClass("size-[110px]");
    });
  });

  describe("Border", () => {
    it("should not have border by default", () => {
      renderAvatar();
      const avatar = screen.getByRole("img");
      expect(avatar).not.toHaveClass("border-2");
    });

    it("should render with border when bordered is true", () => {
      renderAvatar({ bordered: true });
      expect(screen.getByRole("img")).toHaveClass("border-2", "border-gray-600/20");
    });

    it("should render with success border color", () => {
      renderAvatar({ bordered: true, boderColor: "success" });
      expect(screen.getByRole("img")).toHaveClass("border-2", "border-green-600/20");
    });

    it("should render with error border color", () => {
      renderAvatar({ bordered: true, boderColor: "error" });
      expect(screen.getByRole("img")).toHaveClass("border-2", "border-red-600/20");
    });

    it("should render with info border color", () => {
      renderAvatar({ bordered: true, boderColor: "info" });
      expect(screen.getByRole("img")).toHaveClass("border-2", "border-blue-600/20");
    });

    it("should apply border color even without bordered prop", () => {
      renderAvatar({ boderColor: "success" });
      const avatar = screen.getByRole("img");
      expect(avatar).toHaveClass("border-green-600/20");
      expect(avatar).not.toHaveClass("border-2");
    });
  });

  describe("Shadow", () => {
    it("should have shadow by default", () => {
      renderAvatar();
      expect(screen.getByRole("img")).toHaveClass("shadow-md");
    });

    it("should not have shadow when 'shadow' is false", () => {
      renderAvatar({ shadow: false });
      const avatar = screen.getByRole("img");
      expect(avatar).not.toHaveClass("shadow-md");
    });
  });

  describe("Next.js Image Props", () => {
    it("should pass through Image props", () => {
      renderAvatar({
        quality: 85,
        placeholder: "blur",
      });

      const avatar = screen.getByRole("img");
      expect(avatar).toHaveAttribute("quality", "85");
      expect(avatar).toHaveAttribute("placeholder", "blur");
    });

    it("should handle required Image props", () => {
      renderAvatar({
        src: "/custom-avatar.png",
        alt: "Custom Avatar",
        width: 200,
        height: 200,
      });

      const avatar = screen.getByRole("img");
      expect(avatar).toHaveAttribute("src", "/custom-avatar.png");
      expect(avatar).toHaveAttribute("alt", "Custom Avatar");
      expect(avatar).toHaveAttribute("width", "200");
      expect(avatar).toHaveAttribute("height", "200");
    });
  });

  describe("Complex Scenarios", () => {
    it("should render large circular avatar with success border and shadow", () => {
      renderAvatar({
        size: "lg",
        variant: "circular",
        bordered: true,
        boderColor: "success",
        shadow: true,
      });

      const avatar = screen.getByRole("img");
      expect(avatar).toHaveClass("size-12", "rounded-full", "border-2", "border-green-600/20", "shadow-md");
    });

    it("should render square avatar without shadow", () => {
      renderAvatar({
        variant: "square",
        shadow: false,
        size: "xl",
      });

      const avatar = screen.getByRole("img");
      expect(avatar).toHaveClass("rounded-none", "size-[58px]");
      expect(avatar).not.toHaveClass("shadow-md", "rounded-full");
    });

    it("should render extra large avatar with error border", () => {
      renderAvatar({
        size: "xxl",
        bordered: true,
        boderColor: "error",
        className: "custom-xxl-avatar",
      });

      const avatar = screen.getByRole("img");
      expect(avatar).toHaveClass("size-[110px]", "border-2", "border-red-600/20", "custom-xxl-avatar");
    });
  });

  describe("Accessibility", () => {
    it("should have proper alt text", () => {
      renderAvatar({ alt: "User profile picture" });
      expect(screen.getByRole("img")).toHaveAttribute("alt", "User profile picture");
    });

    it("should pass through accessibility attributes", () => {
      renderAvatar({
        "aria-label": "User avatar",
        "aria-describedby": "avatar-description",
      });

      const avatar = screen.getByRole("img");
      expect(avatar).toHaveAttribute("aria-label", "User avatar");
      expect(avatar).toHaveAttribute("aria-describedby", "avatar-description");
    });
  });

  describe("Edge Cases", () => {
    it("should handle undefined variant", () => {
      renderAvatar({ variant: undefined });
      expect(screen.getByRole("img")).toHaveClass("rounded-full"); // default
    });

    it("should handle undefined size", () => {
      renderAvatar({ size: undefined });
      expect(screen.getByRole("img")).toHaveClass("size-10"); // default
    });
  });
});

import Button, { ButtonProps } from "@/components/atoms/Button";
import { Spinnerprops } from "@/components/atoms/loaders/Spinner";
import { render, screen, userEvent } from "@/tests/test-utils";
import { ClassValue } from "clsx";

jest.mock("@/components/atoms/loaders/Spinner", () => {
  return {
    __esModule: true,
    default: ({ className, ...props }: Spinnerprops) => <svg data-testid="spinner" className={className} {...props} />,
  };
});

jest.mock("@/lib/utils/cn", () => ({
  __esModule: true,
  default: (...classes: ClassValue[]) => classes.filter(Boolean).join(" "),
}));

describe("Button Component", () => {
  const defaultProps: Partial<ButtonProps> = {
    children: "Test Button",
  };

  const renderButton = (props: Partial<ButtonProps> = {}) => {
    return render(<Button {...defaultProps} {...props} />);
  };

  describe("Rendering", () => {
    it("should render button with text", () => {
      renderButton();
      expect(screen.getByRole("button")).toBeInTheDocument();
      expect(screen.getByText("Test Button")).toBeInTheDocument();
    });

    it("should render with default type button", () => {
      renderButton();
      expect(screen.getByRole("button")).toHaveAttribute("type", "button");
    });

    it("should render with custom type", () => {
      renderButton({ type: "submit" });
      expect(screen.getByRole("button")).toHaveAttribute("type", "submit");
    });

    it("should apply custom className", () => {
      renderButton({ className: "custom-class" });
      expect(screen.getByRole("button")).toHaveClass("custom-class");
    });
  });

  describe("Variants", () => {
    it("should render with outlined variant (default)", () => {
      renderButton();
      const button = screen.getByRole("button");
      expect(button).toHaveClass("border-gray-600/20");
    });

    it("should render with filled variant", () => {
      renderButton({ variant: "filled" });
      const button = screen.getByRole("button");
      expect(button).toHaveClass("bg-gray-600", "text-white");
    });

    it("should render with gradient variant", () => {
      renderButton({ variant: "gradient" });
      const button = screen.getByRole("button");
      expect(button).toHaveClass("bg-gradient-to-tr", "from-green-600", "to-neon");
    });

    it("should render with text variant", () => {
      renderButton({ variant: "text" });
      const button = screen.getByRole("button");
      expect(button).toHaveClass("hover:bg-gray-500/5");
    });

    it("should render with ghost variant", () => {
      renderButton({ variant: "ghost" });
      const button = screen.getByRole("button");
      expect(button).toHaveClass("bg-green-500/5", "border-green-600/10");
    });
  });

  describe("Colors", () => {
    it("should render with success color", () => {
      renderButton({ color: "success", variant: "filled" });
      const button = screen.getByRole("button");
      expect(button).toHaveClass("bg-green-600");
    });

    it("should render with error color", () => {
      renderButton({ color: "error", variant: "outlined" });
      const button = screen.getByRole("button");
      expect(button).toHaveClass("border-red-600/20", "text-red-700");
    });

    it("should render with info color", () => {
      renderButton({ color: "info", variant: "text" });
      const button = screen.getByRole("button");
      expect(button).toHaveClass("text-blue-600");
    });
  });

  describe("Sizes", () => {
    it("should render with medium size (default)", () => {
      renderButton();
      expect(screen.getByRole("button")).toHaveClass("h-10", "px-6", "text-xs");
    });

    it("should render with small size", () => {
      renderButton({ size: "sm" });
      expect(screen.getByRole("button")).toHaveClass("h-8", "px-4", "text-xs");
    });

    it("should render with large size", () => {
      renderButton({ size: "lg" });
      expect(screen.getByRole("button")).toHaveClass("h-12", "px-7", "text-sm");
    });
  });

  describe("Loading State", () => {
    it("should render spinner when loading", () => {
      renderButton({ loading: true });
      expect(screen.getByTestId("spinner")).toBeInTheDocument();
      expect(screen.getByRole("button")).toHaveClass("flex", "items-center", "gap-2");
    });

    it("should disable button when loading", () => {
      renderButton({ loading: true });
      expect(screen.getByRole("button")).toBeDisabled();
    });

    it("should render spinner with correct size for large button", () => {
      renderButton({ loading: true, size: "lg" });
      const spinner = screen.getByTestId("spinner");
      expect(spinner).toHaveClass("w-5", "h-5");
    });

    it("should render spinner with default size for non-large buttons", () => {
      renderButton({ loading: true, size: "md" });
      const spinner = screen.getByTestId("spinner");
      expect(spinner).toHaveClass("w-4", "h-4");
    });

    it("should still render children when loading", () => {
      renderButton({ loading: true });
      expect(screen.getByText("Test Button")).toBeInTheDocument();
    });
  });

  describe("Disabled State", () => {
    it("should be disabled when disabled prop is true", () => {
      renderButton({ disabled: true });
      expect(screen.getByRole("button")).toBeDisabled();
    });

    it("should apply disabled styles", () => {
      renderButton({ disabled: true });
      expect(screen.getByRole("button")).toHaveClass("disabled:opacity-50");
    });
  });

  describe("Full Width", () => {
    it("should render full width when fullWidth is true", () => {
      renderButton({ fullWidth: true });
      expect(screen.getByRole("button")).toHaveClass("block", "w-full");
    });

    it("should not render full width by default", () => {
      renderButton();
      const button = screen.getByRole("button");
      expect(button).not.toHaveClass("w-full");
    });
  });

  describe("Interactions", () => {
    it("should call onClick when clicked", async () => {
      const handleClick = jest.fn();
      const user = userEvent.setup();

      renderButton({ onClick: handleClick });
      await user.click(screen.getByRole("button"));

      expect(handleClick).toHaveBeenCalledTimes(1);
    });

    it("should not call onClick when disabled", async () => {
      const handleClick = jest.fn();
      const user = userEvent.setup();

      renderButton({ onClick: handleClick, disabled: true });
      await user.click(screen.getByRole("button"));

      expect(handleClick).not.toHaveBeenCalled();
    });

    it("should not call onClick when loading", async () => {
      const handleClick = jest.fn();
      const user = userEvent.setup();

      renderButton({ onClick: handleClick, loading: true });
      await user.click(screen.getByRole("button"));

      expect(handleClick).not.toHaveBeenCalled();
    });
  });

  describe("HTML Attributes", () => {
    it("should pass through HTML attributes", () => {
      renderButton({
        "aria-label": "Custom button label",
        id: "button-123",
      });

      const button = screen.getByRole("button");
      expect(button).toHaveAttribute("aria-label", "Custom button label");
      expect(button).toHaveAttribute("id", "button-123");
    });
  });

  describe("Complex Scenarios", () => {
    it("should render large success filled button with loading", () => {
      renderButton({
        variant: "filled",
        color: "success",
        size: "lg",
        loading: true,
        fullWidth: true,
      });

      const button = screen.getByRole("button");
      expect(button).toHaveClass("bg-green-600", "h-12", "w-full", "flex", "items-center", "gap-3");
      expect(button).toBeDisabled();
      expect(screen.getByTestId("spinner")).toHaveClass("w-5", "h-5");
    });

    it("should render error outlined button with custom attributes", () => {
      const handleClick = jest.fn();
      renderButton({
        variant: "outlined",
        color: "error",
        onClick: handleClick,
        "aria-describedby": "error-description",
      });

      const button = screen.getByRole("button");
      expect(button).toHaveClass("border-red-600/20", "text-red-700");
      expect(button).toHaveAttribute("aria-describedby", "error-description");
    });
  });

  describe("Edge Cases", () => {
    it("should handle undefined color", () => {
      renderButton({ color: undefined });
      const button = screen.getByRole("button");
      expect(button).toHaveClass("border-gray-600/20"); // default color
    });

    it("should handle JSX children", () => {
      renderButton({
        children: (
          <span data-testid="custom-content">
            <strong>Bold</strong> Text
          </span>
        ),
      });
      expect(screen.getByTestId("custom-content")).toBeInTheDocument();
      expect(screen.getByText("Bold")).toBeInTheDocument();
    });
  });
});

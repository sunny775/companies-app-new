import Alert, { AlertProps } from "@/components/ui/atoms/Alert";
import { TransitionProps } from "@/components/ui/atoms/Transition";
import { render, screen, userEvent } from "@/tests/test-utils";
import { ClassValue } from "clsx";
import { Info } from "lucide-react";

jest.mock("@/components/ui/atoms/Transition", () => {
  return {
    __esModule: true,
    default: ({ show, children }: TransitionProps) => (show ? <div>{children}</div> : null),
  };
});

jest.mock("@/lib/utils/cn", () => ({
  __esModule: true,
  default: (...classes: ClassValue[]) => classes.filter(Boolean).join(" "),
}));

describe("Alert Component", () => {
  const defaultProps: Partial<AlertProps> = {
    open: true,
    children: "Test alert message",
  };

  const renderAlert = (props: Partial<AlertProps> = {}) => {
    return render(<Alert {...defaultProps} {...props} />);
  };

  describe("Rendering", () => {
    it("should render when open is true", () => {
      renderAlert();
      expect(screen.getByRole("alert")).toBeInTheDocument();
      expect(screen.getByText("Test alert message")).toBeInTheDocument();
    });

    it("should not render when open is false", () => {
      renderAlert({ open: false });
      expect(screen.queryByRole("alert")).not.toBeInTheDocument();
    });

    it("should render with correct variant styles", () => {
      renderAlert({ variant: "success" });
      const alert = screen.getByRole("alert");
      expect(alert).toHaveClass("bg-green-500/5", "text-green-700");
    });

    it("should apply custom className", () => {
      renderAlert({ className: "custom-class" });
      expect(screen.getByRole("alert")).toHaveClass("custom-class");
    });
  });

  describe("Icon", () => {
    it("should render icon when provided", () => {
      renderAlert({ icon: <Info data-testid="info-icon" /> });
      expect(screen.getByTestId("info-icon")).toBeInTheDocument();
    });
  });

  describe("Close functionality", () => {
    it("should render close button when onClose provided", () => {
      const handleClose = jest.fn();
      renderAlert({ onClose: handleClose });
      expect(screen.getByTitle("alert close button")).toBeInTheDocument();
    });

    it("should call onClose when close button clicked", async () => {
      const handleClose = jest.fn();
      const user = userEvent.setup();

      renderAlert({ onClose: handleClose });
      await user.click(screen.getByTitle("alert close button"));

      expect(handleClose).toHaveBeenCalledTimes(1);
    });

    it("should not render close button when action provided", () => {
      const handleClose = jest.fn();
      const customAction = <button>Custom Action</button>;

      renderAlert({ onClose: handleClose, action: customAction });

      expect(screen.getByRole("alert").querySelector("alert close button")).not.toBeInTheDocument();
      expect(screen.getByText("Custom Action")).toBeInTheDocument();
    });
  });

  describe("Action", () => {
    it("should render custom action when provided", () => {
      const customAction = <button data-testid="custom-action">Action</button>;
      renderAlert({ action: customAction });
      expect(screen.getByTestId("custom-action")).toBeInTheDocument();
    });
  });

  describe("Edge cases", () => {
    it("should handle undefined variant", () => {
      renderAlert({ variant: undefined });
      const alert = screen.getByRole("alert");
      expect(alert).toHaveClass("bg-gray-50");
    });
  });
});

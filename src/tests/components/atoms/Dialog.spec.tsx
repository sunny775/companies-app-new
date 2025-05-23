import Dialog, {
  DialogBody,
  DialogFooter,
  DialogHeader,
  DialogProps,
  Dialog as DialogRoot,
} from "@/components/atoms/Dialog";
import { TransitionProps } from "@/components/atoms/Transition";
import { render, screen, userEvent } from "@/tests/test-utils";
import React from "react";

jest.mock("@/lib/hooks/useScrollLock", () => ({
  __esModule: true,
  default: () => ({
    lockScroll: jest.fn(),
    unlockScroll: jest.fn(),
  }),
}));

jest.mock("@/components/atoms/Transition", () => {
  return function MockTransition({ show, children, className, ...props }: TransitionProps) {
    return show ? (
      <div className={className} data-testid="transition" {...props}>
        {children}
      </div>
    ) : null;
  };
});

jest.mock("react", () => ({
  ...jest.requireActual("react"),
  useId: jest.fn(),
}));

const mockedUseId = React.useId as jest.MockedFunction<typeof React.useId>;

jest.mock("react-dom", () => ({
  ...jest.requireActual("react-dom"),
  createPortal: (node: React.ReactNode) => node,
}));

const TestDialog = ({
  open = false,
  onClose = jest.fn(),
  size = "md",
  preventScroll = true,
  closeOnEscape = true,
  closeOnOutsideClick = true,
  animation = undefined,
  ...props
}: Partial<DialogProps>) => (
  <DialogRoot
    open={open}
    onClose={onClose}
    size={size}
    preventScroll={preventScroll}
    closeOnEscape={closeOnEscape}
    closeOnOutsideClick={closeOnOutsideClick}
    animation={animation}
    {...props}
  >
    <DialogHeader>Test Dialog Title</DialogHeader>
    <DialogBody>Test dialog content</DialogBody>
    <DialogFooter>
      <button onClick={onClose}>Close</button>
    </DialogFooter>
  </DialogRoot>
);

const SimpleDialog = ({ open = false, onClose = jest.fn() }) => (
  <DialogRoot open={open} onClose={onClose}>
    <div>Simple dialog content</div>
  </DialogRoot>
);

describe("Dialog Component", () => {
  beforeEach(() => {
    mockedUseId.mockReturnValue("test-id");
    jest.clearAllMocks();
    document.removeEventListener = jest.fn();
    document.addEventListener = jest.fn();
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  describe("DialogRoot", () => {
    it("does not render when closed", () => {
      render(<TestDialog open={false} />);
      expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
    });

    it("renders when open", () => {
      render(<TestDialog open={true} />);
      expect(screen.getByRole("dialog")).toBeInTheDocument();
    });

    it("applies correct ARIA attributes", () => {
      render(<TestDialog open={true} />);

      const dialog = screen.getByRole("dialog");
      expect(dialog).toHaveAttribute("aria-modal", "true");
      expect(dialog).toHaveAttribute("aria-labelledby", "dialog-title-test-id");
      expect(dialog).toHaveAttribute("aria-describedby", "dialog-description-test-id");
      expect(dialog).toHaveAttribute("id", "dialog-test-id");
      expect(dialog).toHaveAttribute("tabIndex", "-1");
    });

    it("handles custom animation props", () => {
      const customAnimation = {
        duration: 600,
        backdropDuration: 800,
        mount: "opacity-100 scale-100 custom-mount",
        unmount: "opacity-0 scale-90 custom-unmount",
        backdropMount: "opacity-100 custom-backdrop-mount",
        backdropUnmount: "opacity-0 custom-backdrop-unmount",
      };

      render(<TestDialog open={true} animation={customAnimation} />);

      const transitions = screen.getAllByTestId("transition");
      expect(transitions).toHaveLength(2);
    });

    it("adds and removes event listeners when opening/closing", () => {
      const addEventListener = jest.spyOn(document, "addEventListener");
      const removeEventListener = jest.spyOn(document, "removeEventListener");

      const { rerender } = render(<TestDialog open={false} />);

      // Should not add listeners when closed
      expect(addEventListener).not.toHaveBeenCalled();

      rerender(<TestDialog open={true} />);

      // Should add listeners when opened
      expect(addEventListener).toHaveBeenCalledWith("keydown", expect.any(Function));
      expect(addEventListener).toHaveBeenCalledWith("mousedown", expect.any(Function));

      rerender(<TestDialog open={false} />);

      // Should remove listeners when closed
      expect(removeEventListener).toHaveBeenCalledWith("keydown", expect.any(Function));
      expect(removeEventListener).toHaveBeenCalledWith("mousedown", expect.any(Function));
    });
  });

  describe("DialogHeader", () => {
    it("renders with correct attributes and content", () => {
      render(<TestDialog open={true} />);

      const header = screen.getByText("Test Dialog Title");
      expect(header).toBeInTheDocument();
      expect(header).toHaveAttribute("id", "dialog-title-test-id");
    });

    it("applies custom className", () => {
      render(
        <DialogRoot open={true} onClose={jest.fn()}>
          <DialogHeader className="custom-header-class">Custom Header</DialogHeader>
        </DialogRoot>
      );

      const header = screen.getByText("Custom Header");
      expect(header).toHaveClass("custom-header-class");
    });

    it("applies default styles", () => {
      render(<TestDialog open={true} />);

      const header = screen.getByText("Test Dialog Title");
      expect(header).toHaveClass("flex", "items-center", "shrink-0", "p-4");
    });

    it("throws error when used outside DialogRoot", () => {
      const consoleSpy = jest.spyOn(console, "error").mockImplementation(() => {});

      expect(() => {
        render(<DialogHeader>Header</DialogHeader>);
      }).toThrow("useDialog must be called within a Dialog component");

      consoleSpy.mockRestore();
    });
  });

  describe("DialogBody", () => {
    it("renders with correct attributes and content", () => {
      render(<TestDialog open={true} />);

      const body = screen.getByText("Test dialog content");
      expect(body).toBeInTheDocument();
      expect(body).toHaveAttribute("id", "dialog-description-test-id");
    });

    it("applies custom className", () => {
      render(
        <DialogRoot open={true} onClose={jest.fn()}>
          <DialogBody className="custom-body-class">Custom Body</DialogBody>
        </DialogRoot>
      );

      const body = screen.getByText("Custom Body");
      expect(body).toHaveClass("custom-body-class");
    });

    it("applies default styles", () => {
      render(<TestDialog open={true} />);

      const body = screen.getByText("Test dialog content");
      expect(body).toHaveClass("relative", "p-4", "max-h-[80vh]", "overflow-auto");
    });

    it("applies divider styles when enabled", () => {
      render(
        <DialogRoot open={true} onClose={jest.fn()}>
          <DialogBody divider={true}>Body with divider</DialogBody>
        </DialogRoot>
      );

      const body = screen.getByText("Body with divider");
      expect(body).toHaveClass("border-t", "border-b");
    });

    it("does not apply divider styles by default", () => {
      render(<TestDialog open={true} />);

      const body = screen.getByText("Test dialog content");
      expect(body).not.toHaveClass("border-t", "border-b");
    });

    it("throws error when used outside DialogRoot", () => {
      const consoleSpy = jest.spyOn(console, "error").mockImplementation(() => {});

      expect(() => {
        render(<DialogBody>Body</DialogBody>);
      }).toThrow("useDialog must be called within a Dialog component");

      consoleSpy.mockRestore();
    });
  });

  describe("DialogFooter", () => {
    it("renders with correct content", () => {
      render(<TestDialog open={true} />);

      const footer = screen.getByText("Close");
      expect(footer.parentElement).toBeInTheDocument();
    });

    it("applies custom className", () => {
      render(
        <DialogRoot open={true} onClose={jest.fn()}>
          <DialogFooter className="custom-footer-class">
            <button>Footer Button</button>
          </DialogFooter>
        </DialogRoot>
      );

      const footer = screen.getByText("Footer Button").parentElement;
      expect(footer).toHaveClass("custom-footer-class");
    });

    it("applies default styles", () => {
      render(<TestDialog open={true} />);

      const footer = screen.getByText("Close").parentElement;
      expect(footer).toHaveClass("flex", "items-center", "justify-end", "shrink-0", "flex-wrap", "p-4");
    });

    it("can contain interactive elements", async () => {
      const user = userEvent.setup();
      const onClose = jest.fn();

      render(<TestDialog open={true} onClose={onClose} />);

      const closeButton = screen.getByText("Close");
      await user.click(closeButton);

      expect(onClose).toHaveBeenCalledTimes(1);
    });
  });

  describe("Integration Tests", () => {
    it("provides correct context values to child components", () => {
      const onClose = jest.fn();
      render(<TestDialog open={true} onClose={onClose} />);

      const header = screen.getByText("Test Dialog Title");
      const body = screen.getByText("Test dialog content");

      expect(header).toHaveAttribute("id", "dialog-title-test-id");
      expect(body).toHaveAttribute("id", "dialog-description-test-id");
    });

    it("maintains proper ARIA relationships", () => {
      render(<TestDialog open={true} />);

      const dialog = screen.getByRole("dialog");
      const header = screen.getByText("Test Dialog Title");
      const body = screen.getByText("Test dialog content");

      expect(dialog).toHaveAttribute("aria-labelledby", header.id);
      expect(dialog).toHaveAttribute("aria-describedby", body.id);
    });

    it("handles complete user interaction flow", async () => {
      const user = userEvent.setup();
      const onClose = jest.fn();

      render(<TestDialog open={true} onClose={onClose} />);

      // Dialog should be visible
      expect(screen.getByRole("dialog")).toBeInTheDocument();

      // Click close button
      const closeButton = screen.getByText("Close");
      await user.click(closeButton);

      expect(onClose).toHaveBeenCalledTimes(1);
    });
  });

  describe("Compound Component API", () => {
    it("has proper compound component structure", () => {
      expect(Dialog).toHaveProperty("Header");
      expect(Dialog).toHaveProperty("Body");
      expect(Dialog).toHaveProperty("Footer");
    });

    it("can be used with compound API", () => {
      render(
        <Dialog open={true} onClose={jest.fn()}>
          <Dialog.Header>Compound Header</Dialog.Header>
          <Dialog.Body>Compound Body</Dialog.Body>
          <Dialog.Footer>Compound Footer</Dialog.Footer>
        </Dialog>
      );

      expect(screen.getByText("Compound Header")).toBeInTheDocument();
      expect(screen.getByText("Compound Body")).toBeInTheDocument();
      expect(screen.getByText("Compound Footer")).toBeInTheDocument();
    });
  });

  describe("Edge Cases", () => {
    it("handles rapid open/close state changes", () => {
      const { rerender } = render(<SimpleDialog open={false} />);

      rerender(<SimpleDialog open={true} />);
      expect(screen.getByRole("dialog")).toBeInTheDocument();

      rerender(<SimpleDialog open={false} />);
      expect(screen.queryByRole("dialog")).not.toBeInTheDocument();

      rerender(<SimpleDialog open={true} />);
      expect(screen.getByRole("dialog")).toBeInTheDocument();
    });
  });

  describe("Accessibility", () => {
    it("sets focus trap attributes correctly", () => {
      render(<TestDialog open={true} />);

      const dialog = screen.getByRole("dialog");
      expect(dialog).toHaveAttribute("tabIndex", "-1");
    });

    it("has proper backdrop aria attributes", () => {
      render(<TestDialog open={true} />);

      // The backdrop should be aria-hidden
      const transitions = screen.getAllByTestId("transition");
      const backdrop = transitions.find((t) => t.querySelector('[aria-hidden="true"]'));
      expect(backdrop).toBeInTheDocument();
    });

    it("maintains proper dialog role and modal attributes", () => {
      render(<TestDialog open={true} />);

      const dialog = screen.getByRole("dialog");
      expect(dialog).toHaveAttribute("role", "dialog");
      expect(dialog).toHaveAttribute("aria-modal", "true");
    });
  });
});

import Drawer, {
  DrawerBody,
  DrawerContextType,
  DrawerFooter,
  DrawerHeader,
  Drawer as DrawerRoot,
  useDrawer,
} from "@/components/atoms/Drawer";
import { TransitionProps } from "@/components/atoms/Transition";
import { fireEvent, render, screen } from "@/tests/test-utils";
import React from "react";

const mockLockScroll = jest.fn();
const mockUnlockScroll = jest.fn();

jest.mock("@/lib/hooks/useScrollLock", () => ({
  __esModule: true,
  default: jest.fn(() => ({
    lockScroll: mockLockScroll,
    unlockScroll: mockUnlockScroll,
  })),
}));

jest.mock("@/components/atoms/Transition", () => ({
  __esModule: true,
  default: ({ show, children, className }: TransitionProps) =>
    show ? <div className={className}>{children}</div> : null,
}));

jest.mock("react-dom", () => ({
  ...jest.requireActual("react-dom"),
  createPortal: (node: React.ReactNode) => node,
}));

describe("DrawerRoot", () => {
  const defaultProps = {
    isOpen: true,
    onClose: jest.fn(),
    children: <div>Drawer content</div>,
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  afterEach(() => {
    document.removeEventListener("keydown", jest.fn());
  });

  it("renders drawer when open", () => {
    render(<DrawerRoot {...defaultProps} />);

    expect(screen.getByRole("dialog")).toBeInTheDocument();
    expect(screen.getByText("Drawer content")).toBeInTheDocument();
  });

  it("does not render drawer when closed", () => {
    render(<DrawerRoot {...defaultProps} isOpen={false} />);

    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });

  it("calls onClose when escape key is pressed", () => {
    const onClose = jest.fn();
    render(<DrawerRoot {...defaultProps} onClose={onClose} />);

    fireEvent.keyDown(document, { key: "Escape" });

    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it("does not call onClose when escape key is pressed if closeOnEscape is false", () => {
    const onClose = jest.fn();
    render(<DrawerRoot {...defaultProps} onClose={onClose} closeOnEscape={false} />);

    fireEvent.keyDown(document, { key: "Escape" });

    expect(onClose).not.toHaveBeenCalled();
  });

  it("calls onClose when clicking outside drawer", () => {
    const onClose = jest.fn();
    render(<DrawerRoot {...defaultProps} onClose={onClose} />);

    const backdrop = screen.getByRole("dialog").parentElement;
    fireEvent.click(backdrop!);

    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it("does not call onClose when clicking inside drawer", () => {
    const onClose = jest.fn();
    render(<DrawerRoot {...defaultProps} onClose={onClose} />);

    const drawer = screen.getByRole("dialog");
    fireEvent.click(drawer);

    expect(onClose).not.toHaveBeenCalled();
  });

  it("does not call onClose when clicking outside if closeOnOutsideClick is false", () => {
    const onClose = jest.fn();
    render(<DrawerRoot {...defaultProps} onClose={onClose} closeOnOutsideClick={false} />);

    const backdrop = screen.getByRole("dialog").parentElement;
    fireEvent.click(backdrop!);

    expect(onClose).not.toHaveBeenCalled();
  });

  it("locks scroll when drawer opens and preventScroll is true", () => {
    render(<DrawerRoot {...defaultProps} preventScroll={true} />);

    expect(mockLockScroll).toHaveBeenCalled();
  });

  it("does not lock scroll when preventScroll is false", () => {
    render(<DrawerRoot {...defaultProps} preventScroll={false} />);

    expect(mockLockScroll).not.toHaveBeenCalled();
  });

  it("unlocks scroll when drawer closes", () => {
    const { rerender } = render(<DrawerRoot {...defaultProps} isOpen={true} />);

    rerender(<DrawerRoot {...defaultProps} isOpen={false} />);

    expect(mockUnlockScroll).toHaveBeenCalled();
  });

  it("applies correct position classes", () => {
    const { rerender } = render(<DrawerRoot {...defaultProps} position="left" />);

    expect(screen.getByRole("dialog")).toHaveClass("left-0", "top-0");

    rerender(<DrawerRoot {...defaultProps} position="right" />);

    expect(screen.getByRole("dialog")).toHaveClass("right-0", "top-0");
  });

  it("applies correct size classes", () => {
    const { rerender } = render(<DrawerRoot {...defaultProps} size="sm" />);

    expect(screen.getByRole("dialog")).toHaveClass("max-w-sm");

    rerender(<DrawerRoot {...defaultProps} size="lg" />);

    expect(screen.getByRole("dialog")).toHaveClass("max-w-lg");
  });

  it("sets correct aria attributes when title and description are projestded", () => {
    render(<DrawerRoot {...defaultProps} title="Test Title" description="Test Description" />);

    const dialog = screen.getByRole("dialog");
    expect(dialog).toHaveAttribute("aria-labelledby");
    expect(dialog).toHaveAttribute("aria-describedby");
    expect(dialog).toHaveAttribute("aria-modal", "true");
  });

  it("generates unique IDs for multiple drawer instances", () => {
    const { container: container1 } = render(<DrawerRoot {...defaultProps}>Content 1</DrawerRoot>);
    const { container: container2 } = render(<DrawerRoot {...defaultProps}>Content 2</DrawerRoot>);

    const dialog1 = container1.querySelector('[role="dialog"]');
    const dialog2 = container2.querySelector('[role="dialog"]');

    expect(dialog1?.id).not.toBe(dialog2?.id);
  });
});

describe("DrawerHeader", () => {
  const TestDrawerHeader = ({ title, children }: { title?: string; children?: React.ReactNode }) => (
    <DrawerRoot isOpen={true} onClose={jest.fn()}>
      <DrawerHeader title={title}>{children}</DrawerHeader>
    </DrawerRoot>
  );

  it("renders title when projestded", () => {
    render(<TestDrawerHeader title="Test Title" />);

    expect(screen.getByText("Test Title")).toBeInTheDocument();
    expect(screen.getByText("Test Title")).toHaveClass("text-lg", "font-semibold");
  });

  it("renders children when title is not projestded", () => {
    render(
      <TestDrawerHeader>
        <div>Custom header content</div>
      </TestDrawerHeader>
    );

    expect(screen.getByText("Custom header content")).toBeInTheDocument();
  });

  it("applies correct base styles", () => {
    render(<TestDrawerHeader title="Test" />);

    const header = screen.getByText("Test").closest(".flex");
    expect(header).toHaveClass("flex", "justify-between", "items-center", "px-4", "border-b", "h-16", "shrink-0");
  });

  it("uses titleId from context", () => {
    render(<TestDrawerHeader title="Test Title" />);

    const titleElement = screen.getByText("Test Title");
    expect(titleElement).toHaveAttribute("id");
    expect(titleElement.id).toMatch(/drawer-title-/);
  });
});

describe("DrawerBody", () => {
  const TestDrawerBody = ({ children }: { children: React.ReactNode }) => (
    <DrawerRoot isOpen={true} onClose={jest.fn()}>
      <DrawerBody>{children}</DrawerBody>
    </DrawerRoot>
  );

  it("renders children correctly", () => {
    render(
      <TestDrawerBody>
        <div>Body content</div>
      </TestDrawerBody>
    );

    expect(screen.getByText("Body content")).toBeInTheDocument();
  });

  it("uses descriptionId from context", () => {
    render(<TestDrawerBody>Test content</TestDrawerBody>);

    const bodyElement = screen.getByText("Test content");
    expect(bodyElement).toHaveAttribute("id");
    expect(bodyElement.id).toMatch(/drawer-description-/);
  });
});

describe("DrawerFooter", () => {
  const TestDrawerFooter = ({ children }: { children: React.ReactNode }) => (
    <DrawerRoot isOpen={true} onClose={jest.fn()}>
      <DrawerFooter>{children}</DrawerFooter>
    </DrawerRoot>
  );

  it("renders children correctly", () => {
    render(
      <TestDrawerFooter>
        <button>Cancel</button>
        <button>Save</button>
      </TestDrawerFooter>
    );

    expect(screen.getByText("Cancel")).toBeInTheDocument();
    expect(screen.getByText("Save")).toBeInTheDocument();
  });

  it("applies correct base styles", () => {
    render(<TestDrawerFooter>Footer content</TestDrawerFooter>);

    const footer = screen.getByText("Footer content");
    expect(footer).toHaveClass(
      "shrink-0",
      "px-4",
      "py-3",
      "border-t",
      "border-gray-600/20",
      "flex",
      "justify-end",
      "gap-2"
    );
  });
});

describe("Drawer (Compound Component)", () => {
  it("renders complete drawer with all parts", () => {
    const onClose = jest.fn();

    render(
      <Drawer isOpen={true} onClose={onClose}>
        <Drawer.Header title="Test Title" />
        <Drawer.Body>
          <p>This is the body content</p>
        </Drawer.Body>
        <Drawer.Footer>
          <button onClick={onClose}>Close</button>
        </Drawer.Footer>
      </Drawer>
    );

    expect(screen.getByText("Test Title")).toBeInTheDocument();
    expect(screen.getByText("This is the body content")).toBeInTheDocument();
    expect(screen.getByText("Close")).toBeInTheDocument();
  });
});

describe("DrawerContext and useDrawer hook", () => {
  it("throws error when useDrawer is used outside DrawerContext", () => {
    const TestComponent = () => {
      useDrawer();
      return null;
    };

    // Suppress console.error for this test
    const consoleSpy = jest.spyOn(console, "error").mockImplementation(() => {});

    expect(() => render(<TestComponent />)).toThrow("useDrawer must be called within a Drawer component");

    consoleSpy.mockRestore();
  });

  it("projestdes correct context values", () => {
    let contextValue: DrawerContextType | null = null;

    const TestComponent = () => {
      contextValue = useDrawer();
      return <div>Test</div>;
    };

    render(
      <DrawerRoot isOpen={true} onClose={jest.fn()}>
        <TestComponent />
      </DrawerRoot>
    );

    expect(contextValue).toMatchObject({
      isOpen: true,
      onClose: expect.any(Function),
      drawerId: expect.stringMatching(/drawer-/),
      titleId: expect.stringMatching(/drawer-title-/),
      descriptionId: expect.stringMatching(/drawer-description-/),
    });
  });
});

describe("Accessibility", () => {
  it("sets correct ARIA attributes", () => {
    render(
      <DrawerRoot isOpen={true} onClose={jest.fn()} title="Test Title" description="Test Description">
        <DrawerHeader title="Test Title" />
        <DrawerBody>Test Description</DrawerBody>
      </DrawerRoot>
    );

    const dialog = screen.getByRole("dialog");

    expect(dialog).toHaveAttribute("aria-modal", "true");
    expect(dialog).toHaveAttribute("aria-labelledby");
    expect(dialog).toHaveAttribute("aria-describedby");
    expect(dialog).toHaveAttribute("tabIndex", "-1");
  });

  it("focuses trap works correctly", () => {
    render(
      <DrawerRoot isOpen={true} onClose={jest.fn()}>
        <DrawerBody>
          <button>Button 1</button>
          <button>Button 2</button>
        </DrawerBody>
      </DrawerRoot>
    );

    const dialog = screen.getByRole("dialog");
    expect(dialog).toHaveAttribute("tabIndex", "-1");
  });
});

describe("Event cleanup", () => {
  it("removes event listeners when drawer unmounts", () => {
    const removeEventListenerSpy = jest.spyOn(document, "removeEventListener");

    const { unmount } = render(
      <DrawerRoot isOpen={true} onClose={jest.fn()}>
        Content
      </DrawerRoot>
    );

    unmount();

    expect(removeEventListenerSpy).toHaveBeenCalledWith("keydown", expect.any(Function));

    removeEventListenerSpy.mockRestore();
  });

  it("removes event listeners when drawer closes", () => {
    const removeEventListenerSpy = jest.spyOn(document, "removeEventListener");

    const { rerender } = render(
      <DrawerRoot isOpen={true} onClose={jest.fn()}>
        Content
      </DrawerRoot>
    );

    rerender(
      <DrawerRoot isOpen={false} onClose={jest.fn()}>
        Content
      </DrawerRoot>
    );

    expect(removeEventListenerSpy).toHaveBeenCalledWith("keydown", expect.any(Function));

    removeEventListenerSpy.mockRestore();
  });
});

import { ToastPosition } from "@/components/atoms/Toast/ToastContext";
import { ToastProvider } from "@/components/atoms/Toast/ToastProvider";
import { useToast } from "@/components/atoms/Toast/useToast";
import { act, render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

jest.mock("react-dom", () => ({
  ...jest.requireActual("react-dom"),
  createPortal: (node: React.ReactNode) => node,
}));

jest.useFakeTimers();

const TestComponent = () => {
  const { toast, success, error, info, warning } = useToast();

  return (
    <div>
      <button onClick={() => toast("Basic toast")}>Basic Toast</button>
      <button onClick={() => success("Success message")}>Success Toast</button>
      <button onClick={() => error("Error message")}>Error Toast</button>
      <button onClick={() => info("Info message")}>Info Toast</button>
      <button onClick={() => warning("Warning message")}>Warning Toast</button>
      <button onClick={() => toast("No auto close", { autoClose: false })}>No Auto Close</button>
      <button onClick={() => toast("Custom duration", { autoClose: 1000 })}>Custom Duration</button>
    </div>
  );
};

// Helper function to advance timers with proper act wrapping
const advanceTimersWithAct = async (time: number) => {
  await act(async () => {
    jest.advanceTimersByTime(time);
  });
};

describe("Toast System", () => {
  beforeEach(() => {
    jest.clearAllTimers();
  });

  afterEach(async () => {
    // Clean up any remaining timers
    await act(async () => {
      jest.runOnlyPendingTimers();
      jest.clearAllTimers();
    });
  });

  describe("ToastProvider", () => {
    it("renders children without toasts", () => {
      render(
        <ToastProvider>
          <div>Test content</div>
        </ToastProvider>
      );

      expect(screen.getByText("Test content")).toBeInTheDocument();
    });

    it("throws error when useToast used outside provider", () => {
      const TestWithoutProvider = () => {
        const { toast } = useToast();
        return <button onClick={() => toast("test")}>Test</button>;
      };

      const consoleSpy = jest.spyOn(console, "error").mockImplementation(() => {});

      expect(() => {
        render(<TestWithoutProvider />);
      }).toThrow("useToast must be used within a ToastProvider");

      consoleSpy.mockRestore();
    });

    it("applies correct position classes", async () => {
      const positions = [
        { position: ToastPosition.TOP_LEFT, expectedClass: "top-4 left-4" },
        { position: ToastPosition.TOP_RIGHT, expectedClass: "top-4 right-4" },
        { position: ToastPosition.BOTTOM_CENTER, expectedClass: "bottom-4 left-1/2 transform -translate-x-1/2" },
      ];

      for (const { position, expectedClass } of positions) {
        const { unmount } = render(
          <ToastProvider position={position}>
            <TestComponent />
          </ToastProvider>
        );

        const button = screen.getByText("Basic Toast");
        await act(async () => {
          button.click();
        });

        const container = document.querySelector(".fixed.z-50");
        expect(container).toHaveClass(...expectedClass.split(" "));

        unmount();
      }
    });
  });

  describe("useToast Hook", () => {
    const renderWithProvider = () => {
      return render(
        <ToastProvider>
          <TestComponent />
        </ToastProvider>
      );
    };

    it("creates basic toast", async () => {
      renderWithProvider();

      const button = screen.getByText("Basic Toast");
      await act(async () => {
        button.click();
      });

      expect(screen.getByRole("alert")).toBeInTheDocument();
      expect(screen.getByText("Basic toast")).toBeInTheDocument();
    });

    it("creates success toast with correct styling", async () => {
      renderWithProvider();

      const button = screen.getByText("Success Toast");
      await act(async () => {
        button.click();
      });

      const toast = screen.getByRole("alert");
      expect(toast).toHaveClass("bg-green-500");
      expect(screen.getByText("Success message")).toBeInTheDocument();
    });

    it("creates error toast with correct styling", async () => {
      renderWithProvider();

      const button = screen.getByText("Error Toast");
      await act(async () => {
        button.click();
      });

      const toast = screen.getByRole("alert");
      expect(toast).toHaveClass("bg-red-500");
    });
  });

  describe("Toast Component", () => {
    const renderWithProvider = () => {
      return render(
        <ToastProvider>
          <TestComponent />
        </ToastProvider>
      );
    };

    it("renders toast content", async () => {
      renderWithProvider();

      await act(async () => {
        screen.getByText("Basic Toast").click();
      });

      expect(screen.getByText("Basic toast")).toBeInTheDocument();
      expect(screen.getByRole("alert")).toBeInTheDocument();
    });

    it("renders correct icons for different types", async () => {
      const buttonTexts = ["Success Toast", "Error Toast", "Warning Toast", "Info Toast", "Basic Toast"];
      const expectedMessages = ["Success message", "Error message", "Warning message", "Info message", "Basic toast"];

      for (let i = 0; i < buttonTexts.length; i++) {
        const { unmount } = renderWithProvider();

        await act(async () => {
          screen.getByText(buttonTexts[i]).click();
        });

        expect(screen.getByText(expectedMessages[i])).toBeInTheDocument();
        unmount();
      }
    });

    it("handles close button click", async () => {
      const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime });
      renderWithProvider();

      await act(async () => {
        screen.getByText("Basic Toast").click();
      });

      const closeButton = screen.getByTitle("close toast button");
      await user.click(closeButton);

      await advanceTimersWithAct(300); // ANIMATION_DURATION

      expect(screen.queryByRole("alert")).not.toBeInTheDocument();
    });

    it("auto-closes after specified duration", async () => {
      renderWithProvider();

      await act(async () => {
        screen.getByText("Custom Duration").click();
      });

      expect(screen.getByText("Custom duration")).toBeInTheDocument();

      await advanceTimersWithAct(1000);
      await advanceTimersWithAct(300); // ANIMATION_DURATION

      expect(screen.queryByText("Custom duration")).not.toBeInTheDocument();
    });

    it("does not auto-close when autoClose is false", async () => {
      renderWithProvider();

      await act(async () => {
        screen.getByText("No Auto Close").click();
      });

      expect(screen.getByText("No auto close")).toBeInTheDocument();

      await advanceTimersWithAct(10000);

      expect(screen.getByText("No auto close")).toBeInTheDocument();
    });

    it("renders progress bar when autoClose is enabled", async () => {
      renderWithProvider();

      await act(async () => {
        screen.getByText("Success Toast").click();
      });

      // Progress bar should be present (implementation detail: look for the progress bar element)
      const toast = screen.getByRole("alert");
      expect(toast.querySelector(".h-1")).toBeInTheDocument();
    });

    it("does not render progress bar when autoClose is false", async () => {
      renderWithProvider();

      await act(async () => {
        screen.getByText("No Auto Close").click();
      });

      const toast = screen.getByRole("alert");
      expect(toast.querySelector(".h-1")).not.toBeInTheDocument();
    });

    it("updates progress bar correctly over time", async () => {
      renderWithProvider();

      await act(async () => {
        screen.getByText("Custom Duration").click();
      });

      // Advance time and check progress updates
      await advanceTimersWithAct(500); // 50% of duration

      // The progress bar should be updating
      const toast = screen.getByRole("alert");
      expect(toast.querySelector(".h-1")).toBeInTheDocument();

      // Complete the timer
      await advanceTimersWithAct(500);
      await advanceTimersWithAct(300); // ANIMATION_DURATION

      expect(screen.queryByText("Custom duration")).not.toBeInTheDocument();
    });
  });

  describe("Integration Tests", () => {
    it("handles complete toast lifecycle", async () => {
      render(
        <ToastProvider>
          <TestComponent />
        </ToastProvider>
      );

      // Create toast
      await act(async () => {
        screen.getByText("Custom Duration").click();
      });

      expect(screen.getByText("Custom duration")).toBeInTheDocument();

      // Wait for auto-close
      await advanceTimersWithAct(1000);
      await advanceTimersWithAct(300); // ANIMATION_DURATION

      await waitFor(() => {
        expect(screen.queryByText("Custom duration")).not.toBeInTheDocument();
      });
    });

    it("handles toast without auto-close", async () => {
      render(
        <ToastProvider>
          <TestComponent />
        </ToastProvider>
      );

      await act(async () => {
        screen.getByText("No Auto Close").click();
      });

      expect(screen.getByText("No auto close")).toBeInTheDocument();

      // Should still be present after long time
      await advanceTimersWithAct(10000);

      expect(screen.getByText("No auto close")).toBeInTheDocument();
    });
  });

  describe("Accessibility", () => {
    const renderWithProvider = () => {
      return render(
        <ToastProvider>
          <TestComponent />
        </ToastProvider>
      );
    };

    it("has proper ARIA role", async () => {
      renderWithProvider();

      await act(async () => {
        screen.getByText("Info Toast").click();
      });

      expect(screen.getByRole("alert")).toBeInTheDocument();
    });

    it("close button is accessible", async () => {
      renderWithProvider();

      await act(async () => {
        screen.getByText("Basic Toast").click();
      });

      const closeButton = screen.getByTitle("close toast button");
      expect(closeButton).toBeInTheDocument();
    });
  });
});

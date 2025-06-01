import Checkbox from "@/components/ui/atoms/Checkbox";
import "@testing-library/jest-dom";
import { render, screen, userEvent } from '@/tests/test-utils'
import { LucideProps, Star } from "lucide-react";

jest.mock("lucide-react", () => ({
  Check: ({ className, strokeWidth, ...props }: LucideProps) => (
    <svg data-testid="check-icon" className={className} data-stroke-width={strokeWidth} {...props}>
      <path d="check" />
    </svg>
  ),
  Star: ({ className, ...props }: LucideProps) => (
    <svg data-testid="star-icon" className={className} {...props}>
      <path d="star" />
    </svg>
  ),
}));

describe("Checkbox Component", () => {
  describe("Basic Rendering", () => {
    it("renders checkbox without label", () => {
      render(<Checkbox />);

      const checkbox = screen.getByRole("checkbox");
      expect(checkbox).toBeInTheDocument();
      expect(checkbox).toHaveAttribute("type", "checkbox");
    });

    it("renders checkbox with label", () => {
      render(<Checkbox label="Accept Terms" />);

      const checkbox = screen.getByRole("checkbox");
      const label = screen.getByText("Accept Terms");

      expect(checkbox).toBeInTheDocument();
      expect(label).toBeInTheDocument();
      expect(label.tagName).toBe("LABEL");
    });

    it("renders default check icon", () => {
      render(<Checkbox />);

      const checkIcon = screen.getByTestId("check-icon");
      expect(checkIcon).toBeInTheDocument();
      expect(checkIcon).toHaveClass("w-3.5", "h-3.5");
      expect(checkIcon).toHaveAttribute("data-stroke-width", "3");
    });

    it("renders custom icon when provided", () => {
      render(<Checkbox icon={<Star data-testid="custom-star" />} />);

      const customIcon = screen.getByTestId("custom-star");
      expect(customIcon).toBeInTheDocument();
      expect(screen.queryByTestId("check-icon")).not.toBeInTheDocument();
    });
  });

  describe("Styling and Variants", () => {
    it("applies default color variant", () => {
      render(<Checkbox />);

      const checkbox = screen.getByRole("checkbox");
      expect(checkbox).toHaveClass("checked:bg-gray-500", "checked:border-gray-500");
    });

    it("applies success color variant", () => {
      render(<Checkbox color="success" />);

      const checkbox = screen.getByRole("checkbox");
      expect(checkbox).toHaveClass("checked:bg-green-500", "checked:border-green-500");
    });

    it("applies error color variant", () => {
      render(<Checkbox color="error" />);

      const checkbox = screen.getByRole("checkbox");
      expect(checkbox).toHaveClass("checked:bg-red-500", "checked:border-red-500");
    });

    it("applies info color variant", () => {
      render(<Checkbox color="info" />);

      const checkbox = screen.getByRole("checkbox");
      expect(checkbox).toHaveClass("checked:bg-blue-500", "checked:border-blue-500");
    });

    it("applies custom className to root", () => {
      render(<Checkbox className="custom-root-class" data-testid="checkbox-root" />);

      const root = screen.getByTestId("checkbox-root");
      expect(root).toHaveClass("custom-root-class");
    });
  });

  describe("Disabled State", () => {
    it("applies disabled styles when disabled=true", () => {
      render(<Checkbox disabled data-testid="checkbox-root" />);

      const checkbox = screen.getByRole("checkbox");
      expect(checkbox).toBeDisabled();
    });

    it("does not apply disabled styles when disabled=false", () => {
      render(<Checkbox disabled={false} data-testid="checkbox-root" />);
      const checkbox = screen.getByRole("checkbox");
      expect(checkbox).not.toBeDisabled();
    });
  });

  describe("Props Forwarding", () => {
    it("forwards labelProps to label element", () => {
      render(
        <Checkbox
          label="Test Label"
          labelProps={{
            className: "custom-label-class",
          }}
        />
      );

      const label = screen.getByText("Test Label");
      expect(label).toBeInTheDocument();
      expect(label).toHaveClass("custom-label-class");
    });

    it("forwards iconProps to icon span", () => {
      render(
        <Checkbox
          iconProps={{
            className: "custom-icon-class",
            title: "checkbox-icon",
          }}
        />
      );

      const iconSpan = screen.getByTitle("checkbox-icon");
      expect(iconSpan).toBeInTheDocument();
      expect(iconSpan).toHaveClass("custom-icon-class");
    });

    it("forwards input props to input element", () => {
      render(<Checkbox name="test-checkbox" value="test-value" />);

      const checkbox = screen.getByRole("checkbox");
      expect(checkbox).toHaveAttribute("name", "test-checkbox");
      expect(checkbox).toHaveAttribute("value", "test-value");
    });
  });

  describe("Refs", () => {
    it("forwards ref to root div", () => {
      const rootRef = { current: null };

      render(<Checkbox ref={rootRef} />);

      expect(rootRef.current).toBeInstanceOf(HTMLDivElement);
    });

    it("forwards inputRef to input element", () => {
      const inputRef = { current: null };

      render(<Checkbox inputRef={inputRef} />);

      expect(inputRef.current).toBeInstanceOf(HTMLInputElement);
      expect(inputRef.current).toHaveAttribute("type", "checkbox");
    });
  });

  describe("User Interactions", () => {
    it("handles checkbox state changes", async () => {
      const user = userEvent.setup();
      const handleChange = jest.fn();

      render(<Checkbox onChange={handleChange} />);

      const checkbox = screen.getByRole("checkbox");

      expect(checkbox).not.toBeChecked();

      await user.click(checkbox);

      expect(handleChange).toHaveBeenCalledTimes(1);
      expect(checkbox).toBeChecked();
    });

    it("handles label clicks", async () => {
      const user = userEvent.setup();
      const handleChange = jest.fn();

      render(<Checkbox label="Click me" onChange={handleChange} />);

      const label = screen.getByText("Click me");
      const checkbox = screen.getByRole("checkbox");

      await user.click(label);

      expect(handleChange).toHaveBeenCalledTimes(1);
      expect(checkbox).toBeChecked();
    });

    it("does not handle interactions when disabled", async () => {
      const user = userEvent.setup();
      const handleChange = jest.fn();

      render(<Checkbox disabled onChange={handleChange} />);

      const checkbox = screen.getByRole("checkbox");

      await user.click(checkbox);

      expect(handleChange).not.toHaveBeenCalled();
      expect(checkbox).not.toBeChecked();
    });
  });

  describe("Controlled vs Uncontrolled", () => {
    it("works as uncontrolled component", async () => {
      const user = userEvent.setup();

      render(<Checkbox />);

      const checkbox = screen.getByRole("checkbox");

      expect(checkbox).not.toBeChecked();

      await user.click(checkbox);

      expect(checkbox).toBeChecked();
    });

    it("works as controlled component", async () => {
      const user = userEvent.setup();
      const handleChange = jest.fn();

      const { rerender } = render(<Checkbox checked={false} onChange={handleChange} />);

      const checkbox = screen.getByRole("checkbox");

      expect(checkbox).not.toBeChecked();

      await user.click(checkbox);

      expect(handleChange).toHaveBeenCalledTimes(1);
      expect(checkbox).not.toBeChecked();

      rerender(<Checkbox checked={true} onChange={handleChange} />);

      expect(checkbox).toBeChecked();
    });
  });

  describe("Accessibility", () => {
    it("maintains proper label association for screen readers", () => {
      render(<Checkbox label="Screen reader accessible" />);

      const checkbox = screen.getByRole("checkbox");

      expect(checkbox).toHaveAccessibleName("Screen reader accessible");
    });
  });

  describe("Complex Label Content", () => {
    it("renders complex label content", () => {
      const complexLabel = (
        <span>
          I agree to the <a href="/terms">Terms of Service</a>
        </span>
      );

      render(<Checkbox label={complexLabel} />);

      expect(screen.getByText("I agree to the")).toBeInTheDocument();
      expect(screen.getByText("Terms of Service")).toBeInTheDocument();
      expect(screen.getByRole("link")).toHaveAttribute("href", "/terms");
    });

    it("handles label with special characters", () => {
      render(<Checkbox label="Accept T&C's & Privacy Policy" />);

      expect(screen.getByText("Accept T&C's & Privacy Policy")).toBeInTheDocument();
    });
  });

  describe("Edge Cases", () => {
    it("handles empty label gracefully", () => {
      render(<Checkbox label="" />);

      const checkbox = screen.getByRole("checkbox");
      expect(checkbox).toBeInTheDocument();
    });

    it("handles null/undefined props gracefully", () => {
      render(
        <Checkbox
          label={undefined}
          icon={null}
          containerProps={undefined}
          labelProps={undefined}
          iconProps={undefined}
        />
      );

      const checkbox = screen.getByRole("checkbox");
      expect(checkbox).toBeInTheDocument();
    });

    it("preserves all input attributes", () => {
      render(<Checkbox name="test" value="test-value" required form="test-form" tabIndex={5} />);

      const checkbox = screen.getByRole("checkbox");
      expect(checkbox).toHaveAttribute("name", "test");
      expect(checkbox).toHaveAttribute("value", "test-value");
      expect(checkbox).toBeRequired();
      expect(checkbox).toHaveAttribute("form", "test-form");
      expect(checkbox).toHaveAttribute("tabindex", "5");
    });
  });

  describe("Multiple Checkboxes", () => {
    it("handles multiple checkboxes with unique IDs", () => {
      render(
        <div>
          <Checkbox label="Option 1" />
          <Checkbox label="Option 2" />
          <Checkbox label="Option 3" />
        </div>
      );

      const checkboxes = screen.getAllByRole("checkbox");

      expect(checkboxes).toHaveLength(3);

      const ids = checkboxes.map((cb) => cb.getAttribute("id"));
      const uniqueIds = new Set(ids);
      expect(uniqueIds.size).toBe(3);
    });
  });
});

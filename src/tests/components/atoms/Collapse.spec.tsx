import Collapse, {
  CollapseContent,
  CollapseContentProps,
  CollapseProps,
  Collapse as CollapseRoot,
  CollapseTrigger,
  CollapseTriggerProps,
} from "@/components/atoms/Collapse";
import { render, screen, waitFor } from "@/tests/test-utils";
import "@testing-library/jest-dom";
import userEvent from "@testing-library/user-event";
import React from "react";

// Mock useId for consistent testing
jest.mock("react", () => ({
  ...jest.requireActual("react"),
  useId: jest.fn(),
}));

const mockedUseId = React.useId as jest.MockedFunction<typeof React.useId>;

// Helper component for testing
const TestCollapse = ({
  defaultExpanded = false,
  transitionDuration = 300,
  arrow = null,
  asChild = false,
}: Partial<CollapseProps & CollapseContentProps & CollapseTriggerProps>) => (
  <CollapseRoot defaultExpanded={defaultExpanded}>
    <CollapseTrigger arrow={arrow} asChild={asChild}>
      {asChild ? <div>Custom Trigger</div> : "Toggle Content"}
    </CollapseTrigger>
    <CollapseContent transitionDuration={transitionDuration}>
      <div>This is the collapsible content</div>
    </CollapseContent>
  </CollapseRoot>
);

describe("Collapse Component", () => {
  beforeEach(() => {
    mockedUseId.mockReturnValue("test-id");
    jest.clearAllMocks();
  });

  describe("CollapseRoot", () => {
    it("renders children correctly", () => {
      render(
        <CollapseRoot>
          <div data-testid="child">Test Child</div>
        </CollapseRoot>
      );

      expect(screen.getByTestId("child")).toBeInTheDocument();
    });

    it("applies custom className", () => {
      render(
        <CollapseRoot className="custom-class">
          <div>Content</div>
        </CollapseRoot>
      );

      const container = screen.getByText("Content").parentElement;
      expect(container).toHaveClass("custom-class");
    });

    it("uses provided id for collapse elements", () => {
      render(
        <CollapseRoot id="custom-collapse">
          <CollapseTrigger>Toggle</CollapseTrigger>
          <CollapseContent>Content</CollapseContent>
        </CollapseRoot>
      );

      const trigger = screen.getByRole("button");
      const content = screen.getByRole("region");

      expect(trigger).toHaveAttribute("id", "custom-collapse-collapse-trigger");
      expect(content).toHaveAttribute("id", "custom-collapse-collapse-content");
    });

    it("generates default id when none provided", () => {
      render(
        <CollapseRoot>
          <CollapseTrigger>Toggle</CollapseTrigger>
          <CollapseContent>Content</CollapseContent>
        </CollapseRoot>
      );

      const trigger = screen.getByRole("button");
      const content = screen.getByRole("region");

      expect(trigger).toHaveAttribute("id", "test-id-collapse-trigger");
      expect(content).toHaveAttribute("id", "test-id-collapse-content");
    });

    it("starts collapsed by default", () => {
      render(<TestCollapse />);

      const trigger = screen.getByRole("button");
      expect(trigger).toHaveAttribute("aria-expanded", "false");
    });

    it("starts expanded when defaultExpanded is true", () => {
      render(<TestCollapse defaultExpanded={true} />);

      const trigger = screen.getByRole("button");
      expect(trigger).toHaveAttribute("aria-expanded", "true");
    });
  });

  describe("CollapseTrigger", () => {
    it("renders button with correct attributes", () => {
      render(<TestCollapse />);

      const trigger = screen.getByRole("button");
      expect(trigger).toHaveAttribute("type", "button");
      expect(trigger).toHaveAttribute("aria-expanded", "false");
      expect(trigger).toHaveAttribute("aria-controls", "test-id-collapse-content");
    });

    it("displays children content", () => {
      render(<TestCollapse />);

      expect(screen.getByText("Toggle Content")).toBeInTheDocument();
    });

    it("shows default chevron icon", () => {
      render(<TestCollapse />);

      const chevron = screen.getByRole("button").querySelector('span[aria-hidden="true"]');
      expect(chevron).toBeInTheDocument();
    });

    it("uses custom arrow when provided", () => {
      const customArrow = <span data-testid="custom-arrow">↓</span>;
      render(<TestCollapse arrow={customArrow} />);

      expect(screen.getByTestId("custom-arrow")).toBeInTheDocument();
    });


    it("toggles expanded state when clicked", async () => {
      const user = userEvent.setup();
      render(<TestCollapse />);

      const trigger = screen.getByRole("button");
      expect(trigger).toHaveAttribute("aria-expanded", "false");

      await user.click(trigger);
      expect(trigger).toHaveAttribute("aria-expanded", "true");

      await user.click(trigger);
      expect(trigger).toHaveAttribute("aria-expanded", "false");
    });

    it("handles keyboard navigation", async () => {
      const user = userEvent.setup();
      render(<TestCollapse />);

      const trigger = screen.getByRole("button");
      trigger.focus();

      await user.keyboard("{Enter}");
      expect(trigger).toHaveAttribute("aria-expanded", "true");

      await user.keyboard(" ");
      expect(trigger).toHaveAttribute("aria-expanded", "false");
    });

    it("applies custom className", () => {
      render(
        <CollapseRoot>
          <CollapseTrigger className="custom-trigger-class">Toggle</CollapseTrigger>
          <CollapseContent>Content</CollapseContent>
        </CollapseRoot>
      );

      const trigger = screen.getByRole("button");
      expect(trigger).toHaveClass("custom-trigger-class");
    });

    it("renders as child component when asChild is true", () => {
      render(
        <CollapseRoot>
          <CollapseTrigger asChild>
            <div data-testid="custom-trigger">Custom Trigger</div>
          </CollapseTrigger>
          <CollapseContent>Content</CollapseContent>
        </CollapseRoot>
      );

      const customTrigger = screen.getByTestId("custom-trigger");
      expect(customTrigger).toBeInTheDocument();
      expect(customTrigger).toHaveAttribute("aria-expanded", "false");
      expect(customTrigger).toHaveAttribute("aria-controls", "test-id-collapse-content");
    });
  });

  describe("CollapseContent", () => {
    it("renders content with correct attributes", () => {
      render(<TestCollapse />);

      const content = screen.getByRole("region");
      expect(content).toHaveAttribute("id", "test-id-collapse-content");
      expect(content).toHaveAttribute("aria-labelledby", "test-id-collapse-trigger");
    });

    it("displays children content", () => {
      render(<TestCollapse />);

      expect(screen.getByText("This is the collapsible content")).toBeInTheDocument();
    });

    it("applies custom className", () => {
      render(
        <CollapseRoot>
          <CollapseTrigger>Toggle</CollapseTrigger>
          <CollapseContent className="custom-content-class">
            <div>Content</div>
          </CollapseContent>
        </CollapseRoot>
      );

      const content = screen.getByRole("region");
      expect(content).toHaveClass("custom-content-class");
    });

    it("sets custom transition duration", () => {
      render(<TestCollapse transitionDuration={500} />);

      const content = screen.getByRole("region");
      expect(content).toHaveStyle("transition-duration: 500ms");
    });

    it("has height 0 when collapsed", () => {
      render(<TestCollapse />);

      const content = screen.getByRole("region");
      expect(content).toHaveStyle("height: 0px");
    });

    it("has auto height when expanded by default", () => {
      render(<TestCollapse defaultExpanded={true} />);

      const content = screen.getByRole("region");
      expect(content).toHaveStyle("height: auto");
    });
  });

  describe("Integration Tests", () => {
    it("maintains proper ARIA relationships", () => {
      render(<TestCollapse />);

      const trigger = screen.getByRole("button");
      const content = screen.getByRole("region");

      const triggerId = trigger.getAttribute("id");
      const contentId = content.getAttribute("id");

      expect(trigger).toHaveAttribute("aria-controls", contentId);
      expect(content).toHaveAttribute("aria-labelledby", triggerId);
    });

    it("synchronizes expanded state between trigger and content", async () => {
      const user = userEvent.setup();
      render(<TestCollapse />);

      const trigger = screen.getByRole("button");
      const content = screen.getByRole("region");

      expect(trigger).toHaveAttribute("aria-expanded", "false");
      expect(content).toHaveStyle("height: 0px");

      await user.click(trigger);
      expect(trigger).toHaveAttribute("aria-expanded", "true");

      await waitFor(
        () => {
          expect(content).toHaveStyle("height: auto");
        },
        { timeout: 400 }
      );
    });

    it("throws error when components used outside CollapseRoot", () => {
      // Suppress console.error for this test
      const consoleSpy = jest.spyOn(console, "error").mockImplementation(() => {});

      expect(() => {
        render(<CollapseTrigger>Toggle</CollapseTrigger>);
      }).toThrow("useCollapse must be used within a Collapse root Component");

      expect(() => {
        render(<CollapseContent>Content</CollapseContent>);
      }).toThrow("useCollapse must be used within a Collapse root Component");

      consoleSpy.mockRestore();
    });
  });

  describe("Compound Component API", () => {
    it("exports Collapse object with sub-components", () => {
      expect(Collapse).toHaveProperty("Root");
      expect(Collapse).toHaveProperty("Content");
      expect(Collapse).toHaveProperty("Trigger");
    });

    it("can be used with compound API", () => {
      render(
        <Collapse.Root defaultExpanded={true}>
          <Collapse.Trigger>Toggle</Collapse.Trigger>
          <Collapse.Content>Content</Collapse.Content>
        </Collapse.Root>
      );

      const trigger = screen.getByRole("button");
      expect(trigger).toHaveAttribute("aria-expanded", "true");
      expect(screen.getByText("Content")).toBeInTheDocument();
    });
  });

  describe("Edge Cases", () => {
    it("handles rapid toggle clicks", async () => {
      const user = userEvent.setup();
      render(<TestCollapse />);

      const trigger = screen.getByRole("button");

      // Rapid clicks
      await user.click(trigger);
      await user.click(trigger);
      await user.click(trigger);

      expect(trigger).toHaveAttribute("aria-expanded", "true");
    })

    it("works with nested interactive elements", async () => {
      const user = userEvent.setup();
      const onButtonClick = jest.fn();

      render(
        <CollapseRoot>
          <CollapseTrigger>Toggle</CollapseTrigger>
          <CollapseContent>
            <button onClick={onButtonClick}>Nested Button</button>
          </CollapseContent>
        </CollapseRoot>
      );

      const trigger = screen.getByText("Toggle");
      await user.click(trigger);

      const nestedButton = screen.getByText("Nested Button");
      await user.click(nestedButton);

      expect(onButtonClick).toHaveBeenCalledTimes(1);
    });
  });
});

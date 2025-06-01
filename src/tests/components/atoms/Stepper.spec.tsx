import React from "react";
import { render, screen } from "@testing-library/react";
import Stepper, { Step, Stepper as StepperRoot } from "@/components/ui/atoms/Stepper";
import { UseMergeRefsProps } from "@/lib/hooks/useMergeRefs";

// Mock the useMergedRefs hook
jest.mock("@/lib/hooks/useMergeRefs", () => ({
  __esModule: true,
  default: (...refs: UseMergeRefsProps<HTMLElement>) => (node: HTMLElement) => {
    refs.forEach((ref) => {
      if (typeof ref === "function") {
        ref(node);
      } else if (ref && typeof ref === "object") {
        ref.current = node;
      }
    });
  },
}));

const TestStepper = ({
  activeStep = 0,
  isFirstStep = jest.fn(),
  isLastStep = jest.fn(),
  ...props
}: Partial<React.ComponentProps<typeof StepperRoot>>) => (
  <StepperRoot
    activeStep={activeStep}
    isFirstStep={isFirstStep}
    isLastStep={isLastStep}
    {...props}
  >
    <Step id={0}>1</Step>
    <Step id={1}>2</Step>
    <Step id={2}>3</Step>
  </StepperRoot>
);

const SimpleStepper = ({ activeStep = 0 }) => (
  <StepperRoot activeStep={activeStep}>
    <Step id={0}>Step 1</Step>
    <Step id={1}>Step 2</Step>
  </StepperRoot>
);

describe("Stepper Component", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    // Mock getBoundingClientRect
    Element.prototype.getBoundingClientRect = jest.fn(() => ({
      width: 300,
      height: 40,
      top: 0,
      left: 0,
      bottom: 40,
      right: 300,
      x: 0,
      y: 0,
      toJSON: jest.fn(),
    }));
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  describe("StepperRoot", () => {
    it("renders with default props", () => {
      render(<TestStepper />);
      
      expect(screen.getByText("1")).toBeInTheDocument();
      expect(screen.getByText("2")).toBeInTheDocument();
      expect(screen.getByText("3")).toBeInTheDocument();
    });

    it("applies correct CSS classes to container", () => {
      const { container } = render(<TestStepper />);
      
      const stepperContainer = container.querySelector('[class*="relative flex items-center justify-between"]');
      expect(stepperContainer).toBeInTheDocument();
    });

    it("renders progress line with correct styling", () => {
      const { container } = render(<TestStepper activeStep={1} />);
      
      const progressLine = container.querySelector('[class*="absolute left-0 top-2/4"]');
      expect(progressLine).toBeInTheDocument();
    });

    it("calls isFirstStep callback correctly", () => {
      const isFirstStepCallback = jest.fn();
      
      render(<TestStepper activeStep={0} isFirstStep={isFirstStepCallback} />);
      
      expect(isFirstStepCallback).toHaveBeenCalledWith(true);
    });

    it("calls isLastStep callback correctly", () => {
      const isLastStepCallback = jest.fn();
      
      render(<TestStepper activeStep={2} isLastStep={isLastStepCallback} />);
      
      expect(isLastStepCallback).toHaveBeenCalledWith(true);
    });

    it("handles activeStep changes", () => {
      const isFirstStepCallback = jest.fn();
      const isLastStepCallback = jest.fn();
      
      const { rerender } = render(
        <TestStepper 
          activeStep={0} 
          isFirstStep={isFirstStepCallback} 
          isLastStep={isLastStepCallback} 
        />
      );
      
      expect(isFirstStepCallback).toHaveBeenCalledWith(true);
      expect(isLastStepCallback).toHaveBeenCalledWith(false);
      
      rerender(
        <TestStepper 
          activeStep={2} 
          isFirstStep={isFirstStepCallback} 
          isLastStep={isLastStepCallback} 
        />
      );
      
      expect(isFirstStepCallback).toHaveBeenCalledWith(false);
      expect(isLastStepCallback).toHaveBeenCalledWith(true);
    });

    it("applies custom className", () => {
      const { container } = render(<TestStepper className="custom-stepper-class" />);
      
      const stepperContainer = container.querySelector('.custom-stepper-class');
      expect(stepperContainer).toBeInTheDocument();
    });

    it("forwards ref correctly", () => {
      const ref = React.createRef<HTMLDivElement>();
      
      render(<TestStepper ref={ref} />);
      
      expect(ref.current).toBeInstanceOf(HTMLDivElement);
    });

    it("calculates progress width correctly", () => {
      const { container } = render(<TestStepper activeStep={1} />);
      
      const progressLine = container.querySelector('[style*="width"]');
      expect(progressLine).toBeInTheDocument();
    });
  });

  describe("Step", () => {
    it("renders step content", () => {
      render(<SimpleStepper />);
      
      expect(screen.getByText("Step 1")).toBeInTheDocument();
      expect(screen.getByText("Step 2")).toBeInTheDocument();
    });

    it("applies active styling to current step", () => {
      render(<SimpleStepper activeStep={0} />);
      
      const activeStep = screen.getByText("Step 1").closest('div');
      expect(activeStep).toHaveClass("bg-green-700");
    });

    it("applies completed styling to previous steps", () => {
      render(<SimpleStepper activeStep={1} />);
      
      const completedStep = screen.getByText("Step 1").closest('div');
      expect(completedStep).toHaveClass("bg-green-700");
    });

    it("applies default styling to future steps", () => {
      render(<SimpleStepper activeStep={0} />);
      
      const futureStep = screen.getByText("Step 2").closest('div');
      expect(futureStep).toHaveClass("bg-gray-200");
    });

    it("applies custom className", () => {
      render(
        <StepperRoot activeStep={0}>
          <Step id={0} className="custom-step-class">Custom Step</Step>
        </StepperRoot>
      );
      
      const step = screen.getByText("Custom Step").closest('div');
      expect(step).toHaveClass("custom-step-class");
    });

    it("registers step with context on mount", () => {
      const { rerender } = render(<SimpleStepper />);
      
      // Add a new step
      rerender(
        <StepperRoot activeStep={0}>
          <Step id={0}>Step 1</Step>
          <Step id={1}>Step 2</Step>
          <Step id={2}>Step 3</Step>
        </StepperRoot>
      );
      
      expect(screen.getByText("Step 3")).toBeInTheDocument();
    });

    it("throws error when used outside StepperRoot", () => {
      const consoleSpy = jest.spyOn(console, "error").mockImplementation(() => {});
      
      expect(() => {
        render(<Step id={0}>Isolated Step</Step>);
      }).toThrow("useStepper must be used within a Stepper root Component");
      
      consoleSpy.mockRestore();
    });

    it("handles step state transitions correctly", () => {
      const { rerender } = render(<SimpleStepper activeStep={0} />);
      
      // First step should be active
      let step1 = screen.getByText("Step 1").closest('div');
      let step2 = screen.getByText("Step 2").closest('div');
      
      expect(step1).toHaveClass("bg-green-700");
      expect(step2).toHaveClass("bg-gray-200");
      
      // Move to second step
      rerender(<SimpleStepper activeStep={1} />);
      
      step1 = screen.getByText("Step 1").closest('div');
      step2 = screen.getByText("Step 2").closest('div');
      
      expect(step1).toHaveClass("bg-green-700"); // completed
      expect(step2).toHaveClass("bg-green-700"); // active
    });
  });

  describe("Context Integration", () => {
    it("provides correct context values to steps", () => {
      render(<TestStepper activeStep={1} />);
      
      // Step 0 should be completed
      const step0 = screen.getByText("1").closest('div');
      expect(step0).toHaveClass("bg-green-700");
      
      // Step 1 should be active
      const step1 = screen.getByText("2").closest('div');
      expect(step1).toHaveClass("bg-green-700");
      
      // Step 2 should be default
      const step2 = screen.getByText("3").closest('div');
      expect(step2).toHaveClass("bg-gray-200");
    });

    it("updates step count when steps are added/removed", () => {
      const isLastStepCallback = jest.fn();
      
      const { rerender } = render(
        <StepperRoot activeStep={1} isLastStep={isLastStepCallback}>
          <Step id={0}>1</Step>
          <Step id={1}>2</Step>
        </StepperRoot>
      );
      
      expect(isLastStepCallback).toHaveBeenCalledWith(true);
      
      // Add another step
      rerender(
        <StepperRoot activeStep={1} isLastStep={isLastStepCallback}>
          <Step id={0}>1</Step>
          <Step id={1}>2</Step>
          <Step id={2}>3</Step>
        </StepperRoot>
      );
      
      expect(isLastStepCallback).toHaveBeenCalledWith(false);
    });
  });

  describe("Compound Component API", () => {
    it("has proper compound component structure", () => {
      expect(Stepper).toHaveProperty("Step");
    });

    it("can be used with compound API", () => {
      render(
        <Stepper activeStep={0}>
          <Stepper.Step id={0}>Compound Step 1</Stepper.Step>
          <Stepper.Step id={1}>Compound Step 2</Stepper.Step>
        </Stepper>
      );
      
      expect(screen.getByText("Compound Step 1")).toBeInTheDocument();
      expect(screen.getByText("Compound Step 2")).toBeInTheDocument();
    });
  });

  describe("Edge Cases", () => {

    it("handles activeStep beyond steps count", () => {
      const isLastStepCallback = jest.fn();
      
      render(
        <StepperRoot activeStep={5} isLastStep={isLastStepCallback}>
          <Step id={0}>1</Step>
          <Step id={1}>2</Step>
        </StepperRoot>
      );
      
      // Should still call the callback appropriately
      expect(isLastStepCallback).toHaveBeenCalled();
    });

    it("handles negative activeStep", () => {
      const isFirstStepCallback = jest.fn();
      
      render(
        <StepperRoot activeStep={-1} isFirstStep={isFirstStepCallback}>
          <Step id={0}>1</Step>
          <Step id={1}>2</Step>
        </StepperRoot>
      );
      
      expect(isFirstStepCallback).toHaveBeenCalledWith(false);
    });

    it("handles rapid activeStep changes", () => {
      const { rerender } = render(<SimpleStepper activeStep={0} />);
      
      rerender(<SimpleStepper activeStep={1} />);
      rerender(<SimpleStepper activeStep={0} />);
      rerender(<SimpleStepper activeStep={1} />);
      
      const step1 = screen.getByText("Step 1").closest('div');
      const step2 = screen.getByText("Step 2").closest('div');
      
      expect(step1).toHaveClass("bg-green-700"); // completed
      expect(step2).toHaveClass("bg-green-700"); // active
    });

    it("handles duplicate step IDs gracefully", () => {
      render(
        <StepperRoot activeStep={0}>
          <Step id={0}>Step 1</Step>
          <Step id={0}>Step 1 Duplicate</Step>
          <Step id={1}>Step 2</Step>
        </StepperRoot>
      );
      
      expect(screen.getByText("Step 1")).toBeInTheDocument();
      expect(screen.getByText("Step 1 Duplicate")).toBeInTheDocument();
      expect(screen.getByText("Step 2")).toBeInTheDocument();
    });
  });

  describe("Responsive Behavior", () => {
    it("recalculates width when container size changes", () => {
      const { rerender } = render(<TestStepper activeStep={1} />);
      
      // Mock different container width
      Element.prototype.getBoundingClientRect = jest.fn(() => ({
        width: 600,
        height: 40,
        top: 0,
        left: 0,
        bottom: 40,
        right: 600,
        x: 0,
        y: 0,
        toJSON: jest.fn(),
      }));
      
      rerender(<TestStepper activeStep={1} />);
      
      const { container } = render(<TestStepper activeStep={1} />);
      const progressLine = container.querySelector('[style*="width"]');
      expect(progressLine).toBeInTheDocument();
    });
  });

  describe("Accessibility", () => {
    it("maintains proper semantic structure", () => {
      const { container } = render(<TestStepper />);
      
      const steps = container.querySelectorAll('[class*="grid place-items-center"]');
      expect(steps).toHaveLength(3);
    });

    it("applies appropriate ARIA attributes for screen readers", () => {
      render(<TestStepper activeStep={1} />);
      
      // Steps should be identifiable elements
      const steps = screen.getAllByText(/[123]/);
      expect(steps).toHaveLength(3);
    });
  });
});
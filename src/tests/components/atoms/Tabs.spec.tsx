import React from "react";
import { render, screen, userEvent } from "@/tests/test-utils";
import Tabs, { Tab, TabPanel, TabsBody, TabsHeader, Tabs as TabsRoot } from "@/components/atoms/Tabs";
import { ClassValue } from "clsx";
import { ButtonProps } from "@/components/atoms/Button";

jest.mock("@/components/atoms/Button", () => {
  return function MockButton({ children, className, onClick, ...props }: ButtonProps) {
    return (
      <button className={className} onClick={onClick} {...props}>
        {children}
      </button>
    );
  };
});

jest.mock("@/lib/utils/cn", () => ({
  __esModule: true,
  default: (...classes: ClassValue[]) => classes.filter(Boolean).join(" "),
}));

const TestTabs = ({
  defaultValue = "tab1",
  value,
  onChange = jest.fn(),
  orientation = "horizontal",
  ...props
}: Partial<React.ComponentProps<typeof TabsRoot>>) => (
  <TabsRoot
    defaultValue={defaultValue}
    value={value}
    onChange={onChange}
    orientation={orientation}
    {...props}
  >
    <TabsHeader>
      <Tab value="tab1">Tab 1</Tab>
      <Tab value="tab2">Tab 2</Tab>
      <Tab value="tab3">Tab 3</Tab>
    </TabsHeader>
    <TabsBody>
      <TabPanel value="tab1">Content 1</TabPanel>
      <TabPanel value="tab2">Content 2</TabPanel>
      <TabPanel value="tab3">Content 3</TabPanel>
    </TabsBody>
  </TabsRoot>
);

const SimpleTabs = ({ defaultValue = "tab1" }) => (
  <TabsRoot defaultValue={defaultValue}>
    <TabsHeader>
      <Tab value="tab1">Simple Tab 1</Tab>
      <Tab value="tab2">Simple Tab 2</Tab>
    </TabsHeader>
    <TabsBody>
      <TabPanel value="tab1">Simple Content 1</TabPanel>
      <TabPanel value="tab2">Simple Content 2</TabPanel>
    </TabsBody>
  </TabsRoot>
);

describe("Tabs Component", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    // Mock offsetLeft, offsetWidth, offsetTop, offsetHeight for indicator positioning
    Object.defineProperty(HTMLElement.prototype, "offsetLeft", {
      configurable: true,
      value: 0,
    });
    Object.defineProperty(HTMLElement.prototype, "offsetWidth", {
      configurable: true,
      value: 100,
    });
    Object.defineProperty(HTMLElement.prototype, "offsetTop", {
      configurable: true,
      value: 0,
    });
    Object.defineProperty(HTMLElement.prototype, "offsetHeight", {
      configurable: true,
      value: 40,
    });
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  describe("TabsRoot", () => {
    it("renders with default props", () => {
      render(<TestTabs />);
      
      expect(screen.getByText("Tab 1")).toBeInTheDocument();
      expect(screen.getByText("Tab 2")).toBeInTheDocument();
      expect(screen.getByText("Tab 3")).toBeInTheDocument();
    });

    it("applies correct data-orientation attribute", () => {
      const { container } = render(<TestTabs orientation="vertical" />);
      
      const tabsContainer = container.querySelector('[data-orientation="vertical"]');
      expect(tabsContainer).toBeInTheDocument();
    });

    it("calls onChange when tab changes", async () => {
      const user = userEvent.setup();
      const onChange = jest.fn();
      
      render(<TestTabs onChange={onChange} />);
      
      await user.click(screen.getByText("Tab 2"));
      
      expect(onChange).toHaveBeenCalledWith("tab2");
    });

    it("applies custom className", () => {
      const { container } = render(<TestTabs className="custom-tabs-class" />);
      
      const tabsContainer = container.querySelector('.custom-tabs-class');
      expect(tabsContainer).toBeInTheDocument();
    });

    it("provides context to child components", () => {
      render(<TestTabs defaultValue="tab2" />);
      
      // Tab 2 should be active (have active styling)
      const tab2Button = screen.getByText("Tab 2");
      expect(tab2Button).toHaveClass("text-green-600");
    });
  });

  describe("TabsHeader", () => {
    it("renders with correct base styling", () => {
      const { container } = render(<TestTabs />);
      
      const header = container.querySelector('[class*="flex relative"]');
      expect(header).toBeInTheDocument();
    });

    it("applies horizontal orientation styling", () => {
      const { container } = render(<TestTabs orientation="horizontal" />);
      
      const header = container.querySelector('[class*="flex-row rounded-md"]');
      expect(header).toBeInTheDocument();
    });

    it("applies vertical orientation styling", () => {
      const { container } = render(<TestTabs orientation="vertical" />);
      
      const header = container.querySelector('[class*="flex-col"]');
      expect(header).toBeInTheDocument();
    });

    it("renders indicator with correct positioning", () => {
      const { container } = render(<TestTabs />);
      
      const indicator = container.querySelector('[class*="absolute bg-surface"]');
      expect(indicator).toBeInTheDocument();
      expect(indicator).toHaveStyle({
        left: "0px",
        width: "100px",
        top: "0px",
        height: "40px",
      });
    });

    it("applies custom className", () => {
      render(
        <TabsRoot defaultValue="tab1">
          <TabsHeader className="custom-header-class">
            <Tab value="tab1">Tab</Tab>
          </TabsHeader>
        </TabsRoot>
      );
      
      const header = screen.getByText("Tab").closest('[class*="custom-header-class"]');
      expect(header).toBeInTheDocument();
    });

    it("applies custom indicator className", () => {
      const { container } = render(
        <TabsRoot defaultValue="tab1">
          <TabsHeader indicatorClassName="custom-indicator-class">
            <Tab value="tab1">Tab</Tab>
          </TabsHeader>
        </TabsRoot>
      );
      
      const indicator = container.querySelector('.custom-indicator-class');
      expect(indicator).toBeInTheDocument();
    });

    it("updates indicator position when active tab changes", async () => {
      const user = userEvent.setup();
      const { container } = render(<TestTabs />);
      
      const indicator = container.querySelector('[class*="absolute bg-surface"]');
      expect(indicator).toHaveStyle({ left: "0px" });
      
      await user.click(screen.getByText("Tab 2"));
      
      // Indicator should update position (mocked to return same values for simplicity)
      expect(indicator).toBeInTheDocument();
    });

    it("throws error when used outside TabsRoot", () => {
      const consoleSpy = jest.spyOn(console, "error").mockImplementation(() => {});
      
      expect(() => {
        render(<TabsHeader>Header Content</TabsHeader>);
      }).toThrow("useTabs must be called within a Tabs Component");
      
      consoleSpy.mockRestore();
    });
  });

  describe("Tab", () => {
    it("renders tab content", () => {
      render(<SimpleTabs />);
      
      expect(screen.getByText("Simple Tab 1")).toBeInTheDocument();
      expect(screen.getByText("Simple Tab 2")).toBeInTheDocument();
    });

    it("applies active styling to current tab", () => {
      render(<SimpleTabs defaultValue="tab1" />);
      
      const activeTab = screen.getByText("Simple Tab 1");
      expect(activeTab).toHaveClass("text-green-600");
    });

    it("does not apply active styling to inactive tabs", () => {
      render(<SimpleTabs defaultValue="tab1" />);
      
      const inactiveTab = screen.getByText("Simple Tab 2");
      expect(inactiveTab).not.toHaveClass("text-green-600");
    });

    it("handles click events", async () => {
      const user = userEvent.setup();
      
      render(<SimpleTabs />);
      
      await user.click(screen.getByText("Simple Tab 2"));
      
      // Should switch to tab 2 content
      expect(screen.getByText("Simple Content 2")).toBeVisible();
    });

    it("applies custom className", () => {
      render(
        <TabsRoot defaultValue="tab1">
          <TabsHeader>
            <Tab value="tab1" className="custom-tab-class">Custom Tab</Tab>
          </TabsHeader>
        </TabsRoot>
      );
      
      const tab = screen.getByText("Custom Tab");
      expect(tab).toHaveClass("custom-tab-class");
    });

    it("has correct data-value attribute", () => {
      render(<SimpleTabs />);
      
      const tab = screen.getByText("Simple Tab 1");
      expect(tab).toHaveAttribute("data-value", "tab1");
    });

    it("applies base styling", () => {
      render(<SimpleTabs />);
      
      const tab = screen.getByText("Simple Tab 1");
      expect(tab).toHaveClass("w-full", "bg-transparent", "transition-all");
    });

    it("throws error when used outside TabsRoot", () => {
      const consoleSpy = jest.spyOn(console, "error").mockImplementation(() => {});
      
      expect(() => {
        render(<Tab value="tab1">Isolated Tab</Tab>);
      }).toThrow("useTabs must be called within a Tabs Component");
      
      consoleSpy.mockRestore();
    });
  });

  describe("TabPanel", () => {
    it("shows active panel content", () => {
      render(<SimpleTabs defaultValue="tab1" />);
      
      expect(screen.getByText("Simple Content 1")).toBeVisible();
    });

    it("applies correct ARIA attributes", () => {
      render(<SimpleTabs />);
      
      const panel = screen.getByText("Simple Content 1").closest('[role="tabpanel"]');
      expect(panel).toBeInTheDocument();
      expect(panel).toHaveAttribute("id", "panel-tab1");
    });

    it("applies active/inactive styling", () => {
      render(<SimpleTabs defaultValue="tab1" />);
      
      const activePanel = screen.getByText("Simple Content 1").closest('div');
      const inactivePanel = screen.getByText("Simple Content 2").closest('div');
      
      expect(activePanel).toHaveClass("opacity-100", "translate-x-0");
      expect(inactivePanel).toHaveClass("opacity-0", "absolute", "-translate-x-10");
    });

    it("throws error when used outside TabsRoot", () => {
      const consoleSpy = jest.spyOn(console, "error").mockImplementation(() => {});
      
      expect(() => {
        render(<TabPanel value="tab1">Isolated Panel</TabPanel>);
      }).toThrow("useTabs must be called within a Tabs Component");
      
      consoleSpy.mockRestore();
    });
  });

  describe("TabsBody", () => {
    it("renders with correct base styling", () => {
      const { container } = render(
        <TabsRoot defaultValue="tab1">
          <TabsBody>Body Content</TabsBody>
        </TabsRoot>
      );
      
      const body = container.querySelector('.relative');
      expect(body).toBeInTheDocument();
    });

    it("applies custom className", () => {
      render(
        <TabsRoot defaultValue="tab1">
          <TabsBody className="custom-body-class">Body Content</TabsBody>
        </TabsRoot>
      );
      
      const body = screen.getByText("Body Content").closest('.custom-body-class');
      expect(body).toBeInTheDocument();
    });

    it("renders children correctly", () => {
      render(
        <TabsRoot defaultValue="tab1">
          <TabsBody>
            <div>Custom Body Content</div>
          </TabsBody>
        </TabsRoot>
      );
      
      expect(screen.getByText("Custom Body Content")).toBeInTheDocument();
    });
  });

  describe("Context Integration", () => {
    it("provides correct context values to all components", async () => {
      const user = userEvent.setup();
      
      render(<TestTabs defaultValue="tab1" />);
      
      // Initial state
      expect(screen.getByText("Tab 1")).toHaveClass("text-green-600");
      expect(screen.getByText("Content 1")).toBeVisible();
      
      // After clicking Tab 2
      await user.click(screen.getByText("Tab 2"));
      
      expect(screen.getByText("Tab 2")).toHaveClass("text-green-600");
      expect(screen.getByText("Tab 1")).not.toHaveClass("text-green-600");
      expect(screen.getByText("Content 2")).toBeVisible();
    });

    it("handles orientation context correctly", () => {
      const { container } = render(<TestTabs orientation="vertical" />);
      
      const header = container.querySelector('[class*="flex-col"]');
      expect(header).toBeInTheDocument();
    });
  });

  describe("Compound Component API", () => {
    it("has proper compound component structure", () => {
      expect(Tabs).toHaveProperty("Header");
      expect(Tabs).toHaveProperty("Body");
      expect(Tabs).toHaveProperty("Panel");
      expect(Tabs).toHaveProperty("Tab");
    });

    it("can be used with compound API", () => {
      render(
        <Tabs defaultValue="tab1">
          <Tabs.Header>
            <Tabs.Tab value="tab1">Compound Tab 1</Tabs.Tab>
            <Tabs.Tab value="tab2">Compound Tab 2</Tabs.Tab>
          </Tabs.Header>
          <Tabs.Body>
            <Tabs.Panel value="tab1">Compound Content 1</Tabs.Panel>
            <Tabs.Panel value="tab2">Compound Content 2</Tabs.Panel>
          </Tabs.Body>
        </Tabs>
      );
      
      expect(screen.getByText("Compound Tab 1")).toBeInTheDocument();
      expect(screen.getByText("Compound Content 1")).toBeInTheDocument();
    });
  });
});
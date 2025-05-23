import Menu from "@/components/atoms/Menu";
import { render, screen, userEvent } from "@/tests/test-utils";

Object.defineProperty(HTMLElement.prototype, "scrollIntoView", {
  value: jest.fn(),
  writable: true,
});

describe("Menu", () => {
  const BasicMenu = () => (
    <Menu>
      <Menu.Trigger>Open Menu</Menu.Trigger>
      <Menu.Dropdown>
        <Menu.Item>Item 1</Menu.Item>
        <Menu.Item>Item 2</Menu.Item>
      </Menu.Dropdown>
    </Menu>
  );

  it("renders trigger button", () => {
    render(<BasicMenu />);
    expect(screen.getByRole("button", { name: /open menu/i })).toBeInTheDocument();
  });

  it("opens menu on trigger click", async () => {
    const user = userEvent.setup();
    render(<BasicMenu />);

    await user.click(screen.getByRole("button"));
    expect(screen.getByRole("menu")).toBeInTheDocument();
    expect(screen.getByText("Item 1")).toBeInTheDocument();
  });

  it("calls onClick when menu item clicked", async () => {
    const handleClick = jest.fn();
    const user = userEvent.setup();

    render(
      <Menu>
        <Menu.Trigger>Open</Menu.Trigger>
        <Menu.Dropdown>
          <Menu.Item onClick={handleClick}>Clickable</Menu.Item>
        </Menu.Dropdown>
      </Menu>
    );

    await user.click(screen.getByText("Open"));
    await user.click(screen.getByText("Clickable"));

    expect(handleClick).toHaveBeenCalled();
  });

  it("disables menu item when disabled prop is true", async () => {
    const handleClick = jest.fn();
    const user = userEvent.setup();

    render(
      <Menu>
        <Menu.Trigger>Open</Menu.Trigger>
        <Menu.Dropdown>
          <Menu.Item disabled onClick={handleClick}>
            Disabled
          </Menu.Item>
        </Menu.Dropdown>
      </Menu>
    );

    await user.click(screen.getByRole("button"));
    await user.click(screen.getByText("Disabled"));

    expect(handleClick).not.toHaveBeenCalled();
  });

  it("renders menu item with icon and shortcut", async () => {
    const user = userEvent.setup();

    render(
      <Menu>
        <Menu.Trigger>Open</Menu.Trigger>
        <Menu.Dropdown>
          <Menu.Item icon={<span>🔥</span>} shortcut="Ctrl+K">
            With Icon
          </Menu.Item>
        </Menu.Dropdown>
      </Menu>
    );

    await user.click(screen.getByRole("button"));
    expect(screen.getByText("🔥")).toBeInTheDocument();
    expect(screen.getByText("Ctrl+K")).toBeInTheDocument();
  });

  it("applies custom placement and width to dropdown", async () => {
    const user = userEvent.setup();

    render(
      <Menu>
        <Menu.Trigger>Open</Menu.Trigger>
        <Menu.Dropdown placement="top" width="sm">
          <Menu.Item>Item</Menu.Item>
        </Menu.Dropdown>
      </Menu>
    );

    await user.click(screen.getByRole("button"));
    const dropdown = screen.getByRole("menu").parentElement;
    expect(dropdown).toHaveClass("bottom-full", "w-40");
  });

  it("supports asChild trigger", async () => {
    const user = userEvent.setup();

    render(
      <Menu>
        <Menu.Trigger asChild>
          <div data-testid="custom-trigger">Custom Trigger</div>
        </Menu.Trigger>
        <Menu.Dropdown>
          <Menu.Item>Item</Menu.Item>
        </Menu.Dropdown>
      </Menu>
    );

    await user.click(screen.getByTestId("custom-trigger"));
    expect(screen.getByRole("menu")).toBeInTheDocument();
  });
});

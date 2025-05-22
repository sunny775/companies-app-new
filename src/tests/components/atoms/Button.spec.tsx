import Button from "@/components/atoms/Button";
import { render, screen, userEvent } from "@/tests/test-utils";

describe("Button Component", () => {
  it("renders with correct text", () => {
    render(<Button>Click me</Button>);
    expect(screen.getByRole("button", { name: /click me/i })).toBeInTheDocument();
  });

  it("handles click events", async () => {
    const user = userEvent.setup();
    const handleClick = jest.fn();

    render(<Button onClick={handleClick}>Click me</Button>);

    await user.click(screen.getByRole("button"));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it("applies variant styles correctly", () => {
    render(<Button variant="outlined">Delete</Button>);
    const button = screen.getByRole("button");
    expect(button).toHaveClass("border");
  });

  it("is disabled when disabled prop is true", () => {
    render(<Button disabled>Click me</Button>);
    expect(screen.getByRole("button")).toBeDisabled();
  });

  it("shows loading icon for loading state", () => {
    render(<Button loading>Loading...</Button>);
    expect(screen.getByText("Loading...").querySelector("svg")).toBeInTheDocument();
  });
});

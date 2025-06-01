import Card, { CardBody, CardFooter, CardHeader, Card as CardRoot } from "@/components/ui/atoms/Card";
import { render, screen } from "@/tests/test-utils";

jest.mock("@/lib/utils/cn", () => ({
  __esModule: true,
  default: jest.fn((...classes) => classes.filter(Boolean).join(" ")),
}));

describe("Card Component", () => {
  describe("Card (Root)", () => {
    it("renders children correctly", () => {
      render(
        <Card.Root data-testid="card-root">
          <div>Test content</div>
        </Card.Root>
      );

      expect(screen.getByTestId("card-root")).toBeInTheDocument();
      expect(screen.getByText("Test content")).toBeInTheDocument();
    });

    it("passes props to root element", () => {
      render(
        <Card.Root data-testid="custom-card" className="custom-class">
          Content
        </Card.Root>
      );

      const cardElement = screen.getByTestId("custom-card");
      expect(cardElement).toHaveClass("custom-class");
    });
  });

  describe("CardHeader", () => {
    it("renders children correctly", () => {
      render(
        <CardHeader>
          <h1>Header Content</h1>
        </CardHeader>
      );

      expect(screen.getByText("Header Content")).toBeInTheDocument();
    });

    it("applies floated variant by default", () => {
      render(<CardHeader data-testid="card-header">Header</CardHeader>);

      const header = screen.getByTestId("card-header");
      expect(header).toHaveClass("-mt-6");
    });

    it("disables floated when floated={false}", () => {
      render(
        <CardHeader floated={false} data-testid="card-header">
          Header
        </CardHeader>
      );

      const header = screen.getByTestId("card-header");
      expect(header).not.toHaveClass("-mt-6");
    });

    it("applies variants correctly", () => {
      render(
        <CardHeader variant="outlined" data-testid="card-header">
          Header
        </CardHeader>
      );

      const header = screen.getByTestId("card-header");
      expect(header).toHaveClass("border", "bg-transparent");
    });

    it("applies success colors correctly", () => {
      render(
        <CardHeader variant="outlined" color="success" data-testid="card-header">
          Header
        </CardHeader>
      );

      const header = screen.getByTestId("card-header");
      expect(header).toHaveClass("border-green-500", "text-green-700");
    });

    it("accepts custom className", () => {
      render(
        <CardHeader className="custom-header-class" data-testid="card-header">
          Header
        </CardHeader>
      );

      const header = screen.getByTestId("card-header");
      expect(header).toHaveClass("custom-header-class");
    });

    it("passes through additional props", () => {
      render(
        <CardHeader data-custom="test-value" data-testid="card-header">
          Header
        </CardHeader>
      );

      const header = screen.getByTestId("card-header");
      expect(header).toHaveAttribute("data-custom", "test-value");
    });
  });

  describe("CardBody", () => {
    it("renders children correctly", () => {
      render(
        <CardBody>
          <p>Body content</p>
        </CardBody>
      );

      expect(screen.getByText("Body content")).toBeInTheDocument();
    });

    it("applies default padding class", () => {
      render(<CardBody data-testid="card-body">Body content</CardBody>);

      const body = screen.getByTestId("card-body");
      expect(body).toHaveClass("p-6");
    });

    it("accepts custom className", () => {
      render(
        <CardBody className="custom-body-class" data-testid="card-body">
          Body content
        </CardBody>
      );

      const body = screen.getByTestId("card-body");
      expect(body).toHaveClass("p-6", "custom-body-class");
    });

    it("passes through additional props", () => {
      render(
        <CardBody data-custom="test-value" data-testid="card-body">
          Body content
        </CardBody>
      );

      const body = screen.getByTestId("card-body");
      expect(body).toHaveAttribute("data-custom", "test-value");
    });

    it("renders as div element", () => {
      render(<CardBody data-testid="card-body">Body content</CardBody>);

      const body = screen.getByTestId("card-body");
      expect(body.tagName).toBe("DIV");
    });
  });

  describe("CardFooter", () => {
    it("renders children correctly", () => {
      render(
        <CardFooter>
          <button>Footer button</button>
        </CardFooter>
      );

      expect(screen.getByText("Footer button")).toBeInTheDocument();
    });

    it("applies default padding class", () => {
      render(<CardFooter data-testid="card-footer">Footer content</CardFooter>);

      const footer = screen.getByTestId("card-footer");
      expect(footer).toHaveClass("p-6");
    });

    it("applies divider styles when divider=true", () => {
      render(
        <CardFooter divider data-testid="card-footer">
          Footer content
        </CardFooter>
      );

      const footer = screen.getByTestId("card-footer");
      expect(footer).toHaveClass("border-t", "border-gray-600/20");
    });

    it("does not apply divider styles when divider=false", () => {
      render(
        <CardFooter divider={false} data-testid="card-footer">
          Footer content
        </CardFooter>
      );

      const footer = screen.getByTestId("card-footer");
      expect(footer).not.toHaveClass("border-t", "border-gray-600/20");
    });

    it("accepts custom className", () => {
      render(
        <CardFooter className="custom-footer-class" data-testid="card-footer">
          Footer content
        </CardFooter>
      );

      const footer = screen.getByTestId("card-footer");
      expect(footer).toHaveClass("p-6", "custom-footer-class");
    });

    it("passes through additional props", () => {
      render(
        <CardFooter data-custom="test-value" data-testid="card-footer">
          Footer content
        </CardFooter>
      );

      const footer = screen.getByTestId("card-footer");
      expect(footer).toHaveAttribute("data-custom", "test-value");
    });

    it("renders as div element", () => {
      render(<CardFooter data-testid="card-footer">Footer content</CardFooter>);

      const footer = screen.getByTestId("card-footer");
      expect(footer.tagName).toBe("DIV");
    });
  });

  describe("Card Integration", () => {
    it("renders complete card with all components", () => {
      render(
        <Card.Root data-testid="complete-card">
          <Card.Header>Card Title</Card.Header>
          <Card.Body>Card body content</Card.Body>
          <Card.Footer divider>Footer content</Card.Footer>
        </Card.Root>
      );

      expect(screen.getByTestId("complete-card")).toBeInTheDocument();
      expect(screen.getByText("Card Title")).toBeInTheDocument();
      expect(screen.getByText("Card body content")).toBeInTheDocument();
      expect(screen.getByText("Footer content")).toBeInTheDocument();
    });

    it("works with named exports", () => {
      render(
        <CardRoot>
          <CardHeader>Header</CardHeader>
          <CardBody>Body</CardBody>
          <CardFooter>Footer</CardFooter>
        </CardRoot>
      );

      expect(screen.getByText("Header")).toBeInTheDocument();
      expect(screen.getByText("Body")).toBeInTheDocument();
      expect(screen.getByText("Footer")).toBeInTheDocument();
    });
  });
});

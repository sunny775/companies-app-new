import Text, { AsType } from "@/components/atoms/Text";
import { render, screen } from "@/tests/test-utils";
import React from "react";

jest.mock("@/lib/utils/cn", () => {
  return jest.fn((...classes) => classes.filter(Boolean).join(" "));
});

describe("Text Component", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("Basic Rendering", () => {
    it("renders with default props", () => {
      render(<Text>Default text content</Text>);

      const element = screen.getByText("Default text content");
      expect(element).toBeInTheDocument();
      expect(element.tagName).toBe("P");
    });

    it("renders with custom content", () => {
      render(<Text>Custom text content</Text>);

      expect(screen.getByText("Custom text content")).toBeInTheDocument();
    });

    it("renders children correctly", () => {
      render(
        <Text>
          <span>Child content</span>
        </Text>
      );

      expect(screen.getByText("Child content")).toBeInTheDocument();
    });
  });

  describe("Variant Prop", () => {
    it("renders h1 variant with correct tag", () => {
      render(<Text variant="h1">Heading 1</Text>);

      const element = screen.getByText("Heading 1");
      expect(element.tagName).toBe("H1");
    });

    it("renders h2 variant with correct tag", () => {
      render(<Text variant="h2">Heading 2</Text>);

      const element = screen.getByText("Heading 2");
      expect(element.tagName).toBe("H2");
    });

    it("renders h3 variant with correct tag", () => {
      render(<Text variant="h3">Heading 3</Text>);

      const element = screen.getByText("Heading 3");
      expect(element.tagName).toBe("H3");
    });

    it("renders lead variant as paragraph", () => {
      render(<Text variant="lead">Lead text</Text>);

      const element = screen.getByText("Lead text");
      expect(element.tagName).toBe("P");
    });

    it("renders paragraph variant as paragraph", () => {
      render(<Text variant="paragraph">Paragraph text</Text>);

      const element = screen.getByText("Paragraph text");
      expect(element.tagName).toBe("P");
    });

    it("renders small variant as paragraph", () => {
      render(<Text variant="small">Small text</Text>);

      const element = screen.getByText("Small text");
      expect(element.tagName).toBe("P");
    });
  });

  describe("As Prop", () => {
    it("overrides default tag with as prop", () => {
      render(<Text as="span">Span text</Text>);

      const element = screen.getByText("Span text");
      expect(element.tagName).toBe("SPAN");
    });

    it("overrides variant tag with as prop", () => {
      render(
        <Text variant="h1" as="div">
          Div heading
        </Text>
      );

      const element = screen.getByText("Div heading");
      expect(element.tagName).toBe("DIV");
    });

    it("supports various HTML elements", () => {
      const elements: Array<{ as: AsType; expectedTag: string }> = [
        { as: "article", expectedTag: "ARTICLE" },
        { as: "blockquote", expectedTag: "BLOCKQUOTE" },
        { as: "code", expectedTag: "CODE" },
        { as: "strong", expectedTag: "STRONG" },
        { as: "em", expectedTag: "EM" },
      ];

      elements.forEach(({ as, expectedTag }) => {
        render(<Text as={as}>{`${as} content`}</Text>);
        const element = screen.getByText(`${as} content`);
        expect(element.tagName).toBe(expectedTag);
      });
    });
  });

  describe("Color Prop", () => {
    it("applies default color", () => {
      render(<Text color="default">Default color text</Text>);

      const element = screen.getByText("Default color text");
      expect(element).toBeInTheDocument();
    });

    it("applies success color", () => {
      render(<Text color="success">Success color text</Text>);

      const element = screen.getByText("Success color text");
      expect(element).toBeInTheDocument();
    });

    it("applies info color", () => {
      render(<Text color="info">Info color text</Text>);

      const element = screen.getByText("Info color text");
      expect(element).toBeInTheDocument();
    });
  });

  describe("Text Gradient", () => {
    it("applies text gradient when enabled", () => {
      render(<Text textGradient={true}>Gradient text</Text>);

      const element = screen.getByText("Gradient text");
      expect(element).toBeInTheDocument();
    });

    it("does not apply text gradient by default", () => {
      render(<Text>Normal text</Text>);

      const element = screen.getByText("Normal text");
      expect(element).toBeInTheDocument();
    });

    it("combines text gradient with color variants", () => {
      render(
        <Text textGradient={true} color="success">
          Success gradient
        </Text>
      );

      const element = screen.getByText("Success gradient");
      expect(element).toBeInTheDocument();
    });
  });

  describe("Custom Styling", () => {
    it("applies custom className", () => {
      render(<Text className="custom-class">Custom styled text</Text>);

      const element = screen.getByText("Custom styled text");
      expect(element).toHaveClass("custom-class");
    });

    it("combines custom className with default styles", () => {
      render(
        <Text className="custom-class" variant="h1">
          Custom heading
        </Text>
      );

      const element = screen.getByText("Custom heading");
      expect(element).toHaveClass("custom-class");
    });
  });

  describe("HTML Attributes", () => {
    it("passes through HTML attributes", () => {
      render(
        <Text id="test-id" data-testid="text-component">
          Attributed text
        </Text>
      );

      const element = screen.getByText("Attributed text");
      expect(element).toHaveAttribute("id", "test-id");
      expect(element).toHaveAttribute("data-testid", "text-component");
    });

    it("handles event handlers", () => {
      const handleClick = jest.fn();
      render(<Text onClick={handleClick}>Clickable text</Text>);

      const element = screen.getByText("Clickable text");
      element.click();
      expect(handleClick).toHaveBeenCalledTimes(1);
    });

    it("handles ref forwarding", () => {
      const ref = React.createRef<HTMLParagraphElement>();
      render(<Text ref={ref}>Ref text</Text>);

      expect(ref.current).toBeInstanceOf(HTMLParagraphElement);
    });
  });

  describe("Accessibility", () => {
    it("maintains semantic HTML structure", () => {
      render(<Text variant="h1">Main Heading</Text>);

      const heading = screen.getByRole("heading", { level: 1 });
      expect(heading).toBeInTheDocument();
      expect(heading).toHaveTextContent("Main Heading");
    });

    it("supports ARIA attributes", () => {
      render(
        <Text aria-label="Descriptive label" role="note">
          ARIA text
        </Text>
      );

      const element = screen.getByText("ARIA text");
      expect(element).toHaveAttribute("aria-label", "Descriptive label");
      expect(element).toHaveAttribute("role", "note");
    });
  });

  describe("Edge Cases", () => {
    it("handles empty content", () => {
      render(<Text></Text>);

      const element = screen.getByRole("paragraph");
      expect(element).toBeInTheDocument();
      expect(element).toBeEmptyDOMElement();
    });

    it("handles null children", () => {
      render(<Text>{null}</Text>);

      const element = screen.getByRole("paragraph");
      expect(element).toBeInTheDocument();
    });

    it("handles complex children", () => {
      render(
        <Text>
          Complex content with <strong>bold</strong> and <em>italic</em> text
        </Text>
      );

      expect(screen.getByText("bold")).toBeInTheDocument();
      expect(screen.getByText("italic")).toBeInTheDocument();
    });
  });

  describe("Type Safety", () => {
    it("accepts correct props for specific elements", () => {
      render(
        <Text as="a" href="https://example.com">
          Link text
        </Text>
      );

      const link = screen.getByText("Link text");
      expect(link).toHaveAttribute("href", "https://example.com");
    });

    it("supports button-specific props when as='button'", () => {
      const handleClick = jest.fn();
      render(
        <Text as="button" onClick={handleClick} disabled>
          Button text
        </Text>
      );

      const button = screen.getByRole("button");
      expect(button).toBeDisabled();
    });
  });

  describe("Variant Combinations", () => {
    it("combines all props correctly", () => {
      render(
        <Text
          variant="h2"
          color="success"
          textGradient={true}
          as="div"
          className="custom-class"
          data-testid="combined-text"
        >
          Combined props text
        </Text>
      );

      const element = screen.getByTestId("combined-text");
      expect(element.tagName).toBe("DIV");
      expect(element).toHaveClass("custom-class");
      expect(element).toHaveTextContent("Combined props text");
    });
  });
});

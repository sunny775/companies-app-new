import { render, screen, userEvent } from '@/tests/test-utils';
import { Input } from '@/components/ui/atoms/Input';

describe('Input Component', () => {

  it('applies custom className to input', () => {
    render(<Input className="custom-class" />);
    const input = screen.getByRole('textbox');
    expect(input).toHaveClass('custom-class');
  });

  it('applies containerProps className to container', () => {
    render(<Input containerProps={{ className: 'container-class' }} />);
    const container = screen.getByRole('textbox').parentElement;
    expect(container).toHaveClass('container-class');
  });

  it('forwards standard input props', () => {
    render(
      <Input 
        placeholder="Enter text"
        value="test value"
        onChange={() => {}}
        id="test-input"
        name="testName"
        type="email"
      />
    );
    
    const input = screen.getByRole('textbox');
    expect(input).toHaveAttribute('placeholder', 'Enter text');
    expect(input).toHaveValue('test value');
    expect(input).toHaveAttribute('id', 'test-input');
    expect(input).toHaveAttribute('name', 'testName');
    expect(input).toHaveAttribute('type', 'email');
  });

  it('handles user input correctly', async () => {
    const handleChange = jest.fn();
    const user = userEvent.setup();
    
    render(<Input onChange={handleChange} />);
    const input = screen.getByRole('textbox');
    
    await user.type(input, 'hello');
    expect(handleChange).toHaveBeenCalledTimes(5);
  });

  describe('Icons', () => {
    it('renders left icon when provided', () => {
      render(<Input iconLeft={<span data-testid="left-icon">🔍</span>} />);
      expect(screen.getByTestId('left-icon')).toBeInTheDocument();
      expect(screen.getByTestId('left-icon').parentElement).toHaveClass('left-2');
    });

    it('renders right icon when provided', () => {
      render(<Input iconRight={<span data-testid="right-icon">✓</span>} />);
      expect(screen.getByTestId('right-icon')).toBeInTheDocument();
      expect(screen.getByTestId('right-icon').parentElement).toHaveClass('right-2');
    });

    it('renders both icons when provided', () => {
      render(
        <Input 
          iconLeft={<span data-testid="left-icon">🔍</span>}
          iconRight={<span data-testid="right-icon">✓</span>}
        />
      );
      expect(screen.getByTestId('left-icon')).toBeInTheDocument();
      expect(screen.getByTestId('right-icon')).toBeInTheDocument();
    });

    it('does not render icon containers when no icons provided', () => {
      render(<Input data-testid="input-container" />);
      const container = screen.getByTestId('input-container').parentElement;
      const iconElements = container?.querySelectorAll('[class*="absolute"]');
      expect(iconElements).toHaveLength(0);
    });
  });

  describe('States', () => {
    it('applies error state styling', () => {
      render(<Input error />);
      const input = screen.getByRole('textbox');
      expect(input).toHaveClass('border-red-600/20', 'focus:border-red-500/40');
    });

    it('applies success state styling', () => {
      render(<Input success />);
      const input = screen.getByRole('textbox');
      expect(input).toHaveClass('border-green-600/20', 'focus:border-green-500/40');
    });

    it('prioritizes success over error when both are true', () => {
      render(<Input success error />);
      const input = screen.getByRole('textbox');
      expect(input).toHaveClass('border-green-600/20', 'focus:border-green-500/40');
      expect(input).not.toHaveClass('border-red-600/20', 'focus:border-red-500/40');
    });

    it('applies disabled state', () => {
      render(<Input disabled />);
      const input = screen.getByRole('textbox');
      expect(input).toBeDisabled();
      expect(input).toHaveClass('opacity-80');
    });
  });

  describe('Sizes', () => {
    it('applies size when specified', () => {
      render(<Input />);
      const input = screen.getByRole('textbox');
      expect(input).toHaveClass('px-3', 'py-2.5', 'rounded-[7px]');
    });
  });

  describe('Colors', () => {
    it('applies default color by default', () => {
      render(<Input />);
      const input = screen.getByRole('textbox');
      expect(input).toHaveClass('border-gray-600/20', 'focus:border-green-500/40');
    });

    it('applies custom color variant', () => {
      render(<Input color="error" />);
      const input = screen.getByRole('textbox');
      expect(input).toHaveClass('border-red-600/20', 'focus:border-red-500/40');
    });
  });

  describe('Accessibility', () => {
    it('connects label with input via id', () => {
      render(
        <div>
          <label htmlFor="test-input">Test Label</label>
          <Input id="test-input" />
        </div>
      );
      
      const input = screen.getByLabelText('Test Label');
      expect(input).toBeInTheDocument();
    });

    it('supports aria-describedby for error messages', () => {
      render(
        <div>
          <Input aria-describedby="error-msg" error />
          <div id="error-msg">This field is required</div>
        </div>
      );
      
      const input = screen.getByRole('textbox');
      expect(input).toHaveAttribute('aria-describedby', 'error-msg');
    });

    it('maintains keyboard navigation', async () => {
      const user = userEvent.setup();
      render(
        <div>
          <Input data-testid="input1" />
          <Input data-testid="input2" />
        </div>
      );
      
      const input1 = screen.getByTestId('input1');
      const input2 = screen.getByTestId('input2');
      
      input1.focus();
      expect(input1).toHaveFocus();
      
      await user.tab();
      expect(input2).toHaveFocus();
    });
  });

  describe('Edge Cases', () => {
    it('handles null/undefined icons gracefully', () => {
      render(<Input iconLeft={null} iconRight={undefined} />);
      const input = screen.getByRole('textbox');
      expect(input).toBeInTheDocument();
      expect(input).not.toHaveClass('pl-8', 'pr-8');
    });

    it('handles empty string values', () => {
      render(<Input value="" onChange={() => {}} />);
      const input = screen.getByRole('textbox');
      expect(input).toHaveValue('');
    });

    it('handles boolean icons correctly', () => {
      render(<Input iconLeft={false} iconRight={true && <span data-testid="right">✓</span>} />);
      expect(screen.queryByTestId('left')).not.toBeInTheDocument();
      expect(screen.getByTestId('right')).toBeInTheDocument();
    });
  });
});
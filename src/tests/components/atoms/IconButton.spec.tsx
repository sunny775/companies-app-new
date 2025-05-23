import React from 'react';
import { render, screen, fireEvent } from '@/tests/test-utils';
import IconButton, { IconButtonProps } from '@/components/atoms/IconButton';

const TestIcon = () => <svg data-testid="test-icon">Icon</svg>;

describe('IconButton', () => {
  const defaultProps: Partial<IconButtonProps> = {
    children: <TestIcon />,
  };

  it('renders button with icon', () => {
    render(<IconButton {...defaultProps} />);
    
    const button = screen.getByRole('button');
    const icon = screen.getByTestId('test-icon');
    
    expect(button).toBeInTheDocument();
    expect(icon).toBeInTheDocument();
  });

  it('applies default variant and size classes', () => {
    render(<IconButton {...defaultProps} />);
    
    const button = screen.getByRole('button');
    
    expect(button).toHaveClass('bg-gray-100', 'text-gray-500', 'size-10', 'text-xs');
  });


  describe('Variants', () => {
    it('applies default variant classes', () => {
      render(<IconButton {...defaultProps} variant="default" />);
      
      const button = screen.getByRole('button');
      expect(button).toHaveClass('bg-gray-100', 'text-gray-500');
    });

    it('applies success variant classes', () => {
      render(<IconButton {...defaultProps} variant="success" />);
      
      const button = screen.getByRole('button');
      expect(button).toHaveClass('bg-green-600/10', 'text-green-700');
    });

    it('applies error variant classes', () => {
      render(<IconButton {...defaultProps} variant="error" />);
      
      const button = screen.getByRole('button');
      expect(button).toHaveClass('bg-red-600/10', 'text-red-700');
    });

    it('applies info variant classes', () => {
      render(<IconButton {...defaultProps} variant="info" />);
      
      const button = screen.getByRole('button');
      expect(button).toHaveClass('bg-blue-600/10', 'text-blue-700');
    });

    it('applies gray variant classes', () => {
      render(<IconButton {...defaultProps} variant="gray" />);
      
      const button = screen.getByRole('button');
      expect(button).toHaveClass('bg-gray-600/10', 'text-gray-700');
    });
  });

  describe('Sizes', () => {
    it('applies small size classes', () => {
      render(<IconButton {...defaultProps} size="sm" />);
      
      const button = screen.getByRole('button');
      expect(button).toHaveClass('size-8', 'text-xs');
    });

    it('applies medium size classes', () => {
      render(<IconButton {...defaultProps} size="md" />);
      
      const button = screen.getByRole('button');
      expect(button).toHaveClass('size-10', 'text-xs');
    });

    it('applies large size classes', () => {
      render(<IconButton {...defaultProps} size="lg" />);
      
      const button = screen.getByRole('button');
      expect(button).toHaveClass('size-12', 'text-sm');
    });
  });

  describe('Props forwarding', () => {
    it('forwards standard button props', () => {
      const handleClick = jest.fn();
      render(
        <IconButton 
          {...defaultProps} 
          onClick={handleClick}
          disabled={true}
          aria-label="Test button"
          data-testid="icon-button"
        />
      );
      
      const button = screen.getByRole('button');
      
      expect(button).toBeDisabled();
      expect(button).toHaveAttribute('aria-label', 'Test button');
      expect(button).toHaveAttribute('data-testid', 'icon-button');
    });

    it('handles click events', () => {
      const handleClick = jest.fn();
      render(<IconButton {...defaultProps} onClick={handleClick} />);
      
      const button = screen.getByRole('button');
      fireEvent.click(button);
      
      expect(handleClick).toHaveBeenCalledTimes(1);
    });

    it('sets default type to "button"', () => {
      render(<IconButton {...defaultProps} />);
      
      const button = screen.getByRole('button');
      expect(button).toHaveAttribute('type', 'button');
    });
  });

  describe('Disabled state', () => {
    it('applies disabled classes when disabled', () => {
      render(<IconButton {...defaultProps} disabled />);
      
      const button = screen.getByRole('button');
      expect(button).toBeDisabled();
      expect(button).toHaveClass('disabled:opacity-50', 'disabled:pointer-events-none');
    });

    it('does not trigger click when disabled', () => {
      const handleClick = jest.fn();
      render(<IconButton {...defaultProps} disabled onClick={handleClick} />);
      
      const button = screen.getByRole('button');
      fireEvent.click(button);
      
      expect(handleClick).not.toHaveBeenCalled();
    });
  });

  describe('Children rendering', () => {
    it('renders text children', () => {
      render(<IconButton>+</IconButton>);
      
      expect(screen.getByText('+')).toBeInTheDocument();
    });

    it('renders complex icon components', () => {
      const ComplexIcon = () => (
        <svg data-testid="complex-icon" viewBox="0 0 24 24">
          <path d="M12 2L2 7v10c0 5.55 3.84 10 9 10s9-4.45 9-10V7l-10-5z" />
        </svg>
      );
      
      render(<IconButton><ComplexIcon /></IconButton>);
      
      expect(screen.getByTestId('complex-icon')).toBeInTheDocument();
    });
  });

  describe('Accessibility', () => {
    it('is focusable by default', () => {
      render(<IconButton {...defaultProps} />);
      
      const button = screen.getByRole('button');
      button.focus();
      
      expect(button).toHaveFocus();
    });

    it('supports aria-label for accessibility', () => {
      render(<IconButton {...defaultProps} aria-label="Close dialog" />);
      
      const button = screen.getByRole('button');
      expect(button).toHaveAttribute('aria-label', 'Close dialog');
    });

    it('supports aria-pressed for toggle buttons', () => {
      render(<IconButton {...defaultProps} aria-pressed="true" />);
      
      const button = screen.getByRole('button');
      expect(button).toHaveAttribute('aria-pressed', 'true');
    });

    it('is not focusable when disabled', () => {
      render(<IconButton {...defaultProps} disabled />);
      
      const button = screen.getByRole('button');
      expect(button).toBeDisabled();
    });
  });


  describe('Event handling', () => {
    it('handles mouse events', () => {
      const handleMouseEnter = jest.fn();
      const handleMouseLeave = jest.fn();
      
      render(
        <IconButton 
          {...defaultProps} 
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        />
      );
      
      const button = screen.getByRole('button');
      
      fireEvent.mouseEnter(button);
      expect(handleMouseEnter).toHaveBeenCalledTimes(1);
      
      fireEvent.mouseLeave(button);
      expect(handleMouseLeave).toHaveBeenCalledTimes(1);
    });

    it('handles focus events', () => {
      const handleFocus = jest.fn();
      const handleBlur = jest.fn();
      
      render(
        <IconButton 
          {...defaultProps} 
          onFocus={handleFocus}
          onBlur={handleBlur}
        />
      );
      
      const button = screen.getByRole('button');
      
      fireEvent.focus(button);
      expect(handleFocus).toHaveBeenCalledTimes(1);
      
      fireEvent.blur(button);
      expect(handleBlur).toHaveBeenCalledTimes(1);
    });
  });
});
import { render, screen } from '@testing-library/react';
import Spinner from '@/components/ui/atoms/loaders/Spinner';

describe('Spinner', () => {
  it('renders svg with default classes', () => {
    render(<Spinner data-testid="spinner" />);
    const spinner = screen.getByTestId('spinner');
    expect(spinner).toHaveClass('w-4', 'h-4', 'fill-gray-600', 'dark:fill-white/50');
  });

  it('applies custom className', () => {
    render(<Spinner className="w-8 h-8" data-testid="spinner" />);
    const spinner = screen.getByTestId('spinner');
    expect(spinner).toHaveClass('w-8', 'h-8');
  });

  it('forwards svg props', () => {
    render(<Spinner aria-label="Loading" role="status" />);
    const spinner = screen.getByRole('status');
    expect(spinner).toHaveAttribute('aria-label', 'Loading');
  });

  it('contains animation element', () => {
    render(<Spinner data-testid="spinner" />);
    const spinner = screen.getByTestId('spinner');
    const animation = spinner.querySelector('animateTransform');
    expect(animation).toBeInTheDocument();
    expect(animation).toHaveAttribute('repeatCount', 'indefinite');
  });
});
import { render, screen } from '@/tests/test-utils';
import Label from '@/components/atoms/Label';

describe('Label', () => {
  it('renders with default styles', () => {
    render(<Label>Test Label</Label>);
    const label = screen.getByText('Test Label');
    expect(label).toHaveClass('text-sm', 'font-light');
  });

  it('applies error styling', () => {
    render(<Label error>Error Label</Label>);
    const label = screen.getByText('Error Label');
    expect(label).toHaveClass('text-amber-600');
  });

  it('applies screen reader only styling', () => {
    render(<Label srOnly>SR Only Label</Label>);
    const label = screen.getByText('SR Only Label');
    expect(label).toHaveClass('sr-only');
  });

  it('forwards htmlFor attribute', () => {
    render(<Label htmlFor="test-input">Input Label</Label>);
    const label = screen.getByText('Input Label');
    expect(label).toHaveAttribute('for', 'test-input');
  });

  it('forwards other props', () => {
    render(<Label id="test-label" data-testid="label">Test</Label>);
    const label = screen.getByTestId('label');
    expect(label).toHaveAttribute('id', 'test-label');
  });

  it('applies custom className', () => {
    render(<Label className="custom-class">Test</Label>);
    const label = screen.getByText('Test');
    expect(label).toHaveClass('custom-class');
  });
});
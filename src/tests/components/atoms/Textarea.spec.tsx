import { render, screen, userEvent } from '@/tests/test-utils';
import { Textarea } from '@/components/atoms/Textarea';

describe('Textarea Component', () => {
  
  describe('Textarea behavior', () => {
    it('renders as textarea element', () => {
      render(<Textarea />);
      const textarea = screen.getByRole('textbox');
      expect(textarea.tagName).toBe('TEXTAREA');
    });

    it('sets default rows attribute', () => {
      render(<Textarea />);
      const textarea = screen.getByRole('textbox');
      expect(textarea).toHaveAttribute('rows', '5');
    });

    it('allows custom rows attribute', () => {
      render(<Textarea rows={10} />);
      const textarea = screen.getByRole('textbox');
      expect(textarea).toHaveAttribute('rows', '10');
    });

    it('handles multiline text input', async () => {
      const handleChange = jest.fn();
      const user = userEvent.setup();
      
      render(<Textarea onChange={handleChange} />);
      const textarea = screen.getByRole('textbox');
      
      const multilineText = 'First line\nSecond line\nThird line';
      await user.type(textarea, multilineText);
      
      expect(textarea).toHaveValue(multilineText);
      expect(handleChange).toHaveBeenCalled();
    });

    it('supports textarea-specific props', () => {
      render(
        <Textarea 
          cols={50}
          wrap="soft"
          maxLength={500}
          placeholder="Enter multiple lines..."
        />
      );
      
      const textarea = screen.getByRole('textbox');
      expect(textarea).toHaveAttribute('cols', '50');
      expect(textarea).toHaveAttribute('wrap', 'soft');
      expect(textarea).toHaveAttribute('maxlength', '500');
      expect(textarea).toHaveAttribute('placeholder', 'Enter multiple lines...');
    });

    it('handles resize behavior', () => {
      render(<Textarea style={{ resize: 'vertical' }} />);
      const textarea = screen.getByRole('textbox');
      expect(textarea).toHaveStyle('resize: vertical');
    });
  });

  describe('State variations', () => {
    it('applies error state styling', () => {
      render(<Textarea error />);
      const textarea = screen.getByRole('textbox');
      expect(textarea).toHaveClass('border-red-600/20', 'focus:border-red-500/40');
    });

    it('applies success state styling', () => {
      render(<Textarea success />);
      const textarea = screen.getByRole('textbox');
      expect(textarea).toHaveClass('border-green-600/20', 'focus:border-green-500/40');
    });

    it('applies disabled state', () => {
      render(<Textarea disabled />);
      const textarea = screen.getByRole('textbox');
      expect(textarea).toBeDisabled();
      expect(textarea).toHaveClass('opacity-80');
    });
  });

  describe('Container behavior', () => {
    it('applies containerProps className to container', () => {
      render(<Textarea containerProps={{ className: 'container-class' }} />);
      const container = screen.getByRole('textbox').parentElement;
      expect(container).toHaveClass('container-class');
    });
  });

  describe('Accessibility', () => {
    it('connects label with textarea via id', () => {
      render(
        <div>
          <label htmlFor="test-textarea">Description</label>
          <Textarea id="test-textarea" />
        </div>
      );
      
      const textarea = screen.getByLabelText('Description');
      expect(textarea).toBeInTheDocument();
    });

    it('supports aria-describedby for validation messages', () => {
      render(
        <div>
          <Textarea aria-describedby="help-text" />
          <div id="help-text">Please provide detailed information</div>
        </div>
      );
      
      const textarea = screen.getByRole('textbox');
      expect(textarea).toHaveAttribute('aria-describedby', 'help-text');
    });
  });
});
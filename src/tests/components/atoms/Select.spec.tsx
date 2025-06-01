import Select, {
  SelectDropdown,
  SelectInput,
  SelectList,
  SelectListItem,
  SelectRoot,
  SelectRootProps,
  SelectTrigger,
} from "@/components/ui/atoms/Select";
import { render, screen, userEvent } from "@/tests/test-utils";
import React from "react";
import { ClassValue } from "tailwind-variants";

jest.mock('@/lib/hooks/useScrollLock', () => ({
  __esModule: true,
  default: () => ({
    lockScroll: jest.fn(),
    unlockScroll: jest.fn(),
  }),
}));

jest.mock('@/lib/utils/cn', () => ({
  __esModule: true,
  default: (...classes: ClassValue[]) => classes.filter(Boolean).join(' '),
}));

jest.mock('react', () => ({
  ...jest.requireActual('react'),
  useId: jest.fn(),
}));

const mockedUseId = React.useId as jest.MockedFunction<typeof React.useId>;

const TestSelect = ({
  filteredOptions = ['Option 1', 'Option 2', 'Option 3'],
  searchQuery = '',
  setSearchQuery = jest.fn(),
  onChange = jest.fn(),
  showLabel = true,
  label = 'Test Select',
  disabled = false,
  required = false,
  lockstroll = false,
  defaultValue = undefined,
  value = undefined,
  ...props
}: Partial<SelectRootProps>) => (
  <Select
    filteredOptions={filteredOptions}
    searchQuery={searchQuery}
    setSearchQuery={setSearchQuery}
    onChange={onChange}
    showLabel={showLabel}
    label={label}
    disabled={disabled}
    required={required}
    lockstroll={lockstroll}
    defaultValue={defaultValue}
    value={value}
    {...props}
  >
    <Select.Trigger>Choose option</Select.Trigger>
    <Select.Dropdown>
      <Select.Input placeholder="Search..." />
      <Select.List>
        {filteredOptions.map((option) => (
          <Select.Item key={option} value={option}>
            {option}
          </Select.Item>
        ))}
      </Select.List>
    </Select.Dropdown>
  </Select>
);

describe('Select Component', () => {
  beforeEach(() => {
    mockedUseId.mockReturnValue('test-id');
    jest.clearAllMocks();
    document.removeEventListener = jest.fn();
    document.addEventListener = jest.fn();
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  describe('SelectRoot', () => {
    it('does not render dropdown when closed', () => {
      render(<TestSelect />);
      expect(screen.queryByRole('listbox')).not.toBeInTheDocument();
    });

    it('renders dropdown when opened', async () => {
      const user = userEvent.setup();
      render(<TestSelect />);
      
      await user.click(screen.getByRole('button'));
      expect(screen.getByRole('listbox')).toBeInTheDocument();
    });

    it('applies correct ARIA attributes', async () => {
      const user = userEvent.setup();
      render(<TestSelect />);

      const trigger = screen.getByRole('button');
      expect(trigger).toHaveAttribute('aria-haspopup', 'listbox');
      expect(trigger).toHaveAttribute('aria-expanded', 'false');
      expect(trigger).toHaveAttribute('id', 'test-id');

      await user.click(trigger);
      
      expect(trigger).toHaveAttribute('aria-expanded', 'true');
      expect(trigger).toHaveAttribute('aria-controls', 'test-id-listbox');
      
      const listbox = screen.getByRole('listbox');
      expect(listbox).toHaveAttribute('aria-labelledby', 'test-id-label');
      expect(listbox).toHaveAttribute('id', 'test-id-listbox');
    });
  });

  describe('SelectTrigger', () => {
    it('renders with correct attributes and content', () => {
      render(<TestSelect />);

      const trigger = screen.getByRole('button');
      expect(trigger).toBeInTheDocument();
      expect(trigger).toHaveTextContent('Choose option');
    });

    it('applies custom className', () => {
      render(
        <SelectRoot
          filteredOptions={['Test']}
          searchQuery=""
          setSearchQuery={jest.fn()}
        >
          <SelectTrigger className="custom-trigger-class">Custom Trigger</SelectTrigger>
        </SelectRoot>
      );

      const trigger = screen.getByRole('button');
      expect(trigger).toHaveClass('custom-trigger-class');
    });

    it('is disabled when disabled prop is true', () => {
      render(<TestSelect disabled={true} />);

      const trigger = screen.getByRole('button');
      expect(trigger).toBeDisabled();
      expect(trigger).toHaveAttribute('aria-disabled', 'true');
    });

    it('throws error when used outside SelectRoot', () => {
      const consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => {});

      expect(() => {
        render(<SelectTrigger>Trigger</SelectTrigger>);
      }).toThrow('useSelect() must be used within a Select.');

      consoleSpy.mockRestore();
    });
  });

  describe('SelectInput', () => {
    it('renders with correct attributes and content', async () => {
      const user = userEvent.setup();
      render(<TestSelect />);

      await user.click(screen.getByRole('button'));
      
      const input = screen.getByPlaceholderText('Search...');
      expect(input).toBeInTheDocument();
      expect(input).toHaveAttribute('id', 'test-id-search');
      expect(input).toHaveAttribute('aria-controls', 'test-id-listbox');
    });

    it('shows clear button when search query exists', async () => {
      const user = userEvent.setup();
      const setSearchQuery = jest.fn();
      render(<TestSelect searchQuery="test" setSearchQuery={setSearchQuery} />);

      await user.click(screen.getByRole('button'));

      const clearButton = screen.getByRole('button', { name: /clear/i });
      expect(clearButton).toBeInTheDocument();

      await user.click(clearButton);
      expect(setSearchQuery).toHaveBeenCalledWith('');
    });

    it('does not show clear button when search query is empty', async () => {
      const user = userEvent.setup();
      render(<TestSelect searchQuery="" />);

      await user.click(screen.getByRole('button'));

      expect(screen.queryByRole('button', { name: /clear/i })).not.toBeInTheDocument();
    });

    it('throws error when used outside SelectRoot', () => {
      const consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => {});

      expect(() => {
        render(<SelectInput />);
      }).toThrow('useSelect() must be used within a Select.');

      consoleSpy.mockRestore();
    });
  });

  describe('SelectList', () => {
    it('renders with correct content', async () => {
      const user = userEvent.setup();
      render(<TestSelect />);

      await user.click(screen.getByRole('button'));

      const listbox = screen.getByRole('listbox');
      expect(listbox).toBeInTheDocument();
      expect(listbox).toHaveAttribute('id', 'test-id-listbox');
    });

    it('applies custom className', async () => {
      const user = userEvent.setup();
      render(
        <SelectRoot
          filteredOptions={['Test']}
          searchQuery=""
          setSearchQuery={jest.fn()}
        >
          <SelectTrigger>Select</SelectTrigger>
          <SelectDropdown>
            <SelectList className="custom-list-class">
              <SelectListItem value="test">Test</SelectListItem>
            </SelectList>
          </SelectDropdown>
        </SelectRoot>
      );

      await user.click(screen.getByRole('button'));

      const listbox = screen.getByRole('listbox');
      expect(listbox).toHaveClass('custom-list-class');
    });


    it('renders all list items with proper indices', async () => {
      const user = userEvent.setup();
      render(<TestSelect />);

      await user.click(screen.getByRole('button'));

      const options = screen.getAllByRole('option');
      expect(options).toHaveLength(3);
      expect(options[0]).toHaveAttribute('data-index', '0');
      expect(options[1]).toHaveAttribute('data-index', '1');
      expect(options[2]).toHaveAttribute('data-index', '2');
    });

    it('throws error when used outside SelectRoot', () => {
      const consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => {});

      expect(() => {
        render(<SelectList><div>Test</div></SelectList>);
      }).toThrow('useSelect() must be used within a Select.');

      consoleSpy.mockRestore();
    });
  });

  describe('SelectListItem', () => {
    it('renders with correct attributes and content', async () => {
      const user = userEvent.setup();
      render(<TestSelect />);

      await user.click(screen.getByRole('button'));

      const option = screen.getByRole('option', { name: 'Option 1' });
      expect(option).toBeInTheDocument();
      expect(option).toHaveAttribute('role', 'option');
      expect(option).toHaveAttribute('data-index', '0');
    });

    it('shows selected state for selected option', async () => {
      const user = userEvent.setup();
      render(<TestSelect defaultValue="Option 2" />);

      await user.click(screen.getByRole('button'));

      const selectedOption = screen.getByRole('option', { name: 'Option 2' });
      expect(selectedOption).toHaveAttribute('data-selected', 'true');
      expect(selectedOption).toHaveAttribute('aria-selected', 'true');
    });

    it('throws error when used outside SelectRoot', () => {
      const consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => {});

      expect(() => {
        render(<SelectListItem value="test">Item</SelectListItem>);
      }).toThrow('useSelect() must be used within a Select.');

      consoleSpy.mockRestore();
    });
  });

  describe('Integration Tests', () => {
    it('provides correct context values to child components', async () => {
      const user = userEvent.setup();
      const onChange = jest.fn();
      render(<TestSelect onChange={onChange} />);

      await user.click(screen.getByRole('button'));

      const input = screen.getByPlaceholderText('Search...');
      const listbox = screen.getByRole('listbox');
      const option = screen.getByRole('option', { name: 'Option 1' });

      expect(input).toHaveAttribute('id', 'test-id-search');
      expect(listbox).toHaveAttribute('id', 'test-id-listbox');
      expect(option).toHaveAttribute('data-index', '0');
    });

    it('maintains proper ARIA relationships', async () => {
      const user = userEvent.setup();
      render(<TestSelect />);

      const trigger = screen.getByRole('button');
      const label = screen.getByText('Test Select');

      expect(label).toHaveAttribute('for', 'test-id');
      expect(trigger).toHaveAttribute('id', 'test-id');

      await user.click(trigger);

      const listbox = screen.getByRole('listbox');
      expect(trigger).toHaveAttribute('aria-controls', listbox.id);
      expect(listbox).toHaveAttribute('aria-labelledby', label.id);
    });

    it('handles complete user interaction flow', async () => {
      const user = userEvent.setup();
      const onChange = jest.fn();
      const setSearchQuery = jest.fn();

      render(<TestSelect onChange={onChange} setSearchQuery={setSearchQuery} />);

      // Open dropdown
      await user.click(screen.getByRole('button'));
      expect(screen.getByRole('listbox')).toBeInTheDocument();

      // Search for option
      const input = screen.getByPlaceholderText('Search...');
      await user.type(input, 'Option 2');
      expect(setSearchQuery).toHaveBeenCalled();

      // Select option
      await user.click(screen.getByRole('option', { name: 'Option 2' }));
      expect(onChange).toHaveBeenCalledWith('Option 2');
    });
  });

  describe('Compound Component API', () => {
    it('has proper compound component structure', () => {
      expect(Select).toHaveProperty('Trigger');
      expect(Select).toHaveProperty('Dropdown');
      expect(Select).toHaveProperty('List');
      expect(Select).toHaveProperty('Item');
      expect(Select).toHaveProperty('Input');
    });

    it('can be used with compound API', async () => {
      const user = userEvent.setup();
      render(
        <Select
          filteredOptions={['Compound Option']}
          searchQuery=""
          setSearchQuery={jest.fn()}
          onChange={jest.fn()}
        >
          <Select.Trigger>Compound Trigger</Select.Trigger>
          <Select.Dropdown>
            <Select.Input placeholder="Compound Search" />
            <Select.List>
              <Select.Item value="compound">Compound Option</Select.Item>
            </Select.List>
          </Select.Dropdown>
        </Select>
      );

      expect(screen.getByText('Compound Trigger')).toBeInTheDocument();
      
      await user.click(screen.getByRole('button'));
      
      expect(screen.getByPlaceholderText('Compound Search')).toBeInTheDocument();
      expect(screen.getByText('Compound Option')).toBeInTheDocument();
    });
  });

  describe('Edge Cases', () => {
    it('handles empty filteredOptions array', async () => {
      const user = userEvent.setup();
      render(<TestSelect filteredOptions={[]} />);

      await user.click(screen.getByRole('button'));

      const listbox = screen.getByRole('listbox');
      expect(listbox).toBeInTheDocument();
      expect(listbox).toBeEmptyDOMElement();
    })

    it('prevents action when disabled', async () => {
      const user = userEvent.setup();
      render(<TestSelect disabled={true} />);

      const trigger = screen.getByRole('button');
      expect(trigger).toBeDisabled();

      await user.click(trigger);
      expect(screen.queryByRole('listbox')).not.toBeInTheDocument();
    });
  });
});
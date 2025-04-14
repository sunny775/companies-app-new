import {
    autoUpdate,
    flip,
    FloatingFocusManager,
    FloatingPortal,
    offset,
    size,
    useDismiss,
    useFloating,
    useFocus,
    useInteractions,
    useListNavigation,
    useRole,
  } from '@floating-ui/react';
  import classNames from 'classnames';
  import {
    useEffect,
    useRef,
    useState,
    forwardRef,
    type ChangeEvent,
    type KeyboardEvent,
    type HTMLAttributes,
  } from 'react';
  
  const fruits = [/* ...fruits list unchanged for brevity... */];
  
  type ItemProps = {
    active: boolean;
    children: React.ReactNode;
  } & HTMLAttributes<HTMLDivElement>;
  
  const Item = forwardRef<HTMLDivElement, ItemProps>(function Item(
    { children, active, ...rest },
    ref
  ) {
    return (
      <div
        ref={ref}
        className={classNames('cursor-default scroll-my-1 rounded-md p-2', {
          'bg-blue-500 text-white': active,
        })}
        {...rest}
      >
        {children}
      </div>
    );
  });
  
  export function ComboboxDemo() {
    const [open, setOpen] = useState(false);
    const [inputValue, setInputValue] = useState('');
    const [activeIndex, setActiveIndex] = useState<number | null>(null);
    const [padding, setPadding] = useState(25);
  
    const listRef = useRef<Array<HTMLElement | null>>([]);
  
    useEffect(() => {
      const onResize = () =>
        setPadding(window.visualViewport?.height && window.visualViewport.height < 400 ? 5 : 25);
      window.addEventListener('resize', onResize);
      window.visualViewport?.addEventListener('resize', onResize);
      return () => {
        window.removeEventListener('resize', onResize);
        window.visualViewport?.removeEventListener('resize', onResize);
      };
    }, []);
  
    const { refs, floatingStyles, context } = useFloating({
      open,
      onOpenChange: setOpen,
      whileElementsMounted: autoUpdate,
      middleware: [
        offset(5),
        size({
          apply({ rects, elements, availableHeight, placement }) {
            Object.assign(elements.floating.style, {
              maxHeight:
                placement === 'bottom'
                  ? `${Math.max(padding === 25 ? 150 : 75, availableHeight)}px`
                  : `${Math.max(50, availableHeight)}px`,
              width: `${rects.reference.width}px`,
            });
          },
          padding,
        }),
        flip({ padding, fallbackStrategy: 'initialPlacement' }),
      ],
    });
  
    const role = useRole(context, { role: 'combobox' });
    const focus = useFocus(context, { enabled: inputValue.length > 0 });
    const dismiss = useDismiss(context);
    const navigation = useListNavigation(context, {
      listRef,
      activeIndex,
      onNavigate: setActiveIndex,
      virtual: true,
      loop: true,
      allowEscape: true,
    });
  
    const { getReferenceProps, getFloatingProps, getItemProps } = useInteractions([
      role,
      dismiss,
      navigation,
      focus,
    ]);
  
    const onChange = (e: ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value;
      setInputValue(value);
      setOpen(Boolean(value));
    };
  
    const items = fruits.filter((item) =>
      item.toLowerCase().startsWith(inputValue.toLowerCase())
    );
  
    return (
      <>
        <input
          ref={refs.setReference}
          value={inputValue}
          className="rounded border-2 border-gray-300 p-2 outline-none focus:border-blue-500 dark:border-gray-500 dark:bg-gray-600/50"
          placeholder="Enter balloon flavor"
          aria-autocomplete="list"
          aria-labelledby={open && items.length === 0 ? 'combobox-no-results' : undefined}
          {...getReferenceProps({
            onChange,
            onKeyDown: (e: KeyboardEvent<HTMLInputElement>) => {
              if (e.key === 'Enter' && activeIndex != null && items[activeIndex]) {
                setInputValue(items[activeIndex]);
                setActiveIndex(null);
                setOpen(false);
              }
            },
          })}
        />
        {open && (
          <FloatingPortal>
            <FloatingFocusManager context={context} initialFocus={-1} visuallyHiddenDismiss>
              <div
                ref={refs.setFloating}
                className="z-10 max-h-[20rem] overflow-y-auto rounded-lg border border-slate-900/5 bg-white/80 bg-clip-padding p-1 text-left shadow-lg outline-none backdrop-blur-lg dark:bg-gray-600/80"
                style={floatingStyles}
                {...getFloatingProps()}
              >
                {items.length === 0 && (
                  <p
                    className="m-2"
                    id="combobox-no-results"
                    role="region"
                    aria-atomic="true"
                    aria-live="assertive"
                  >
                    No flavors found.
                  </p>
                )}
                {items.map((item, index) => (
                  <Item
                    key={item}
                    ref={(node) => {
                      listRef.current[index] = node;
                    }}
                    active={activeIndex === index}
                    {...getItemProps({
                      active: activeIndex === index,
                      onClick: () => {
                        setInputValue(item);
                        setOpen(false);
                      },
                    })}
                  >
                    {item}
                  </Item>
                ))}
              </div>
            </FloatingFocusManager>
          </FloatingPortal>
        )}
      </>
    );
  }
  
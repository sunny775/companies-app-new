import {
    forwardRef,
    HTMLAttributes,
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
  
  
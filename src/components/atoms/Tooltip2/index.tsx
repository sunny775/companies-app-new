import React, { useState, useRef, ReactNode } from 'react';

type ChildrenProps<T> = {
  onMouseEnter: React.MouseEventHandler<T>;
  onMouseLeave: React.MouseEventHandler<T>;
  ref: React.RefObject<T | null>;
};

type TooltipPosition = 'top' | 'right' | 'bottom' | 'left';

interface TooltipProps {
  children: <T extends HTMLElement>(props: ChildrenProps<T>) => ReactNode;
  content: ReactNode;
  position?: TooltipPosition;
  className?: string;
}

const Tooltip = ({
  children,
  content,
  position = 'top',
  className = '',
}: TooltipProps) => {
  const [isVisible, setIsVisible] = useState(false);
  // Using a generic ref that can be passed to any HTML element
  const targetRef = useRef<HTMLElement | null>(null);
  const tooltipRef = useRef<HTMLDivElement | null>(null);

  const handleMouseEnter: React.MouseEventHandler<HTMLElement> = (e) => {
    setIsVisible(true);
  };

  const handleMouseLeave: React.MouseEventHandler<HTMLElement> = (e) => {
    setIsVisible(false);
  };

  // These props will be passed to the children component
  const childrenProps = {
    onMouseEnter: handleMouseEnter,
    onMouseLeave: handleMouseLeave,
    ref: targetRef,
  };

  // Position classes based on the position prop
  const positionClasses = {
    top: 'bottom-full left-1/2 transform -translate-x-1/2 mb-2',
    right: 'left-full top-1/2 transform -translate-y-1/2 ml-2',
    bottom: 'top-full left-1/2 transform -translate-x-1/2 mt-2',
    left: 'right-full top-1/2 transform -translate-y-1/2 mr-2',
  };

  return (
    <div className="relative inline-block">
      {/* Render the children with our props */}
      {children(childrenProps)}
      
      {/* Tooltip */}
      {isVisible && (
        <div
          ref={tooltipRef}
          className={`absolute z-50 px-3 py-2 text-sm bg-gray-800 text-white rounded shadow ${positionClasses[position]} ${className}`}
        >
          {content}
        </div>
      )}
    </div>
  );
};

export default Tooltip;
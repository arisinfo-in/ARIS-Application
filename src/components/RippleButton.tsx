import React, { useState, useRef } from 'react';
import NeumorphicButton from './NeumorphicButton';

interface RippleButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'accent' | 'primary' | 'secondary' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
  className?: string;
  loading?: boolean;
}

const RippleButton: React.FC<RippleButtonProps> = ({
  variant = 'accent',
  size = 'lg',
  children,
  className = '',
  loading = false,
  onClick,
  disabled,
  ...props
}) => {
  // Map 'default' to 'primary' for backward compatibility
  const buttonVariant = variant === 'default' ? 'primary' : variant;
  const [ripples, setRipples] = useState<Array<{ x: number; y: number; id: number }>>([]);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const rippleIdRef = useRef(0);

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (disabled || loading) return;

    const button = buttonRef.current;
    if (!button) return;

    const rect = button.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const newRipple = {
      x,
      y,
      id: rippleIdRef.current++,
    };

    setRipples((prev) => [...prev, newRipple]);

    // Remove ripple after animation
    setTimeout(() => {
      setRipples((prev) => prev.filter((r) => r.id !== newRipple.id));
    }, 600);

    onClick?.(e);
  };

  return (
    <NeumorphicButton
      ref={buttonRef}
      variant={buttonVariant}
      size={size}
      className={`relative overflow-hidden ${loading ? 'button-loading' : ''} ${className}`}
      onClick={handleClick}
      disabled={disabled || loading}
      {...props}
    >
      {ripples.map((ripple) => (
        <span
          key={ripple.id}
          className="ripple"
          style={{
            left: `${ripple.x}px`,
            top: `${ripple.y}px`,
          }}
        />
      ))}
      {children}
    </NeumorphicButton>
  );
};

export default RippleButton;


import React, { ButtonHTMLAttributes, forwardRef } from 'react';
import { DivideIcon as LucideIcon } from 'lucide-react';

interface NeumorphicButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'accent' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  icon?: LucideIcon;
  iconPosition?: 'left' | 'right';
  pressed?: boolean;
}

const NeumorphicButton = forwardRef<HTMLButtonElement, NeumorphicButtonProps>(({
  children,
  variant = 'primary',
  size = 'md',
  icon: Icon,
  iconPosition = 'left',
  pressed = false,
  className = '',
  disabled,
  ...props
}, ref) => {
  const baseClasses = 'relative transition-all duration-200 font-medium rounded-xl border-none outline-none focus:ring-2 focus:ring-orange-400 focus:ring-opacity-50';
  
  const variantClasses = {
    primary: pressed || disabled
      ? 'bg-gradient-to-br from-gray-200 to-gray-300 text-gray-600 shadow-inner'
      : 'bg-gradient-to-br from-white to-gray-100 text-gray-800 shadow-[8px_8px_16px_rgba(0,0,0,0.1),-8px_-8px_16px_rgba(255,255,255,0.8)] hover:shadow-[4px_4px_8px_rgba(0,0,0,0.1),-4px_-4px_8px_rgba(255,255,255,0.8)] active:shadow-inner',
    
    secondary: pressed || disabled
      ? 'bg-gradient-to-br from-gray-700 to-gray-800 text-gray-400 shadow-inner'
      : 'bg-gradient-to-br from-gray-800 to-gray-900 text-white shadow-[8px_8px_16px_rgba(0,0,0,0.3),-8px_-8px_16px_rgba(255,255,255,0.1)] hover:shadow-[4px_4px_8px_rgba(0,0,0,0.3),-4px_-4px_8px_rgba(255,255,255,0.1)] active:shadow-inner',
    
    accent: pressed || disabled
      ? 'bg-gradient-to-br from-orange-400 to-orange-500 text-white shadow-inner'
      : 'bg-gradient-to-br from-orange-500 to-orange-600 text-white shadow-[8px_8px_16px_rgba(249,115,22,0.3),-8px_-8px_16px_rgba(255,255,255,0.1)] hover:shadow-[4px_4px_8px_rgba(249,115,22,0.3),-4px_-4px_8px_rgba(255,255,255,0.1)] active:shadow-inner',
    
    ghost: pressed || disabled
      ? 'bg-transparent text-gray-400 shadow-inner'
      : 'bg-transparent text-gray-100 hover:text-orange-500 hover:bg-gradient-to-br hover:from-white hover:to-gray-50 hover:shadow-[4px_4px_8px_rgba(0,0,0,0.1),-4px_-4px_8px_rgba(255,255,255,0.8)] active:shadow-inner'
  };
  
  const sizeClasses = {
    sm: 'px-3 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg'
  };

  return (
    <button
      ref={ref}
      className={`${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${disabled ? 'cursor-not-allowed opacity-60' : 'cursor-pointer'} ${className}`}
      disabled={disabled}
      {...props}
    >
      <div className="flex items-center justify-center gap-2">
        {Icon && iconPosition === 'left' && <Icon size={size === 'sm' ? 16 : size === 'md' ? 20 : 24} />}
        {children}
        {Icon && iconPosition === 'right' && <Icon size={size === 'sm' ? 16 : size === 'md' ? 20 : 24} />}
      </div>
    </button>
  );
});

NeumorphicButton.displayName = 'NeumorphicButton';

export default NeumorphicButton;
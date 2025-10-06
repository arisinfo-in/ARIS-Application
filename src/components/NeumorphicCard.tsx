import React, { ReactNode } from 'react';

interface NeumorphicCardProps {
  children: ReactNode;
  className?: string;
  variant?: 'default' | 'pressed' | 'floating' | 'dark';
  padding?: 'sm' | 'md' | 'lg' | 'xl';
  onClick?: () => void;
  hoverable?: boolean;
}

const NeumorphicCard: React.FC<NeumorphicCardProps> = ({
  children,
  className = '',
  variant = 'default',
  padding = 'md',
  onClick,
  hoverable = false
}) => {
  const baseClasses = 'rounded-2xl transition-all duration-300';
  
  const variantClasses = {
    default: 'card-enhanced text-high-contrast',
    pressed: 'neumorphic-dark-pressed text-high-contrast',
    floating: 'card-enhanced orange-glow text-high-contrast',
    dark: 'bg-gradient-to-br from-gray-800 to-gray-900 shadow-[12px_12px_24px_rgba(0,0,0,0.3),-12px_-12px_24px_rgba(255,255,255,0.1)]'
  };
  
  const paddingClasses = {
    sm: 'p-4',
    md: 'p-6',
    lg: 'p-8',
    xl: 'p-10'
  };

  const hoverClasses = hoverable 
    ? 'cursor-pointer'
    : '';

  return (
    <div
      className={`${baseClasses} ${variantClasses[variant]} ${paddingClasses[padding]} ${hoverClasses} ${className}`}
      onClick={onClick}
    >
      {children}
    </div>
  );
};

export default NeumorphicCard;
import React, { useState, useRef, useEffect } from 'react';
import { LucideIcon } from 'lucide-react';

interface FloatingLabelInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  icon?: LucideIcon;
  error?: boolean;
  success?: boolean;
}

const FloatingLabelInput: React.FC<FloatingLabelInputProps> = ({
  label,
  icon: Icon,
  error,
  success,
  value,
  onFocus,
  onBlur,
  className = '',
  ...props
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const [hasValue, setHasValue] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setHasValue(!!value || (typeof value === 'string' && value.length > 0));
  }, [value]);

  const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
    setIsFocused(true);
    setHasValue(true);
    onFocus?.(e);
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    setIsFocused(false);
    setHasValue(!!e.target.value);
    onBlur?.(e);
  };

  const isActive = isFocused || hasValue;

  return (
    <div className={`relative ${className}`}>
      <div className={`relative input-glow ${error ? 'shake' : ''}`}>
        {Icon && (
          <Icon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 transition-colors duration-300 z-20" />
        )}
        <input
          ref={inputRef}
          {...props}
          value={value}
          onFocus={handleFocus}
          onBlur={handleBlur}
          className={`
            w-full ${Icon ? 'pl-10' : 'pl-4'} pr-4 py-3 rounded-lg 
            border transition-all duration-300
            ${error 
              ? 'border-red-500 bg-red-50/10' 
              : success 
                ? 'border-green-500 bg-green-50/10' 
                : isFocused
                  ? 'border-orange-500 bg-white/5'
                  : 'border-gray-600 bg-white/5'
            }
            focus:outline-none focus:ring-2 focus:ring-orange-500/20
            text-white placeholder-transparent
          `}
        />
        <label
          className={`
            floating-label ${isActive ? 'active' : ''}
            ${Icon ? 'left-10' : 'left-4'}
            ${error ? 'text-red-500' : success ? 'text-green-500' : ''}
          `}
        >
          {label}
        </label>
      </div>
      {error && (
        <p className="mt-1 text-xs text-red-500 slide-up">Please check this field</p>
      )}
      {success && (
        <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
          <svg className="w-5 h-5 text-green-500 checkmark-animate" viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
      )}
    </div>
  );
};

export default FloatingLabelInput;


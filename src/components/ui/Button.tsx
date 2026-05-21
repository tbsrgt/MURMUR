import React from 'react';
import { cn } from '../../utils/cn';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'terracotta' | 'outline' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
  id?: string;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  isLoading = false,
  className,
  id,
  type = 'button',
  disabled,
  ...props
}) => {
  const baseStyle = 'inline-flex items-center justify-center font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sage-500 disabled:opacity-50 disabled:cursor-not-allowed';

  // Primary CTAs use rounded-full, secondary uses rounded-lg
  const shapes = {
    primary: 'rounded-full uppercase tracking-wider',
    terracotta: 'rounded-full uppercase tracking-wider',
    secondary: 'rounded-lg',
    ghost: 'rounded-lg',
    outline: 'rounded-full uppercase tracking-wider',
    danger: 'rounded-lg'
  };

  const variants = {
    primary: 'bg-sage-700 text-cream-50 hover:bg-sage-900 border border-transparent shadow-sm',
    terracotta: 'bg-terracotta-500 text-cream-50 hover:bg-terracotta-700 border border-transparent shadow-sm',
    secondary: 'bg-cream-100 text-stone-900 hover:bg-cream-200 border border-cream-200',
    ghost: 'text-stone-700 hover:text-stone-900 hover:bg-stone-100/50 bg-transparent',
    outline: 'border border-sage-700 text-sage-900 hover:bg-sage-100/30',
    danger: 'bg-red-50 text-red-700 hover:bg-red-100 border border-red-200'
  };

  const sizes = {
    sm: 'text-xs px-3 py-1.5',
    md: 'text-sm px-5 py-2.5',
    lg: 'text-base px-7 py-3.5'
  };

  return (
    <button
      id={id}
      type={type}
      className={cn(
        baseStyle,
        shapes[variant],
        variants[variant],
        sizes[size],
        className
      )}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading ? (
        <svg
          className="animate-spin -ml-1 mr-2 h-4 w-4 text-current"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          />
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          />
        </svg>
      ) : null}
      {children}
    </button>
  );
};
export default Button;

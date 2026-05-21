import React from 'react';
import { cn } from '../../utils/cn';

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'sage' | 'terracotta' | 'cream' | 'stone' | 'purple' | 'gold' | 'default';
  className?: string;
  id?: string;
}

export const Badge: React.FC<BadgeProps> = ({
  children,
  variant = 'default',
  className,
  id
}) => {
  const baseStyle = 'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium uppercase tracking-wider uppercase';

  const variants = {
    sage: 'bg-sage-100 text-sage-900 border border-sage-300',
    terracotta: 'bg-terracotta-100 text-terracotta-700 border border-terracotta-300',
    cream: 'bg-cream-100 text-stone-900 border border-cream-200',
    stone: 'bg-stone-100 text-stone-700 border border-stone-300',
    purple: 'bg-purple-100 text-purple-800 border border-purple-200',
    gold: 'bg-amber-100 text-amber-950 border border-amber-300 shadow-sm font-semibold',
    default: 'bg-stone-100 text-stone-700'
  };

  return (
    <span id={id} className={cn(baseStyle, variants[variant], className)}>
      {children}
    </span>
  );
};
export default Badge;

import React from 'react';
import { cn } from '@/lib/utils';

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {}

const Card = React.forwardRef<HTMLDivElement, CardProps>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      'rounded-xl border border-primary-blue/20 bg-gradient-to-br from-primary-navy-dark to-primary-navy p-6 shadow-glow-md',
      className
    )}
    {...props}
  />
));

Card.displayName = 'Card';

export { Card };

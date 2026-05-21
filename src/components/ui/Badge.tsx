import React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const badgeVariants = cva(
  'inline-flex items-center rounded-full px-3 py-1 text-sm font-medium',
  {
    variants: {
      variant: {
        default: 'bg-primary-blue/20 text-primary-cyan',
        success: 'bg-status-success/20 text-status-success',
        warning: 'bg-status-warning/20 text-status-warning',
        error: 'bg-status-error/20 text-status-error',
        gold: 'bg-primary-gold/20 text-primary-gold',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

const Badge = React.forwardRef<HTMLDivElement, BadgeProps>(
  ({ className, variant, ...props }, ref) => (
    <div ref={ref} className={cn(badgeVariants({ variant }), className)} {...props} />
  )
);

Badge.displayName = 'Badge';

export { Badge, badgeVariants };

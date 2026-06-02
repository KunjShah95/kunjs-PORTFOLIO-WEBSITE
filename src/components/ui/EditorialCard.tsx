import { clsx } from 'clsx';
import { motion, type HTMLMotionProps } from 'framer-motion';

interface EditorialCardProps extends HTMLMotionProps<'div'> {
  hoverable?: boolean;
  variant?: 'default' | 'sunken' | 'inverse';
}

export function EditorialCard({
  hoverable = false,
  variant = 'default',
  className,
  children,
  ...props
}: EditorialCardProps) {
  const variantClass = {
    default: 'bg-paper border-rule/12',
    sunken: 'bg-elevated border-rule/12',
    inverse: 'bg-inverse text-ink-inverse border-transparent',
  }[variant];

  return (
    <motion.div
      className={clsx(
        'rounded-md border p-6 transition-all duration-base ease-out-soft',
        variantClass,
        hoverable && 'hover:border-rule/32 hover:-translate-y-px cursor-pointer',
        className
      )}
      {...props}
    >
      {children}
    </motion.div>
  );
}

import { clsx } from 'clsx';
import { ReactNode } from 'react';

type CardProps = {
  children: ReactNode;
  className?: string;
};

export function Card({ children, className }: CardProps) {
  return (
    <div className={clsx('bg-white shadow-md rounded-2xl p-6', className)}>
      {children}
    </div>
  );
}

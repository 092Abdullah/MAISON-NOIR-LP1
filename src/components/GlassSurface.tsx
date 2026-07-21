import React from 'react';
import { cn } from '@/lib/utils';

interface Props {
  children: React.ReactNode;
  borderRadius?: number;
  backgroundOpacity?: number;
  className?: string;
}

const GlassSurface: React.FC<Props> = ({ children, borderRadius = 12, backgroundOpacity = 0.04, className }) => (
  <div
    className={cn('relative overflow-hidden', className)}
    style={{
      borderRadius,
      background: `rgba(255,255,255,${backgroundOpacity})`,
      border: '1px solid rgba(255,255,255,0.06)',
    }}
  >
    {children}
  </div>
);

export default GlassSurface;

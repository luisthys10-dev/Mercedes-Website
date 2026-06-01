'use client';
import { motion } from 'framer-motion';

interface MercedesStarProps {
  className?: string;
  size?: number;
  opacity?: number;
  rotate?: boolean;
  color?: string;
}

export default function MercedesStar({
  className = '',
  size = 200,
  opacity = 0.04,
  rotate = true,
  color = 'white',
}: MercedesStarProps) {
  return (
    <motion.div
      className={`pointer-events-none select-none ${className}`}
      style={{ width: size, height: size, opacity }}
      animate={rotate ? { rotate: 360 } : {}}
      transition={rotate ? { duration: 60, repeat: Infinity, ease: 'linear' } : {}}
    >
      <svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg" width={size} height={size}>
        <circle cx="100" cy="100" r="95" stroke={color} strokeWidth="4"/>
        <circle cx="100" cy="100" r="80" stroke={color} strokeWidth="1" opacity="0.5"/>
        <line x1="100" y1="5" x2="100" y2="100" stroke={color} strokeWidth="5" strokeLinecap="round"/>
        <line x1="100" y1="100" x2="177" y2="158" stroke={color} strokeWidth="5" strokeLinecap="round"/>
        <line x1="100" y1="100" x2="23" y2="158" stroke={color} strokeWidth="5" strokeLinecap="round"/>
        <circle cx="100" cy="100" r="8" fill={color}/>
      </svg>
    </motion.div>
  );
}

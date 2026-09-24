import type { PointerEvent, ReactNode } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import { useReducedMotion } from '../../hooks/useReducedMotion';
import { useIsMobile } from '../../hooks/useIsMobile';

const MAX_DEG = 6;
const SPRING = { stiffness: 180, damping: 18, mass: 0.6 };

type Props = { children: ReactNode; className?: string };

// Tilts up to ±6° toward the pointer; a radial cyan highlight (.tilt-card::before)
// follows the pointer via --mx/--my. Plain div under reduced motion or on mobile.
export function TiltCard({ children, className = '' }: Props) {
  const reduced = useReducedMotion();
  const isMobile = useIsMobile();
  const rx = useMotionValue(0);
  const ry = useMotionValue(0);
  const rotateX = useSpring(rx, SPRING);
  const rotateY = useSpring(ry, SPRING);

  if (reduced || isMobile) return <div className={className}>{children}</div>;

  const onPointerMove = (e: PointerEvent<HTMLDivElement>) => {
    const el = e.currentTarget;
    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const px = x / rect.width - 0.5;
    const py = y / rect.height - 0.5;
    ry.set(px * 2 * MAX_DEG);
    rx.set(-py * 2 * MAX_DEG);
    el.style.setProperty('--mx', `${x}px`);
    el.style.setProperty('--my', `${y}px`);
  };
  const onPointerLeave = () => {
    rx.set(0);
    ry.set(0);
  };

  return (
    <motion.div
      className={`tilt-card relative ${className}`}
      style={{ rotateX, rotateY, transformPerspective: 900 }}
      onPointerMove={onPointerMove}
      onPointerLeave={onPointerLeave}
    >
      {children}
    </motion.div>
  );
}

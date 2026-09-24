import { useEffect, useMemo, useRef, useState } from 'react';
import { useInView } from 'framer-motion';
import { useReducedMotion } from '../../hooks/useReducedMotion';
import { scrambleFrames } from './scrambleFrames';

const FRAMES = 18;
const FRAME_MS = 40;

// Assembles `text` from random glyphs once, when first scrolled into view.
// An invisible ::before copy of the final text reserves the layout box, so the
// scrambled overlay never shifts surrounding content.
export function Scramble({ text }: { text: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });
  const reduced = useReducedMotion();
  const frames = useMemo(() => scrambleFrames(text, FRAMES), [text]);
  const [frame, setFrame] = useState(0);

  useEffect(() => {
    if (!inView || reduced) return;
    let f = 0;
    const id = window.setInterval(() => {
      f += 1;
      setFrame(f);
      if (f >= frames.length - 1) window.clearInterval(id);
    }, FRAME_MS);
    return () => window.clearInterval(id);
  }, [inView, reduced, frames]);

  if (reduced) return <span aria-label={text}>{text}</span>;

  return (
    <span
      ref={ref}
      aria-label={text}
      data-text={text}
      className="relative inline-block before:invisible before:content-[attr(data-text)]"
    >
      <span aria-hidden="true" className="absolute inset-0">
        {frames[Math.min(frame, frames.length - 1)]}
      </span>
    </span>
  );
}

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useReducedMotion } from '../../hooks/useReducedMotion';
import { useIsMobile } from '../../hooks/useIsMobile';

const KEY = 'booted';
// line grows for 450 ms, onDone at 500 ms, then a 300 ms exit fade: gone within 0.8 s
const DURATION_MS = 500;

function hasBooted(): boolean {
  try {
    return sessionStorage.getItem(KEY) !== null;
  } catch {
    return true;
  }
}

function markBooted() {
  try {
    sessionStorage.setItem(KEY, '1');
  } catch {
    /* storage unavailable: boot simply runs again next load */
  }
}

export function BootSequence({ onDone }: { onDone: () => void }) {
  const reduced = useReducedMotion();
  const isMobile = useIsMobile();
  // read once at mount: the key is written on completion, and the exiting overlay must keep rendering
  const [alreadyBooted] = useState(hasBooted);
  const skip = reduced || isMobile || alreadyBooted;

  useEffect(() => {
    if (skip) {
      onDone();
      return;
    }
    const id = window.setTimeout(() => {
      markBooted();
      onDone();
    }, DURATION_MS);
    return () => window.clearTimeout(id);
  }, [skip, onDone]);

  if (skip) return null;

  return (
    <motion.div
      className="fixed inset-0 z-[60] flex flex-col items-center justify-center gap-4 bg-base"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      aria-hidden="true"
    >
      <div className="w-64 max-w-[70vw]">
        <motion.div
          className="h-px bg-accent"
          initial={{ width: 0 }}
          animate={{ width: '100%' }}
          transition={{ duration: 0.45, ease: 'easeOut' }}
        />
      </div>
      <p className="font-mono text-xs tracking-widest text-ink-dim">initialising · marcela.ai</p>
    </motion.div>
  );
}

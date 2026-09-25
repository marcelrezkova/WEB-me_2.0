import { Component, lazy, Suspense, useCallback, useEffect, useState, type ReactNode } from 'react';
import { AnimatePresence } from 'framer-motion';
import { Nav } from './components/Nav';
import { Footer } from './components/Footer';
import { Hero } from './components/sections/Hero';
import { WhatIDo } from './components/sections/WhatIDo';
import { HowIWork } from './components/sections/HowIWork';
import { SelectedWork } from './components/sections/SelectedWork';
import { WorkWithMe } from './components/sections/WorkWithMe';
import { Stack } from './components/sections/Stack';
import { Contact } from './components/sections/Contact';
import { BootSequence } from './components/hero/BootSequence';
import { ScrollProgress } from './components/motion/ScrollProgress';
import { SmoothScroll } from './components/motion/SmoothScroll';
import { useReducedMotion } from './hooks/useReducedMotion';
import { useIsMobile } from './hooks/useIsMobile';

const ParticleField = lazy(() => import('./components/hero/ParticleField'));

// WebGL failure (or chunk load failure) renders nothing, leaving Hero's static gradient.
class CanvasBoundary extends Component<{ children: ReactNode }, { failed: boolean }> {
  state = { failed: false };
  static getDerivedStateFromError() {
    return { failed: true };
  }
  componentDidCatch(error: unknown) {
    console.warn('Particle field disabled:', error);
  }
  render() {
    return this.state.failed ? null : this.props.children;
  }
}

// Mount the particle field (and fetch/parse the three chunk) only after load + idle,
// so first paint shows the static gradient.
function useAfterLoadIdle(): boolean {
  const [ready, setReady] = useState(false);
  useEffect(() => {
    let idleId: number | undefined;
    let timeoutId: number | undefined;
    const schedule = () => {
      if (typeof window.requestIdleCallback === 'function') idleId = window.requestIdleCallback(() => setReady(true), { timeout: 2000 });
      else timeoutId = window.setTimeout(() => setReady(true), 200);
    };
    if (document.readyState === 'complete') schedule();
    else window.addEventListener('load', schedule, { once: true });
    return () => {
      window.removeEventListener('load', schedule);
      if (idleId !== undefined) window.cancelIdleCallback(idleId);
      if (timeoutId !== undefined) window.clearTimeout(timeoutId);
    };
  }, []);
  return ready;
}

export default function App() {
  const reduced = useReducedMotion();
  const isMobile = useIsMobile();
  const [booted, setBooted] = useState(false);
  const showField = useAfterLoadIdle();
  const onBootDone = useCallback(() => setBooted(true), []);

  return (
    <SmoothScroll>
      <AnimatePresence>{!booted && <BootSequence onDone={onBootDone} />}</AnimatePresence>
      <Nav />
      <main>
        <Hero
          background={
            showField && (
              <CanvasBoundary>
                <Suspense fallback={null}>
                  <ParticleField count={isMobile ? 600 : 1600} animate={!reduced} />
                </Suspense>
              </CanvasBoundary>
            )
          }
        />
        <WhatIDo />
        <HowIWork />
        <SelectedWork />
        <WorkWithMe />
        <Stack />
        <Contact />
      </main>
      <Footer />
      <ScrollProgress />
    </SmoothScroll>
  );
}

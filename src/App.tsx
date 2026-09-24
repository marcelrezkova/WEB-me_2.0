import { Component, lazy, Suspense, useCallback, useState, type ReactNode } from 'react';
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

export default function App() {
  const reduced = useReducedMotion();
  const isMobile = useIsMobile();
  const [booted, setBooted] = useState(false);
  const onBootDone = useCallback(() => setBooted(true), []);

  return (
    <>
      <AnimatePresence>{!booted && <BootSequence onDone={onBootDone} />}</AnimatePresence>
      <Nav />
      <main>
        <Hero
          background={
            <CanvasBoundary>
              <Suspense fallback={null}>
                <ParticleField count={isMobile ? 600 : 2400} animate={!reduced} />
              </Suspense>
            </CanvasBoundary>
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
    </>
  );
}

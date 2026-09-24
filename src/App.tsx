import { Nav } from './components/Nav';
import { Footer } from './components/Footer';
import { Hero } from './components/sections/Hero';
import { WhatIDo } from './components/sections/WhatIDo';
import { HowIWork } from './components/sections/HowIWork';
import { SelectedWork } from './components/sections/SelectedWork';
import { WorkWithMe } from './components/sections/WorkWithMe';
import { Stack } from './components/sections/Stack';
import { Contact } from './components/sections/Contact';

export default function App() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
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

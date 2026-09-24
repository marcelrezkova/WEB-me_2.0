import type { ReactNode } from 'react';
import { ArrowRight } from 'lucide-react';
import { hero } from '../../content';
import { Button } from '../ui/Button';

type Props = { background?: ReactNode };

export function Hero({ background }: Props) {
  return (
    <section id="hero" className="relative flex min-h-screen items-center overflow-hidden">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        {/* static gradient stays underneath as the fallback if the background (e.g. WebGL) fails */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(94,242,255,0.12),transparent_60%)]" />
        {background}
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-b from-transparent to-base" />
      </div>

      <div className="relative mx-auto w-full max-w-page px-6 pb-20 pt-32">
        <p className="kicker mb-6">{hero.kicker}</p>
        <h1 className="max-w-4xl text-5xl font-semibold leading-[1.05] tracking-tight md:text-7xl">{hero.title}</h1>
        <p className="mt-8 max-w-2xl text-lg leading-relaxed text-ink-muted md:text-xl">{hero.sub}</p>
        <div className="mt-10 flex flex-col gap-4 sm:flex-row">
          <Button href={hero.primary.href} variant="primary">
            {hero.primary.label}
            <ArrowRight size={18} />
          </Button>
          <Button href={hero.secondary.href} variant="ghost">
            {hero.secondary.label}
          </Button>
        </div>
        <p className="mt-12 font-mono text-xs text-ink-dim">{hero.location}</p>
      </div>
    </section>
  );
}

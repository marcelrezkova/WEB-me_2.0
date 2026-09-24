import { services } from '../../content';
import { Reveal } from '../motion/Reveal';
import { TiltCard } from '../motion/TiltCard';
import { Section } from '../ui/Section';

export function WhatIDo() {
  return (
    <Section id="what" kicker="What I do" title="Three layers, one builder.">
      <div className="grid gap-6 md:grid-cols-3">
        {services.map((s, i) => (
          <Reveal key={s.title} delay={i * 0.08}>
            <TiltCard className="glass h-full rounded-2xl p-8">
              <article>
                <span className="font-mono text-xs text-accent">{String(i + 1).padStart(2, '0')}</span>
                <h3 className="mb-4 mt-6 text-xl font-semibold tracking-tight">{s.title}</h3>
                <p className="leading-relaxed text-ink-muted">{s.body}</p>
              </article>
            </TiltCard>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}

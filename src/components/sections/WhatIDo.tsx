import { services } from '../../content';
import { Section } from '../ui/Section';

export function WhatIDo() {
  return (
    <Section id="what" kicker="What I do" title="Three layers, one builder.">
      <div className="grid gap-6 md:grid-cols-3">
        {services.map((s, i) => (
          <article key={s.title} className="glass rounded-2xl p-8">
            <span className="font-mono text-xs text-accent">{String(i + 1).padStart(2, '0')}</span>
            <h3 className="mb-4 mt-6 text-xl font-semibold tracking-tight">{s.title}</h3>
            <p className="leading-relaxed text-ink-muted">{s.body}</p>
          </article>
        ))}
      </div>
    </Section>
  );
}

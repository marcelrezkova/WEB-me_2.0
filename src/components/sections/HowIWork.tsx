import { processLine, steps } from '../../content';
import { Reveal } from '../motion/Reveal';
import { TiltCard } from '../motion/TiltCard';
import { Section } from '../ui/Section';

export function HowIWork() {
  return (
    <Section id="how" kicker="How I work" title="From data to shipped.">
      <ol className="grid gap-6 md:grid-cols-2">
        {steps.map((s, i) => (
          <li key={s.n}>
            <Reveal delay={i * 0.08} className="h-full">
              <TiltCard className="glass h-full rounded-2xl p-8">
                <span className="font-mono text-sm text-accent">{s.n}</span>
                <h3 className="mb-3 mt-4 text-xl font-semibold tracking-tight">{s.title}</h3>
                <p className="leading-relaxed text-ink-muted">{s.body}</p>
              </TiltCard>
            </Reveal>
          </li>
        ))}
      </ol>
      <Reveal>
        <p className="mt-12 max-w-3xl text-lg italic leading-relaxed text-ink-muted">{processLine}</p>
      </Reveal>
    </Section>
  );
}

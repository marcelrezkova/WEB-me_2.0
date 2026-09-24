import { processLine, steps } from '../../content';
import { Section } from '../ui/Section';

export function HowIWork() {
  return (
    <Section id="how" kicker="How I work" title="From data to shipped.">
      <ol className="grid gap-6 md:grid-cols-2">
        {steps.map((s) => (
          <li key={s.n} className="glass rounded-2xl p-8">
            <span className="font-mono text-sm text-accent">{s.n}</span>
            <h3 className="mb-3 mt-4 text-xl font-semibold tracking-tight">{s.title}</h3>
            <p className="leading-relaxed text-ink-muted">{s.body}</p>
          </li>
        ))}
      </ol>
      <p className="mt-12 max-w-3xl text-lg italic leading-relaxed text-ink-muted">{processLine}</p>
    </Section>
  );
}

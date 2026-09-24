import { work } from '../../content';
import { Reveal } from '../motion/Reveal';
import { TiltCard } from '../motion/TiltCard';
import { Section } from '../ui/Section';

export function SelectedWork() {
  return (
    <Section id="work" kicker="Selected work" title="Things I have built.">
      <div className="flex flex-col gap-6">
        {work.map((w, i) => (
          <Reveal key={w.title} delay={i * 0.08}>
            <TiltCard className="glass rounded-2xl p-8 md:p-10">
              <article>
                <div className="flex flex-col items-start gap-3 md:flex-row md:items-center md:justify-between">
                  <h3 className="text-xl font-semibold tracking-tight md:text-2xl">{w.title}</h3>
                  {w.status && (
                    <span className="shrink-0 rounded-full border border-accent/30 bg-accent/10 px-3 py-1 font-mono text-xs text-accent">
                      {w.status}
                    </span>
                  )}
                </div>
                <p className="mt-4 max-w-3xl leading-relaxed text-ink-muted">{w.body}</p>
                <ul className="mt-6 flex flex-wrap gap-2">
                  {w.tags.map((t) => (
                    <li key={t} className="rounded-md border border-line px-2.5 py-1 font-mono text-xs text-ink-muted">
                      {t}
                    </li>
                  ))}
                </ul>
              </article>
            </TiltCard>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}

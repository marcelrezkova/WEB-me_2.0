import { stack } from '../../content';
import { Reveal } from '../motion/Reveal';
import { Section } from '../ui/Section';

export function Stack() {
  return (
    <Section id="stack" kicker="Stack" title="Tools I reach for.">
      <Reveal>
        <dl className="divide-y divide-line border-y border-line">
          {Object.entries(stack).map(([group, items]) => (
            <div key={group} className="grid gap-4 py-6 md:grid-cols-[12rem_1fr] md:items-center">
              <dt className="font-mono text-xs uppercase tracking-[0.2em] text-ink-dim">{group}</dt>
              <dd className="flex flex-wrap gap-2">
                {items.map((item) => (
                  <span
                    key={item}
                    className="rounded-full border border-line bg-surface px-3.5 py-1.5 text-sm text-ink"
                  >
                    {item}
                  </span>
                ))}
              </dd>
            </div>
          ))}
        </dl>
      </Reveal>
    </Section>
  );
}

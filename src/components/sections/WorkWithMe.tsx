import { ArrowRight } from 'lucide-react';
import { links } from '../../config';
import { Button } from '../ui/Button';
import { Reveal } from '../motion/Reveal';
import { TiltCard } from '../motion/TiltCard';
import { Section } from '../ui/Section';

const INCLUDES = [
  'Where AI agents fit in your product or workflow',
  'Review of your existing agentic setup',
  'Scoping of a web or data build',
];

export function WorkWithMe() {
  return (
    <Section id="work-with-me" kicker="Work with me" title="45-minute working session — 39 EUR">
      <div className="grid gap-6 md:grid-cols-2 md:items-start">
        <Reveal>
          <div>
            <p className="text-lg leading-relaxed text-ink-muted">A focused call on one question:</p>
            <ul className="mt-6 space-y-4">
              {INCLUDES.map((item) => (
                <li key={item} className="flex items-start gap-3 text-lg leading-relaxed text-ink-muted">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" aria-hidden="true" />
                  {item}
                </li>
              ))}
            </ul>
            <p className="mt-8 leading-relaxed text-ink-muted">
              Written summary and next steps within 24 hours.
            </p>
          </div>
        </Reveal>
        <Reveal delay={0.08}>
          <TiltCard className="glass rounded-2xl p-8 md:p-12">
            <div>
              <p className="text-5xl font-semibold tracking-tight">39 EUR</p>
              <p className="mt-3 text-sm text-ink-dim">45 minutes · video call · pay first, then pick a slot</p>
              <div className="mt-10 flex flex-col items-start gap-4">
                <Button href={links.stripe} variant="warm" external className="w-full sm:w-auto">
                  Pay & book
                  <ArrowRight size={18} />
                </Button>
                <p className="text-sm text-ink-dim">
                  Already paid?{' '}
                  <a
                    href={links.calendar}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-ink-muted underline decoration-line underline-offset-4 transition-colors hover:text-accent"
                  >
                    Pick your slot
                  </a>
                </p>
              </div>
            </div>
          </TiltCard>
        </Reveal>
      </div>
    </Section>
  );
}

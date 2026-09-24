import { ArrowRight } from 'lucide-react';
import { bookingUrl, links } from '../../config';
import { Button } from '../ui/Button';
import { Section } from '../ui/Section';

export function WorkWithMe() {
  return (
    <Section id="work-with-me" kicker="Work with me" title="45-minute working session — 39 EUR">
      <div className="glass max-w-3xl rounded-2xl p-8 md:p-12">
        <p className="text-lg leading-relaxed text-ink-muted">
          A focused call on one question: where AI agents fit in your product or workflow, a review of your existing
          agentic setup, or scoping of a web/data build. You leave with a written summary and concrete next steps
          within 24 hours.
        </p>
        <div className="mt-10 flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:gap-6">
          <Button href={bookingUrl()} variant="warm" external>
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
    </Section>
  );
}

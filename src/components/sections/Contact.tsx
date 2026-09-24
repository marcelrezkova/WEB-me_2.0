import { ArrowUpRight, Download, Github, Linkedin, Mail } from 'lucide-react';
import { bookingUrl, links } from '../../config';
import { Button } from '../ui/Button';
import { Section } from '../ui/Section';

const items = [
  { label: 'E-mail', value: links.email, href: `mailto:${links.email}`, icon: Mail, external: false, download: false },
  { label: 'LinkedIn', value: 'in/marcelrezkova', href: links.linkedin, icon: Linkedin, external: true, download: false },
  { label: 'GitHub', value: 'marcelrezkova', href: links.github, icon: Github, external: true, download: false },
  { label: 'Download CV', value: 'PDF, English', href: links.cv, icon: Download, external: false, download: true },
];

export function Contact() {
  return (
    <Section id="contact" kicker="Contact" title="Let's talk.">
      <div className="grid gap-4 sm:grid-cols-2">
        {items.map(({ label, value, href, icon: Icon, external, download }) => (
          <a
            key={label}
            href={href}
            {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
            {...(download ? { download: true } : {})}
            className="glass group flex items-center gap-5 rounded-2xl p-6 transition-colors hover:border-accent/40"
          >
            <Icon size={20} className="shrink-0 text-accent" />
            <span className="min-w-0 flex-1">
              <span className="block font-medium text-ink">{label}</span>
              <span className="block truncate font-mono text-xs text-ink-dim">{value}</span>
            </span>
            <ArrowUpRight size={18} className="shrink-0 text-ink-dim transition-colors group-hover:text-accent" />
          </a>
        ))}
      </div>
      <div className="mt-12">
        <Button href={bookingUrl()} variant="primary" external>
          Book a session
        </Button>
      </div>
    </Section>
  );
}

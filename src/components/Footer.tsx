import { Github, Linkedin } from 'lucide-react';
import { links } from '../config';

export function Footer() {
  return (
    <footer className="mx-auto max-w-page px-6">
      <div className="hairline" />
      <div className="flex flex-col items-start justify-between gap-4 py-8 text-sm text-ink-dim sm:flex-row sm:items-center">
        <p>© {new Date().getFullYear()} Marcela Řezková · Built with React, Three.js and AI agents.</p>
        <div className="flex items-center gap-4">
          <a href={links.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="transition-colors hover:text-accent">
            <Linkedin size={18} />
          </a>
          <a href={links.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub" className="transition-colors hover:text-accent">
            <Github size={18} />
          </a>
        </div>
      </div>
    </footer>
  );
}

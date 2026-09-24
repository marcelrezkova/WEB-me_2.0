import type { ReactNode } from 'react';

type Props = { href: string; children: ReactNode; variant?: 'primary' | 'ghost' | 'warm'; external?: boolean; className?: string };

// text-[#05060a] rather than text-base: with the `base` colour token, text-base also sets font-size:1rem.
const styles = {
  primary: 'bg-accent text-[#05060a] hover:shadow-[0_0_40px_rgba(94,242,255,0.35)]',
  ghost: 'border border-line text-ink hover:border-accent/60 hover:text-accent',
  warm: 'bg-warm text-[#05060a] hover:shadow-[0_0_40px_rgba(255,184,107,0.35)]',
};

export function Button({ href, children, variant = 'primary', external, className = '' }: Props) {
  return (
    <a
      href={href}
      {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
      className={`inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 font-medium transition-all duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent ${styles[variant]} ${className}`}
    >
      {children}
    </a>
  );
}

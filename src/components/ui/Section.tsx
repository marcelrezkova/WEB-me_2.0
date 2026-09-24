import type { ReactNode } from 'react';

type Props = { id: string; kicker: string; title: string; children: ReactNode; className?: string };

export function Section({ id, kicker, title, children, className = '' }: Props) {
  return (
    <section id={id} className={`relative mx-auto max-w-page scroll-mt-20 px-6 py-24 md:py-32 ${className}`}>
      <p className="kicker mb-4">{kicker}</p>
      <h2 className="mb-12 text-balance text-3xl font-semibold tracking-tight md:text-5xl">{title}</h2>
      {children}
    </section>
  );
}

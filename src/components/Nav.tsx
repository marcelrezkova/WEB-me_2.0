import { useEffect, useState } from 'react';
import { Menu, X } from 'lucide-react';
import { TechFoxIcon } from './FoxMascot';
import { Button } from './ui/Button';

const navLinks = [
  { label: 'What I do', href: '#what' },
  { label: 'How I work', href: '#how' },
  { label: 'Work', href: '#work' },
  { label: 'Stack', href: '#stack' },
  { label: 'Contact', href: '#contact' },
];

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false);
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open]);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${scrolled && !open ? 'glass border-x-0 border-t-0' : 'border-b border-transparent'}`}
    >
      <nav className="mx-auto flex h-16 max-w-page items-center justify-between px-6" aria-label="Main">
        <a href="#hero" className="relative z-50 flex items-center gap-2.5" onClick={() => setOpen(false)}>
          <TechFoxIcon size={26} color="#5ef2ff" />
          <span className="font-mono text-sm tracking-tight text-ink">marcela.ai</span>
        </a>

        <ul className="hidden items-center gap-8 md:flex">
          {navLinks.map((l) => (
            <li key={l.href}>
              <a href={l.href} className="text-sm text-ink-muted transition-colors hover:text-ink">
                {l.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-3">
          <Button href="#work-with-me" variant="primary" className="hidden px-5 py-2 text-sm sm:inline-flex">
            Book a session
          </Button>
          <button
            type="button"
            className="relative z-50 -mr-2 rounded-full p-2 text-ink md:hidden"
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
            aria-controls="mobile-menu"
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </nav>

      {open && (
        <div id="mobile-menu" className="fixed inset-0 z-40 flex flex-col bg-base/95 px-6 pt-24 backdrop-blur-xl md:hidden">
          <ul className="flex flex-col gap-2">
            {navLinks.map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="block border-b border-line py-4 text-2xl font-medium tracking-tight text-ink"
                >
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
          <Button href="#work-with-me" variant="primary" className="mt-10 w-full">
            Book a session
          </Button>
        </div>
      )}
    </header>
  );
}

import { useState, useEffect, useRef } from 'react';
import { Mail, Github, Phone, Download, Linkedin, ChevronDown, ChevronUp, Database, Code, Brain, Terminal, Menu, X } from 'lucide-react';
import { TechFox, TechFoxIcon } from './components/FoxMascot';
import { GlowOrb, GridBackground, SectionDivider } from './components/DecorativeElements';

// ─── Scroll Reveal Hook ───
function useScrollReveal() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) el.classList.add('visible'); },
      { threshold: 0.1 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);
  return ref;
}

function ScrollReveal({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  const ref = useScrollReveal();
  return <div ref={ref} className={`scroll-reveal ${className}`}>{children}</div>;
}

// ─── Typing Effect ───
function TypingText({ text, className = '' }: { text: string; className?: string }) {
  const [displayed, setDisplayed] = useState('');
  const [done, setDone] = useState(false);

  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      if (i < text.length) {
        setDisplayed(text.slice(0, i + 1));
        i++;
      } else {
        setDone(true);
        clearInterval(interval);
      }
    }, 50);
    return () => clearInterval(interval);
  }, [text]);

  return (
    <span className={className}>
      {displayed}
      {!done && <span className="animate-cursor-blink text-neon-cyan">|</span>}
    </span>
  );
}

// ─── Data ───
const isCzech = typeof navigator !== 'undefined' && navigator.language.startsWith('cs');

const projects = [
  {
    id: 'trefkara',
    title: 'Tref Kára',
    subtitle: isCzech ? 'AI car marketplace engine' : 'AI car marketplace engine',
    description: isCzech
      ? 'AI-powered marketplace engine pro automobilový trh. Web scraping agreguje data do MotherDuck Lakehouse, Claude API prioritizuje parametry (prestige, TCO, comfort) a generuje cenový index EV vs ICE v reálném čase.'
      : 'AI-powered automotive marketplace engine. Web scraping aggregates market data into a MotherDuck Lakehouse, Claude API prioritizes vehicle parameters (prestige, TCO, comfort), and generates real-time EV vs ICE price indexing.',
    stack: ['Python', 'DuckDB', 'Claude API', 'Web Scraping', 'Lakehouse'],
    color: 'cyan' as const,
    highlights: isCzech
      ? ['Lakehouse architektura na MotherDuck', 'AI scoring model pro prioritizaci vozidel', 'Cenový index EV vs ICE v reálném čase']
      : ['Lakehouse architecture on MotherDuck', 'AI scoring model for vehicle prioritization', 'Real-time EV vs ICE price indexing'],
    links: [
      { label: 'trefkaru.cz', url: 'https://www.trefkaru.cz/' },
    ],
  },
  {
    id: 'sousedi',
    title: isCzech ? 'Jak to mají sousedi' : 'Market Intelligence Engine',
    subtitle: isCzech ? 'B2B market intelligence' : 'Real-time B2B market intelligence',
    description: isCzech
      ? 'Kompletní data harvesting systém pro sledování cen služeb a dostupnosti poskytovatelů v B2B sektorech. Geospatial analýza podle regionů v Česku, sektorové filtrování a automatizovaný konkurenční benchmarking pro řemeslníky a firmy.'
      : 'Production-grade data harvesting system tracking service pricing and provider availability across B2B sectors in Czech Republic. Geospatial analysis by region, automated sector filtering, and competitive benchmarking for businesses and tradespeople.',
    stack: ['Python', 'SQL', 'Data Harvesting', 'Geospatial'],
    color: 'green' as const,
    highlights: isCzech
      ? ['Scraping a analýza trhu v reálném čase', 'Geospatial filtrování podle regionů', 'On-demand competitive analysis pro klienty']
      : ['Real-time market scraping and analysis', 'Geospatial filtering by region', 'On-demand competitive analysis for clients'],
  },
  {
    id: 'iiidm',
    title: 'IIIDM',
    subtitle: isCzech ? 'Full-stack apps & data pipelines' : 'Full-stack apps & data pipelines for global clients',
    description: isCzech
      ? 'Full-stack vývoj datově náročných aplikací pro mezinárodní konzultační firmu. Architektura Python backendů s interaktivními React frontendami, orchestrace automatizovaných měsíčních ETL pipeline a správa DuckDB/Supabase databází se 100% spolehlivostí.'
      : 'Full-stack development of data-intensive applications for an international consulting firm. Architecting Python backends with interactive React frontends, orchestrating automated monthly ETL pipelines, and managing DuckDB/Supabase database systems with 100% data reliability.',
    stack: ['Python', 'Supabase', 'DuckDB', 'Node.js', 'React'],
    color: 'purple' as const,
    highlights: isCzech
      ? ['Automatizované měsíční pipeline', '100% spolehlivost dat', 'Full-stack vývoj pro mezinárodní klienty']
      : ['Automated monthly update pipelines', '100% data reliability', 'Full-stack development for international clients'],
    links: [
      { label: 'iiidmic.com', url: 'https://iiidmic.com/' },
      { label: 'vykonar.iiidmic.com', url: 'https://vykonar.iiidmic.com/' },
    ],
  },
  {
    id: 'websites',
    title: isCzech ? 'Klientské weby' : 'Client Websites',
    subtitle: isCzech ? 'Responzivní webové aplikace' : 'Responsive web applications',
    description: isCzech
      ? 'Návrh a vývoj moderních responzivních webových aplikací pro malé a střední firmy v Česku. Technická SEO optimalizace, vlastní branding, mobile-first přístup a vysoký výkon na Google PageSpeed.'
      : 'Designing and developing modern responsive web applications for small and medium businesses. Technical SEO optimization, custom branding, mobile-first approach, and high Google PageSpeed performance scores.',
    stack: ['React', 'TailwindCSS', 'Node.js', 'SEO'],
    color: 'pink' as const,
    highlights: isCzech
      ? ['kurzystudiomirage.cz', 'kadernicehelena.cz', 'smooth-development.com']
      : ['kurzystudiomirage.cz', 'kadernicehelena.cz', 'smooth-development.com'],
    links: [
      { label: 'Studio Mirage', url: 'https://kurzystudiomirage.cz/' },
      { label: 'Kadeřnice Helena', url: 'https://www.kadernicehelena.cz/' },
      { label: 'Smooth Development', url: 'https://smooth-development.com/' },
    ],
  },
];

const techStack = {
  Languages: ['Python', 'SQL', 'JavaScript', 'TypeScript'],
  Data: ['DuckDB', 'Supabase', 'ETL Pipelines', 'Data Modeling'],
  Cloud: ['Google Cloud Platform', 'MotherDuck', 'Streamlit'],
  Frontend: ['React', 'Node.js', 'TailwindCSS', 'HTML/CSS'],
  AI: ['Claude API', 'LLM Integration', 'Scoring Models'],
  Tools: ['Git', 'REST APIs', 'Web Scraping', 'Automation'],
};

const experiences = [
  {
    title: isCzech ? 'Full-stack Developer & Data Systems Specialist' : 'Full-stack Developer & Data Systems Specialist',
    company: 'IIIDM international consulting',
    period: '2025 — Present',
    description: isCzech
      ? 'Architektura datově náročných full-stack aplikací, orchestrace automatizovaných ETL pipeline, správa DuckDB a Supabase databázových systémů pro mezinárodní klienty.'
      : 'Architecting data-intensive full-stack applications, orchestrating automated ETL pipelines, managing DuckDB and Supabase database systems for international clients.',
  },
  {
    title: isCzech ? 'Freelance Web Developer' : 'Freelance Web Developer',
    company: isCzech ? 'OSVČ' : 'Self-employed',
    period: '2025 — Present',
    description: isCzech
      ? 'Vývoj responzivních webových aplikací v React, Node.js a TailwindCSS. SEO optimalizace a mobile-first design pro malé a střední firmy.'
      : 'Building responsive web applications with React, Node.js, and TailwindCSS. SEO optimization and mobile-first design for small and medium businesses.',
  },
  {
    title: isCzech ? 'Zakladatelka & projektová administrátorka' : 'Founder & Project Administrator',
    company: 'Valeolla consulting',
    period: '2022 — 2025',
    description: isCzech
      ? 'Konzultační firma zaměřená na projektovou dokumentaci a administrativní infrastrukturu.'
      : 'Consulting firm focused on project documentation and administrative infrastructure.',
  },
];

const neonColors = {
  cyan: { text: 'text-neon-cyan', bg: 'bg-neon-cyan/10', border: 'border-neon-cyan/20', glow: 'border-glow-cyan', shadow: 'shadow-glow-cyan' },
  green: { text: 'text-neon-green', bg: 'bg-neon-green/10', border: 'border-neon-green/20', glow: 'border-glow-green', shadow: 'shadow-glow-green' },
  purple: { text: 'text-neon-purple', bg: 'bg-neon-purple/10', border: 'border-neon-purple/20', glow: 'border-glow-purple', shadow: 'shadow-glow-purple' },
  pink: { text: 'text-neon-pink', bg: 'bg-neon-pink/10', border: 'border-neon-pink/20', glow: 'border-glow-pink', shadow: 'shadow-glow-pink' },
};

// ─── Components ───

function ProjectCard({ project }: { project: typeof projects[0] }) {
  const c = neonColors[project.color];
  return (
    <div className={`glass-card rounded-xl p-6 md:p-8 ${c.glow} transition-all duration-300`}>
      <div className="flex items-start justify-between mb-4">
        <div>
          <h3 className={`font-mono font-bold text-xl md:text-2xl ${c.text}`}>{project.title}</h3>
          <p className="text-text-secondary text-sm mt-1">{project.subtitle}</p>
        </div>
        <Terminal size={20} className={`${c.text} opacity-50`} />
      </div>

      <p className="text-text-primary/80 leading-relaxed mb-5 text-sm md:text-base">{project.description}</p>

      <div className="flex flex-wrap gap-2 mb-5">
        {project.stack.map(tech => (
          <span key={tech} className={`neon-chip px-3 py-1 rounded text-xs font-mono ${c.bg} ${c.text} border ${c.border}`}>
            {tech}
          </span>
        ))}
      </div>

      <ul className="space-y-1.5 mb-4">
        {project.highlights.map((h, i) => (
          <li key={i} className="text-sm text-text-secondary flex items-start gap-2">
            <span className={`mt-1.5 w-1.5 h-1.5 rounded-full ${c.bg} ${c.text} flex-shrink-0`}>
              <span className={`block w-1.5 h-1.5 rounded-full bg-current`} />
            </span>
            {h}
          </li>
        ))}
      </ul>

      {project.links && (
        <div className="flex gap-3 mt-4 pt-4 border-t border-dark-border">
          {project.links.map(link => (
            <a key={link.url} href={link.url} target="_blank" rel="noopener noreferrer"
              className={`text-sm font-mono ${c.text} hover:underline opacity-70 hover:opacity-100 transition-opacity`}>
              {link.label} &rarr;
            </a>
          ))}
        </div>
      )}
    </div>
  );
}

function CollapsibleExperience() {
  const [open, setOpen] = useState(false);
  return (
    <div>
      <button
        onClick={() => setOpen(v => !v)}
        className="mb-8 px-6 py-3 rounded-lg bg-dark-elevated border border-dark-border hover:border-neon-cyan/30 transition-all duration-300 font-mono text-sm text-text-secondary hover:text-neon-cyan mx-auto flex items-center gap-2"
        aria-expanded={open}
      >
        <span className="text-neon-green">$</span>
        {open ? (isCzech ? 'hide_experience()' : 'hide_experience()') : (isCzech ? 'show_experience()' : 'show_experience()')}
        {open ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
      </button>
      <div className={`transition-all duration-500 overflow-hidden ${open ? 'max-h-[3000px] opacity-100' : 'max-h-0 opacity-0'}`}>
        {open && (
          <div className="space-y-6">
            {experiences.map((exp, idx) => {
              const colors = ['cyan', 'green', 'purple'] as const;
              const c = neonColors[colors[idx % 3]];
              return (
                <div key={idx} className="glass-card rounded-lg p-5 flex gap-4">
                  <div className="flex flex-col items-center pt-1">
                    <div className={`w-3 h-3 rounded-full ${c.bg} border ${c.border}`}>
                      <div className={`w-3 h-3 rounded-full bg-current ${c.text}`} />
                    </div>
                    {idx < experiences.length - 1 && <div className="w-px flex-1 bg-dark-border mt-2" />}
                  </div>
                  <div className="flex-1">
                    <h4 className="font-mono font-semibold text-text-primary">{exp.title}</h4>
                    <p className={`text-sm ${c.text} opacity-70`}>{exp.company}</p>
                    <p className="text-xs text-text-secondary mt-1 font-mono">{exp.period}</p>
                    <p className="text-sm text-text-secondary mt-2 leading-relaxed">{exp.description}</p>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

// ─── Main App ───
function App() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    setMenuOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  const navItems = [
    { id: 'about', label: 'about()' },
    { id: 'projects', label: 'projects()' },
    { id: 'stack', label: 'stack()' },
    { id: 'contact', label: 'connect()' },
  ];

  return (
    <div className="min-h-screen w-full bg-dark-primary text-text-primary font-body relative overflow-x-hidden">
      <GridBackground />

      {/* ══════ NAV ══════ */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled ? 'glass shadow-lg' : 'bg-transparent'
      }`}>
        <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
          <button onClick={() => scrollToSection('hero')} className="flex items-center gap-2 group">
            <TechFoxIcon size={24} className="group-hover:drop-shadow-[0_0_8px_rgba(0,255,255,0.5)] transition-all" />
            <span className="font-mono font-bold text-sm text-text-primary hidden sm:inline">
              marcela<span className="text-neon-cyan">.fullstackdev</span>
            </span>
          </button>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-2">
            {navItems.map(item => (
              <a
                key={item.id}
                href={`#${item.id}`}
                onClick={e => { e.preventDefault(); scrollToSection(item.id); }}
                className="px-3 py-1.5 text-xs font-mono text-text-secondary hover:text-neon-cyan transition-colors duration-300"
              >
                {item.label}
              </a>
            ))}
            <a
              href="https://buymeacoffee.com/marcelarezd"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-3 py-1.5 rounded border border-dark-border hover:border-neon-green/30 text-xs font-mono text-text-secondary hover:text-neon-green transition-all"
            >
              <span>&#9749;</span> <span>coffee</span>
            </a>
          </div>

          {/* Hamburger button — mobile only */}
          <button
            className="md:hidden p-2 text-text-secondary hover:text-neon-cyan transition-colors"
            onClick={() => setMenuOpen(v => !v)}
            aria-label="Toggle menu"
          >
            {menuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>

      </nav>

      {/* Mobile drawer overlay */}
      <div
        className={`fixed inset-0 z-40 md:hidden transition-all duration-300 ${menuOpen ? 'visible' : 'invisible'}`}
        onClick={() => setMenuOpen(false)}
      >
        <div className={`absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity duration-300 ${menuOpen ? 'opacity-100' : 'opacity-0'}`} />
      </div>

      {/* Mobile drawer */}
      <div
        className={`fixed top-0 right-0 h-full w-72 z-50 md:hidden flex flex-col transform transition-transform duration-300 ease-in-out ${menuOpen ? 'translate-x-0' : 'translate-x-full'}`}
        style={{ background: 'rgba(10,10,10,0.97)', backdropFilter: 'blur(20px)', borderLeft: '1px solid rgba(255,255,255,0.08)' }}
      >
        <div className="flex items-center justify-between px-6 py-5 border-b border-dark-border">
          <span className="font-mono text-xs text-neon-green">$ menu</span>
          <button onClick={() => setMenuOpen(false)} className="p-1 text-text-secondary hover:text-neon-cyan transition-colors">
            <X size={20} />
          </button>
        </div>
        <div className="flex flex-col gap-1 p-4 flex-1">
          {navItems.map((item, i) => (
            <button
              key={item.id}
              onClick={() => scrollToSection(item.id)}
              className="flex items-center gap-3 text-left px-4 py-4 rounded-xl font-mono text-base text-text-secondary hover:text-neon-cyan hover:bg-neon-cyan/5 border border-transparent hover:border-neon-cyan/20 transition-all duration-200"
              style={{ transitionDelay: menuOpen ? `${i * 40}ms` : '0ms' }}
            >
              <span className="text-neon-green text-sm">$</span>
              {item.label}
            </button>
          ))}
        </div>
        <div className="px-4 pb-8">
          <a
            href="https://buymeacoffee.com/marcelarezd"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 px-4 py-4 rounded-xl font-mono text-sm text-text-secondary hover:text-neon-green hover:bg-neon-green/5 border border-dark-border hover:border-neon-green/20 transition-all duration-200"
          >
            <span>&#9749;</span> buy me a coffee
          </a>
        </div>
      </div>

      {/* ══════ HERO ══════ */}
      <header>
      <section id="hero" className="relative min-h-screen flex items-center overflow-hidden">
        {/* Glow orbs */}
        <GlowOrb color="rgba(0, 255, 255, 0.15)" size={400} top="-10%" right="-5%" />
        <GlowOrb color="rgba(191, 90, 242, 0.1)" size={300} bottom="10%" left="-10%" />

        <div className="relative z-10 max-w-6xl mx-auto px-6 py-20 md:py-32 w-full">
          <div className="flex flex-col-reverse lg:flex-row items-center gap-10 lg:gap-16">
            {/* Text side */}
            <div className="flex-1 text-center lg:text-left">
              <p className="font-mono text-sm text-neon-green mb-4 animate-fade-in">
                <span className="text-text-secondary">&gt;</span> marcela.init()
              </p>

              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-mono font-bold tracking-tight mb-4 leading-[1.1]">
                <TypingText 
                 text={isCzech ? 'Stavím datové systémy pro jasná rozhodnutí.' : 'I build data systems for clear insights.'}
                  className="text-glow-cyan"
                />
              </h1>

              <p className="text-lg md:text-xl text-text-secondary mb-8 leading-relaxed max-w-xl animate-fade-in stagger-2" style={{ animationFillMode: 'both' }}>
                {isCzech ? 'Data Engineer & Full-stack Developer' : 'Data Engineer & Full-stack Developer'}
                <span className="block mt-1 text-sm text-text-secondary/60 font-mono">Python · DuckDB · AI · React · Czech Republic</span>
              </p>

              <div className="flex flex-wrap gap-2 mb-10 justify-center lg:justify-start animate-fade-in stagger-3" style={{ animationFillMode: 'both' }}>
                {['Python', 'SQL', 'DuckDB', 'Node.js', 'GCP', 'Claude API'].map((tech, i) => {
                  const colors = ['text-neon-cyan', 'text-neon-green', 'text-neon-purple', 'text-neon-cyan', 'text-neon-green', 'text-neon-pink'];
                  return (
                    <span key={tech} className={`neon-chip px-3 py-1 rounded text-xs font-mono border border-dark-border hover:border-dark-border-glow ${colors[i]} bg-dark-elevated`}>
                      {tech}
                    </span>
                  );
                })}
              </div>

              <div className="flex flex-col sm:flex-row gap-3 justify-center lg:justify-start animate-fade-in stagger-4" style={{ animationFillMode: 'both' }}>
                <a
                  href="#contact"
                  onClick={e => { e.preventDefault(); scrollToSection('contact'); }}
                  className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-neon-cyan/10 border border-neon-cyan/30 text-neon-cyan font-mono text-sm hover:bg-neon-cyan/20 hover:shadow-glow-cyan transition-all duration-300 text-center"
                >
                  &gt; connect()
                </a>
                <a
                  href="#projects"
                  onClick={e => { e.preventDefault(); scrollToSection('projects'); }}
                  className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-dark-elevated border border-dark-border text-text-secondary font-mono text-sm hover:border-dark-border-glow hover:text-text-primary transition-all duration-300 text-center"
                >
                  &gt; view_work()
                </a>
              </div>
            </div>

            {/* Profile + Fox side */}
            <div className="flex-shrink-0 relative animate-fade-in stagger-3 mb-8 lg:mb-0" style={{ animationFillMode: 'both' }}>
              <div className="profile-glow w-40 h-40 sm:w-48 sm:h-48 md:w-56 md:h-56 rounded-full overflow-hidden">
                <img src="/profile.png" alt="Marcela Rezkova — Technical Data Engineer and Full-stack Developer based in Czech Republic" className="w-full h-full object-cover" />
              </div>
              <div className="absolute -bottom-5 -right-5">
                <TechFox size={50} animated color="#00ffff" className="animate-float" />
              </div>
            </div>
          </div>
        </div>
      </section>
      </header>

      <main>
      <SectionDivider />

      {/* ══════ ABOUT ══════ */}
      <section id="about" className="py-16 md:py-24 px-6 relative">
        <GlowOrb color="rgba(57, 255, 20, 0.08)" size={250} top="20%" left="-5%" />
        <div className="max-w-6xl mx-auto relative z-10">
          <ScrollReveal>
            <p className="font-mono text-sm text-neon-green mb-3">
              <span className="text-text-secondary">&gt;</span> about.read()
            </p>
            <h2 className="text-3xl md:text-4xl font-mono font-bold mb-12">
              {isCzech ? 'Data Engineering, AI & Full-stack Development' : 'Data Engineering, AI & Full-stack Development'}
            </h2>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                icon: <Database size={24} />,
                title: 'Data Engineering',
                description: isCzech
                  ? 'Návrh a orchestrace ETL pipelines, lakehouse architektura na MotherDuck a DuckDB, správa databází v Supabase. Automatizované datové pipeline se 100% spolehlivostí pro globální klienty.'
                  : 'Designing and orchestrating production ETL pipelines, lakehouse architecture on MotherDuck and DuckDB, database management with Supabase. Automated data pipelines with 100% reliability for global clients.',
                color: 'cyan' as const,
              },
              {
                icon: <Brain size={24} />,
                title: 'AI Integration',
                description: isCzech
                  ? 'Integrace LLM modelů přes Claude API a Anthropic SDK. Vývoj AI scoring modelů, konverzačních rozhraní a inteligentních nástrojů pro automatizaci business rozhodování.'
                  : 'LLM integration via Claude API and Anthropic SDK. Building AI-powered scoring models, conversational interfaces, and intelligent tools that automate business decision-making.',
                color: 'purple' as const,
              },
              {
                icon: <Code size={24} />,
                title: 'Full-stack Development',
                description: isCzech
                  ? 'Kompletní full-stack vývoj v React, Node.js a TailwindCSS. Od Python backendů a REST API po responzivní webové aplikace optimalizované pro výkon a SEO.'
                  : 'End-to-end full-stack development with React, Node.js, and TailwindCSS. From Python backends and REST APIs to responsive, performance-optimized web applications.',
                color: 'green' as const,
              },
            ].map(card => {
              const c = neonColors[card.color];
              return (
                <ScrollReveal key={card.title}>
                  <div className={`glass-card rounded-xl p-6 h-full ${c.glow}`}>
                    <div className={`${c.text} mb-4`}>{card.icon}</div>
                    <h3 className="font-mono font-semibold text-lg mb-3 text-text-primary">{card.title}</h3>
                    <p className="text-sm text-text-secondary leading-relaxed">{card.description}</p>
                  </div>
                </ScrollReveal>
              );
            })}
          </div>
        </div>
      </section>

      <SectionDivider />

      {/* ══════ PROJECTS ══════ */}
      <section id="projects" className="py-16 md:py-24 px-6 relative">
        <GlowOrb color="rgba(0, 255, 255, 0.08)" size={300} top="10%" right="-10%" />
        <GlowOrb color="rgba(191, 90, 242, 0.06)" size={200} bottom="20%" left="5%" />
        <div className="max-w-6xl mx-auto relative z-10">
          <ScrollReveal>
            <p className="font-mono text-sm text-neon-green mb-3">
              <span className="text-text-secondary">&gt;</span> projects.list()
            </p>
            <h2 className="text-3xl md:text-4xl font-mono font-bold mb-4">
              {isCzech ? 'Power Projects' : 'Power Projects'}
            </h2>
            <p className="text-text-secondary mb-12 max-w-xl">
              {isCzech
                ? 'AI-powered datové systémy, market intelligence a full-stack aplikace. Reálné problémy, měřitelné výsledky.'
                : 'AI-powered data systems, market intelligence engines, and full-stack applications. Real problems, measurable results.'}
            </p>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {projects.map(project => (
              <ScrollReveal key={project.id}>
                <ProjectCard project={project} />
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      <SectionDivider />

      {/* ══════ TECH STACK ══════ */}
      <section id="stack" className="py-16 md:py-24 px-6 relative">
        <div className="max-w-6xl mx-auto relative z-10">
          <ScrollReveal>
            <p className="font-mono text-sm text-neon-green mb-3">
              <span className="text-text-secondary">&gt;</span> stack.inspect()
            </p>
            <h2 className="text-3xl md:text-4xl font-mono font-bold mb-12">
              Tech Stack
            </h2>
          </ScrollReveal>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {Object.entries(techStack).map(([category, techs]) => {
              const colorMap: Record<string, keyof typeof neonColors> = {
                Languages: 'cyan', Data: 'green', Cloud: 'purple',
                Frontend: 'pink', AI: 'cyan', Tools: 'green',
              };
              const c = neonColors[colorMap[category] || 'cyan'];
              return (
                <ScrollReveal key={category}>
                  <div className="glass-card rounded-xl p-5">
                    <h3 className={`font-mono font-semibold text-sm mb-4 ${c.text} uppercase tracking-wider`}>{category}</h3>
                    <div className="flex flex-wrap gap-2">
                      {techs.map(tech => (
                        <span key={tech} className={`neon-chip px-3 py-1.5 rounded text-xs font-mono ${c.bg} ${c.text} border ${c.border}`}>
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </ScrollReveal>
              );
            })}
          </div>
        </div>
      </section>

      <SectionDivider />

      {/* ══════ EXPERIENCE ══════ */}
      <section id="experience" className="py-16 md:py-24 px-6 relative">
        <div className="max-w-4xl mx-auto relative z-10">
          <ScrollReveal>
            <p className="font-mono text-sm text-neon-green mb-3">
              <span className="text-text-secondary">&gt;</span> experience.log()
            </p>
            <h2 className="text-3xl md:text-4xl font-mono font-bold mb-12">
              {isCzech ? 'Zkušenosti' : 'Experience'}
            </h2>
          </ScrollReveal>
          <ScrollReveal>
            <CollapsibleExperience />
          </ScrollReveal>
        </div>
      </section>

      <SectionDivider />

      {/* ══════ CONTACT ══════ */}
      <section id="contact" className="py-16 md:py-24 px-6 relative">
        <GlowOrb color="rgba(0, 255, 255, 0.1)" size={300} top="0%" right="10%" />
        <div className="max-w-3xl mx-auto text-center relative z-10">
          <ScrollReveal>
            <p className="font-mono text-sm text-neon-green mb-3">
              <span className="text-text-secondary">&gt;</span> marcela.connect()
            </p>
            <h2 className="text-3xl md:text-4xl font-mono font-bold mb-6">
              {isCzech ? "Pojďme spolupracovat." : "Let's build something that matters."}
            </h2>
            <p className="text-text-secondary mb-12 max-w-lg mx-auto">
              {isCzech
                ? 'Hledáte data engineera pro ETL pipelines a lakehouse architekturu, full-stack developera pro webové aplikace, nebo partnera pro AI integraci? Ozvěte se.'
                : "Need a data engineer for ETL pipelines and lakehouse architecture, a full-stack developer for web applications, or a partner for AI integration? Let's talk."}
            </p>
          </ScrollReveal>

          <ScrollReveal>
            <div className="flex flex-wrap gap-3 justify-center">
              <a href="tel:+420734424465" className="flex items-center gap-2 px-5 py-3 rounded-lg glass-card border-glow-cyan font-mono text-sm text-text-secondary hover:text-neon-cyan transition-all">
                <Phone size={16} /> <span className="text-neon-green">$</span> {isCzech ? 'call' : 'call'}
              </a>
              <button
                onClick={() => { const u = 'marcelarezkova98'; const d = 'icloud.com'; window.location.href = `mailto:${u}@${d}`; }}
                className="flex items-center gap-2 px-5 py-3 rounded-lg glass-card border-glow-green font-mono text-sm text-text-secondary hover:text-neon-green transition-all"
              >
                <Mail size={16} /> <span className="text-neon-green">$</span> {isCzech ? 'napište mi' : 'email'}
              </button>
              <a href="https://github.com/marcelrezkova" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 px-5 py-3 rounded-lg glass-card border-glow-purple font-mono text-sm text-text-secondary hover:text-neon-purple transition-all">
                <Github size={16} /> <span className="text-neon-green">$</span> github
              </a>
              <a href="https://www.linkedin.com/in/marcelrezkova/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 px-5 py-3 rounded-lg glass-card border-glow-cyan font-mono text-sm text-text-secondary hover:text-neon-cyan transition-all">
                <Linkedin size={16} /> <span className="text-neon-green">$</span> linkedin
              </a>
              <a href="/MarcelaRezkovaResume.pdf" download className="flex items-center gap-2 px-5 py-3 rounded-lg glass-card border-glow-pink font-mono text-sm text-text-secondary hover:text-neon-pink transition-all">
                <Download size={16} /> <span className="text-neon-green">$</span> resume
              </a>
            </div>
          </ScrollReveal>
        </div>
      </section>

      </main>
      <SectionDivider />

      {/* ══════ FOOTER ══════ */}
      <footer className="py-12 px-6">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <TechFoxIcon size={20} color="#00ffff" />
            <p className="text-xs text-text-secondary font-mono">
              &copy; 2025 Marcela Rezkova
            </p>
          </div>
          <p className="text-xs text-text-secondary font-mono opacity-50">
            Built with React + caffeine
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;

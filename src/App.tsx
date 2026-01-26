// Collapsible sekce pro Experience
import { useState, useEffect } from 'react';

function CollapsibleExperience({ isCzech }: { isCzech: boolean }) {
  const [open, setOpen] = useState(false);
  return (
    <div>
      <button
        onClick={() => setOpen((v: boolean) => !v)}
        className="mb-8 px-6 py-3 border border-black dark:border-white rounded-full bg-white dark:bg-black text-black dark:text-white hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-all duration-300 font-semibold text-lg mx-auto block"
        aria-expanded={open}
        aria-controls="experience-content"
      >
        {open ? (isCzech ? 'Skrýt zkušenosti' : 'Hide Experience') : (isCzech ? 'Zobrazit zkušenosti' : 'Show Experience')}
      </button>
      <div id="experience-content" className={`transition-all duration-500 overflow-hidden ${open ? 'max-h-[4000px] opacity-100' : 'max-h-0 opacity-0'}`}>
        {open && (
          <>
            <div className="space-y-16">
              {isCzech ? (
                <>
                  <ExperienceCard
                    title="Data analytička"
                    company="IIIDM international consulting"
                    period="07/2025 - současnost"
                    description="Práce na kvalitě dat a automatizaci v mezinárodním prostředí. Python skripty pro validaci, API integrace a optimalizaci ETL. Vývoj Streamlit aplikací pro kontrolu dat a interní dashboardy."
                    highlights={["Automatizace v Pythonu & API integrace","Vývoj dashboardů ve Streamlit","Projekty v oblasti realitní analytiky","Správa dat z více zdrojů"]}
                  />
                  <ExperienceCard
                    title="Freelance web developerka"
                    company="OSVČ"
                    period="01/2025 - současnost"
                    description="Návrh a tvorba responzivních webů pro malé firmy s využitím moderních technologií. Důraz na čistý UX a udržitelnost kódu."
                    highlights={["Vývoj v Node.js & TailwindCSS","Individuální digitální řešení","Design orientovaný na klienta"]}
                  />
                  <ExperienceCard
                    title="Zakladatelka & projektová administrátorka"
                    company="Valeolla consulting"
                    period="05/2022 - 10/2025"
                    description="Založení a vedení konzultační firmy zaměřené na administrativní podporu a dotační dokumentaci pro veřejný i soukromý sektor."
                    highlights={["Řízení provozu firmy","Koordinace projektů","Konzultace pro veřejný i soukromý sektor"]}
                  />
                  <ExperienceCard
                    title="Manažerka obchodního týmu"
                    company="DoxoLogic - Cybersecurity Solutions"
                    period="12/2022 - 12/2023"
                    description="Vedení týmu 4 obchodníků zaměřených na kybernetickou bezpečnost a IT infrastrukturu. 20% měsíční zlepšení výkonu díky datově řízeným strategiím."
                    highlights={["Vedení týmu & sledování výkonu","Analýza konverzních metrik","Překlad technických řešení","20% zlepšení výkonu"]}
                  />
                  <ExperienceCard
                    title="Obchodní zástupkyně"
                    company="Bohemia Energy"
                    period="07/2020 - 10/2021"
                    description="Budování portfolia 200+ aktivních klientů s průměrnou konverzí 80 %. Pravidelné překonávání měsíčních cílů o 15–25 % díky efektivní komunikaci."
                    highlights={["80% konverzní úspěšnost","Portfolio 200+ klientů","Trvalé překonávání cílů","Správa vztahů s klienty"]}
                  />
                </>
              ) : (
                <>
                  <ExperienceCard
                    title="Data Analyst"
                    company="IIIDM international consulting"
                    period="07/2025 - Present"
                    description="Working on data quality and automation in an international environment. Python scripts for validation, API integration, and ETL optimization. Developing Streamlit apps for data review and internal dashboards."
                    highlights={["Python automation & API integration","Streamlit dashboard development","Real estate analytics projects","Managing data from multiple sources"]}
                  />
                  <ExperienceCard
                    title="Freelance Web Developer"
                    company="Self-employed"
                    period="01/2025 - Present"
                    description="Designing and building responsive websites for small businesses using modern technologies. Focus on clean UX and sustainable code."
                    highlights={["Node.js & TailwindCSS development","Custom digital solutions","Client-oriented design"]}
                  />
                  <ExperienceCard
                    title="Founder & Project Administrator"
                    company="Valeolla consulting"
                    period="05/2022 - 10/2025"
                    description="Founded and managed a consulting company focused on administrative support and grant documentation for public and private sectors."
                    highlights={["Company operations management","Project coordination","Consulting for public & private sector"]}
                  />
                  <ExperienceCard
                    title="Sales Team Manager"
                    company="DoxoLogic - Cybersecurity Solutions"
                    period="12/2022 - 12/2023"
                    description="Led a team of 4 salespeople focused on cybersecurity and IT infrastructure. Achieved 20% monthly performance improvement through data-driven strategies."
                    highlights={["Team leadership & performance tracking","Conversion metrics analysis","Translating technical solutions","20% performance improvement"]}
                  />
                  <ExperienceCard
                    title="Sales Representative"
                    company="Bohemia Energy"
                    period="07/2020 - 10/2021"
                    description="Built a portfolio of 200+ active clients with an average conversion rate of 80%. Consistently exceeded monthly targets by 15–25% through effective communication."
                    highlights={["80% conversion success","200+ client portfolio","Consistently exceeding targets","Client relationship management"]}
                  />
                </>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
}

const PortfolioCard = ({ title, description, url, isCzech }: { title: string; description: string; url: string; isCzech: boolean }) => (
  <div className="flex-1 min-w-[260px] max-w-[340px] bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl shadow-md p-6 flex flex-col justify-between">
    <div>
      <h3 className="text-xl font-semibold mb-3 text-gray-900 dark:text-white">{title}</h3>
      <p className="text-gray-700 dark:text-gray-300 mb-6 text-sm">{description}</p>
    </div>
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="mt-auto inline-block px-6 py-2 border border-black dark:border-white rounded-full bg-black text-white dark:bg-white dark:text-black hover:bg-gray-800 dark:hover:bg-gray-200 transition-all duration-300 text-sm font-medium text-center"
    >
      {isCzech ? 'Zobrazit projekt' : 'View Project'}
    </a>
  </div>
);

import { Mail, Github } from 'lucide-react';

function App() {
  const [scrolled, setScrolled] = useState(false);
  const [showPortfolio, setShowPortfolio] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  // Detekce jazyka podle browseru (region/VPN)
  const isCzech = typeof navigator !== 'undefined' && navigator.language.startsWith('cs');

  return (
    <div className="min-h-screen bg-white dark:bg-black text-black dark:text-white transition-colors duration-500">

        <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled ? 'bg-white/80 dark:bg-black/80 backdrop-blur-lg shadow-sm' : 'bg-transparent'
        }`}>
          <div className="max-w-7xl mx-auto px-6 py-6 flex justify-end items-center">
            <a
              href="https://buymeacoffee.com/marcelarezd"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 ml-4 px-3 py-2 rounded-full hover:shadow-lg transition-all group"
              title={isCzech ? 'Podporuje Apple Pay, Google Pay, karty a další.' : 'Supports Apple Pay, Google Pay, cards and more.'}
              style={{ background: 'rgba(255,221,0,0.08)' }}
            >
              <svg width="32" height="32" viewBox="0 0 512 512" fill="none" xmlns="http://www.w3.org/2000/svg" className="inline-block align-middle group-hover:scale-110 transition-transform duration-200" style={{ verticalAlign: 'middle', boxShadow: '0 2px 8px rgba(0,0,0,0.08)' }}>
                <rect width="512" height="512" rx="256" fill="#FFDD00" />
                <path d="M160 320c0 26.5 21.5 48 48 48h96c26.5 0 48-21.5 48-48V224H160v96z" fill="#fff" />
                <path d="M208 224v-24c0-26.5 21.5-48 48-48s48 21.5 48 48v24" stroke="#222" strokeWidth="16" strokeLinecap="round" />
              </svg>
              <span className="hidden md:inline text-sm font-medium text-gray-700 dark:text-gray-200 group-hover:text-black dark:group-hover:text-yellow-900 transition-colors duration-200">
                {isCzech ? 'Na kávu' : 'Support with coffee'}
              </span>
              <span className="sr-only">Buy Me a Coffee</span>
            </a>
          </div>
        </nav>

        <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden">
            <div
              className="absolute inset-0 opacity-40 dark:opacity-60"
              style={{
                backgroundImage: 'url(/assets/20251116_2042_Emerging Data Elegance_simple_compose_01ka7312jveearz8js6wp07kbn.png)',
                backgroundSize: 'cover',
                backgroundPosition: 'center'
              }}
            />

          <div className="relative z-10 text-center px-6 max-w-4xl">
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-light tracking-tight mb-6 animate-fade-in">
              {isCzech ? 'Marcela Řezková' : 'Marcela Rezkova'}
            </h1>
            <p className="text-xl md:text-2xl font-light text-gray-600 dark:text-gray-400 mb-12 tracking-wide">
              Data Science · Full stack developer · Web Developer
            </p>
            <button
              onClick={() => scrollToSection('contact')}
              className="px-8 py-4 border border-black dark:border-white hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-all duration-300 text-sm tracking-widest uppercase"
            >
              {isCzech ? 'Spojit se' : 'Contact me'}
            </button>
            <div className="mt-12">
              <button
                className="px-8 py-4 border border-black dark:border-white hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-all duration-300 text-sm tracking-widest uppercase mb-8"
                onClick={() => setShowPortfolio((v: boolean) => !v)}
              >
                {isCzech ? 'Portfolio' : 'Portfolio'}
              </button>
              {showPortfolio && (
                <div>
                  <div className="flex flex-col md:flex-row gap-8 justify-center items-stretch">
                    <PortfolioCard
                      title={isCzech ? 'Studio Mirage' : 'Studio Mirage'}
                      description={isCzech
                        ? 'Web pro vzdělávací studio zaměřené na kurzy, workshopy a rozvoj dovedností. Moderní design, optimalizace pro SEO, responzivní rozhraní.'
                        : 'Website for an educational studio focused on courses, workshops, and skill development. Modern design, SEO optimization, responsive UI.'}
                      url="https://kurzystudiomirage.cz/"
                      isCzech={isCzech}
                    />
                    <PortfolioCard
                      title={isCzech ? 'Kadeřnice Helena' : 'Helena Hairdresser'}
                      description={isCzech
                        ? 'Prezentace služeb kadeřnictví s důrazem na jednoduchost, rychlost a přehlednost. Vlastní branding, optimalizace pro mobilní zařízení.'
                        : 'Showcase for a hairdresser’s services, focused on simplicity, speed, and clarity. Custom branding, mobile optimization.'}
                      url="https://www.kadernicehelena.cz/"
                      isCzech={isCzech}
                    />
                  </div>
                </div>
              )}
            </div>
              {/* Odkaz na kávu bude v patičce */}

          </div>
        </section>

        {/* <section id="letter" className="py-32 px-6 bg-gray-50 dark:bg-gray-950">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-light tracking-tight mb-16 text-center">
              {isCzech ? 'Pár slov o mě' : 'A few words about me'}
            </h2>

            <div className="space-y-8 text-lg md:text-xl leading-relaxed font-light text-gray-700 dark:text-gray-300">
              {isCzech ? (
                <>
                  <p>
                  Datově orientovaný profil zaměřený na průnik byznysového myšlení, analytiky a vývoje softwaru.
                  Pohodlný v agilním prostředí, se schopností převzít odpovědnost a doručovat výsledky i samostatně.
                  Komplexita se převádí do struktury, protože výsledky jsou měřitelné.
                  </p>

                  <p>
                  Nekonvenční profesní cesta formovaná prodejem, provozem a rozvojem byznysu.
                  Tento základ přináší hluboké porozumění reálným potřebám firem, fungování týmů a rozhodovacím procesům.
                  Přirozená zvědavost vedla k technologiím, systémům a datům, od porozumění výstupům až po jejich technickou realizaci.
                  </p>

                  <p>
                  Aktuální fokus spojuje byznysový kontext s technickou exekucí.
                  Procesy jsou automatizovány pomocí Pythonu, datové sady analyzovány v DuckDB a SQL
                  a výstupy prezentovány prostřednictvím aplikací ve Streamlitu a dashboardů postavených v Reactu.
                  Prioritou zůstává praktický dopad: přehlednost, efektivita a škálovatelná řešení.
                  </p>
                </>
              ) : (
                <>
                  <p>
                  A data-driven profile focused on the intersection of business thinking, analytics, and software development.
                  Comfortable in agile environments, with the ability to take ownership and deliver independently when needed.
                  Complexity is translated into structure, because outcomes are measurable.
                  </p>

                  <p>
                  An unconventional background shaped through sales, operations, and business development.
                  This foundation brings a strong understanding of real business needs, team dynamics, and decision-making processes.
                  Curiosity naturally led toward technology, systems, and data, from understanding outputs to building them.
                  </p>

                  <p>
                  Current focus lies in connecting business context with technical execution.
                  Processes are automated using Python, datasets analyzed with DuckDB and SQL, and insights delivered through Streamlit applications and React-based dashboards.
                  The priority remains practical impact: clarity, efficiency, and scalable solutions.
                  </p>
                </>
              )}
            </div>
          </div>
        </section> */}

        <section id="experience" className="py-32 px-6">
          <div className="max-w-6xl mx-auto">
            <CollapsibleExperience isCzech={isCzech} />
          </div>
        </section>

        <section id="skills" className="py-32 px-6 bg-gray-50 dark:bg-gray-950">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-light tracking-tight mb-20 text-center">
              Skills
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-16">
              <SkillCategory
                title="Data & Analytics"
                skills={[
                  { name: 'Python', level: 'Upper-Intermediate' },
                  { name: 'SQL', level: 'Upper-Intermediate' },
                  { name: 'Data Analysis', level: 'Upper-Intermediate' },
                  { name: 'DuckDB', level: 'Upper-Intermediate' },
                  { name: 'Supabase', level: 'Intermediate-Plus' },
                  { name: 'Streamlit', level: 'Advanced' },
                  { name: 'Data Visualization', level: 'Intermediate-Plus' },
                  { name: 'ETL Pipelines', level: 'Intermediate-Plus' }
                ]}
              />

              <SkillCategory
                title="Development"
                skills={[
                  { name: 'Web Development', level: 'Intermediate' },
                  { name: 'HTML/CSS/JavaScript/React', level: 'Intermediate' },
                  { name: 'Node.js', level: 'Intermediate' },
                  { name: 'TailwindCSS', level: 'Intermediate' },
                  { name: 'API Integration', level: 'Upper-Intermediate' },
                  { name: 'Automation', level: 'Upper-Intermediate' },
                  { name: 'REST APIs', level: 'Intermediate-Plus' },
                  { name: 'Git', level: 'Intermediate' }
                ]}
              />

              <SkillCategory
                title="Business"
                skills={[
                  { name: 'Business Development', level: 'Intermediate' },
                  { name: 'Process Optimization', level: 'Intermediate-Plus' },
                  { name: 'Analytical Thinking', level: 'Advanced' },
                  { name: 'Agile Methodologies', level: 'Intermediate' },
                ]}
              />

              {/* <SkillCategory
                title="Branding & Media Skills"
                skills={[
                  { name: 'Personal Branding', level: 'Intermediate-Plus' },
                  { name: 'Content Strategy', level: 'Intermediate-Plus' },
                  { name: 'Creative Direction', level: 'Advanced' },
                ]}
              /> */}
            </div>
          </div>
        </section>

        <section id="contact" className="py-32 px-6">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-4xl md:text-5xl font-light tracking-tight mb-16">
              {isCzech ? 'Spojme se' : "Let's Connect"}
            </h2>

            <p className="text-xl font-light text-gray-600 dark:text-gray-400 mb-12 leading-relaxed">
              {isCzech
                ? "Ať už hledáte datovou analytičku, která je otevřena businessu, vývojářku, nebo si chcete jen popovídat o nápadech ráda se s vámi spojím."
                : "Whether you're looking for a data analyst who understands business, a developer, or simply want to discuss ideas. I'd love to hear from you."}
            </p>

            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
              <a
                href="tel:734424465"
                className="flex items-center gap-3 px-8 py-4 border border-black dark:border-white hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-all duration-300 text-sm tracking-widest uppercase w-full sm:w-auto justify-center"
              >
                {/* Phone SVG icon */}
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 24 24"><path d="M6.62 10.79a15.053 15.053 0 006.59 6.59l2.2-2.2a1 1 0 011.11-.21c1.21.49 2.53.76 3.88.76a1 1 0 011 1v3.5a1 1 0 01-1 1C10.07 22 2 13.93 2 4a1 1 0 011-1h3.5a1 1 0 011 1c0 1.35.27 2.67.76 3.88a1 1 0 01-.21 1.11l-2.2 2.2z"/></svg>
                {isCzech ? 'Zavolejte' : 'Call'}
              </a>
              <a
                href="mailto:marcelarezkova98@gmail.com"
                className="flex items-center gap-3 px-8 py-4 border border-black dark:border-white hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-all duration-300 text-sm tracking-widest uppercase w-full sm:w-auto justify-center"
              >
                <Mail size={20} />
                {isCzech ? 'Email' : 'Email'}
              </a>

              <a
                href="https://github.com/marcelrezkova"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 px-8 py-4 border border-black dark:border-white hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-all duration-300 text-sm tracking-widest uppercase w-full sm:w-auto justify-center"
              >
                <Github size={20} />
                GitHub
              </a>

              <a
                href="https://www.linkedin.com/in/marcelrezkova/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 px-8 py-4 border border-black dark:border-white hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-all duration-300 text-sm tracking-widest uppercase w-full sm:w-auto justify-center"
              >
                {/* LinkedIn SVG ikona */}
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-10h3v10zm-1.5-11.268c-.966 0-1.75-.784-1.75-1.75s.784-1.75 1.75-1.75 1.75.784 1.75 1.75-.784 1.75-1.75 1.75zm13.5 11.268h-3v-5.604c0-1.337-.026-3.063-1.868-3.063-1.868 0-2.154 1.459-2.154 2.967v5.7h-3v-10h2.881v1.367h.041c.401-.761 1.379-1.563 2.838-1.563 3.036 0 3.599 2 3.599 4.594v5.602z"/></svg>
                LinkedIn
              </a>
              <a
                href="/MarcelaRezkova_Resume.pdf"
                download
                className="flex items-center gap-3 px-8 py-4 border border-black dark:border-white hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-all duration-300 text-sm tracking-widest uppercase w-full sm:w-auto justify-center"
              >
                {/* Resume SVG ikona */}
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 24 24"><path d="M12 16l4-5h-3V4h-2v7H8l4 5zm8 2H4v2h16v-2z"/></svg>
                Resume
              </a>
            </div>
          </div>
        </section>

        <footer className="py-12 px-6 border-t border-gray-200 dark:border-gray-800">
          <div className="max-w-6xl mx-auto text-center">
            <p className="text-sm font-light text-gray-500 tracking-wide">
              © 2025 {isCzech ? 'Marcela Řezková' : 'Marcela Rezkova'}
            </p>
          </div>
        </footer>
    </div>
  );
}

function ExperienceCard({ title, company, period, description, highlights }: {
  title: string;
  company: string;
  period: string;
  description: string;
  highlights: string[];
}) {
  return (
    <div className="group">
      <div className="border-l-2 border-gray-300 dark:border-gray-700 pl-8 pb-8 hover:border-black dark:hover:border-white transition-colors">
        <div className="mb-4">
          <h3 className="text-2xl font-normal tracking-tight mb-2">{title}</h3>
          <p className="text-lg text-gray-600 dark:text-gray-400 font-light">{company}</p>
          <p className="text-sm text-gray-500 dark:text-gray-500 font-light tracking-wide mt-1">{period}</p>
        </div>

        <p className="text-gray-700 dark:text-gray-300 mb-4 leading-relaxed">{description}</p>

        <ul className="space-y-2">
          {highlights.map((highlight, idx) => (
            <li key={idx} className="text-sm text-gray-600 dark:text-gray-400 flex items-start gap-2">
              <span className="mt-1.5 w-1 h-1 rounded-full bg-gray-400 dark:bg-gray-600 flex-shrink-0" />
              {highlight}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

type Skill = { name: string; level: string };
function SkillCategory({ title, skills }: { title: string; skills: Skill[] }) {
  return (
    <div>
      <h3 className="text-xl font-normal tracking-tight mb-6 border-b border-gray-300 dark:border-gray-700 pb-3">
        {title}
      </h3>
      <div className="flex flex-wrap gap-3">
        {skills.map((skill, idx) => (
          <span
            key={idx}
            className="px-4 py-2 text-sm border border-gray-300 dark:border-gray-700 hover:border-black dark:hover:border-white transition-colors"
            title={skill.level}
          >
            {skill.name}
            <span className="ml-2 text-xs text-gray-500 dark:text-gray-400">{skill.level}</span>
          </span>
        ))}
      </div>
    </div>
  );
}

export default App;

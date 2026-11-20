import { useEffect, useState } from 'react';
import {
  ArrowUpRight, Award, BookOpen, Download, Github, Linkedin, Mail, MapPin,
  Menu, Moon, Phone, ShieldCheck, Sun, Terminal, X,
} from 'lucide-react';
import profileImage from './assets/images/Screenshot 2026-07-15 001907.png';
import resumePdf from '../assets/resume/final resume3rd.pdf';

const navItems = ['About', 'Education', 'Skills', 'Projects', 'Certifications', 'Contact'];
const skillGroups = [
  { title:'Cybersecurity foundations', items:['Security fundamentals', 'Threat awareness', 'Ethical hacking coursework', 'CTF participation'] },
  { title:'Programming basics', items:['Python', 'C & C++', 'Java', 'JavaScript'] },
  { title:'Technical tools & concepts', items:['SQL basics', 'Git & GitHub', 'Operating system concepts', 'Web fundamentals'] },
];

const strengths = [
  { title:'Discipline & consistency', detail:'A state powerlifting championship and state-level volleyball have taught me to stay focused and keep showing up.' },
  { title:'Logical problem-solving', detail:'I like to break a problem into smaller steps and work through it carefully.' },
  { title:'Teamwork', detail:'I value cooperation, accountability, and contributing to a shared goal.' },
  { title:'Willingness to learn', detail:'I’m building my cybersecurity knowledge through courses, CTF participation, and academic work.' },
];

const projects = [
  { title:'VibeShield AI', description:'An AI-assisted application security platform built around passive checks, artifact review, and a findings dashboard.',
    category:'AI · App security', repo:'vibecode-ai-', live:'https://vibecode-ai-five.vercel.app' },
  { title:'Curewell Pharmacy OS', description:'A pharmacy management and smart billing system built with Flask, React, PostgreSQL or SQLite, and Nginx.',
    category:'Full-stack · Healthcare', repo:'Curewell-Pharmacy-OS', status:'Live demo offline' },
  { title:'CampusGPT', description:'An AI-powered student ERP and campus assistant that brings student records and institutional policies into a conversational interface.',
    category:'AI · Education', repo:'campusGPT', status:'Live demo offline' },
  { title:'MiniKernel OS Simulator', description:'An interactive OS simulation covering process management, CPU scheduling, memory, file systems, and database integration.',
    category:'Systems · Simulation', repo:'MiniKernel', status:'Live demo offline' },
];

const certificateFiles = import.meta.glob<string>(
  '../assets/drive-download-20261118T183612Z-1-001/*.{jpg,jpeg}',
  { eager: true, import: 'default', query: '?url' },
);
const certificateImageByFilename = Object.fromEntries(
  Object.entries(certificateFiles).map(([path, url]) => [path.slice(path.lastIndexOf('/') + 1), url]),
);

const certifications = [
  { image:'IMG-20260121-WA0065(1).jpg', title:'Datacraft: MLH Builder’s Day', issuer:'Acropolis · MLH', type:'Participation' },
  { image:'IMG-20260122-WA0001.jpg', title:'12-Hour Prelude to CODESpire 3.0', issuer:'Acropolis Institute of Technology & Research', type:'Participation' },
  { image:'IMG-20260527-WA0001.jpg', title:'SecLeaf Q2 CTF 2026', issuer:'SecLeaf', type:'Participation' },
  { image:'IMG-20260622-WA0007(1).jpg', title:'Summer of Code', issuer:'Acropolis · ACM · MLH', type:'Participation' },
  { image:'IMG-20260708-WA0005.jpg', title:'Prayatna 3.0 National Hackathon', issuer:'Acropolis · ACM · IEEE', type:'Participation' },
  { image:'IMG-20260708-WA0006.jpg', title:'Exploring Cybersecurity', issuer:'IBM SkillsBuild', type:'Course' },
  { image:'IMG-20260708-WA0007.jpg', title:'National Level Techfest 2025', issuer:'Acropolis Institute of Technology & Research', type:'Participation' },
  { image:'IMG-20260708-WA0008.jpg', title:'Global Cyber Defense CTF 2024 — Champion', issuer:'Global Cyber Defense CTF', type:'Achievement' },
  { image:'IMG-20260708-WA0009.jpg', title:'Exploring Cloud Computing', issuer:'IBM SkillsBuild', type:'Course' },
  { image:'IMG-20260927-WA0009.jpg', title:'Null Origin CTF 2026', issuer:'Null Origin', type:'Participation' },
  { image:'IMG-20261105-WA0002.jpg', title:'SecLeaf Q4 Operations CTF', issuer:'SecLeaf', type:'Participation' },
  { image:'Screenshot_2026_0713_153101.jpg', title:'The Hack Track — Intermediate', issuer:'The Drop Organization', type:'Certificate' },
  { image:'Screenshot_2026_0713_153123.jpg', title:'Fortinet Certified Fundamentals in Cybersecurity', issuer:'Fortinet Training Institute', type:'Certification' },
  { image:'Screenshot_2026_0713_153151.jpg', title:'Getting Started in Cybersecurity 3.0', issuer:'Fortinet Training Institute', type:'Course' },
  { image:'Screenshot_2026_0713_153207.jpg', title:'Introduction to the Threat Landscape 3.0', issuer:'Fortinet Training Institute', type:'Course' },
  { image:'Screenshot_2026_0713_153222.jpg', title:'Technical Introduction to Cybersecurity 3.0', issuer:'Fortinet Training Institute', type:'Course' },
  { image:'WhatsApp Image 2026-10-05 at 10.07.22 PM.jpeg', title:'Introduction to Cybersecurity', issuer:'Cisco Networking Academy', type:'Course' },
  { image:'WhatsApp Image 2026-10-05 at 10.10.08 PM.jpeg', title:'Ethical Hacker', issuer:'Cisco Networking Academy', type:'Course' },
  { image:'WhatsApp Image 2026-10-05 at 10.11.39 PM (1).jpeg', title:'IKIGAI 2026 — Intelligent Knowledge Integration for Global AI Innovation', issuer:'Acropolis Institute of Technology & Research', type:'Participation' },
  { image:'WhatsApp Image 2026-10-05 at 10.11.39 PM(1).jpeg', title:'Void Hacks 8.0 Hackathon', issuer:'Shri Vaishnav Vidyapeeth Vishwavidyalaya · Indore Police', type:'Participation' },
  { image:'WhatsApp Image 2026-10-05 at 10.16.54 PM.jpeg', title:'Tips for Career Planning', issuer:'IBM SkillsBuild', type:'Course' },
  { image:'WhatsApp Image 2026-10-05 at 10.16.55 PM.jpeg', title:'Beyond Conservation to Sustainability', issuer:'IBM SkillsBuild', type:'Course' },
  { image:'WhatsApp Image 2026-10-05 at 10.16.56 PM (1).jpeg', title:'Fundamentals of Sustainability and Technology', issuer:'IBM SkillsBuild', type:'Course' },
  { image:'WhatsApp Image 2026-10-05 at 10.16.56 PM.jpeg', title:'Make an Impact with Future Technology', issuer:'IBM SkillsBuild', type:'Course' },
  { image:'WhatsApp Image 2026-10-05 at 10.16.57 PM (1).jpeg', title:'Neural Networks and Deep Learning', issuer:'IBM SkillsBuild', type:'Course' },
  { image:'WhatsApp Image 2026-10-05 at 10.16.57 PM (2).jpeg', title:'Applied Artificial Intelligence — Learn, Build and Create an AI Agent 2025–26', issuer:'IBM SkillsBuild', type:'Course' },
  { image:'WhatsApp Image 2026-10-05 at 10.16.57 PM.jpeg', title:'Machine Learning', issuer:'IBM SkillsBuild', type:'Course' },
  { image:'WhatsApp Image 2026-10-05 at 10.16.58 PM (1).jpeg', title:'Create a Credly Account', issuer:'IBM SkillsBuild', type:'Course' },
  { image:'WhatsApp Image 2026-10-05 at 10.16.58 PM (2).jpeg', title:'Exploring Data', issuer:'IBM SkillsBuild', type:'Course' },
  { image:'WhatsApp Image 2026-10-05 at 10.16.58 PM.jpeg', title:'Supercharge Your Data Analytics with Generative AI', issuer:'IBM SkillsBuild', type:'Course' },
  { image:'WhatsApp Image 2026-10-05 at 10.16.59 PM.jpeg', title:'Exploring Artificial Intelligence', issuer:'IBM SkillsBuild', type:'Course' },
  { image:'WhatsApp Image 2026-10-05 at 10.17.00 PM (1).jpeg', title:'Earn It! Accept It! Share It!', issuer:'IBM SkillsBuild', type:'Digital credential' },
  { image:'WhatsApp Image 2026-10-05 at 10.17.00 PM (2).jpeg', title:'Exploring Quantum Computing', issuer:'IBM SkillsBuild', type:'Course' },
  { image:'WhatsApp Image 2026-10-05 at 10.17.00 PM.jpeg', title:'Accepting the “Explore Emerging Tech” Digital Credential', issuer:'IBM SkillsBuild', type:'Digital credential' },
  { image:'WhatsApp Image 2026-10-05 at 10.17.01 PM (1).jpeg', title:'Make an Impact with AI', issuer:'IBM SkillsBuild', type:'Course' },
  { image:'WhatsApp Image 2026-10-05 at 10.17.01 PM (2).jpeg', title:'Explore Emerging Tech', issuer:'IBM SkillsBuild', type:'Digital credential' },
  { image:'WhatsApp Image 2026-10-05 at 10.17.01 PM.jpeg', title:'Make an Impact with Data Analytics', issuer:'IBM SkillsBuild', type:'Course' },
  { image:'WhatsApp Image 2026-10-05 at 10.17.02 PM.jpeg', title:'Make an Impact with Hybrid Cloud', issuer:'IBM SkillsBuild', type:'Course' },
];

const certificateFilters = ['All', 'Courses', 'Participation', 'Awards & credentials'] as const;

export default function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [certificateFilter, setCertificateFilter] = useState<(typeof certificateFilters)[number]>('All');
  const [theme, setTheme] = useState<'dark' | 'light'>(
    () => (localStorage.getItem('portfolio-theme-v2') as 'dark' | 'light') || 'dark',
  );

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    localStorage.setItem('portfolio-theme-v2', theme);
  }, [theme]);

  useEffect(() => {
    const sections = document.querySelectorAll('section[id]');
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          document.querySelectorAll('.nav-link').forEach((link) => {
            link.classList.toggle('active', link.getAttribute('href') === `#${entry.target.id}`);
          });
        }
      });
    }, { rootMargin: '-35% 0px -55%', threshold: 0 });
    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const revealTargets = document.querySelectorAll(
      '.section-heading, .about-grid, .education-grid, .skill-layout, .projects-grid, .certificate-filters, .certificates-grid, .contact-panel',
    );
    const revealObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          revealObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.08 });

    revealTargets.forEach((target) => {
      target.classList.add('reveal');
      revealObserver.observe(target);
    });
    return () => revealObserver.disconnect();
  }, []);

  const closeMenu = () => setMenuOpen(false);
  const visibleCertifications = certifications.filter((certificate) => {
    if (certificateFilter === 'All') return true;
    if (certificateFilter === 'Courses') return certificate.type === 'Course';
    if (certificateFilter === 'Participation') return certificate.type === 'Participation';
    return certificate.type !== 'Course' && certificate.type !== 'Participation';
  });

  return (
    <div className="site-shell">
      <header className="nav">
        <a className="brand" href="#home" aria-label="Back to top" onClick={closeMenu}>RSK<span>.</span></a>
        <nav className={menuOpen ? 'nav-links open' : 'nav-links'} aria-label="Primary navigation">
          {navItems.map((item) => (
            <a key={item} className="nav-link" href={`#${item.toLowerCase()}`} onClick={closeMenu}>{item}</a>
          ))}
        </nav>
        <div className="nav-actions">
          <button className="icon-button" type="button" aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} theme`}
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}>
            {theme === 'dark' ? <Sun size={17} /> : <Moon size={17} />}
          </button>
          <button className="icon-button menu-button" type="button" aria-label="Toggle menu" aria-expanded={menuOpen}
            onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </header>

      <main>
        <section className="hero" id="home">
          <div className="hero-copy">
            <div className="status-pill"><span /> Cyber Security undergraduate</div>
            <h1>Trained by discipline. <span>Driven by curiosity. Built for challenges.</span></h1>
            <p className="hero-lede">I’m <strong>Rajdeep Singh Kelwa</strong>, a Cyber Security undergraduate learning security fundamentals through coursework, CTF participation, and academic projects.</p>
            <div className="hero-actions">
              <a className="button button-primary" href={resumePdf} download><Download size={17} /> Download résumé</a>
              <a className="button button-ghost" href="#projects">View my work <ArrowUpRight size={17} /></a>
            </div>
            <div className="hero-meta"><span>B.Tech · Cyber Security</span><span>Ujjain, India</span></div>
          </div>
          <div className="portrait-wrap" aria-label="Portrait of Rajdeep Singh Kelwa">
            <div className="portrait-frame"><img src={profileImage} alt="Rajdeep Singh Kelwa" /></div>
            <div className="portrait-label"><ShieldCheck size={18} /><div><span>Focus</span><strong>Cybersecurity</strong></div></div>
          </div>
        </section>

        <section className="section" id="about">
          <div className="section-heading"><p>01 / About</p><h2>Curious by nature.<br />Disciplined by practice.</h2></div>
          <div className="about-grid">
            <article className="about-main">
              <p className="large-copy">I’m developing a strong foundation in cybersecurity and learning how to think carefully about the safety and reliability of digital systems.</p>
              <p>Competitive powerlifting and volleyball have shaped my work ethic: stay consistent, think clearly under pressure, and improve every iteration. I bring the same discipline to learning, collaboration, and problem solving.</p>
            </article>
            <aside className="about-facts">
              <div><span>04</span><p>Featured<br />projects</p></div>
              <div><span>38</span><p>Courses &<br />achievements</p></div>
              <div><span>B.Tech</span><p>Cyber Security<br />undergraduate</p></div>
            </aside>
          </div>
        </section>

        <section className="section" id="education">
          <div className="section-heading"><p>02 / Education</p><h2>Academic foundation</h2></div>
          <div className="education-grid">
            <article className="education-feature">
              <span className="eyebrow">2024 — Present</span><BookOpen size={28} />
              <h3>B.Tech in Computer Science</h3><p>Cyber Security Specialization</p>
              <strong>Acropolis Institute of Technology & Research</strong>
              <div className="semester-row"><span>Sem I <b>5.62</b></span><span>Sem II <b>6.86</b></span><span>Sem III <b>6.38</b></span></div>
            </article>
            <div className="education-stack">
              <article><span>2024</span><div><h3>Higher Secondary</h3><p>Jindatta Institute of Education · 70%</p></div></article>
              <article><span>2022</span><div><h3>Secondary School</h3><p>Jindatta Institute of Education · 80.2%</p></div></article>
            </div>
          </div>
        </section>

        <section className="section" id="skills">
          <div className="section-heading split-heading">
            <div><p>03 / Learning journey</p><h2>Skills & strengths</h2></div>
            <p className="heading-note">Foundational technical skills I’m developing, alongside the personal strengths I bring to learning and teamwork.</p>
          </div>
          <div className="skill-layout">
            <div className="skill-board">
              <div className="board-heading"><span>Skills I’m developing</span><span>01 — 03</span></div>
              {skillGroups.map((group, index) => (
                <article className="skill-group" key={group.title}>
                  <span className="skill-group-index">{String(index + 1).padStart(2, '0')}</span>
                  <div className="skill-group-content">
                    <h3>{group.title}</h3>
                    <div className="skill-chips">
                      {group.items.map((skill) => <span key={skill}>{skill}</span>)}
                    </div>
                  </div>
                </article>
              ))}
            </div>
            <div className="strength-board">
              <div className="board-heading"><span>Personal strengths</span><span>What I bring</span></div>
              {strengths.map((strength, index) => (
                <article className="strength-item" key={strength.title}>
                  <span className="strength-index">{String(index + 1).padStart(2, '0')}</span>
                  <div><h3>{strength.title}</h3><p>{strength.detail}</p></div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="section" id="projects">
          <div className="section-heading split-heading">
            <div><p>04 / Selected work</p><h2>Projects I’ve built</h2></div>
            <a className="text-link" href="https://github.com/ramkelwa" target="_blank" rel="noreferrer">GitHub <ArrowUpRight size={16} /></a>
          </div>
          <p className="section-intro">A mix of security, systems, AI, and campus tools. Explore the code or open a live demo where available.</p>
          <div className="projects-grid">
            {projects.map((project, index) => (
              <article className="project-card" key={project.title}>
                <div className="project-top"><span>{String(index + 1).padStart(2, '0')}</span><Terminal size={22} /></div>
                <div className="project-copy">
                  <span className="project-type">{project.category}</span><h3>{project.title}</h3><p>{project.description}</p>
                </div>
                <div className="project-links">
                  <a className="project-link" href={`https://github.com/ramkelwa/${project.repo}`} target="_blank" rel="noreferrer">View source on GitHub <ArrowUpRight size={18} /></a>
                  {project.live && <a className="project-live-link" href={project.live} target="_blank" rel="noreferrer">Live project <ArrowUpRight size={15} /></a>}
                  {project.status && <span className="project-live-status">{project.status}</span>}
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="section" id="certifications">
          <div className="section-heading">
            <p>05 / Credentials</p><h2>Learning, recognized.</h2>
            <span className="section-count">{certifications.length} certificates & achievements</span>
          </div>
          <div className="certificate-filters" aria-label="Filter certificates">
            {certificateFilters.map((filter) => (
              <button
                type="button"
                key={filter}
                className={certificateFilter === filter ? 'filter-button active' : 'filter-button'}
                aria-pressed={certificateFilter === filter}
                onClick={() => setCertificateFilter(filter)}
              >
                {filter}
                {filter === 'All' && <span>{certifications.length}</span>}
              </button>
            ))}
          </div>
          <div className="certificates-grid">
            {visibleCertifications.map((certificate) => (
              <a
                className="certificate-card"
                href={certificateImageByFilename[certificate.image]}
                target="_blank"
                rel="noreferrer"
                key={certificate.image}
              >
                <div className="certificate-image">
                  <img src={certificateImageByFilename[certificate.image]} alt={`${certificate.title} certificate`} loading="lazy" />
                  <span><Award size={15} /> View full certificate</span>
                </div>
                <div className="certificate-copy">
                  <p>{certificate.type} <span>·</span> {certificate.issuer}</p>
                  <h3>{certificate.title}</h3>
                </div>
              </a>
            ))}
          </div>
        </section>

        <section className="section contact-section" id="contact">
          <div className="contact-panel">
            <div><p>06 / Contact</p><h2>Let’s build something<br />worth protecting.</h2></div>
            <div className="contact-details">
              <a href="mailto:rajdeepsinghkelwa29@gmail.com"><Mail size={18} /><span>rajdeepsinghkelwa29@gmail.com</span></a>
              <a href="tel:+917415622502"><Phone size={18} /><span>+91 74156 22502</span></a>
              <a href="https://linkedin.com/in/rajdeep-singh-kelwa" target="_blank" rel="noreferrer"><Linkedin size={18} /><span>LinkedIn profile</span></a>
              <div><MapPin size={18} /><span>Mahidpur, Ujjain, India</span></div>
            </div>
          </div>
        </section>
      </main>

      <footer>
        <a className="brand" href="#home">RSK<span>.</span></a><p>© 2026 Rajdeep Singh Kelwa</p>
        <div className="footer-links">
          <a href="https://github.com/ramkelwa" target="_blank" rel="noreferrer" aria-label="GitHub"><Github size={17} /></a>
          <a href="https://linkedin.com/in/rajdeep-singh-kelwa" target="_blank" rel="noreferrer" aria-label="LinkedIn"><Linkedin size={17} /></a>
        </div>
      </footer>
    </div>
  );
}

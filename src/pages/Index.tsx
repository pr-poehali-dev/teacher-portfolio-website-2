import { useState, useEffect, useRef } from "react";
import Icon from "@/components/ui/icon";

const TEACHER_PHOTO = "https://cdn.poehali.dev/projects/4f0344ab-8a99-420a-8cad-debf4a59aa43/bucket/fbafe501-45d9-4fa5-8247-c0507da778c6.png";
const GALLERY_IMG1 = "https://cdn.poehali.dev/projects/4f0344ab-8a99-420a-8cad-debf4a59aa43/files/005d6977-eb21-43c8-8955-523826dedc3f.jpg";
const GALLERY_IMG2 = "https://cdn.poehali.dev/projects/4f0344ab-8a99-420a-8cad-debf4a59aa43/files/d464b14c-df16-4cdd-bddd-323bc55faf25.jpg";

const projects: never[] = [];

const achievements = [
  { icon: "Trophy", number: "47", label: "Призовых мест", desc: "учащихся на олимпиадах", color: "#FFD700" },
  { icon: "Users", number: "12", label: "Лет опыта", desc: "педагогической деятельности", color: "#4ECDC4" },
  { icon: "Star", number: "320", label: "Учеников", desc: "прошли обучение", color: "#FF6B6B" },
  { icon: "Award", number: "8", label: "Наград", desc: "регионального и всероссийского уровня", color: "#A78BFA" },
];

function useInView(ref: React.RefObject<Element>) {
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setInView(true); },
      { threshold: 0.15 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [ref]);
  return inView;
}

function AnimatedNumber({ target }: { target: string }) {
  const [display, setDisplay] = useState(0);
  const numericTarget = parseInt(target);
  useEffect(() => {
    let start = 0;
    const duration = 1400;
    const step = Math.max(1, Math.ceil(numericTarget / (duration / 16)));
    const timer = setInterval(() => {
      start = Math.min(start + step, numericTarget);
      setDisplay(start);
      if (start >= numericTarget) clearInterval(timer);
    }, 16);
    return () => clearInterval(timer);
  }, [numericTarget]);
  return <span>{display}</span>;
}

export default function Index() {
  const [activeSection, setActiveSection] = useState("home");
  const [selectedProject, setSelectedProject] = useState<typeof projects[0] | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const scrollTo = (id: string) => {
    setMenuOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    const sections = ["home", "gallery"];
    const observers = sections.map((id) => {
      const el = document.getElementById(id);
      if (!el) return null;
      const observer = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setActiveSection(id); },
        { threshold: 0.4 }
      );
      observer.observe(el);
      return observer;
    });
    return () => observers.forEach((o) => o?.disconnect());
  }, []);

  const navItems = [
    { id: "home", label: "Главная" },
    { id: "gallery", label: "Работы" },
  ];

  return (
    <div className="portfolio-root">
      {/* Nav */}
      <nav className="portfolio-nav">
        <div className="nav-logo" onClick={() => scrollTo("home")}>
          <span className="logo-dot" />
          Педагог
        </div>
        <div className={`nav-links ${menuOpen ? "open" : ""}`}>
          {navItems.map((item) => (
            <button
              key={item.id}
              className={`nav-link ${activeSection === item.id ? "active" : ""}`}
              onClick={() => scrollTo(item.id)}
            >
              {item.label}
            </button>
          ))}
        </div>
        <button className="burger" onClick={() => setMenuOpen(!menuOpen)} aria-label="Меню">
          <span /><span /><span />
        </button>
      </nav>

      {/* Hero */}
      <section id="home" className="hero-section">
        <div className="hero-bg-orbs">
          <div className="orb orb1" />
          <div className="orb orb2" />
          <div className="orb orb3" />
        </div>
        <div className="hero-content">
          <div className="hero-photo-wrap">
            <div className="hero-photo-ring" />
            <img src={TEACHER_PHOTO} alt="Денис Сергеев" className="hero-photo" />
            <div className="hero-photo-badge">
              <Icon name="Star" size={14} />
              Начинающий педагог
            </div>
          </div>
          <div className="hero-text">
            <div className="hero-eyebrow">Портфолио педагога</div>
            <h1 className="hero-name">
              Денис<br />
              <span className="hero-name-accent">Сергеев</span>
            </h1>
            <p className="hero-desc">
              Начинающий педагог — помогающий подготовиться к Истории
            </p>
            <div className="hero-cta">
              <button className="btn-primary" onClick={() => scrollTo("gallery")}>
                Смотреть работы
                <Icon name="ArrowRight" size={18} />
              </button>
              <button className="btn-secondary" onClick={() => scrollTo("achievements")}>
                Достижения
              </button>
            </div>
          </div>
        </div>
        <button className="hero-scroll-hint" onClick={() => scrollTo("achievements")}>
          <Icon name="ChevronDown" size={22} />
        </button>
      </section>

      {/* Gallery */}
      <section id="gallery" className="gallery-section">
        <div className="section-header">
          <span className="section-eyebrow">Портфолио педагога</span>
          <h2 className="section-title">Работы педагога</h2>
          <p className="section-subtitle">Работы, созданные педагогом — могут помочь в подготовке</p>
        </div>
        <div className="gallery-grid">
          <a
            href="https://usld.ru/ru/?code=128005"
            target="_blank"
            rel="noopener noreferrer"
            className="project-card test-card"
          >
            <div className="test-card-icon">
              <img src="https://cdn.poehali.dev/projects/4f0344ab-8a99-420a-8cad-debf4a59aa43/bucket/8ff98d99-17de-4129-a0e0-f46cc9d39688.png" alt="И.В. Сталин" style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "top" }} />
            </div>
            <div className="project-body">
              <span className="project-tag" style={{ background: "#A78BFA22", color: "#A78BFA", border: "1px solid #A78BFA44" }}>
                📝 Тест для подготовки
              </span>
              <h3 className="project-title">Тест по истории</h3>
              <p className="project-author">Создан педагогом Сергеевым Д.С.</p>
              <p className="project-desc">Авторский тест для подготовки к ЕГЭ и ОГЭ по истории. Пройдите тест и проверьте свои знания.</p>
              <div className="test-card-link">
                Пройти тест
                <Icon name="ExternalLink" size={15} />
              </div>
            </div>
          </a>
        </div>
      </section>

      {/* Footer */}
      <footer className="portfolio-footer">
        <div className="footer-logo">
          <span className="logo-dot" />
          Сергеев Денис Сергеевич
        </div>
        <p className="footer-text">Педагог высшей категории · Открыт к сотрудничеству</p>
        <div className="footer-nav">
          {navItems.map((item) => (
            <button key={item.id} className="footer-link" onClick={() => scrollTo(item.id)}>
              {item.label}
            </button>
          ))}
        </div>
      </footer>

      {/* Modal */}
      {selectedProject && (
        <div className="modal-overlay" onClick={() => setSelectedProject(null)}>
          <div className="modal-card" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={() => setSelectedProject(null)}>
              <Icon name="X" size={20} />
            </button>
            <img src={selectedProject.image} alt={selectedProject.title} className="modal-img" />
            <div className="modal-body">
              <div className="modal-header-row">
                <span
                  className="project-tag"
                  style={{
                    background: `${selectedProject.tagColor}22`,
                    color: selectedProject.tagColor,
                    border: `1px solid ${selectedProject.tagColor}44`,
                  }}
                >
                  {selectedProject.tag}
                </span>
                <span className="modal-award">{selectedProject.award}</span>
              </div>
              <h2 className="modal-title">{selectedProject.title}</h2>
              <p className="modal-author">{selectedProject.author}</p>
              <p className="modal-desc">{selectedProject.description}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
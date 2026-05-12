import { useState, useEffect, useRef } from "react";
import Icon from "@/components/ui/icon";

const TEACHER_PHOTO = "https://cdn.poehali.dev/projects/4f0344ab-8a99-420a-8cad-debf4a59aa43/bucket/fbafe501-45d9-4fa5-8247-c0507da778c6.png";
const GALLERY_IMG1 = "https://cdn.poehali.dev/projects/4f0344ab-8a99-420a-8cad-debf4a59aa43/files/005d6977-eb21-43c8-8955-523826dedc3f.jpg";
const GALLERY_IMG2 = "https://cdn.poehali.dev/projects/4f0344ab-8a99-420a-8cad-debf4a59aa43/files/d464b14c-df16-4cdd-bddd-323bc55faf25.jpg";

const projects = [
  {
    id: 1,
    title: "Экологический плакат",
    author: "Анастасия К., 8 класс",
    description: "Серия работ о сохранении природы. Учащаяся создала цикл из 5 плакатов, которые заняли 1 место на городском конкурсе.",
    tag: "Изобразительное искусство",
    tagColor: "#FF6B6B",
    image: GALLERY_IMG1,
    award: "🥇 1 место",
  },
  {
    id: 2,
    title: "Роботизированная рука",
    author: "Михаил Д., 10 класс",
    description: "Проект по робототехнике — прототип манипулятора для помощи людям с ограниченными возможностями. Представлен на региональной олимпиаде.",
    tag: "STEM-проект",
    tagColor: "#4ECDC4",
    image: GALLERY_IMG2,
    award: "🏆 Гран-при",
  },
  {
    id: 3,
    title: "Исторический атлас",
    author: "Группа 9Б класса",
    description: "Интерактивный атлас истории родного края, созданный совместно всем классом. Включает более 200 объектов с описаниями.",
    tag: "Исследовательский",
    tagColor: "#A78BFA",
    image: GALLERY_IMG1,
    award: "⭐ Лучший проект",
  },
  {
    id: 4,
    title: "Цифровая живопись",
    author: "Дарья М., 7 класс",
    description: "Серия цифровых иллюстраций к классической литературе. Работы вошли в школьный альманах и были опубликованы в районной газете.",
    tag: "Цифровое искусство",
    tagColor: "#F59E0B",
    image: GALLERY_IMG2,
    award: "🎨 Выбор жюри",
  },
];

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
  const achievementsRef = useRef<HTMLDivElement>(null);
  const achievementsInView = useInView(achievementsRef as React.RefObject<Element>);

  const scrollTo = (id: string) => {
    setMenuOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    const sections = ["home", "achievements", "gallery"];
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
    { id: "achievements", label: "Достижения" },
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
              Педагог высшей категории — вдохновляю учеников на творчество и научные открытия уже 12 лет
            </p>
            <div className="hero-tags">
              <span className="hero-tag">🎨 Творческие проекты</span>
              <span className="hero-tag">🔬 STEM-образование</span>
              <span className="hero-tag">📚 Исследования</span>
            </div>
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

      {/* Achievements */}
      <section id="achievements" className="achievements-section">
        <div className="section-header">
          <span className="section-eyebrow">Результаты работы</span>
          <h2 className="section-title">Достижения</h2>
          <p className="section-subtitle">Каждая цифра — это реальные результаты и гордость за учеников</p>
        </div>
        <div className="achievements-grid" ref={achievementsRef}>
          {achievements.map((a, i) => (
            <div key={i} className="achievement-card" style={{ animationDelay: `${i * 0.12}s` }}>
              <div className="achievement-icon-wrap" style={{ background: `${a.color}22`, border: `1.5px solid ${a.color}55` }}>
                <Icon name={a.icon} size={28} style={{ color: a.color }} />
              </div>
              <div className="achievement-number" style={{ color: a.color }}>
                {achievementsInView ? <AnimatedNumber target={a.number} /> : "0"}
              </div>
              <div className="achievement-label">{a.label}</div>
              <div className="achievement-desc">{a.desc}</div>
            </div>
          ))}
        </div>

        <div className="awards-block">
          <h3 className="awards-title">Личные награды</h3>
          <div className="awards-list">
            {[
              { year: "2024", title: "Лучший педагог региона", org: "Министерство образования" },
              { year: "2023", title: "Грант «Учитель будущего»", org: "Фонд развития образования" },
              { year: "2022", title: "Победитель конкурса педагогических практик", org: "Всероссийский уровень" },
              { year: "2020", title: "Почётная грамота губернатора", org: "За вклад в образование" },
            ].map((award, i) => (
              <div key={i} className="award-item">
                <div className="award-year">{award.year}</div>
                <div className="award-info">
                  <div className="award-title-text">{award.title}</div>
                  <div className="award-org">{award.org}</div>
                </div>
                <div className="award-star">⭐</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery */}
      <section id="gallery" className="gallery-section">
        <div className="section-header">
          <span className="section-eyebrow">Портфолио класса</span>
          <h2 className="section-title">Работы учащихся</h2>
          <p className="section-subtitle">Проекты, которые вдохновляют — созданные вместе с учениками</p>
        </div>
        <div className="gallery-grid">
          {projects.map((project, i) => (
            <div
              key={project.id}
              className="project-card"
              style={{ animationDelay: `${i * 0.1}s` }}
              onClick={() => setSelectedProject(project)}
            >
              <div className="project-img-wrap">
                <img src={project.image} alt={project.title} className="project-img" />
                <div className="project-award">{project.award}</div>
                <div className="project-overlay">
                  <Icon name="Expand" size={24} />
                  <span>Подробнее</span>
                </div>
              </div>
              <div className="project-body">
                <span
                  className="project-tag"
                  style={{
                    background: `${project.tagColor}22`,
                    color: project.tagColor,
                    border: `1px solid ${project.tagColor}44`,
                  }}
                >
                  {project.tag}
                </span>
                <h3 className="project-title">{project.title}</h3>
                <p className="project-author">{project.author}</p>
                <p className="project-desc">{project.description}</p>
              </div>
            </div>
          ))}
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
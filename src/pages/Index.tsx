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

          {/* Тесты по СССР */}
          {[
            { num: 1, url: "https://learningapps.org/watch?v=phcyuus8n26", img: "https://cdn.poehali.dev/projects/4f0344ab-8a99-420a-8cad-debf4a59aa43/files/b86cc015-da1c-4631-a0c8-845054a641b6.jpg", alt: "Космос СССР" },
            { num: 2, url: "https://learningapps.org/watch?v=ppkn6c80a26", img: "https://cdn.poehali.dev/projects/4f0344ab-8a99-420a-8cad-debf4a59aa43/files/1781745f-e845-47c2-b3c4-5f9fe4351fff.jpg", alt: "Красная армия" },
            { num: 3, url: "https://learningapps.org/watch?v=pxff6xs2v26", img: "https://cdn.poehali.dev/projects/4f0344ab-8a99-420a-8cad-debf4a59aa43/files/ca0b3532-b8a7-4847-b656-324e894b7295.jpg", alt: "Индустриализация" },
            { num: 4, url: "https://learningapps.org/watch?v=pymb6ki6526", img: "https://cdn.poehali.dev/projects/4f0344ab-8a99-420a-8cad-debf4a59aa43/files/04a473bf-5c0a-4a01-983b-0d6b2af6c7d4.jpg", alt: "Ленин" },
            { num: 5, url: "https://learningapps.org/watch?v=pugg1rwcn26", img: "https://cdn.poehali.dev/projects/4f0344ab-8a99-420a-8cad-debf4a59aa43/files/e318a559-27f4-40e2-aae4-a248de96d8a5.jpg", alt: "Колхоз" },
            { num: 6, url: "https://learningapps.org/watch?v=pnqv9ycp326", img: "https://cdn.poehali.dev/projects/4f0344ab-8a99-420a-8cad-debf4a59aa43/files/55b34577-ad1c-47c5-a5c5-f4cd6433a164.jpg", alt: "Москва Кремль" },
            { num: 7, url: "https://learningapps.org/watch?v=pudmqwcwn26", img: "https://cdn.poehali.dev/projects/4f0344ab-8a99-420a-8cad-debf4a59aa43/files/f17b3548-482e-439d-8404-8512142f32a8.jpg", alt: "Гагарин" },
            { num: 8, url: "https://learningapps.org/watch?v=peb2w67i526", img: "https://cdn.poehali.dev/projects/4f0344ab-8a99-420a-8cad-debf4a59aa43/files/5d23f397-16b5-4f39-a6a3-0dc775e64774.jpg", alt: "Холодная война" },
            { num: 9, url: "https://learningapps.org/watch?v=pkmwh3w7j26", img: "https://cdn.poehali.dev/projects/4f0344ab-8a99-420a-8cad-debf4a59aa43/files/67a870b4-54ac-4925-ab7d-6239ab6878cc.jpg", alt: "Культура СССР" },
            { num: 10, url: "https://learningapps.org/watch?v=px8rf4p4t26", img: "https://cdn.poehali.dev/projects/4f0344ab-8a99-420a-8cad-debf4a59aa43/files/8af71e59-44ac-4779-be4f-7f02274dc02f.jpg", alt: "Конституция СССР" },
          ].map((t) => (
            <a
              key={t.num}
              href={t.url}
              target="_blank"
              rel="noopener noreferrer"
              className="project-card test-card"
            >
              <div className="test-card-icon">
                <img src={t.img} alt={t.alt} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
              </div>
              <div className="project-body">
                <span className="project-tag" style={{ background: "#FF6B6B22", color: "#FF6B6B", border: "1px solid #FF6B6B44" }}>
                  🇷🇺 Тест по истории
                </span>
                <h3 className="project-title">Тест по СССР №{t.num}</h3>
                <p className="project-author">Создан педагогом Сергеевым Д.С.</p>
                <p className="project-desc">Интерактивный тест по теме «СССР» для подготовки к ЕГЭ и ОГЭ по истории.</p>
                <div className="test-card-link">
                  Пройти тест
                  <Icon name="ExternalLink" size={15} />
                </div>
              </div>
            </a>
          ))}

          {/* Инфографик ЗОЖ */}
          <a
            href="https://my.visme.co/view/j0nxnwvy-blank"
            target="_blank"
            rel="noopener noreferrer"
            className="project-card test-card"
          >
            <div className="test-card-icon">
              <img src="https://cdn.poehali.dev/projects/4f0344ab-8a99-420a-8cad-debf4a59aa43/bucket/40c94a99-b78f-4579-959d-19890db305e9.png" alt="ЗОЖ инфографик" style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "top" }} />
            </div>
            <div className="project-body">
              <span className="project-tag" style={{ background: "#4ECDC422", color: "#4ECDC4", border: "1px solid #4ECDC444" }}>
                📊 Инфографик
              </span>
              <h3 className="project-title">ЗОЖ — это здорово!</h3>
              <p className="project-author">Создан педагогом Сергеевым Д.С.</p>
              <p className="project-desc">Простые привычки на каждый день — инфографик с полезными советами для здорового образа жизни.</p>
              <div className="test-card-link">
                Смотреть инфографик
                <Icon name="ExternalLink" size={15} />
              </div>
            </div>
          </a>

          {/* Буклет ЗОЖ */}
          <div className="project-card test-card" style={{ cursor: "default" }}>
            <div className="test-card-icon" style={{ display: "flex", gap: "4px", padding: 0, overflow: "hidden" }}>
              <img src="https://cdn.poehali.dev/projects/4f0344ab-8a99-420a-8cad-debf4a59aa43/bucket/9dc14fb4-ee66-49fa-8bc1-801ea0e25c67.png" alt="Буклет стр.1" style={{ width: "50%", height: "100%", objectFit: "cover" }} />
              <img src="https://cdn.poehali.dev/projects/4f0344ab-8a99-420a-8cad-debf4a59aa43/bucket/38fe70d4-f2a9-48f0-a833-bfd5cf285b5f.png" alt="Буклет стр.2" style={{ width: "50%", height: "100%", objectFit: "cover" }} />
            </div>
            <div className="project-body">
              <span className="project-tag" style={{ background: "#FF6B6B22", color: "#FF6B6B", border: "1px solid #FF6B6B44" }}>
                📄 Буклет
              </span>
              <h3 className="project-title">ЗОЖ — это здорово!</h3>
              <p className="project-author">Создан педагогом Сергеевым Д.С.</p>
              <p className="project-desc">Буклет «Простые привычки на каждый день» — утро, день, вечер и советы для здоровья и хорошего настроения.</p>
            </div>
          </div>
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
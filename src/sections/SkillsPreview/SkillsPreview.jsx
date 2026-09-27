import './SkillsPreview.css';

const SKILL_CARDS = [
  {
    id: 'ai-ml',
    title: 'AI/ML Engineering & Data Science',
    description: 'Building intelligent solutions through machine learning, deep learning, computer vision, and data-driven development.',
    iconBg: 'rgba(99, 102, 241, 0.15)',
    iconColor: '#818cf8',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="9" />
        <circle cx="12" cy="12" r="5" />
        <circle cx="12" cy="12" r="1.5" fill="currentColor" />
      </svg>
    ),
    skills: [
      {
        name: 'Python',
        icon: (
          <svg width="28" height="28" viewBox="0 0 24 24">
            <path fill="#3776AB" d="M11.91 2c-5.07 0-4.75 2.2-4.75 2.2l.03 2.28h4.82v.69H5.16S2 6.78 2 11.91c0 5.13 2.74 4.95 2.74 4.95h1.64v-2.32s-.09-2.77 2.72-2.77h4.67s2.57.04 2.57-2.5V4.57S16.98 2 11.91 2zm-2.58 1.47a.91.91 0 1 1 0 1.82.91.91 0 0 1 0-1.82z"/>
            <path fill="#FFD43B" d="M12.09 22c5.07 0 4.75-2.2 4.75-2.2l-.03-2.28h-4.82v-.69h6.85S22 17.22 22 12.09c0-5.13-2.74-4.95-2.74-4.95h-1.64v2.32s.09 2.77-2.72 2.77h-4.67s-2.57-.04-2.57 2.5v4.87S7.02 22 12.09 22zm2.58-1.47a.91.91 0 1 1 0-1.82a.91.91 0 0 1 0 1.82z"/>
          </svg>
        ),
      },
      {
        name: 'NumPy',
        icon: (
          <svg width="28" height="28" viewBox="0 0 24 24">
            <rect width="20" height="20" x="2" y="2" rx="4" fill="#4DABF7"/>
            <path fill="#FFF" d="M7 6h2.5l4.5 7.5V6H17v12h-2.5L10 10.5V18H7V6z"/>
          </svg>
        ),
      },
      {
        name: 'Pandas',
        icon: (
          <svg width="28" height="28" viewBox="0 0 24 24">
            <rect width="20" height="20" x="2" y="2" rx="4" fill="#150458"/>
            <rect width="4" height="14" x="6" y="5" rx="1" fill="#FF4A00"/>
            <rect width="4" height="14" x="14" y="5" rx="1" fill="#150458"/>
            <path fill="#E70488" d="M10 5h4v14h-4z"/>
          </svg>
        ),
      },
      {
        name: 'SQL',
        icon: (
          <svg width="28" height="28" viewBox="0 0 24 24">
            <rect width="20" height="20" x="2" y="2" rx="4" fill="#00758F"/>
            <ellipse cx="12" cy="7" rx="6" ry="2.5" fill="#FFF"/>
            <path d="M6 7v4c0 1.4 2.7 2.5 6 2.5s6-1.1 6-2.5V7M6 11v4c0 1.4 2.7 2.5 6 2.5s6-1.1 6-2.5v-4" stroke="#FFF" strokeWidth="1.5" fill="none"/>
          </svg>
        ),
      },
      {
        name: 'Scikit-Learn',
        icon: (
          <svg width="28" height="28" viewBox="0 0 24 24">
            <rect width="20" height="20" x="2" y="2" rx="4" fill="#F7931E"/>
            <path fill="#FFF" d="M6 8l6-4 6 4v8l-6 4-6-4V8zm6 2L8 12.5v3l4 2.5 4-2.5v-3L12 10z"/>
          </svg>
        ),
      },
      {
        name: 'TensorFlow',
        icon: (
          <svg width="28" height="28" viewBox="0 0 24 24" fill="#FF6F00">
            <path d="M12 2L3 7v10l9 5 9-5V7l-9-5zm0 2.2L19 8v2.8l-7-4-7 4V8l7-3.8zM5 16v-4.5l7 4v4.5l-7-4zm14 0l-7 4v-4.5l7-4V16z"/>
          </svg>
        ),
      },
      {
        name: 'PyTorch',
        icon: (
          <svg width="28" height="28" viewBox="0 0 24 24">
            <path fill="#EE4C2C" d="M14.8 2.5a.8.8 0 0 0-1.1 0l-7.2 7.2a6 6 0 1 0 8.5 8.5l.8-.8a.8.8 0 0 0-1.1-1.1l-.8.8a4.4 4.4 0 1 1-6.2-6.2l7.2-7.2a.8.8 0 0 0 0-1.2z"/>
            <circle cx="15.5" cy="6.5" r="1.5" fill="#EE4C2C"/>
          </svg>
        ),
      },
      {
        name: 'Power BI',
        icon: (
          <svg width="28" height="28" viewBox="0 0 24 24">
            <rect width="20" height="20" x="2" y="2" rx="4" fill="#1E293B"/>
            <rect x="5" y="12" width="3.5" height="7" rx="0.5" fill="#F2C811"/>
            <rect x="10.25" y="8" width="3.5" height="11" rx="0.5" fill="#F2C811"/>
            <rect x="15.5" y="5" width="3.5" height="14" rx="0.5" fill="#F2C811"/>
          </svg>
        ),
      },
      {
        name: 'Excel',
        icon: (
          <svg width="28" height="28" viewBox="0 0 24 24">
            <rect width="20" height="20" x="2" y="2" rx="4" fill="#107C41"/>
            <path fill="#FFF" d="M7 6h3.5l1.5 3.5L13.5 6H17l-3.2 5 3.4 5.5H13.6L12 12.8l-1.6 3.7H7l3.3-5.3L7 6z"/>
          </svg>
        ),
      },
      {
        name: 'Computer Vision',
        icon: (
          <svg width="28" height="28" viewBox="0 0 24 24">
            <rect width="20" height="20" x="2" y="2" rx="4" fill="#6366F1"/>
            <circle cx="12" cy="12" r="4" stroke="#FFF" strokeWidth="2" fill="none"/>
            <circle cx="12" cy="12" r="1.5" fill="#FFF"/>
            <path stroke="#FFF" strokeWidth="1.5" strokeLinecap="round" d="M12 4v2m0 12v2M4 12h2m12 0h2"/>
          </svg>
        ),
      },
      {
        name: 'Generative AI',
        icon: (
          <svg width="28" height="28" viewBox="0 0 24 24">
            <rect width="20" height="20" x="2" y="2" rx="4" fill="#8B5CF6"/>
            <path fill="#FFF" d="M12 6l1.2 3.8L17 11l-3.8 1.2L12 16l-1.2-3.8L7 11l3.8-1.2L12 6zM6 4l.6 1.9L8.5 6.5 6.6 7.1 6 9l-.6-1.9L3.5 6.5l1.9-.6L6 4z"/>
          </svg>
        ),
      },
    ],
    tag: 'AI/ML ENGINEERING & DATA SCIENCE',
    tagBg: 'rgba(99, 102, 241, 0.12)',
    tagColor: '#a5b4fc',
    bullets: [
      'Machine learning, regression & classification',
      'Deep learning and neural network development',
      'Computer vision and intelligent image processing',
      'EDA, statistical analysis & data visualization',
    ],
  },
  {
    id: 'fullstack',
    title: 'Full-Stack Development',
    description: 'Crafting responsive user interfaces, robust Java backends, REST APIs, and modern web applications',
    iconBg: 'rgba(59, 130, 246, 0.15)',
    iconColor: '#60a5fa',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect width="20" height="14" x="2" y="3" rx="2" />
        <line x1="8" x2="16" y1="21" y2="21" />
        <line x1="12" x2="12" y1="17" y2="21" />
      </svg>
    ),
    skills: [
      {
        name: 'Java',
        icon: (
          <svg width="28" height="28" viewBox="0 0 24 24">
            <rect width="20" height="20" x="2" y="2" rx="4" fill="#1E293B"/>
            <path fill="#E76F00" d="M12 4c-1.5 1.5-.5 3 .5 4 1 1 1 2.5 0 3.5-.5.5-1 .5-1.5 1s.5 2 2 1c2-1 2.5-3 1-4.5-1-1-1.5-2.5 0-4-1 0-1.5-.5-2-1z"/>
            <path fill="#5382A1" d="M7 16c2 1 8 1 10 0-1-1-3-1.5-5-1.5s-4 .5-5 1.5z"/>
          </svg>
        ),
      },
      {
        name: 'Spring Boot',
        icon: (
          <svg width="28" height="28" viewBox="0 0 24 24">
            <rect width="20" height="20" x="2" y="2" rx="4" fill="#1E293B"/>
            <path fill="#6DB33F" d="M12 4.5L5 8.5v7l7 4 7-4v-7l-7-4zm0 2.5l4.5 2.5v5L12 17l-4.5-2.5v-5L12 7z"/>
          </svg>
        ),
      },
      {
        name: 'React',
        icon: (
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#61DAFB" strokeWidth="1.5">
            <ellipse cx="12" cy="12" rx="10" ry="4.5"/>
            <ellipse cx="12" cy="12" rx="10" ry="4.5" transform="rotate(60 12 12)"/>
            <ellipse cx="12" cy="12" rx="10" ry="4.5" transform="rotate(120 12 12)"/>
            <circle cx="12" cy="12" r="2" fill="#61DAFB"/>
          </svg>
        ),
      },
      {
        name: 'JavaScript',
        icon: (
          <svg width="28" height="28" viewBox="0 0 24 24">
            <rect width="24" height="24" rx="3" fill="#F7DF1E"/>
            <path fill="#000" d="M6.4 19.8c1.3.8 2.8 1.3 4.3 1.3 3 0 4.8-1.5 4.8-4.2 0-2.6-1.5-3.7-4.1-4.7l-.8-.3c-1.4-.5-2-1-2-1.9 0-.9.8-1.6 2.1-1.6 1.2 0 2.2.4 3 1l1.1-1.8c-1.1-.8-2.6-1.3-4.1-1.3-3.1 0-4.9 1.7-4.9 4.1 0 2.6 1.6 3.7 3.9 4.6l.8.3c1.5.6 2.2 1.1 2.2 2 0 1.1-.9 1.8-2.4 1.8-1.5 0-2.8-.6-3.8-1.4l-1.1 1.8z"/>
          </svg>
        ),
      },
      {
        name: 'HTML5',
        icon: (
          <svg width="28" height="28" viewBox="0 0 24 24" fill="#E34F26">
            <path d="M1.5 0h21l-1.91 21.563L11.97 24l-8.564-2.438L1.5 0zm7.031 9.75l-.232-2.718h10.059l.236-2.671H5.414l.7 8.06h9.111l-.39 4.348-2.871.773-2.875-.773-.184-2.115H6.223l.363 4.226 5.379 1.492 5.385-1.492.748-8.384H8.531z"/>
          </svg>
        ),
      },
      {
        name: 'CSS3 / Sass',
        icon: (
          <svg width="28" height="28" viewBox="0 0 24 24" fill="#1572B6">
            <path d="M1.5 0h21l-1.91 21.563L11.97 24l-8.564-2.438L1.5 0zm7.031 9.75l-.232-2.718h10.059l.236-2.671H5.414l.7 8.06h9.111l-.39 4.348-2.871.773-2.875-.773-.184-2.115H6.223l.363 4.226 5.379 1.492 5.385-1.492.748-8.384H8.531z"/>
          </svg>
        ),
      },
      {
        name: 'Node.js',
        icon: (
          <svg width="28" height="28" viewBox="0 0 24 24">
            <rect width="20" height="20" x="2" y="2" rx="4" fill="#1E293B"/>
            <path fill="#339933" d="M12 4L5 8v8l7 4 7-4V8l-7-4zm0 2.6l4.5 2.6v5.2L12 17l-4.5-2.6V9.2L12 6.6z"/>
          </svg>
        ),
      },
      {
        name: 'REST APIs',
        icon: (
          <svg width="28" height="28" viewBox="0 0 24 24">
            <rect width="20" height="20" x="2" y="2" rx="4" fill="#0EA5E9"/>
            <path stroke="#FFF" strokeWidth="2" strokeLinecap="round" d="M7 12h10M13 8l4 4-4 4"/>
          </svg>
        ),
      },
      {
        name: 'PostgreSQL',
        icon: (
          <svg width="28" height="28" viewBox="0 0 24 24">
            <rect width="20" height="20" x="2" y="2" rx="4" fill="#336791"/>
            <path fill="#FFF" d="M12 5c-3.5 0-6 2.5-6 6 0 2.5 1.5 4.5 4 5.5v2.5l3-1.5 3 1.5v-2.5c2.5-1 4-3 4-5.5 0-3.5-2.5-6-6-6zm0 2c2 0 4 1.5 4 4s-2 4-4 4-4-1.5-4-4 2-4 4-4z"/>
          </svg>
        ),
      },
    ],
    tag: 'FULL-STACK DEVELOPMENT',
    tagBg: 'rgba(59, 130, 246, 0.12)',
    tagColor: '#93c5fd',
    bullets: [
      'Responsive, performant web app development',
      'RESTful API architecture & backend services',
      'Database integration & state management',
      'Cross-browser optimization & dynamic features',
    ],
  },
  {
    id: 'tools',
    title: 'Tools & Infrastructure',
    description: 'Using practical development tools for version control, containerization, creative workflows, and data-driven development.',
    iconBg: 'rgba(139, 92, 246, 0.15)',
    iconColor: '#a78bfa',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
      </svg>
    ),
    skills: [
      {
        name: 'Git',
        icon: (
          <svg width="28" height="28" viewBox="0 0 24 24" fill="#F05032">
            <path d="M23.546 10.93L13.067.452c-.604-.603-1.582-.603-2.188 0L8.708 2.627l2.76 2.76c.645-.216 1.378-.063 1.884.443.513.513.664 1.258.435 1.905l2.66 2.66c.647-.23 1.392-.078 1.905.435.72.72.72 1.886 0 2.606-.719.719-1.886.719-2.606 0-.532-.532-.676-1.306-.43-1.968l-2.484-2.483v6.405c.189.1.36.237.5.436.72.719.72 1.886 0 2.605-.719.72-1.886.72-2.606 0-.719-.719-.719-1.886 0-2.605.176-.176.383-.306.606-.388V9.167c-.223-.082-.43-.213-.606-.388-.538-.538-.68-1.32-.423-1.986L7.3 4.14.453 10.987c-.604.604-.604 1.582 0 2.187l10.48 10.478c.604.604 1.582.604 2.187 0l10.426-10.425c.604-.604.604-1.583 0-2.187z"/>
          </svg>
        ),
      },
      {
        name: 'GitHub',
        icon: (
          <svg width="28" height="28" viewBox="0 0 24 24" fill="#FFF">
            <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"/>
          </svg>
        ),
      },
      {
        name: 'Docker',
        icon: (
          <svg width="28" height="28" viewBox="0 0 24 24">
            <rect width="20" height="20" x="2" y="2" rx="4" fill="#0DB7ED"/>
            <path fill="#FFF" d="M5 13h2v2H5zm3 0h2v2H8zm3 0h2v2h-2zm3 0h2v2h-2zm-6-3h2v2H8zm3 0h2v2h-2zm3 0h2v2h-2zm-3-3h2v2h-2z"/>
          </svg>
        ),
      },
      {
        name: 'Canva',
        icon: (
          <svg width="28" height="28" viewBox="0 0 24 24">
            <rect width="20" height="20" x="2" y="2" rx="4" fill="#00C4CC"/>
            <path fill="#FFF" d="M11.9 6c-3.1 0-5.4 2.1-5.4 5.4 0 3.4 2.4 6.6 5.8 6.6 2.1 0 3.7-1.1 4.4-2.4l-1.6-1c-.5.8-1.5 1.5-2.8 1.5-2 0-3.6-1.7-3.6-4.3 0-2.4 1.4-4 3.6-4 1.3 0 2.3.6 2.8 1.5l1.6-1C15.9 7 14.2 6 11.9 6z"/>
          </svg>
        ),
      },
      {
        name: 'Jupyter',
        icon: (
          <svg width="28" height="28" viewBox="0 0 24 24">
            <rect width="20" height="20" x="2" y="2" rx="4" fill="#2A2E3D"/>
            <circle cx="12" cy="12" r="6" stroke="#F37626" strokeWidth="2.5" fill="none"/>
            <circle cx="6" cy="6" r="1.5" fill="#F37626"/>
            <circle cx="18" cy="18" r="1.5" fill="#F37626"/>
          </svg>
        ),
      },
    ],
    tag: 'TOOLS & WORKFLOWS',
    tagBg: 'rgba(139, 92, 246, 0.12)',
    tagColor: '#c4b5fd',
    bullets: [
      'Git-based version control and collaborative development',
      'Docker-based application setup and containerization',
      'Creative design and visual content creation with Canva',
      'Notebook-based data analysis and development with Jupyter',
    ],
  },
];

export default function SkillsPreview() {
  return (
    <section className="skills-section section" id="skills">
      <div className="container">
        {/* Section Header */}
        <div className="skills-section__header text-center">
          <div className="skills-section__badge-pill">TECHNICAL ARSENAL</div>
          <h2 className="skills-section__title">Skills & Technologies</h2>
          <p className="skills-section__subtitle">
            Tools and technologies I use to build intelligent and elegant solutions
          </p>
        </div>

        {/* 3 Skill Cards Grid */}
        <div className="skills-cards-grid">
          {SKILL_CARDS.map((card) => (
            <div key={card.id} className="skills-card">
              {/* Header */}
              <div className="skills-card__header">
                <div
                  className="skills-card__icon-box"
                  style={{ backgroundColor: card.iconBg, color: card.iconColor }}
                >
                  {card.icon}
                </div>
                <h3 className="skills-card__title">{card.title}</h3>
              </div>

              {/* Description */}
              <p className="skills-card__description">{card.description}</p>

              {/* Badges Grid (3x3 = 9 Skills) */}
              <div className="skills-card__badges-grid">
                {card.skills.map((s) => (
                  <div key={s.name} className="skill-badge-item" title={s.name}>
                    <div className="skill-badge-item__icon-wrapper">{s.icon}</div>
                    <span className="skill-badge-item__name">{s.name}</span>
                  </div>
                ))}
              </div>

              {/* Tag Pill */}
              <div className="skills-card__tag-wrapper">
                <span
                  className="skills-card__tag"
                  style={{ backgroundColor: card.tagBg, color: card.tagColor }}
                >
                  {card.tag}
                </span>
              </div>

              {/* Checklist */}
              <ul className="skills-card__checklist">
                {card.bullets.map((bullet) => (
                  <li key={bullet} className="skills-card__check-item">
                    <span className="skills-card__check-icon">✓</span>
                    <span>{bullet}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

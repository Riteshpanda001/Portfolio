import { Link } from 'react-router-dom';
import './FeaturedProjects.css';

export function ProjectIcon({ iconType }) {
  switch (iconType) {
    case 'robot':
      return (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect width="18" height="12" x="3" y="6" rx="2" />
          <path d="M12 2v4" />
          <line x1="9" x2="9" y1="12" y2="12" />
          <line x1="15" x2="15" y1="12" y2="12" />
          <path d="M9 16h6" />
        </svg>
      );
    case 'users':
      return (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
          <circle cx="9" cy="7" r="4" />
          <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
          <path d="M16 3.13a4 4 0 0 1 0 7.75" />
        </svg>
      );
    case 'brain':
      return (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 5a3 3 0 1 0-5.997.125 4 4 0 0 0-2.526 5.77 4 4 0 0 0 .556 6.588A4 4 0 1 0 12 18Z" />
          <path d="M12 5a3 3 0 1 1 5.997.125 4 4 0 0 1 2.526 5.77 4 4 0 0 1-.556 6.588A4 4 0 1 1 12 18Z" />
          <path d="M15 13a3 3 0 1 0-6 0" />
        </svg>
      );
    case 'shopping-bag':
      return (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z" />
          <line x1="3" x2="21" y1="6" y2="6" />
          <path d="M16 10a4 4 0 0 1-8 0" />
        </svg>
      );
    case 'shield':
      return (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
          <path d="m9 12 2 2 4-4" />
        </svg>
      );
    case 'graduation-cap':
      return (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
          <path d="M6 12v5c3 3 9 3 12 0v-5" />
        </svg>
      );
    case 'bar-chart':
      return (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <line x1="12" y1="20" x2="12" y2="10" />
          <line x1="18" y1="20" x2="18" y2="4" />
          <line x1="6" y1="20" x2="6" y2="16" />
        </svg>
      );
    case 'trending-down':
      return (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="23 18 13.5 8.5 8.5 13.5 1 6" />
          <polyline points="17 18 23 18 23 12" />
        </svg>
      );
    case 'briefcase':
      return (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="2" y="7" width="20" height="14" rx="2" ry="2" />
          <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
        </svg>
      );
    default:
      return (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="16 18 22 12 16 6" />
          <polyline points="8 6 2 12 8 18" />
        </svg>
      );
  }
}

export default function ProjectCard({ project }) {
  return (
    <article className="project-card">
      {/* 1. Project Image & 2. Status Badge */}
      <div className="project-card__image-wrap">
        <img
          src={project.imageUrl}
          alt={project.title}
          className="project-card__image"
          loading="lazy"
        />
        <span className={`project-card__status project-card__status--${project.statusType}`}>
          <span className="project-card__status-dot" />
          {project.status}
        </span>
      </div>

      {/* Card Content Area */}
      <div className="project-card__body">
        {/* 3. Project Icon & 4. Title & 5. Category */}
        <div className="project-card__header-box">
          <div className="project-card__icon-box" aria-hidden="true">
            <ProjectIcon iconType={project.iconType} />
          </div>
          <div>
            <h3 className="project-card__title">
              <Link to={`/projects/${project.id}`}>{project.title}</Link>
            </h3>
            <span className="project-card__category">{project.category}</span>
          </div>
        </div>

        {/* 6 & 7. PROBLEM */}
        <div className="project-card__section">
          <span className="project-card__section-label">PROBLEM</span>
          <p className="project-card__section-text">{project.problem}</p>
        </div>

        {/* 8 & 9. SOLUTION */}
        <div className="project-card__section">
          <span className="project-card__section-label">SOLUTION</span>
          <p className="project-card__section-text">{project.solution}</p>
        </div>

        {/* 10 & 11. KEY LEARNINGS */}
        <div className="project-card__section">
          <span className="project-card__section-label">KEY LEARNINGS</span>
          <p className="project-card__section-text">{project.keyLearnings}</p>
        </div>

        {/* 12. Technology Tags */}
        <div className="project-card__tech-tags">
          {project.technologies.map((tech) => (
            <span key={tech} className="project-card__tech-tag">
              {tech}
            </span>
          ))}
        </div>

        {/* 13 & 14. Bottom Actions */}
        <div className="project-card__actions">
          {project.githubUrl ? (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="project-card__btn project-card__btn--github"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"/>
              </svg>
              GitHub
            </a>
          ) : null}

          {project.liveUrl ? (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="project-card__btn project-card__btn--live"
            >
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                <polyline points="15 3 21 3 21 9" />
                <line x1="10" x2="21" y1="14" y2="3" />
              </svg>
              Live Demo
            </a>
          ) : (
            <span className="project-card__btn project-card__btn--disabled">
              Coming Soon
            </span>
          )}

          <Link to={`/projects/${project.id}`} className="project-card__btn project-card__btn--details">
            View Details →
          </Link>
        </div>
      </div>
    </article>
  );
}

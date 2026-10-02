import { useParams, Link } from 'react-router-dom';
import Loading from '../../components/Loading/Loading';
import { PROJECTS } from '../../data/projects';
import { useProject } from '../../hooks/useProjects';
import { ProjectIcon } from '../../sections/FeaturedProjects/ProjectCard';
import './ProjectDetails.css';

export default function ProjectDetails() {
  const { id } = useParams();
  const { project: apiProject, loading, error } = useProject(id);

  // Fallback to local PROJECTS matching id or slug
  const localProject = PROJECTS.find(
    (p) =>
      String(p.id || '').toLowerCase() === String(id || '').toLowerCase() ||
      String(p._id || '').toLowerCase() === String(id || '').toLowerCase()
  );

  const data = apiProject || localProject || PROJECTS[0];

  if (loading) return <Loading />;

  return (
    <section id="project-details-page" className="section project-details">
      <div className="container project-details__container">
        {/* Top Back Navigation Control */}
        <div className="project-details__nav-top">
          <Link to="/projects" className="project-details__back-btn">
            ← View All Projects
          </Link>
        </div>

        {data && (
          <div className="project-details__card card animate-fadeInUp">
            {/* 1. PROJECT IMAGE */}
            {data.imageUrl && (
              <div className="project-details__image-wrap">
                <img
                  src={data.imageUrl}
                  alt={data.title}
                  className="project-details__image"
                />
              </div>
            )}

            <div className="project-details__header-content text-center">
              {/* 2. STATUS BADGE */}
              <div className="project-details__status-row">
                <span
                  className={`project-card__status project-card__status--${
                    data.statusType || 'completed'
                  }`}
                  style={{ position: 'relative', top: 'auto', right: 'auto', display: 'inline-flex' }}
                >
                  <span className="project-card__status-dot" />
                  {data.status || 'Completed'}
                </span>
              </div>

              {/* 3. PROJECT ICON */}
              <div className="project-details__icon-wrap">
                <div className="project-card__icon-box">
                  <ProjectIcon iconType={data.iconType} />
                </div>
              </div>

              {/* 4. PROJECT TITLE */}
              <h1 className="project-details__title">{data.title}</h1>

              {/* 5. CATEGORY */}
              <span className="project-card__category project-details__category">
                {data.category}
              </span>
            </div>

            <div className="project-details__divider" />

            {/* 6. PROBLEM */}
            {data.problem && (
              <div className="project-details__section">
                <h3 className="project-details__section-title">PROBLEM</h3>
                <p className="project-details__section-text">{data.problem}</p>
              </div>
            )}

            {/* 7. SOLUTION */}
            {data.solution && (
              <div className="project-details__section">
                <h3 className="project-details__section-title">SOLUTION</h3>
                <p className="project-details__section-text">{data.solution}</p>
              </div>
            )}

            {/* 8. KEY LEARNINGS */}
            {data.keyLearnings && (
              <div className="project-details__section">
                <h3 className="project-details__section-title">KEY LEARNINGS</h3>
                <p className="project-details__section-text">{data.keyLearnings}</p>
              </div>
            )}

            {/* 9. TECHNOLOGIES */}
            {(data.technologies || data.tags) && (
              <div className="project-details__section">
                <h3 className="project-details__section-title">TECHNOLOGIES</h3>
                <div className="project-card__tech-tags">
                  {(data.technologies || data.tags || []).map((tech) => (
                    <span key={tech} className="project-card__tech-tag">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* 10. PROJECT LINKS */}
            <div className="project-details__section">
              <h3 className="project-details__section-title">PROJECT LINKS</h3>
              <div className="project-card__actions" style={{ borderTop: 'none', paddingTop: 0 }}>
                {data.githubUrl || data.github ? (
                  <a
                    href={data.githubUrl || data.github}
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

                {data.liveUrl || data.live ? (
                  <a
                    href={data.liveUrl || data.live}
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
              </div>
            </div>
          </div>
        )}

        {/* Bottom Back Navigation Control */}
        <div className="project-details__nav-bottom">
          <Link to="/projects" className="project-details__back-btn">
            ← View All Projects
          </Link>
        </div>
      </div>
    </section>
  );
}

import { useParams, Link } from 'react-router-dom';
import Loading from '../../components/Loading/Loading';
import { PROJECTS } from '../../data/projects';
import { useProject } from '../../hooks/useProjects';
import './ProjectDetails.css';

export default function ProjectDetails() {
  const { id } = useParams();
  const { project: apiProject, loading } = useProject(id);

  // Match local project by slug ID, numeric index, displayOrder, or title
  const localProject =
    PROJECTS.find(
      (p) =>
        String(p.id || '').toLowerCase() === String(id || '').toLowerCase() ||
        String(p._id || '').toLowerCase() === String(id || '').toLowerCase() ||
        String(p.displayOrder || '') === String(id || '') ||
        (apiProject?.title && p.title?.toLowerCase() === apiProject.title?.toLowerCase())
    ) ||
    PROJECTS[Math.max(0, parseInt(id, 10) - 1)] ||
    PROJECTS[0];

  // Merge API data with rich local case-study data so all sections are always populated
  const data = {
    ...localProject,
    ...(apiProject || {}),
    title: apiProject?.title || localProject?.title,
    category: apiProject?.category || localProject?.category,
    status: apiProject?.status || localProject?.status || 'Incomplete',
    statusType: apiProject?.statusType || localProject?.statusType || 'incomplete',
    imageUrl: apiProject?.imageUrl || localProject?.imageUrl,
    problem:
      apiProject?.problem ||
      apiProject?.description ||
      localProject?.problem ||
      '',
    solution:
      apiProject?.solution ||
      apiProject?.longDescription ||
      localProject?.solution ||
      '',
    keyLearnings:
      apiProject?.keyLearnings ||
      localProject?.keyLearnings ||
      '',
    technologies:
      (apiProject?.technologies && apiProject.technologies.length > 0)
        ? apiProject.technologies
        : (apiProject?.tags && apiProject.tags.length > 0)
        ? apiProject.tags
        : (localProject?.technologies || []),
    githubUrl: apiProject?.githubUrl || localProject?.githubUrl,
    liveUrl: apiProject?.liveUrl || localProject?.liveUrl,
    iconType: localProject?.iconType || 'code',
  };

  if (loading) return <Loading />;

  return (
    <section id="project-details-page" className="section project-details">
      <div className="container project-details__container">
        {/* Top Back to Home Navigation */}
        <div className="project-details__nav-top">
          <Link to="/" className="project-details__back-btn" id="back-to-home-btn" title="Back to Home">
            <svg
              className="project-details__back-icon"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="19" y1="12" x2="5" y2="12" />
              <polyline points="12 19 5 12 12 5" />
            </svg>
            <span>Back to Home</span>
          </Link>
        </div>

        {data && (
          <div className="project-details__card card animate-fadeInUp">
            {/* Top Status Badge */}
            <div className="project-details__status-row text-center" style={{ display: 'flex', justifyContent: 'center', marginBottom: '1.5rem' }}>
              <span
                className={`project-card__status project-card__status--${
                  data.statusType ||
                  (data.status === 'Completed'
                    ? 'completed'
                    : data.status === 'In Development'
                    ? 'in-development'
                    : 'incomplete')
                }`}
                style={{ position: 'relative', top: 'auto', right: 'auto', display: 'inline-flex' }}
              >
                <span className="project-card__status-dot" />
                {data.status || 'Incomplete'}
              </span>
            </div>

            {/* 1. PROJECT IMAGE BANNER */}
            {data.imageUrl && (
              <div className="project-details__image-wrap">
                <img
                  src={data.imageUrl}
                  alt={data.title}
                  className="project-details__image"
                />
              </div>
            )}

            {/* 2. HEADER: TITLE, CATEGORY */}
            <div className="project-details__header-content text-center">
              <h1 className="project-details__title">{data.title}</h1>

              <span className="project-card__category project-details__category">
                {data.category}
              </span>
            </div>

            <div className="project-details__divider" />

            {/* 3. PROBLEM STATEMENT */}
            {data.problem && (
              <div className="project-details__section project-details__section--problem">
                <h3 className="project-details__section-title">
                  <span>⚠️</span> Problem
                </h3>
                <p className="project-details__section-text">{data.problem}</p>
              </div>
            )}

            {/* 4. PROPOSED SOLUTIONS */}
            {data.solution && (
              <div className="project-details__section project-details__section--solution">
                <h3 className="project-details__section-title">
                  <span>💡</span> Solutions
                </h3>
                <p className="project-details__section-text">{data.solution}</p>
              </div>
            )}

            {/* 5. SKILLS & TECHNOLOGIES */}
            {data.technologies && data.technologies.length > 0 && (
              <div className="project-details__section project-details__section--skills">
                <h3 className="project-details__section-title">
                  <span>⚡</span> Skills & Technologies
                </h3>
                <div className="project-card__tech-tags">
                  {data.technologies.map((tech) => (
                    <span key={tech} className="project-card__tech-tag">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* 6. KEY LEARNING */}
            {data.keyLearnings && (
              <div className="project-details__section project-details__section--learnings">
                <h3 className="project-details__section-title">
                  <span>🎯</span> Key Learning
                </h3>
                <p className="project-details__section-text">{data.keyLearnings}</p>
              </div>
            )}

            {/* 7. PROJECT LINKS */}
            <div className="project-details__section project-details__section--links">
              <h3 className="project-details__section-title">
                <span>🔗</span> Project Links
              </h3>
              <div className="project-card__actions" style={{ borderTop: 'none', paddingTop: '0.25rem' }}>
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
      </div>
    </section>
  );
}

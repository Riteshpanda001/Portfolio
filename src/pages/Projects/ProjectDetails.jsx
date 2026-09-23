import { useParams, Link } from 'react-router-dom';
import Loading      from '../../components/Loading/Loading';
import ErrorMessage from '../../components/ErrorMessage/ErrorMessage';
import Button       from '../../components/Button/Button';
import { useProject } from '../../hooks/useProjects';
import './ProjectDetails.css';

// ============================================================
// ProjectDetails Page
// ============================================================

export default function ProjectDetails() {
  const { id } = useParams();
  const { project, loading, error } = useProject(id);

  // Demo fallback
  const demo = {
    title: 'E-Commerce Platform',
    description: 'A comprehensive e-commerce solution built with React, Node.js, and MongoDB.',
    longDescription: `This project involved building a full-featured e-commerce platform from scratch.
    Key features include product management, shopping cart, payment integration with Stripe,
    user authentication, and an admin dashboard for order management.`,
    tags: ['React', 'Node.js', 'MongoDB', 'Stripe', 'Redux'],
    github: '#',
    live: '#',
    features: ['Product catalog & search', 'Shopping cart & checkout', 'Stripe payment integration', 'Admin dashboard', 'JWT authentication', 'Responsive design'],
  };

  const data = loading ? null : (error ? demo : (project || demo));

  if (loading) return <Loading />;

  return (
    <section id="project-details-page" className="section">
      <div className="container">
        {error && <ErrorMessage message={error} />}

        <Link to="/projects" className="project-details__back">← Back to Projects</Link>

        {data && (
          <div className="project-details__content animate-fadeInUp">
            <div className="project-details__header">
              <div>
                <div className="project-details__tags">
                  {data.tags.map((t) => <span key={t} className="badge">{t}</span>)}
                </div>
                <h1 className="project-details__title">{data.title}</h1>
                <p className="project-details__desc">{data.description}</p>
              </div>
              <div className="project-details__actions">
                <Button href={data.github} variant="ghost">View Code ↗</Button>
                <Button href={data.live}  variant="primary">Live Demo →</Button>
              </div>
            </div>

            <div className="project-details__img-placeholder" aria-hidden="true">
              <span>📁 Project Preview</span>
            </div>

            <div className="project-details__body">
              <div className="project-details__overview card">
                <h2>Project Overview</h2>
                <p>{data.longDescription || data.description}</p>
              </div>

              {data.features && (
                <div className="project-details__features card">
                  <h2>Key Features</h2>
                  <ul>
                    {data.features.map((f) => (
                      <li key={f}><span className="text-gradient">✓</span> {f}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

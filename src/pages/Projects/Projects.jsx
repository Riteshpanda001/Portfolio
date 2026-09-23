import { useState }      from 'react';
import { Link }           from 'react-router-dom';
import SectionTitle       from '../../components/SectionTitle/SectionTitle';
import Loading            from '../../components/Loading/Loading';
import ErrorMessage       from '../../components/ErrorMessage/ErrorMessage';
import Button             from '../../components/Button/Button';
import { useProjects }    from '../../hooks/useProjects';
import { PROJECT_FILTERS } from '../../utils/constants';
import './Projects.css';

// ============================================================
// Projects Page
// ============================================================

export default function Projects() {
  const [activeFilter, setActiveFilter] = useState('All');
  const { projects, loading, error, refetch } = useProjects({ category: activeFilter === 'All' ? '' : activeFilter });

  const DEMO_PROJECTS = [
    { _id: '1', title: 'E-Commerce Platform', description: 'Full-stack e-commerce solution with React, Node.js & MongoDB.', tags: ['React','Node.js','MongoDB'], category: 'Web', github: '#', live: '#' },
    { _id: '2', title: 'Chat Application',    description: 'Real-time chat app using Socket.io and JWT authentication.',   tags: ['Socket.io','React','Express'], category: 'Web', github: '#', live: '#' },
    { _id: '3', title: 'Task Manager API',    description: 'RESTful API with authentication, roles and PostgreSQL.',        tags: ['Node.js','PostgreSQL','JWT'],  category: 'Backend', github: '#', live: '#' },
    { _id: '4', title: 'Portfolio Website',   description: 'Personal portfolio with dark theme, animations & CMS admin.',   tags: ['React','CSS','Vite'],         category: 'Web', github: '#', live: '#' },
    { _id: '5', title: 'Weather Dashboard',   description: 'Live weather app using OpenWeather API with charts.',            tags: ['React','Chart.js','API'],      category: 'Web', github: '#', live: '#' },
    { _id: '6', title: 'Blog CMS',            description: 'Markdown-based blog with admin panel and NextJS SSG.',          tags: ['Next.js','MDX','PostgreSQL'], category: 'Web', github: '#', live: '#' },
  ];

  const displayProjects = (loading || error || !projects.length) ? DEMO_PROJECTS : projects;

  if (loading) return <Loading />;

  return (
    <section id="projects-page" className="section">
      <div className="container">
        <SectionTitle badge="Projects" title="My Work" subtitle="A collection of projects that showcase my skills and experience." />

        {error && <ErrorMessage message={error} onRetry={refetch} />}

        {/* Filters */}
        <div className="projects-page__filters" role="tablist">
          {PROJECT_FILTERS.map((f) => (
            <button
              key={f}
              role="tab"
              aria-selected={activeFilter === f}
              className={`projects-page__filter-btn ${activeFilter === f ? 'projects-page__filter-btn--active' : ''}`}
              onClick={() => setActiveFilter(f)}
            >{f}</button>
          ))}
        </div>

        {/* Grid */}
        <div className="projects-page__grid stagger">
          {displayProjects.map((p) => (
            <article key={p._id} className="project-card card animate-fadeInUp">
              <div className="project-card__img-placeholder" aria-hidden="true">
                <span>📁</span>
              </div>
              <div className="project-card__body">
                <div className="project-card__tags">
                  {(p.tags || []).slice(0,3).map((t) => (
                    <span key={t} className="badge">{t}</span>
                  ))}
                </div>
                <h3 className="project-card__title">{p.title}</h3>
                <p className="project-card__desc">{p.description}</p>
                <div className="project-card__actions">
                  <Button href={p.github} variant="ghost" size="sm" icon="↗">GitHub</Button>
                  <Button href={p.live}   variant="primary" size="sm">Live Demo</Button>
                  <Link to={`/projects/${p._id}`} className="project-card__detail-link">Details →</Link>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

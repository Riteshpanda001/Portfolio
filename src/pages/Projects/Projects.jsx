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
    { _id: '1', title: 'AI Predictive Analytics Engine', description: 'Machine learning pipeline for automated predictive analysis & data insights.', tags: ['Python','PyTorch','Data Analytics','FastAPI'], category: 'AI / ML', github: '#', live: '#' },
    { _id: '2', title: 'Enterprise Web ERP Platform', description: 'Scalable web application built with modern architecture & React.', tags: ['React','Node.js','PostgreSQL','Docker'], category: 'Web Development', github: '#', live: '#' },
    { _id: '3', title: 'Interactive BI & Data Analytics Dashboard', description: 'Real-time statistical data analytics and BI metrics dashboard platform.', tags: ['Data Analytics','Python','React','SQL'], category: 'Data Analytics', github: '#', live: '#' },
    { _id: '4', title: 'Smart NLP Text Summarizer & Classifier', description: 'Deep learning model for automatic text summarization and sentiment analysis.', tags: ['Python','Transformers','NLP','PyTorch'], category: 'AI / ML', github: '#', live: '#' },
    { _id: '5', title: 'Financial Management Web Portal', description: 'Secure web portal with JWT authentication, role management, and audit logging.', tags: ['React','Express','Security','MySQL'], category: 'Web Development', github: '#', live: '#' },
    { _id: '6', title: 'Automated Data ETL Pipeline', description: 'Scalable data pipeline for extracting, transforming, and visualizing large datasets.', tags: ['Python','Pandas','SQL','Power BI'], category: 'Data Analytics', github: '#', live: '#' },
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

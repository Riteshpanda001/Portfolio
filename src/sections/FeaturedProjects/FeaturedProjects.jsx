import { Link }       from 'react-router-dom';
import SectionTitle   from '../../components/SectionTitle/SectionTitle';
import Button         from '../../components/Button/Button';
import { useProjects } from '../../hooks/useProjects';
import './FeaturedProjects.css';

const DEMO = [
  { _id: '1', title: 'AI Predictive Analytics Engine', description: 'Machine learning pipeline for automated predictive analysis & data insights.', tags: ['Python', 'PyTorch', 'Data Analytics', 'FastAPI'], github: '#', live: '#', emoji: '🤖' },
  { _id: '2', title: 'Enterprise Java ERP System', description: 'Scalable enterprise application built with Spring Boot microservices & React.', tags: ['Java', 'Spring Boot', 'React', 'PostgreSQL'], github: '#', live: '#', emoji: '☕' },
  { _id: '3', title: 'Interactive Data Visualization Dashboard', description: 'Real-time statistical data analytics and BI metrics dashboard platform.', tags: ['Data Analytics', 'Python', 'React', 'SQL'], github: '#', live: '#', emoji: '📊' },
];

export default function FeaturedProjects() {
  const { projects, loading } = useProjects({ featured: true });
  const data = (!loading && projects.length) ? projects : DEMO;

  return (
    <section id="featured-projects" className="section">
      <div className="container">
        <SectionTitle badge="Portfolio" title="Featured Projects" subtitle="Turning complex ideas into real-world, high-impact applications." />
        <div className="featured-projects__grid stagger">
          {data.slice(0,3).map((p, i) => (
            <article key={p._id} className={`feat-card card animate-fadeInUp ${i === 0 ? 'feat-card--wide' : ''}`}>
              <div className="feat-card__top">
                <span className="feat-card__emoji">{p.emoji || '📁'}</span>
                <div className="feat-card__links">
                  <a href={p.github} className="feat-card__icon-link" aria-label="GitHub" target="_blank" rel="noopener noreferrer">↗</a>
                  <a href={p.live}   className="feat-card__icon-link feat-card__icon-link--accent" aria-label="Live Demo" target="_blank" rel="noopener noreferrer">▶</a>
                </div>
              </div>
              <h3 className="feat-card__title">{p.title}</h3>
              <p className="feat-card__desc">{p.description}</p>
              <div className="feat-card__tags">
                {(p.tags||[]).map((t) => <span key={t} className="badge">{t}</span>)}
              </div>
            </article>
          ))}
        </div>
        <div className="text-center" style={{ marginTop: 'var(--space-2xl)' }}>
          <Link to="/projects" className="btn btn--primary btn--md">View All Projects →</Link>
        </div>
      </div>
    </section>
  );
}

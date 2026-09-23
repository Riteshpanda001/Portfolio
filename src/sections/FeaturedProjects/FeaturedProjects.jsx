import { Link }       from 'react-router-dom';
import SectionTitle   from '../../components/SectionTitle/SectionTitle';
import Button         from '../../components/Button/Button';
import { useProjects } from '../../hooks/useProjects';
import './FeaturedProjects.css';

const DEMO = [
  { _id: '1', title: 'E-Commerce Platform', description: 'Full-stack e-commerce with React & Node.js.', tags: ['React','Node.js','MongoDB'], github: '#', live: '#', emoji: '🛒' },
  { _id: '2', title: 'Chat Application',    description: 'Real-time messaging with Socket.io.',         tags: ['Socket.io','React'],         github: '#', live: '#', emoji: '💬' },
  { _id: '3', title: 'Portfolio CMS',       description: 'This very site — built with Vite + React.',   tags: ['Vite','React','CSS'],         github: '#', live: '#', emoji: '✨' },
];

export default function FeaturedProjects() {
  const { projects, loading } = useProjects({ featured: true });
  const data = (!loading && projects.length) ? projects : DEMO;

  return (
    <section id="featured-projects" className="section">
      <div className="container">
        <SectionTitle badge="Featured Work" title="Projects I'm Proud Of" subtitle="A curated selection of my best work." />
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

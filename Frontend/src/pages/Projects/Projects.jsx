import { useState } from 'react';
import SectionTitle from '../../components/SectionTitle/SectionTitle';
import Loading from '../../components/Loading/Loading';
import ProjectCard from '../../sections/FeaturedProjects/ProjectCard';
import { PROJECTS } from '../../data/projects';
import { useProjects } from '../../hooks/useProjects';
import { PROJECT_FILTERS } from '../../utils/constants';
import './Projects.css';

export default function Projects() {
  const [activeFilter, setActiveFilter] = useState('All');
  const { projects: apiProjects, loading } = useProjects({
    category: activeFilter === 'All' ? '' : activeFilter,
  });

  const rawProjects = (!loading && apiProjects && apiProjects.length > 0)
    ? apiProjects
    : PROJECTS;

  const displayProjects = rawProjects
    .filter((proj) => {
      const title = (proj.title || '').toLowerCase();
      const id = (proj.id || proj._id || '').toLowerCase();
      return !title.includes('prepnova') &&
             !title.includes('handwritten digit classification') &&
             !id.includes('prepnova') &&
             !id.includes('digit-classification');
    })
    .sort((a, b) => (a.displayOrder || 99) - (b.displayOrder || 99));

  const filteredProjects = activeFilter === 'All'
    ? displayProjects
    : displayProjects.filter((p) => {
        const cat = (p.category || '').toLowerCase();
        const techs = (p.technologies || []).map(t => t.toLowerCase());
        const f = activeFilter.toLowerCase();

        if (f === 'ai/ml') {
          return cat.includes('ai') || cat.includes('machine learning') || techs.includes('ai/ml') || techs.includes('ai') || techs.includes('machine learning');
        }
        if (f === 'generative ai') {
          return cat.includes('generative ai') || cat.includes('ai') || techs.includes('generative ai') || techs.includes('ai');
        }
        if (f === 'data science') {
          return cat.includes('data science') || cat.includes('business intelligence') || cat.includes('machine learning') || techs.includes('data analysis') || techs.includes('machine learning');
        }
        if (f === 'data analysis') {
          return cat.includes('data analytics') || cat.includes('data analysis') || cat.includes('market intelligence') || techs.includes('data analysis') || techs.includes('data visualization') || techs.includes('power bi');
        }
        if (f === 'web development') {
          return cat.includes('frontend') || cat.includes('e-commerce') || cat.includes('full-stack') || cat.includes('backend') || techs.includes('html') || techs.includes('react') || techs.includes('fastapi');
        }

        return cat.includes(f) || techs.some(t => t.includes(f));
      });

  if (loading) return <Loading />;

  return (
    <section id="projects-page" className="section">
      <div className="container">
        <SectionTitle
          badge="Projects"
          title="My Work"
          subtitle="A collection of real-world projects showcasing machine learning, full-stack, and web development skills."
        />

        {/* Filters */}
        <div className="projects-page__filters" role="tablist">
          {PROJECT_FILTERS.map((f) => (
            <button
              key={f}
              role="tab"
              aria-selected={activeFilter === f}
              className={`projects-page__filter-btn ${activeFilter === f ? 'projects-page__filter-btn--active' : ''}`}
              onClick={() => setActiveFilter(f)}
            >
              {f}
            </button>
          ))}
        </div>

        {/* Grid */}
        <div className="featured-projects__grid">
          {filteredProjects.map((p) => (
            <ProjectCard key={p.id || p._id} project={p} />
          ))}
        </div>
      </div>
    </section>
  );
}

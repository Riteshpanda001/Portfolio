import { useState } from 'react';
import { Link } from 'react-router-dom';
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

  // All projects — no featured filter, sort by displayOrder
  const allProjects = rawProjects
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
    ? allProjects
    : allProjects.filter((p) => {
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

        {/* Back to Home */}
        <div className="projects-page__back-row">
          <Link to="/" className="projects-page__back-btn" id="back-to-home-btn">
            <svg
              xmlns="http://www.w3.org/2000/svg"
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
            Back to Home
          </Link>
        </div>

        {/* Page Header */}
        <SectionTitle
          badge="Portfolio"
          title="All Projects"
          subtitle="Explore all the projects I've built across AI, Data Science, Full-Stack Development, and Web Development."
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

        {/* Grid — all 7 projects, 3 columns desktop */}
        <div className="featured-projects__grid projects-page__all-grid">
          {filteredProjects.map((p) => (
            <ProjectCard key={p.id || p._id} project={p} />
          ))}
        </div>

      </div>
    </section>
  );
}

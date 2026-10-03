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

  const allProjects = PROJECTS.map((localProj) => {
    if (!apiProjects || apiProjects.length === 0) return localProj;
    const match = apiProjects.find((ap) =>
      ap.title?.toLowerCase() === localProj.title?.toLowerCase() ||
      String(ap.id) === String(localProj.id)
    );
    return match ? { ...localProj, ...match } : localProj;
  }).sort((a, b) => (a.displayOrder || 99) - (b.displayOrder || 99));

  const filteredProjects = activeFilter === 'All'
    ? allProjects
    : allProjects.filter((p) => {
        const cat = (p.category || '').toLowerCase();
        const techs = (p.technologies || p.tags || []).map(t => String(t).toLowerCase());
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
            ← Back to Home
          </Link>
        </div>

        {/* Page Header */}
        <SectionTitle
          badge="Portfolio"
          title="All Projects"
          subtitle="Explore all the projects I've built across AI, Data Science, Data Analytics, Full-Stack Development, and Web Development."
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

import { Link } from 'react-router-dom';
import SectionTitle from '../../components/SectionTitle/SectionTitle';
import ProjectCard from './ProjectCard';
import { PROJECTS } from '../../data/projects';
import { useProjects } from '../../hooks/useProjects';
import './FeaturedProjects.css';

export default function FeaturedProjects() {
  const { projects: apiProjects, loading } = useProjects({ featured: true });

  // Fallback to local PROJECTS data if API is unavailable or empty
  const rawProjects = (!loading && apiProjects && apiProjects.length > 0)
    ? apiProjects
    : PROJECTS;

  // Filter to featured only, sort by displayOrder, take first 3
  const featuredProjects = rawProjects
    .filter((proj) => {
      const title = (proj.title || '').toLowerCase();
      const id = (proj.id || proj._id || '').toLowerCase();
      // Strip removed projects
      const isRemoved =
        title.includes('prepnova') ||
        title.includes('handwritten digit classification') ||
        id.includes('prepnova') ||
        id.includes('digit-classification');
      if (isRemoved) return false;
      // For local static data: respect featured flag
      // For API data: include all (API already filters by featured: true)
      if (apiProjects && apiProjects.length > 0) return true;
      return proj.featured === true;
    })
    .sort((a, b) => (a.displayOrder || 99) - (b.displayOrder || 99))
    .slice(0, 3);

  return (
    <section id="featured-projects" className="featured-projects section">
      <div className="container">
        {/* Section Header */}
        <SectionTitle
          badge="Projects"
          title="Featured Projects"
          subtitle="Turning complex ideas into real-world, high-impact applications."
        />

        {/* Projects 3-Column Grid — exactly 3 cards */}
        <div className="featured-projects__grid">
          {featuredProjects.map((project) => (
            <ProjectCard key={project.id || project._id} project={project} />
          ))}
        </div>

        {/* View All Projects CTA */}
        <div className="featured-projects__footer">
          <Link to="/projects" className="featured-projects__cta-btn" id="view-all-projects-btn">
            <span>View All Projects</span>
            <svg
              className="featured-projects__cta-arrow"
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="5" y1="12" x2="19" y2="12" />
              <polyline points="12 5 19 12 12 19" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
}

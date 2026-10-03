import { Link } from 'react-router-dom';
import SectionTitle from '../../components/SectionTitle/SectionTitle';
import ProjectCard from './ProjectCard';
import { PROJECTS } from '../../data/projects';
import { useProjects } from '../../hooks/useProjects';
import './FeaturedProjects.css';

export default function FeaturedProjects() {
  const { projects: apiProjects, loading } = useProjects({ featured: true });

  // Map API projects onto local PROJECTS baseline so rich fields (problem, solution, learnings) are preserved
  const featuredProjects = PROJECTS.filter((p) => p.featured === true)
    .map((localProj) => {
      if (!apiProjects || apiProjects.length === 0) return localProj;
      const match = apiProjects.find((ap) =>
        ap.title?.toLowerCase() === localProj.title?.toLowerCase() ||
        String(ap.id) === String(localProj.id)
      );
      return match ? { ...localProj, ...match } : localProj;
    })
    .sort((a, b) => (a.displayOrder || 99) - (b.displayOrder || 99))
    .slice(0, 3);

  return (
    <section id="projects" className="featured-projects section">
      <div className="container">
        {/* Section Header */}
        <SectionTitle
          badge="PORTFOLIO"
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

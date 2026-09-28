import { Link } from 'react-router-dom';
import SectionTitle from '../../components/SectionTitle/SectionTitle';
import ProjectCard from './ProjectCard';
import { PROJECTS } from '../../data/projects';
import { useProjects } from '../../hooks/useProjects';
import './FeaturedProjects.css';

export default function FeaturedProjects() {
  const { projects: apiProjects, loading } = useProjects({ featured: true });

  // Fallback to real PROJECTS data array if API unavailable or empty
  const rawProjects = (!loading && apiProjects && apiProjects.length > 0)
    ? apiProjects
    : PROJECTS;

  // Filter out removed projects completely and sort by displayOrder
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

  return (
    <section id="featured-projects" className="featured-projects section">
      <div className="container">
        {/* Section Header */}
        <SectionTitle
          badge="Portfolio"
          title="Featured Projects"
          subtitle="Turning complex ideas into real-world, high-impact applications."
        />

        {/* Projects 3-Column Grid */}
        <div className="featured-projects__grid">
          {displayProjects.map((project) => (
            <ProjectCard key={project.id || project._id} project={project} />
          ))}
        </div>

        {/* View All Projects Button */}
        <div className="featured-projects__footer text-center">
          <Link to="/projects" className="btn btn--primary btn--md">
            View All Projects →
          </Link>
        </div>
      </div>
    </section>
  );
}

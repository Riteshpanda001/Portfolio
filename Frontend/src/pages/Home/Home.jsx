import Hero             from '../../sections/Hero/Hero';
import AboutPreview     from '../../sections/AboutPreview/AboutPreview';
import SkillsPreview    from '../../sections/SkillsPreview/SkillsPreview';
import FeaturedProjects from '../../sections/FeaturedProjects/FeaturedProjects';
import ExperiencePreview from '../../sections/ExperiencePreview/ExperiencePreview';
import Contact          from '../Contact/Contact';

// ============================================================
// Home Page
// ============================================================

export default function Home() {
  return (
    <>
      <Hero />
      <AboutPreview />
      <SkillsPreview />
      <FeaturedProjects />
      <ExperiencePreview />
      <Contact />
    </>
  );
}

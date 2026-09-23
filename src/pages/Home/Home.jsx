import Hero             from '../../sections/Hero/Hero';
import AboutPreview     from '../../sections/AboutPreview/AboutPreview';
import SkillsPreview    from '../../sections/SkillsPreview/SkillsPreview';
import FeaturedProjects from '../../sections/FeaturedProjects/FeaturedProjects';
import ExperiencePreview from '../../sections/ExperiencePreview/ExperiencePreview';
import GitHubStats      from '../../sections/GitHubStats/GitHubStats';
import Testimonials     from '../../sections/Testimonials/Testimonials';
import ContactCTA       from '../../sections/ContactCTA/ContactCTA';
import Newsletter       from '../../sections/Newsletter/Newsletter';

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
      <GitHubStats />
      <Testimonials />
      <ContactCTA />
      <Newsletter />
    </>
  );
}

import SectionTitle from '../../components/SectionTitle/SectionTitle';
import './Testimonials.css';

const TESTIMONIALS = [
  {
    _id: '1',
    name: 'Anjali Sharma',
    role: 'Product Manager, TechCorp',
    avatar: 'AS',
    text: 'Ritesh is an exceptional developer. He delivered our platform ahead of schedule with outstanding quality. His communication and problem-solving skills are top-notch.',
    rating: 5,
  },
  {
    _id: '2',
    name: 'Michael Chen',
    role: 'CTO, StartupXYZ',
    avatar: 'MC',
    text: 'Working with Ritesh was a pleasure. He brought creative solutions to complex problems and always went the extra mile to ensure the best user experience.',
    rating: 5,
  },
  {
    _id: '3',
    name: 'Priya Patel',
    role: 'Founder, Digital Agency Co.',
    avatar: 'PP',
    text: 'Ritesh has a rare combination of technical expertise and design sensibility. Our clients loved the end results. Highly recommended!',
    rating: 5,
  },
];

export default function Testimonials() {
  return (
    <section id="testimonials" className="section">
      <div className="container">
        <SectionTitle badge="Testimonials" title="What People Say" subtitle="Kind words from people I've had the privilege of working with." />
        <div className="testimonials__grid stagger">
          {TESTIMONIALS.map((t, i) => (
            <article key={t._id} className="testimonial-card card animate-fadeInUp" style={{ animationDelay: `${i*0.12}s` }}>
              <div className="testimonial-card__stars" aria-label={`${t.rating} stars`}>
                {'★'.repeat(t.rating)}
              </div>
              <blockquote className="testimonial-card__text">"{t.text}"</blockquote>
              <div className="testimonial-card__author">
                <div className="testimonial-card__avatar">{t.avatar}</div>
                <div>
                  <p className="testimonial-card__name">{t.name}</p>
                  <p className="testimonial-card__role">{t.role}</p>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

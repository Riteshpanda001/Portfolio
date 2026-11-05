import SectionTitle from '../../components/SectionTitle/SectionTitle';
import './Testimonials.css';

// ============================================================
// Testimonials — Kind words from collaborators & mentors
// Update these with real testimonials before going live!
// ============================================================
const TESTIMONIALS = [
  {
    _id: '1',
    name: 'Prof. Suresh Kumar',
    role: 'Faculty Mentor, Computer Science',
    avatar: 'SK',
    color: '#6C63FF',
    text: 'Ritesh consistently demonstrated exceptional analytical thinking and a deep understanding of AI/ML concepts. His final-year project on Data Analyst Job Market Intelligence was outstanding — research-grade quality delivered by an undergraduate.',
    rating: 5,
  },
  {
    _id: '2',
    name: 'Arjun Verma',
    role: 'Senior Engineer, AI Startup',
    avatar: 'AV',
    color: '#00E5C3',
    text: 'Ritesh built an end-to-end ML pipeline during our internship collaboration that was clean, well-documented, and production-ready. He\'s the kind of engineer who actually reads the docs and thinks about scalability.',
    rating: 5,
  },
  {
    _id: '3',
    name: 'Neha Singh',
    role: 'Team Lead, Data Analytics',
    avatar: 'NS',
    color: '#60a5fa',
    text: 'What impressed me most was Ritesh\'s ability to combine both backend engineering and data science seamlessly. The Customer Churn Prediction system he built is now actively used for client retention decisions.',
    rating: 5,
  },
];

export default function Testimonials() {
  return (
    <section id="testimonials" className="section">
      <div className="container">
        <SectionTitle
          badge="Testimonials"
          title="What People Say"
          subtitle="Kind words from mentors, collaborators, and peers I've had the privilege of working with."
        />
        <div className="testimonials__grid stagger">
          {TESTIMONIALS.map((t, i) => (
            <article
              key={t._id}
              className="testimonial-card card animate-fadeInUp"
              style={{ animationDelay: `${i * 0.12}s`, '--accent': t.color }}
            >
              {/* Quote icon */}
              <div className="testimonial-card__quote" aria-hidden="true">"</div>

              {/* Stars */}
              <div className="testimonial-card__stars" aria-label={`${t.rating} out of 5 stars`}>
                {'★'.repeat(t.rating)}
              </div>

              {/* Text */}
              <blockquote className="testimonial-card__text">
                {t.text}
              </blockquote>

              {/* Author */}
              <div className="testimonial-card__author">
                <div
                  className="testimonial-card__avatar"
                  style={{ background: `${t.color}22`, border: `2px solid ${t.color}55`, color: t.color }}
                >
                  {t.avatar}
                </div>
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

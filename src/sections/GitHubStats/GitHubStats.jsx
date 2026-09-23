import SectionTitle from '../../components/SectionTitle/SectionTitle';
import './GitHubStats.css';

const STATS = [
  { label: 'Repositories', value: '48',   icon: '📦' },
  { label: 'Commits',      value: '1.2k', icon: '✅' },
  { label: 'Pull Requests', value: '89',  icon: '🔀' },
  { label: 'Stars Earned', value: '120',  icon: '⭐' },
];

export default function GitHubStats() {
  return (
    <section id="github-stats" className="section" style={{ background: 'rgba(20,27,45,0.4)' }}>
      <div className="container">
        <SectionTitle badge="Open Source" title="GitHub & Activity" subtitle="Building in the open — code contributions, side projects, and repository statistics." />
        <div className="github-stats__grid stagger">
          {STATS.map((s, i) => (
            <div key={s.label} className="github-stat card animate-fadeInUp" style={{ animationDelay: `${i*0.1}s` }}>
              <span className="github-stat__icon">{s.icon}</span>
              <span className="github-stat__value text-gradient">{s.value}</span>
              <span className="github-stat__label">{s.label}</span>
            </div>
          ))}
        </div>
        <div className="github-stats__streak card">
          <div className="github-stats__streak-label">
            <span>🔥</span>
            <h3>Current Streak</h3>
          </div>
          <p className="github-stats__streak-value text-gradient-mint">42 days</p>
          <p className="github-stats__streak-sub">Keep coding! You're on a roll.</p>
        </div>
      </div>
    </section>
  );
}
